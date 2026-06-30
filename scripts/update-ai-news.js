const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outputPath = path.join(root, "data", "ai-news.json");

const SOURCES = [
  {
    name: "Microsoft",
    url: "https://news.microsoft.com/source/topics/ai/feed/",
    type: "rss"
  },
  {
    name: "Anthropic",
    url: "https://www.anthropic.com/news",
    type: "page",
    baseUrl: "https://www.anthropic.com",
    include: /^\/news\//
  },
  {
    name: "Claude",
    url: "https://www.anthropic.com/news",
    type: "page",
    baseUrl: "https://www.anthropic.com",
    include: /^\/news\//,
    titleIncludes: /claude/i
  },
  {
    name: "Perplexity",
    url: "https://framerusercontent.com/sites/1fSOiVlasZEc4asHpu9hIs/searchIndex-qKNqI2kQ3jDT.json",
    type: "framerIndex",
    baseUrl: "https://www.perplexity.ai",
    include: /^\/hub\/(blog|updates|features)\//
  }
];

function decodeEntities(value = "") {
  return value
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, "\"")
    .replace(/&#8221;/g, "\"")
    .replace(/&#8211;/g, "-")
    .replace(/&#8212;/g, "-")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(parseInt(code, 10)));
}

function stripHtml(value = "") {
  return decodeEntities(value.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function validIsoDate(value = "") {
  if (!value) return "";
  const date = new Date(stripHtml(value));
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function textBetween(block, tag) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? stripHtml(match[1]) : "";
}

function absoluteUrl(baseUrl, href) {
  try {
    return new URL(decodeEntities(href), baseUrl).toString().split("#")[0];
  } catch {
    return "";
  }
}

function titleFromUrl(url) {
  const pathname = new URL(url).pathname;
  const slug = pathname.split("/").filter(Boolean).pop() || url;
  return slug.replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function extractPublishedDate(html) {
  const patterns = [
    /property=["']article:published_time["'][^>]*content=["']([^"']+)["']/i,
    /name=["']date["'][^>]*content=["']([^"']+)["']/i,
    /"datePublished"\s*:\s*"([^"]+)"/i,
    /"dateModified"\s*:\s*"([^"]+)"/i,
    /<time[^>]*datetime=["']([^"']+)["']/i
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    const date = validIsoDate(match && match[1]);
    if (date) return date;
  }
  return "";
}

function extractSummaryParagraphs(html, fallback = "") {
  const paragraphs = [];
  const metaDescription = html.match(/<meta\s+(?:name|property)=["'](?:description|og:description)["'][^>]*content=["']([^"']+)["']/i);
  if (metaDescription) paragraphs.push(stripHtml(metaDescription[1]));

  for (const match of html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
    const paragraph = stripHtml(match[1]);
    if (paragraph.length < 70) continue;
    if (/cookie|privacy|subscribe|newsletter|sign up|all rights reserved/i.test(paragraph)) continue;
    if (!paragraphs.includes(paragraph)) paragraphs.push(paragraph);
    if (paragraphs.length >= 3) break;
  }

  if (!paragraphs.length && fallback) paragraphs.push(stripHtml(fallback));
  return paragraphs.slice(0, 3).map((paragraph) => paragraph.length > 420 ? `${paragraph.slice(0, 417).trim()}...` : paragraph);
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "scouting-ai-merit-badge-news-updater/1.0"
    }
  });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
}

function parseRss(xml, source) {
  return [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)].map(([item]) => {
    const url = textBetween(item, "link");
    const published = validIsoDate(textBetween(item, "pubDate"));
    const summary = textBetween(item, "description").slice(0, 280);
    return {
      source: source.name,
      title: textBetween(item, "title"),
      url,
      summary,
      summaryParagraphs: summary ? [summary] : [],
      published
    };
  }).filter((post) => post.title && post.url);
}

function parsePageLinks(html, source) {
  const links = new Map();
  const anchorPattern = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(anchorPattern)) {
    const href = decodeEntities(match[1]);
    if (!source.include.test(href)) continue;
    const url = absoluteUrl(source.baseUrl, href);
    if (!url) continue;
    const title = stripHtml(match[2]) || titleFromUrl(url);
    if (source.titleIncludes && !source.titleIncludes.test(title + " " + url)) continue;
    if (!links.has(url)) {
      links.set(url, {
        source: source.name,
        title,
        url,
        summary: "",
        summaryParagraphs: [],
        published: ""
      });
    }
  }

  if (!links.size) {
    for (const match of html.matchAll(/["'](\/news\/[^"']+)["']/gi)) {
      const url = absoluteUrl(source.baseUrl, match[1]);
      const title = titleFromUrl(url);
      if (source.titleIncludes && !source.titleIncludes.test(title + " " + url)) continue;
      links.set(url, {
        source: source.name,
        title,
        url,
        summary: "",
        summaryParagraphs: [],
        published: ""
      });
    }
  }

  return [...links.values()].slice(0, 15);
}

async function parseFramer(source) {
  const html = await fetchText(source.url);
  const indexMatch = html.match(/<meta name="framer-search-index" content="([^"]+)"/i);
  if (!indexMatch) return parsePageLinks(html, source);
  return parseFramerIndex(JSON.parse(await fetchText(indexMatch[1])), source);
}

function parseFramerIndex(searchIndex, source) {
  return Object.entries(searchIndex)
    .filter(([route]) => source.include.test(route))
    .map(([route, entry]) => {
      const url = absoluteUrl(source.baseUrl, route);
      const title = (entry.h1 && entry.h1[0]) || (entry.h2 && entry.h2[0]) || (entry.h4 && entry.h4[0]) || entry.title || titleFromUrl(url);
      const summary = (entry.description || (entry.p && entry.p.find((p) => p.length > 80)) || "").slice(0, 280);
      return {
        source: source.name,
        title: stripHtml(title),
        url,
        summary: stripHtml(summary),
        summaryParagraphs: summary ? [stripHtml(summary)] : [],
        published: ""
      };
    })
    .filter((post) => post.title && post.url)
    .slice(0, 20);
}

async function enrichPost(post) {
  try {
    const html = await fetchText(post.url);
    const published = post.published || extractPublishedDate(html);
    const summaryParagraphs = extractSummaryParagraphs(html, post.summary);
    return {
      ...post,
      summary: summaryParagraphs[0] || post.summary || "",
      summaryParagraphs,
      published
    };
  } catch {
    return {
      ...post,
      summaryParagraphs: post.summaryParagraphs && post.summaryParagraphs.length ? post.summaryParagraphs : (post.summary ? [post.summary] : []),
      published: post.published || ""
    };
  }
}

async function getSourcePosts(source) {
  try {
    let posts;
    if (source.type === "rss") posts = parseRss(await fetchText(source.url), source);
    else if (source.type === "framer") posts = await parseFramer(source);
    else if (source.type === "framerIndex") posts = parseFramerIndex(JSON.parse(await fetchText(source.url)), source);
    else posts = parsePageLinks(await fetchText(source.url), source);
    return { source: source.name, ok: true, count: posts.length, posts };
  } catch (error) {
    console.warn(`Skipping ${source.name}: ${error.message}`);
    return { source: source.name, ok: false, count: 0, error: error.message, posts: [] };
  }
}

async function main() {
  const existing = fs.existsSync(outputPath)
    ? JSON.parse(fs.readFileSync(outputPath, "utf8"))
    : { posts: [] };
  const posts = [];
  const sources = [];
  for (const source of SOURCES) {
    const result = await getSourcePosts(source);
    sources.push({
      name: result.source,
      ok: result.ok,
      count: result.count,
      error: result.error || ""
    });
    posts.push(...result.posts);
  }

  const merged = new Map();
  for (const post of [...posts, ...(existing.posts || [])]) {
    const key = `${post.source}|${post.url}`;
    if (!merged.has(key)) merged.set(key, post);
  }

  const enriched = [];
  for (const post of [...merged.values()].slice(0, 80)) {
    enriched.push(await enrichPost(post));
  }

  const sorted = enriched
    .sort((a, b) => {
      const aTime = a.published ? new Date(a.published).getTime() : 0;
      const bTime = b.published ? new Date(b.published).getTime() : 0;
      if (aTime !== bTime) return bTime - aTime;
      return `${a.source} ${a.title}`.localeCompare(`${b.source} ${b.title}`);
    })
    .slice(0, 150);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify({ lastUpdated: new Date().toISOString(), sources, posts: sorted }, null, 2)}\n`);
  console.log(`Wrote ${sorted.length} AI news posts`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
