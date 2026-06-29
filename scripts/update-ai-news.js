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
  },
  {
    name: "xAI",
    url: "https://x.ai/news",
    type: "page",
    baseUrl: "https://x.ai",
    include: /^\/news\//
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
    return {
      source: source.name,
      title: textBetween(item, "title"),
      url,
      summary: textBetween(item, "description").slice(0, 280),
      published: new Date(textBetween(item, "pubDate") || Date.now()).toISOString()
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
        published: new Date().toISOString()
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
        published: new Date().toISOString()
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
        published: new Date().toISOString()
      };
    })
    .filter((post) => post.title && post.url)
    .slice(0, 20);
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

  const sorted = [...merged.values()]
    .sort((a, b) => new Date(b.published || 0) - new Date(a.published || 0))
    .slice(0, 150);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify({ lastUpdated: new Date().toISOString(), sources, posts: sorted }, null, 2)}\n`);
  console.log(`Wrote ${sorted.length} AI news posts`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
