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

  function renderNav() {
    const nav = document.getElementById("site-nav");
    const items = [
      ["Home", "index.html"],
      ["Counselor Prompts", "counselor-prompts.html"],
      ["AI or Not?", "games/ai-or-not.html"],
      ["Ethics Game", "games/ethics.html"],
      ["Official Requirements", SITE_DATA.officialRequirementsUrl]
    ];
    nav.innerHTML = items.map(([label, href]) => {
      const isExternal = href.startsWith("https://");
      const target = isExternal ? " target=\"_blank\" rel=\"noopener\"" : "";
      return `<a href="${isExternal ? href : link(href)}"${target}>${label}</a>`;
    }).join("");
  }

  function renderFooter() {
    document.getElementById("site-footer").innerHTML = `
      Built for Scouting America AI Merit Badge sessions. Reference the
      <a href="${SITE_DATA.officialRequirementsUrl}" target="_blank" rel="noopener">official Scouting America requirement page</a>
      and the <a href="${SITE_DATA.counselorUrl}" target="_blank" rel="noopener">counselor resource</a>.
    `;
  }

  function renderHome() {
    app.innerHTML = `
      <section class="hero">
        <div>
          <div class="badge-row">
            <span class="badge">Scouting America</span>
            <span class="badge">Artificial Intelligence</span>
            <span class="badge">Live session ready</span>
          </div>
          <h1>Scouting America AI Merit Badge</h1>
          <p>The Artificial Intelligence merit badge introduces Scouts to AI concepts, automation, responsible use, deepfakes, practical AI skills, and career pathways. This site supports live instruction with requirement pages, counselor prompts, and interactive activities grounded in the official Scouting America requirements.</p>
          <div class="actions">
            <a class="button secondary" href="${link("counselor-prompts.html")}">Counselor Prompts</a>
            <a class="button" href="${link("games/ai-or-not.html")}">Play AI or Not?</a>
            <a class="button secondary" href="${link("games/ethics.html")}">Play Ethics Game</a>
          </div>
        </div>
        <aside class="hero-panel" aria-label="Badge overview">
          <h2>Badge overview</h2>
          <p>Scouts define key terms, identify AI and automation in everyday life, discuss ethical questions, learn how to communicate with AI tools, complete a practical activity, and explore careers that use AI or automation.</p>
          <div class="badge-row">
            <span class="badge">8 requirement pages</span>
            <span class="badge">20 AI rounds</span>
            <span class="badge">10 ethics scenarios</span>
          </div>
        </aside>
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
    if (!req) {
      app.innerHTML = "<p>Requirement not found.</p>";
      return;
    }

    app.innerHTML = `
      <section class="page-title">
        <span class="requirement-number">Requirement ${req.id}</span>
        <h1>${esc(req.title)}</h1>
        <p>${esc(req.summary)}</p>
        ${req.gameLink ? `<div class="actions"><a class="button" href="${link(req.gameLink)}">Open related game</a></div>` : ""}
      </section>
      <section class="two-column">
        <article class="panel">
          <h2>Requirement focus</h2>
          <p>${esc(req.requirement)}</p>
          <h3>Live-session activities</h3>
          <ul>${req.activities.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
        </article>
        <aside class="panel">
          <h2>Counselor prompts</h2>
          <p>Counselor prompts are grouped on one dedicated page for easier live-session facilitation.</p>
          <p><a href="${link("counselor-prompts.html")}">Open all counselor prompts</a></p>
          <p><a href="${SITE_DATA.officialRequirementsUrl}" target="_blank" rel="noopener">Check the official requirement wording</a></p>
        </aside>
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
    `;
  }

  function renderCounselorPrompts() {
    app.innerHTML = `
      <section class="page-title">
        <span class="requirement-number">Counselor resource</span>
        <h1>Counselor Prompts</h1>
        <p>All requirement prompts are organized here so a counselor can facilitate discussion without jumping between individual requirement pages.</p>
      </section>
      <section class="grid" aria-label="Counselor prompts by requirement">
        ${SITE_DATA.requirements.map((req) => `
          <article class="card prompt-card">
            <span class="requirement-number">Requirement ${req.id}</span>
            <h2>${esc(req.title)}</h2>
            <p>${esc(req.counselorPrompt)}</p>
            <a href="${link(`requirements/${req.id}.html`)}">Open requirement ${req.id}</a>
          </article>
        `).join("")}
      </section>
    `;
  }

  function renderAiGame() {
    let index = 0;
    let revealed = false;
    let aiVotes = 0;
    let notVotes = 0;

    app.innerHTML = `
      <section class="page-title">
        <span class="requirement-number">Requirement 2(d)</span>
        <h1>AI or Not?</h1>
        <p>Read the scenario aloud, let Scouts vote, then reveal the answer and discussion prompts. Requirement asks for ten rounds; this deck includes twenty.</p>
      </section>
      <section class="game-layout">
        <article class="game-card" id="game-card"></article>
        <aside class="panel">
          <h2>Facilitator controls</h2>
          <div class="choice-row">
            <button class="secondary" id="vote-ai">Vote AI</button>
            <button class="secondary" id="vote-not">Vote Not AI</button>
          </div>
          <div class="scoreboard">
            <div class="score-item"><span>AI votes</span><strong id="ai-votes">0</strong></div>
            <div class="score-item"><span>Not AI votes</span><strong id="not-votes">0</strong></div>
          </div>
          <div class="actions">
            <button id="reveal">Show answer</button>
            <button class="ghost" id="next">Next question</button>
            <button class="ghost" id="reset">Reset votes</button>
          </div>
        </aside>
      </section>
    `;

    const card = document.getElementById("game-card");
    const aiVote = document.getElementById("ai-votes");
    const notVote = document.getElementById("not-votes");

    function paint() {
      const item = SITE_DATA.aiOrNot[index];
      card.innerHTML = `
        <div class="game-count">Round ${index + 1} of ${SITE_DATA.aiOrNot.length}</div>
        <h2>${esc(item.title)}</h2>
        <div class="scenario">${esc(item.scenario)}</div>
        <div class="answer-box ${revealed ? "" : "hidden"}">
          <span class="answer-pill">${esc(item.answer)}</span>
          <p>${esc(item.explanation)}</p>
          <h3>Discuss</h3>
          <ul>${item.discuss.map((question) => `<li>${esc(question)}</li>`).join("")}</ul>
        </div>
      `;
      aiVote.textContent = aiVotes;
      notVote.textContent = notVotes;
    }

    document.getElementById("vote-ai").addEventListener("click", () => {
      aiVotes += 1;
      paint();
    });
    document.getElementById("vote-not").addEventListener("click", () => {
      notVotes += 1;
      paint();
    });
    document.getElementById("reveal").addEventListener("click", () => {
      revealed = true;
      paint();
    });
    document.getElementById("next").addEventListener("click", () => {
      index = (index + 1) % SITE_DATA.aiOrNot.length;
      revealed = false;
      aiVotes = 0;
      notVotes = 0;
      paint();
    });
    document.getElementById("reset").addEventListener("click", () => {
      aiVotes = 0;
      notVotes = 0;
      paint();
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
        <h1>Ethics in AI: What Would You Do?</h1>
        <p>Choose a response, discuss tradeoffs, then reveal the counselor guide. There is not always one perfect answer, which is literally the point.</p>
      </section>
      <section class="game-layout">
        <article class="game-card" id="ethics-card"></article>
        <aside class="panel">
          <h2>Facilitator controls</h2>
          <div class="actions">
            <button id="ethics-reveal">Show guide</button>
            <button class="ghost" id="ethics-next">Next scenario</button>
          </div>
          <p>Ask Scouts to connect their choice to the Scout Law before revealing the guide.</p>
        </aside>
      </section>
    `;

    const card = document.getElementById("ethics-card");

    function paint() {
      const item = SITE_DATA.ethics[index];
      card.innerHTML = `
        <div class="game-count">Scenario ${index + 1} of ${SITE_DATA.ethics.length}</div>
        <h2>${esc(item.title)}</h2>
        <div class="scenario">${esc(item.scenario)}</div>
        <div class="choice-row">
          ${item.choices.map((choice) => `
            <button class="${selected === choice ? "" : "secondary"}" data-choice="${esc(choice)}">${esc(choice)}</button>
          `).join("")}
        </div>
        <div class="answer-box ${revealed ? "" : "hidden"}">
          <span class="answer-pill">Discussion guide</span>
          ${selected ? `<p><strong>Group choice:</strong> ${esc(selected)}</p>` : ""}
          <p>${esc(item.guide)}</p>
          <p><strong>Scout Law connections:</strong> ${item.scoutLaw.map(esc).join(", ")}</p>
          <h3>Discuss</h3>
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
  if (page === "counselor-prompts") renderCounselorPrompts();
  if (page === "ai-game") renderAiGame();
  if (page === "ethics-game") renderEthicsGame();
}());
