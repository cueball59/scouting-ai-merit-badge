(function () {
  const base = document.body.dataset.base || "";
  const page = document.body.dataset.page;
  const app = document.getElementById("app");

  function esc(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    }[char]));
  }

  function link(path) {
    return `${base}${path}`;
  }

  function getSupabaseConfig() {
    const config = window.SUPABASE_CONFIG || {};
    return {
      url: String(config.url || "").replace(/\/$/, ""),
      anonKey: String(config.anonKey || "")
    };
  }

  function renderRequirementDetail(item) {
    if (typeof item === "string") return esc(item);
    return `
      <span>${esc(item.text)}</span>
      ${item.worksheet ? `<div class="checklist-action no-print"><a class="button secondary" href="${link(item.worksheet)}">${esc(item.worksheetLabel || "Open worksheet")}</a></div>` : ""}
    `;
  }

  function renderNav() {
    const nav = document.getElementById("site-nav");
    const items = [
      ["Requirements", "index.html", "home"],
      ["AI News", "ai-news.html", "ai-news"],
      ["AI or Not?", "games/ai-or-not.html", "ai-game"],
      ["Ethics Game", "games/ethics.html", "ethics-game"],
      ["Official Requirements", SITE_DATA.officialRequirementsUrl, ""]
    ];
    nav.innerHTML = items.map(([label, href, key]) => {
      const isExternal = href.startsWith("https://");
      const target = isExternal ? " target=\"_blank\" rel=\"noopener\"" : "";
      const current = key && key === page ? ` aria-current="page"` : "";
      return `<a href="${isExternal ? href : link(href)}"${target}${current}>${label}</a>`;
    }).join("");
  }

  function renderBottomPrint() {
    if (page === "ai-game" || page === "ethics-game") return;
    app.insertAdjacentHTML("beforeend", `
      <section class="bottom-print no-print">
        <button type="button">Print page</button>
      </section>
    `);
    app.querySelector(".bottom-print button").addEventListener("click", () => window.print());
  }

  function renderFooter() {
    document.getElementById("site-footer").innerHTML = `
      Built for Scouting America AI Merit Badge sessions. Reference the
      <a href="${SITE_DATA.officialRequirementsUrl}" target="_blank" rel="noopener">official Scouting America requirement page</a>.
    `;
  }

  function renderHome() {
    app.innerHTML = `
      <section class="hero">
        <div>
          <div class="badge-row">
            <span class="badge">Artificial Intelligence</span>
            <span class="badge">Live session ready</span>
          </div>
          <h1>Scouting AI Merit Badge</h1>
          <p>The Artificial Intelligence merit badge introduces Scouts to AI concepts, automation, responsible use, deepfakes, practical AI skills, and career pathways. This site supports live instruction with requirement pages and interactive activities grounded in the official Scouting America requirements.</p>
          <div class="actions">
            <a class="button" href="${link("games/ai-or-not.html")}">Play AI or Not?</a>
            <a class="button secondary" href="${link("games/ethics.html")}">Play Ethics Game</a>
          </div>
        </div>
      </section>

      <section class="grid" aria-label="Requirement pages">
        ${SITE_DATA.requirements.map((req) => `
          <article class="card">
            <a class="card-link" href="${link(`requirements/${req.id}.html`)}">
              <span class="requirement-number">Requirement ${req.id}</span>
              <h2>${esc(req.title)}</h2>
              <p>${esc(req.summary)}</p>
            </a>
          </article>
        `).join("")}
      </section>
    `;
  }

  function renderRequirement() {
    const id = Number(document.body.dataset.requirement);
    const req = SITE_DATA.requirements.find((item) => item.id === id);
    const previousReq = SITE_DATA.requirements.find((item) => item.id === id - 1);
    const nextReq = SITE_DATA.requirements.find((item) => item.id === id + 1);
    if (!req) {
      app.innerHTML = "<p>Requirement not found.</p>";
      return;
    }

    app.innerHTML = `
      <section class="page-title">
        <span class="requirement-number">Requirement ${req.id}</span>
        <h1>${esc(req.title)}</h1>
        <p>${esc(req.summary)}</p>
        ${req.gameLink ? `<div class="actions page-title-actions"><a class="button" href="${link(req.gameLink)}">Open ${esc(req.gameName || "game")}</a></div>` : ""}
      </section>
      <section class="panel">
        <h2>Requirement focus</h2>
        ${req.completionNote ? `<p class="completion-note"><strong>Completion expectation:</strong> ${esc(req.completionNote)}</p>` : ""}
        <p>${esc(req.requirement)}</p>
        ${req.requirementDetails ? `
          <h3>Full requirement checklist</h3>
          <ul class="requirement-detail-list">
            ${req.requirementDetails.map((item) => `<li>${renderRequirementDetail(item)}</li>`).join("")}
          </ul>
        ` : ""}
        <h3>Live-session activities</h3>
        <ul>${req.activities.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
      </section>
      ${req.terms ? `
        <section class="panel">
          <h2>Starter glossary</h2>
          <div class="term-list">
            ${req.terms.map(([term, definition]) => `
              <div class="term"><strong>${esc(term)}</strong><span>${esc(definition)}</span></div>
            `).join("")}
          </div>
        </section>
      ` : ""}
      ${req.aiComparison ? `
        <section class="panel">
          <h2>Narrow AI vs. General AI vs. Superintelligent AI</h2>
          <div class="ai-comparison-grid">
            ${req.aiComparison.map((item, index) => `
              <article class="comparison-card">
                <h3>${esc(item.type)}</h3>
                <p>${esc(item.meaning)}</p>
                <p><strong>Status:</strong> ${esc(item.today)}</p>
                <button class="secondary reveal-example" type="button" aria-expanded="false" aria-controls="ai-example-${index}">Show example</button>
                <p class="comparison-example hidden" id="ai-example-${index}"><strong>Example:</strong> ${esc(item.example)}</p>
              </article>
            `).join("")}
          </div>
        </section>
      ` : ""}
      ${req.automationComparison ? `
        <section class="panel">
          <h2>Compare automation patterns</h2>
          <p>Compare a timer, sensor, checklist, and adaptive system. Use each button to reveal more detail.</p>
          <div class="automation-comparison-grid">
            ${req.automationComparison.map((item, index) => `
              <article class="comparison-card">
                <h3>${esc(item.type)}</h3>
                <p>${esc(item.meaning)}</p>
                <button class="secondary reveal-automation-detail" type="button" aria-expanded="false" aria-controls="automation-detail-${index}">Show details</button>
                <div class="comparison-example hidden" id="automation-detail-${index}">
                  <p><strong>Example:</strong> ${esc(item.example)}</p>
                  <p><strong>Why it matters:</strong> ${esc(item.detail)}</p>
                </div>
              </article>
            `).join("")}
          </div>
        </section>
      ` : ""}
      ${req.aiTimeline ? `
        <section class="panel interactive-timeline-section">
          <h2>${esc(req.timelineTitle || "Five-milestone timeline")}</h2>
          <p>Select each milestone to explore why it matters.</p>
          <button class="secondary reveal-timeline" type="button" aria-expanded="false" aria-controls="ai-timeline">${esc(req.timelineButtonText || "Show timeline")}</button>
          <div class="interactive-timeline hidden" id="ai-timeline">
            <div class="timeline-buttons" role="tablist" aria-label="AI timeline milestones">
              ${req.aiTimeline.map((item, index) => `
                <button class="timeline-button ${index === 0 ? "selected" : ""}" type="button" data-timeline-index="${index}" role="tab" aria-selected="${index === 0 ? "true" : "false"}">
                  <strong>${esc(item.year)}</strong>
                  <span>${esc(item.title)}</span>
                </button>
              `).join("")}
            </div>
            <article class="timeline-detail" id="timeline-detail">
              <span class="requirement-number">${esc(req.aiTimeline[0].year)}</span>
              <h3>${esc(req.aiTimeline[0].title)}</h3>
              <p>${esc(req.aiTimeline[0].detail)}</p>
            </article>
          </div>
        </section>
      ` : ""}
      ${req.videos ? `
        <section class="panel">
          <h2>Videos</h2>
          <div class="video-grid">
            ${req.videos.map((video) => `
              <article class="video-card">
                <h3>${esc(video.title)}</h3>
                <div class="video-frame">
                  <iframe src="${esc(video.embedUrl)}" title="${esc(video.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
              </article>
            `).join("")}
          </div>
        </section>
      ` : ""}
      ${req.aiTools ? `
        <section class="panel">
          <h2>Try an AI assistant</h2>
          <p>Open one of these consumer AI tools in a new tab, then use the practice prompts below. Avoid entering private information, passwords, or personal details.</p>
          <div class="tool-link-grid">
            ${req.aiTools.map((tool) => `
              <a class="tool-link-card" href="${esc(tool.url)}" target="_blank" rel="noopener">
                <strong>${esc(tool.name)}</strong>
                <span>${esc(tool.note)}</span>
              </a>
            `).join("")}
          </div>
        </section>
      ` : ""}
      ${req.promptGuidance ? `
        <section class="panel">
          <h2>What makes a strong prompt?</h2>
          <p>${esc(req.promptGuidance.source)}</p>
          <div class="prompt-guidance-grid">
            ${req.promptGuidance.ingredients.map((ingredient) => `
              <article class="prompt-guidance-card">
                <h3>${esc(ingredient.name)}</h3>
                <p>${esc(ingredient.detail)}</p>
              </article>
            `).join("")}
          </div>
          <div class="prompt-tip-grid">
            <div>
              <h3>Helpful habits</h3>
              <ul>${req.promptGuidance.tips.map((tip) => `<li>${esc(tip)}</li>`).join("")}</ul>
            </div>
            <div>
              <h3>Useful follow-up prompts</h3>
              <ul>${req.promptGuidance.followUps.map((tip) => `<li>${esc(tip)}</li>`).join("")}</ul>
            </div>
          </div>
        </section>
      ` : ""}
      ${req.promptPractice ? `
        <section class="panel">
          <h2>Prompt practice cards</h2>
          <p>Each card starts with a basic prompt. Use the button to compare it with a more detailed prompt that gives the AI clearer context, format, and expectations.</p>
          <div class="prompt-card-grid">
            ${req.promptPractice.map((prompt, index) => `
              <article class="prompt-practice-card" data-basic="${esc(prompt.basic)}" data-detailed="${esc(prompt.detailed)}">
                <h3>${esc(prompt.title)}</h3>
                <pre class="prompt-text" id="prompt-practice-${index}">${esc(prompt.basic)}</pre>
                <div class="actions">
                  <button class="secondary prompt-toggle" type="button" aria-controls="prompt-practice-${index}" aria-pressed="false">Show deeper prompt</button>
                  <button class="secondary prompt-copy" type="button">Copy prompt</button>
                </div>
              </article>
            `).join("")}
          </div>
        </section>
        <section class="panel">
          <h2>Prompt builder</h2>
          <p>Build a model-agnostic prompt by filling in the task, audience, format, and quality check.</p>
          <div class="prompt-builder">
            <label>
              Task
              <input id="builder-task" placeholder="Explain, plan, summarize, brainstorm...">
            </label>
            <label>
              Audience
              <input id="builder-audience" placeholder="A Scout, a teacher, a patrol...">
            </label>
            <label>
              Output format
              <input id="builder-format" placeholder="Bullet list, table, checklist...">
            </label>
            <label>
              Quality check
              <input id="builder-check" placeholder="Ask questions first, cite sources, list assumptions...">
            </label>
            <button id="build-prompt" type="button">Build prompt</button>
          </div>
          <pre class="prompt-text prompt-builder-output" id="builder-output">Fill in the fields, then select Build prompt.</pre>
        </section>
      ` : ""}
      ${req.careerOptions ? `
        <section class="panel">
          <h2>Career opportunities to explore</h2>
          <p>Use these cards as starting points. Scouts should research three AI or automation careers, then study one in depth or interview a professional.</p>
          <div class="career-card-grid">
            ${req.careerOptions.map((career, index) => `
              <article class="career-card">
                <h3>${esc(career.title)}</h3>
                <p>${esc(career.summary)}</p>
                <button class="secondary reveal-career-detail" type="button" aria-expanded="false" aria-controls="career-detail-${index}">Details</button>
                <div class="career-detail hidden" id="career-detail-${index}">
                  <ul>${career.details.map((detail) => `<li>${esc(detail)}</li>`).join("")}</ul>
                </div>
              </article>
            `).join("")}
          </div>
        </section>
      ` : ""}
      ${previousReq || nextReq ? `
        <section class="requirement-nav no-print">
          ${previousReq ? `<a class="button secondary" href="${link(`requirements/${previousReq.id}.html`)}">Previous requirement: ${previousReq.id}. ${esc(previousReq.title)}</a>` : "<span></span>"}
          ${nextReq ? `<a class="button" href="${link(`requirements/${nextReq.id}.html`)}">Next requirement: ${nextReq.id}. ${esc(nextReq.title)}</a>` : ""}
        </section>
      ` : ""}
    `;
    app.querySelectorAll(".reveal-example").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.getElementById(button.getAttribute("aria-controls"));
        const isHidden = target.classList.toggle("hidden");
        button.setAttribute("aria-expanded", String(!isHidden));
        button.textContent = isHidden ? "Show example" : "Hide example";
      });
    });
    app.querySelectorAll(".reveal-automation-detail").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.getElementById(button.getAttribute("aria-controls"));
        const isHidden = target.classList.toggle("hidden");
        button.setAttribute("aria-expanded", String(!isHidden));
        button.textContent = isHidden ? "Show details" : "Hide details";
      });
    });
    app.querySelectorAll(".reveal-career-detail").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.getElementById(button.getAttribute("aria-controls"));
        const isHidden = target.classList.toggle("hidden");
        button.setAttribute("aria-expanded", String(!isHidden));
        button.textContent = isHidden ? "Details" : "Hide details";
      });
    });
    const revealTimeline = app.querySelector(".reveal-timeline");
    if (revealTimeline) {
      const timeline = document.getElementById(revealTimeline.getAttribute("aria-controls"));
      const detail = document.getElementById("timeline-detail");
      const timelineItems = req.aiTimeline || [];
      revealTimeline.addEventListener("click", () => {
        const isHidden = timeline.classList.toggle("hidden");
        revealTimeline.setAttribute("aria-expanded", String(!isHidden));
        revealTimeline.textContent = isHidden ? (req.timelineButtonText || "Show timeline") : "Hide timeline";
      });
      app.querySelectorAll("[data-timeline-index]").forEach((button) => {
        button.addEventListener("click", () => {
          const index = Number(button.dataset.timelineIndex);
          const item = timelineItems[index];
          app.querySelectorAll("[data-timeline-index]").forEach((other) => {
            other.classList.toggle("selected", other === button);
            other.setAttribute("aria-selected", String(other === button));
          });
          detail.innerHTML = `
            <span class="requirement-number">${esc(item.year)}</span>
            <h3>${esc(item.title)}</h3>
            <p>${esc(item.detail)}</p>
          `;
        });
      });
    }
    app.querySelectorAll(".prompt-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".prompt-practice-card");
        const target = document.getElementById(button.getAttribute("aria-controls"));
        const showingDetailed = button.getAttribute("aria-pressed") === "true";
        target.textContent = showingDetailed ? card.dataset.basic : card.dataset.detailed;
        button.setAttribute("aria-pressed", String(!showingDetailed));
        button.textContent = showingDetailed ? "Show deeper prompt" : "Show basic prompt";
      });
    });
    app.querySelectorAll(".prompt-copy").forEach((button) => {
      button.addEventListener("click", async () => {
        const promptText = button.closest(".prompt-practice-card").querySelector(".prompt-text").textContent;
        await navigator.clipboard.writeText(promptText);
        button.textContent = "Copied";
        setTimeout(() => {
          button.textContent = "Copy prompt";
        }, 1200);
      });
    });
    const buildPromptButton = document.getElementById("build-prompt");
    if (buildPromptButton) {
      buildPromptButton.addEventListener("click", () => {
        const task = document.getElementById("builder-task").value.trim() || "help me complete this task";
        const audience = document.getElementById("builder-audience").value.trim() || "a Scout";
        const format = document.getElementById("builder-format").value.trim() || "a clear bullet list";
        const check = document.getElementById("builder-check").value.trim() || "ask clarifying questions first and explain any assumptions";
        document.getElementById("builder-output").textContent = `You are helping ${audience}. Your task is to ${task}. Provide the answer as ${format}. Before giving the final answer, ${check}. Keep the response clear, age-appropriate, and easy to verify.`;
      });
    }
  }

  async function renderAiNews() {
    app.innerHTML = `
      <section class="page-title">
        <span class="requirement-number">Current AI updates</span>
        <h1>AI News</h1>
        <p>A running list of recent AI posts and announcements from Microsoft, Anthropic, Claude, and Perplexity.</p>
      </section>
      <section class="panel">
        <h2>Latest posts</h2>
        <p id="news-status">Loading AI news...</p>
        <div class="news-source-status" id="news-source-status"></div>
        <div class="news-source-filter" id="news-source-filter"></div>
        <div class="news-list" id="news-list"></div>
      </section>
    `;

    const status = document.getElementById("news-status");
    const sourceStatus = document.getElementById("news-source-status");
    const filter = document.getElementById("news-source-filter");
    const list = document.getElementById("news-list");

    try {
      const response = await fetch(link("data/ai-news.json"), { cache: "no-store" });
      if (!response.ok) throw new Error(`Unable to load AI news (${response.status})`);
      const news = await response.json();
      const posts = Array.isArray(news.posts) ? news.posts : [];
      const sourceResults = Array.isArray(news.sources) ? news.sources : [];
      const sources = ["All", ...Array.from(new Set(posts.map((post) => post.source))).sort()];
      let activeSource = "All";

      function paint() {
        const visible = activeSource === "All" ? posts : posts.filter((post) => post.source === activeSource);
        status.textContent = `Last updated: ${news.lastUpdated ? new Date(news.lastUpdated).toLocaleString() : "not yet"} · ${visible.length} post${visible.length === 1 ? "" : "s"} shown`;
        sourceStatus.innerHTML = sourceResults.length ? sourceResults.map((source) => `
          <span class="source-status-pill ${source.ok ? "" : "source-status-warning"}">${esc(source.name)}: ${source.ok ? `${source.count} found` : "blocked"}</span>
        `).join("") : "";
        filter.innerHTML = sources.map((source) => `
          <button class="secondary ${source === activeSource ? "selected" : ""}" type="button" data-source="${esc(source)}">${esc(source)}</button>
        `).join("");
        list.innerHTML = visible.length ? visible.map((post) => `
          <article class="news-card">
            <span class="requirement-number">${esc(post.source)}</span>
            <h3><a href="${esc(post.url)}" target="_blank" rel="noopener">${esc(post.title)}</a></h3>
            <div class="news-summary">
              ${(Array.isArray(post.summaryParagraphs) && post.summaryParagraphs.length ? post.summaryParagraphs : [post.summary || "Open the post for details."]).slice(0, 3).map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
            </div>
            <time>${post.published ? new Date(post.published).toLocaleDateString() : "Date unavailable"}</time>
          </article>
        `).join("") : `<p>No posts found for this source yet.</p>`;
        filter.querySelectorAll("[data-source]").forEach((button) => {
          button.addEventListener("click", () => {
            activeSource = button.dataset.source;
            paint();
          });
        });
      }

      function renderWorksheet() {
        const worksheetId = document.body.dataset.worksheet;
        const worksheet = SITE_DATA.careerWorksheets && SITE_DATA.careerWorksheets[worksheetId];
        if (!worksheet) {
          app.innerHTML = "<p>Worksheet not found.</p>";
          return;
        }

        app.innerHTML = `
          <section class="page-title worksheet-title">
            <span class="requirement-number">Career Exploration</span>
            <h1>${esc(worksheet.title)}</h1>
            <p>${esc(worksheet.subtitle)}</p>
          </section>
          <section class="panel worksheet-panel">
            <h2>Instructions</h2>
            <ul>${worksheet.instructions.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
          </section>
          ${worksheet.sections.map((section) => `
            <section class="panel worksheet-panel">
              <h2>${esc(section.title)}</h2>
              <div class="worksheet-field-grid">
                ${section.prompts.map((prompt) => `
                  <label class="worksheet-field">
                    <span>${esc(prompt)}</span>
                    <div class="worksheet-lines" aria-hidden="true"></div>
                  </label>
                `).join("")}
              </div>
            </section>
          `).join("")}
          <section class="requirement-nav no-print">
            <a class="button secondary" href="${link("requirements/8.html")}">Back to Requirement 8</a>
          </section>
        `;
      }

      paint();
    } catch (error) {
      status.textContent = "AI news could not be loaded right now.";
      list.innerHTML = `<p>Try refreshing the page, or check the GitHub Action refresh status.</p>`;
    }
  }

  function renderAiGame() {
    let index = 0;
    let revealed = false;
    let finished = false;
    const answers = Array(SITE_DATA.aiOrNot.length).fill(null);
    const shared = {
      enabled: false,
      sessionCode: "",
      playerName: "",
      loading: false,
      showAllScores: false
    };

    app.innerHTML = `
      <section class="page-title">
        <span class="requirement-number">Requirement 2(d)</span>
        <h1>AI or Not?</h1>
        <p>Read the scenario, choose your answer, reveal the result, and use the talking points to spark discussion. The game stops after question 20 and shows a final score.</p>
      </section>
      <section class="join-game-card" aria-label="Join this game">
        <div>
          <span class="requirement-number">Join on your phone</span>
          <h2>Scan to play AI or Not?</h2>
          <p>Use this QR code to open the same game page quickly. For shared scores, everyone enters the same session code.</p>
        </div>
        <img src="${link("assets/ai-or-not-qr.png")}" alt="QR code for the AI or Not game page">
      </section>
      <section class="shared-score-panel shared-score-panel-top">
        <div>
          <span class="requirement-number">Live session</span>
          <h2>Shared scores</h2>
          <p>Enter the same session code on every device to combine scores across all Scouts.</p>
        </div>
        <div class="session-join-grid">
          <label>
            Session code
            <input id="session-code" autocomplete="off" maxlength="20" placeholder="TROOP123">
          </label>
          <label>
            Scout nickname
            <input id="player-name" autocomplete="off" maxlength="40" placeholder="First name or patrol">
          </label>
          <button class="secondary" id="join-session">Join session</button>
        </div>
        <p class="shared-status" id="shared-status"></p>
        <div class="shared-local-score" id="shared-local-score"></div>
        <div class="leaderboard" id="leaderboard"></div>
      </section>
      <section class="game-layout">
        <article class="game-card game-stage" id="game-card"></article>
        <aside class="panel game-controls">
          <h2>Answers</h2>
          <div class="choice-row vote-buttons">
            <button class="vote-button vote-ai" id="vote-ai">AI</button>
            <button class="vote-button vote-not" id="vote-not">Not AI</button>
          </div>
          <div class="answer-control-divider" aria-hidden="true"></div>
          <div class="actions answer-actions">
            <button id="reveal">Show answer</button>
            <button class="ghost" id="next">Next question</button>
          </div>
          <div class="actions">
            <button class="ghost hidden" id="restart">Restart game</button>
          </div>
        </aside>
      </section>
    `;

    const card = document.getElementById("game-card");
    const aiButton = document.getElementById("vote-ai");
    const notButton = document.getElementById("vote-not");
    const nextButton = document.getElementById("next");
    const revealButton = document.getElementById("reveal");
    const restartButton = document.getElementById("restart");
    const sessionCodeInput = document.getElementById("session-code");
    const playerNameInput = document.getElementById("player-name");
    const joinSessionButton = document.getElementById("join-session");
    const sharedStatus = document.getElementById("shared-status");
    const sharedLocalScore = document.getElementById("shared-local-score");
    const leaderboard = document.getElementById("leaderboard");

    function normalizeSessionCode(value) {
      return value.trim().toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 20);
    }

    function normalizePlayerName(value) {
      return value.trim().replace(/\s+/g, " ").slice(0, 40);
    }

    function tally() {
      const answered = answers.filter(Boolean);
      const correct = answers.reduce((total, answer, answerIndex) => {
        return total + (answer === SITE_DATA.aiOrNot[answerIndex].answer ? 1 : 0);
      }, 0);
      return {
        answered: answered.length,
        correct,
        wrong: answered.length - correct,
        unanswered: answers.length - answered.length
      };
    }

    function supabaseReady() {
      const config = getSupabaseConfig();
      return Boolean(config.url && config.anonKey);
    }

    function setSharedStatus(message, isError) {
      sharedStatus.textContent = message;
      sharedStatus.classList.toggle("error", Boolean(isError));
    }

    function updateSharedLocalScore() {
      const score = tally();
      sharedLocalScore.innerHTML = `
        <div class="shared-score-grid" aria-label="Your cumulative score">
          <div class="shared-score-tile">
            <span>Your correct</span>
            <strong>${score.correct}</strong>
          </div>
          <div class="shared-score-tile">
            <span>Your wrong</span>
            <strong>${score.wrong}</strong>
          </div>
        </div>
      `;
    }

    function answerResults() {
      return answers.map((answer, answerIndex) => {
        if (!answer) return null;
        return answer === SITE_DATA.aiOrNot[answerIndex].answer;
      });
    }

    function detectionLevel(correct) {
      if (correct >= 17) {
        return {
          title: "AI Detection Expert",
          message: "You can usually spot the difference between fixed automation and systems that learn or adapt."
        };
      }
      if (correct >= 13) {
        return {
          title: "AI Pattern Ranger",
          message: "You are strong at recognizing clues like learning, prediction, and adaptation."
        };
      }
      if (correct >= 9) {
        return {
          title: "AI Apprentice",
          message: "You are building good instincts and are ready to sharpen the tricky edge cases."
        };
      }
      if (correct >= 5) {
        return {
          title: "Pattern Spotter",
          message: "You caught some signals. Keep practicing the difference between simple rules and AI."
        };
      }
      return {
        title: "AI Explorer",
        message: "You are getting started. Review what makes AI different from basic automation."
      };
    }

    function scorePayload() {
      const score = tally();
      return {
        session_code: shared.sessionCode,
        player_name: shared.playerName,
        correct: score.correct,
        wrong: score.wrong,
        answered: score.answered,
        total: SITE_DATA.aiOrNot.length,
        percent: Math.round((score.correct / SITE_DATA.aiOrNot.length) * 100),
        answers: answerResults(),
        updated_at: new Date().toISOString()
      };
    }

    async function supabaseRequest(path, options) {
      const config = getSupabaseConfig();
      const response = await fetch(`${config.url}/rest/v1/${path}`, {
        ...options,
        headers: {
          apikey: config.anonKey,
          Authorization: `Bearer ${config.anonKey}`,
          "Content-Type": "application/json",
          ...(options && options.headers ? options.headers : {})
        }
      });
      if (!response.ok) {
        const detail = await response.text();
        throw new Error(detail || `Supabase request failed with ${response.status}`);
      }
      if (response.status === 204) return null;
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    }

    async function saveSharedScore() {
      if (!shared.enabled || shared.loading) return;
      shared.loading = true;
      try {
        await supabaseRequest("ai_or_not_scores?on_conflict=session_code,player_name", {
          method: "POST",
          headers: {
            Prefer: "resolution=merge-duplicates,return=minimal"
          },
          body: JSON.stringify([scorePayload()])
        });
        setSharedStatus(`Score saved for ${shared.playerName} in ${shared.sessionCode}.`, false);
        await refreshLeaderboard();
      } catch (error) {
        setSharedStatus("Could not save shared score. Check Supabase setup.", true);
      } finally {
        shared.loading = false;
      }
    }

    async function refreshLeaderboard() {
      if (!shared.enabled) return;
      try {
        const rows = await supabaseRequest(`ai_or_not_scores?session_code=eq.${encodeURIComponent(shared.sessionCode)}&select=correct,wrong,answered,total,percent,answers,updated_at`, {
          method: "GET"
        });
        const totalCorrect = rows.reduce((sum, row) => sum + Number(row.correct || 0), 0);
        const totalWrong = rows.reduce((sum, row) => sum + Number(row.wrong || 0), 0);
        const questionTotals = SITE_DATA.aiOrNot.map((item, itemIndex) => {
          const questionRows = rows.filter((row) => Array.isArray(row.answers) && row.answers[itemIndex] !== null && row.answers[itemIndex] !== undefined);
          const correct = questionRows.filter((row) => row.answers[itemIndex] === true).length;
          return {
            number: itemIndex + 1,
            title: item.title,
            correct,
            wrong: questionRows.length - correct,
            answered: questionRows.length
          };
        });
        const activeQuestion = questionTotals[Math.min(index, SITE_DATA.aiOrNot.length - 1)];
        leaderboard.innerHTML = rows.length ? `
          <h4>Session totals: ${esc(shared.sessionCode)}</h4>
          <div class="session-total-grid">
            <div class="session-total-tile">
              <span>Scouts joined</span>
              <strong>${rows.length}</strong>
            </div>
            <div class="session-total-tile">
              <span>Total correct</span>
              <strong>${totalCorrect}</strong>
            </div>
            <div class="session-total-tile">
              <span>Total wrong</span>
              <strong>${totalWrong}</strong>
            </div>
          </div>
          <div class="question-total-grid" aria-label="${finished && shared.showAllScores ? "Correct answers by question" : "Current question score"}">
            ${(finished && shared.showAllScores ? questionTotals : [activeQuestion]).map((question) => `
              <div class="question-total-row">
                <strong>Q${question.number}</strong>
                <span>${esc(question.title)}</span>
                <em>${question.correct} right, ${question.wrong} wrong${question.answered ? ` / ${question.answered} answered` : ""}</em>
              </div>
            `).join("")}
          </div>
          ${finished ? `<button class="secondary view-all-scores" type="button">${shared.showAllScores ? "Show current question only" : "View all question scores"}</button>` : ""}
        ` : `<p>No shared scores yet.</p>`;
        const viewAllButton = leaderboard.querySelector(".view-all-scores");
        if (viewAllButton) {
          viewAllButton.addEventListener("click", () => {
            shared.showAllScores = !shared.showAllScores;
            refreshLeaderboard();
          });
        }
      } catch (error) {
        setSharedStatus("Could not load leaderboard.", true);
      }
    }

    function paint() {
      const score = tally();
      updateSharedLocalScore();

      if (finished) {
        const percent = Math.round((score.correct / SITE_DATA.aiOrNot.length) * 100);
        const level = detectionLevel(score.correct);
        card.innerHTML = `
          <div class="score-summary">
            <div class="scenario-label">How did you do?</div>
            <h2 class="game-title">${level.title}</h2>
            <div class="final-score">${percent}%</div>
            <div class="achievement-summary">
              <strong>${score.correct} of ${SITE_DATA.aiOrNot.length} right</strong>
              <span>${score.wrong} wrong${score.unanswered ? `, ${score.unanswered} unanswered` : ""}</span>
            </div>
            <p>${level.message}</p>
            <div class="achievement-levels">
              <h3>AI detection achievement levels</h3>
              <ol>
                <li><strong>AI Explorer:</strong> 0-4 right</li>
                <li><strong>Pattern Spotter:</strong> 5-8 right</li>
                <li><strong>AI Apprentice:</strong> 9-12 right</li>
                <li><strong>AI Pattern Ranger:</strong> 13-16 right</li>
                <li><strong>AI Detection Expert:</strong> 17-20 right</li>
              </ol>
            </div>
            <div class="score-review">
              ${SITE_DATA.aiOrNot.map((item, itemIndex) => {
                const answer = answers[itemIndex];
                const isCorrect = answer === item.answer;
                const status = !answer ? "Unanswered" : isCorrect ? "Right" : "Wrong";
                return `
                  <div class="review-row ${!answer ? "unanswered" : isCorrect ? "right" : "wrong"}">
                    <strong>${itemIndex + 1}. ${esc(item.title)}</strong>
                    <span>${status}${answer ? ` - chose ${esc(answer)}` : ""}; answer: ${esc(item.answer)}</span>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        `;
        aiButton.disabled = true;
        notButton.disabled = true;
        revealButton.disabled = true;
        nextButton.disabled = true;
        restartButton.classList.remove("hidden");
        return;
      }

      const item = SITE_DATA.aiOrNot[index];
      const progress = Math.round(((index + 1) / SITE_DATA.aiOrNot.length) * 100);
      const selectedAnswer = answers[index];
      card.innerHTML = `
        <div class="game-topline">
          <div class="game-count">Round ${index + 1} of ${SITE_DATA.aiOrNot.length}</div>
          <div class="progress-track" aria-label="Game progress"><span style="width: ${progress}%"></span></div>
        </div>
        <div class="scenario-label">Scenario</div>
        <h2 class="game-title">${esc(item.title)}</h2>
        <div class="scenario">${esc(item.scenario)}</div>
        ${selectedAnswer ? `<div class="selected-answer">You chose: <strong>${esc(selectedAnswer)}</strong></div>` : ""}
        <div class="answer-box ${revealed ? "" : "hidden"}">
          <span class="answer-pill">Answer: ${esc(item.answer)}</span>
          <p><strong>Why:</strong> ${esc(item.explanation)}</p>
        </div>
      `;
      aiButton.classList.toggle("selected", selectedAnswer === "AI");
      notButton.classList.toggle("selected", selectedAnswer === "Not AI");
      aiButton.disabled = Boolean(selectedAnswer);
      notButton.disabled = Boolean(selectedAnswer);
      nextButton.textContent = index === SITE_DATA.aiOrNot.length - 1 ? "Show final score" : "Next question";
      nextButton.disabled = false;
      revealButton.disabled = false;
    }

    function choose(answer) {
      if (finished || answers[index]) return;
      answers[index] = answer;
      revealed = true;
      paint();
      saveSharedScore();
    }

    aiButton.addEventListener("click", () => choose("AI"));
    notButton.addEventListener("click", () => choose("Not AI"));
    revealButton.addEventListener("click", () => {
      if (finished) return;
      revealed = true;
      paint();
    });
    nextButton.addEventListener("click", () => {
      if (index === SITE_DATA.aiOrNot.length - 1) {
        finished = true;
        shared.showAllScores = false;
        paint();
        saveSharedScore();
        return;
      }
      index += 1;
      revealed = false;
      shared.showAllScores = false;
      aiButton.disabled = false;
      notButton.disabled = false;
      paint();
      refreshLeaderboard();
    });
    document.getElementById("restart").addEventListener("click", () => {
      index = 0;
      revealed = false;
      finished = false;
      shared.showAllScores = false;
      answers.fill(null);
      aiButton.disabled = false;
      notButton.disabled = false;
      revealButton.disabled = false;
      nextButton.disabled = false;
      restartButton.classList.add("hidden");
      paint();
      saveSharedScore();
    });

    joinSessionButton.addEventListener("click", async () => {
      const sessionCode = normalizeSessionCode(sessionCodeInput.value);
      const playerName = normalizePlayerName(playerNameInput.value);
      sessionCodeInput.value = sessionCode;
      playerNameInput.value = playerName;

      if (!supabaseReady()) {
        setSharedStatus("Shared scoring is not configured yet. Add your Supabase URL and anon key to supabase-config.js.", true);
        return;
      }
      if (!sessionCode || sessionCode.length < 3) {
        setSharedStatus("Enter a session code with at least 3 letters or numbers.", true);
        return;
      }
      if (!playerName) {
        setSharedStatus("Enter a Scout nickname before joining.", true);
        return;
      }

      shared.enabled = true;
      shared.sessionCode = sessionCode;
      shared.playerName = playerName;
      setSharedStatus(`Joined ${sessionCode}. Scores will update as you play.`, false);
      await saveSharedScore();
    });

    paint();
  }

  function renderEthicsGame() {
    let index = 0;
    let selected = "";
    let revealed = false;

    app.innerHTML = `
      <section class="page-title">
        <span class="requirement-number">Requirement 4(b)</span>
        <h1>Ethics in AI:<br>What Would You Do?</h1>
        <p>Choose a response, discuss tradeoffs, then reveal talking points. There is not always one perfect answer, which is literally the point.</p>
      </section>
      <section class="game-layout">
        <article class="game-card game-stage ethics-stage" id="ethics-card"></article>
        <aside class="panel game-controls">
          <h2>Facilitator controls</h2>
          <div class="actions">
            <button id="ethics-reveal">Show talking points</button>
            <button class="ghost" id="ethics-next">Next scenario</button>
          </div>
          <p>Ask Scouts to connect their choice to the Scout Law before revealing the talking points.</p>
        </aside>
      </section>
    `;

    const card = document.getElementById("ethics-card");

    function paint() {
      const item = SITE_DATA.ethics[index];
      const progress = Math.round(((index + 1) / SITE_DATA.ethics.length) * 100);
      card.innerHTML = `
        <div class="game-topline">
          <div class="game-count">Scenario ${index + 1} of ${SITE_DATA.ethics.length}</div>
          <div class="progress-track" aria-label="Game progress"><span style="width: ${progress}%"></span></div>
        </div>
        <div class="scenario-label">What would you do?</div>
        <h2 class="game-title">${esc(item.title)}</h2>
        <div class="scenario">${esc(item.scenario)}</div>
        <div class="choice-row ethics-choices">
          ${item.choices.map((choice) => `
            <button class="choice-card ${selected === choice ? "selected" : ""}" data-choice="${esc(choice)}">${esc(choice)}</button>
          `).join("")}
        </div>
        <div class="answer-box ${revealed ? "" : "hidden"}">
          <span class="answer-pill">Talking points</span>
          ${selected ? `<p><strong>Group choice:</strong> ${esc(selected)}</p>` : ""}
          <p>${esc(item.guide)}</p>
          <p><strong>Scout Law connections:</strong> ${item.scoutLaw.map(esc).join(", ")}</p>
          <h3>Discussion questions</h3>
          <ul>${item.discuss.map((question) => `<li>${esc(question)}</li>`).join("")}</ul>
        </div>
      `;

      card.querySelectorAll("[data-choice]").forEach((button) => {
        button.addEventListener("click", () => {
          selected = button.dataset.choice;
          paint();
        });
      });
    }

    document.getElementById("ethics-reveal").addEventListener("click", () => {
      revealed = true;
      paint();
    });
    document.getElementById("ethics-next").addEventListener("click", () => {
      index = (index + 1) % SITE_DATA.ethics.length;
      selected = "";
      revealed = false;
      paint();
    });

    paint();
  }

  renderNav();
  renderFooter();

  if (page === "home") renderHome();
  if (page === "requirement") renderRequirement();
  if (page === "ai-news") renderAiNews();
  if (page === "worksheet") renderWorksheet();
  if (page === "ai-game") renderAiGame();
  if (page === "ethics-game") renderEthicsGame();
  renderBottomPrint();
}());
