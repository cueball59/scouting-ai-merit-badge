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
    if (page !== "ai-game" && page !== "ethics-game") {
      nav.insertAdjacentHTML("beforeend", `<button class="nav-print no-print" type="button">Print page</button>`);
      nav.querySelector(".nav-print").addEventListener("click", () => window.print());
    }
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
          <p>The Artificial Intelligence merit badge introduces Scouts to AI concepts, automation, responsible use, deepfakes, practical AI skills, and career pathways. This site supports live instruction with requirement pages, counselor prompts, and interactive activities grounded in the official Scouting America requirements.</p>
          <div class="actions">
            <a class="button secondary" href="${link("counselor-prompts.html")}">Counselor Prompts</a>
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
        ${req.gameLink ? `<div class="actions"><a class="button" href="${link(req.gameLink)}">Open related game</a></div>` : ""}
      </section>
      <section class="panel">
        <h2>Requirement focus</h2>
        <p>${esc(req.requirement)}</p>
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
            ${req.aiComparison.map((item) => `
              <article class="comparison-card">
                <h3>${esc(item.type)}</h3>
                <p>${esc(item.meaning)}</p>
                <p><strong>Status:</strong> ${esc(item.today)}</p>
                <p><strong>Example:</strong> ${esc(item.example)}</p>
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
  }

  function renderCounselorPrompts() {
    app.innerHTML = `
      <section class="page-title">
        <span class="requirement-number">Facilitator prompts</span>
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
    let finished = false;
    const answers = Array(SITE_DATA.aiOrNot.length).fill(null);
    const shared = {
      enabled: false,
      sessionCode: "",
      playerName: "",
      loading: false
    };

    app.innerHTML = `
      <section class="page-title">
        <span class="requirement-number">Requirement 2(d)</span>
        <h1>AI or Not?</h1>
        <p>Read the scenario, choose the group answer, reveal the result, and use the talking points to spark discussion. The game stops after question 20 and shows a final score.</p>
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
          <div class="actions answer-actions">
            <button id="reveal">Show answer</button>
            <button class="ghost" id="next">Next question</button>
          </div>
          <div class="actions">
            <button class="ghost" id="restart">Restart game</button>
          </div>
        </aside>
      </section>
    `;

    const card = document.getElementById("game-card");
    const aiButton = document.getElementById("vote-ai");
    const notButton = document.getElementById("vote-not");
    const nextButton = document.getElementById("next");
    const revealButton = document.getElementById("reveal");
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
        const rows = await supabaseRequest(`ai_or_not_scores?session_code=eq.${encodeURIComponent(shared.sessionCode)}&select=correct,wrong,answered,total,percent,updated_at`, {
          method: "GET"
        });
        leaderboard.innerHTML = rows.length ? `
          <h4>Session totals: ${esc(shared.sessionCode)}</h4>
          <div class="session-total-grid">
            <div class="session-total-tile">
              <span>Scouts joined</span>
              <strong>${rows.length}</strong>
            </div>
            <div class="session-total-tile">
              <span>Total correct</span>
              <strong>${rows.reduce((sum, row) => sum + Number(row.correct || 0), 0)}</strong>
            </div>
            <div class="session-total-tile">
              <span>Total wrong</span>
              <strong>${rows.reduce((sum, row) => sum + Number(row.wrong || 0), 0)}</strong>
            </div>
          </div>
        ` : `<p>No shared scores yet.</p>`;
      } catch (error) {
        setSharedStatus("Could not load leaderboard.", true);
      }
    }

    function paint() {
      const score = tally();
      updateSharedLocalScore();

      if (finished) {
        const percent = Math.round((score.correct / SITE_DATA.aiOrNot.length) * 100);
        card.innerHTML = `
          <div class="score-summary">
            <div class="scenario-label">Final score</div>
            <h2 class="game-title">${score.correct} right, ${score.wrong} wrong</h2>
            <div class="final-score">${percent}%</div>
            <p>${score.unanswered ? `${score.unanswered} question${score.unanswered === 1 ? "" : "s"} unanswered.` : "All 20 questions answered."}</p>
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
        ${selectedAnswer ? `<div class="selected-answer">Group chose: <strong>${esc(selectedAnswer)}</strong></div>` : ""}
        <div class="answer-box ${revealed ? "" : "hidden"}">
          <span class="answer-pill">${selectedAnswer ? (selectedAnswer === item.answer ? "Correct" : "Wrong") : "Answer"}: ${esc(item.answer)}</span>
        </div>
      `;
      aiButton.classList.toggle("selected", selectedAnswer === "AI");
      notButton.classList.toggle("selected", selectedAnswer === "Not AI");
      nextButton.textContent = index === SITE_DATA.aiOrNot.length - 1 ? "Show final score" : "Next question";
      nextButton.disabled = false;
      revealButton.disabled = false;
    }

    function choose(answer) {
      if (finished) return;
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
        paint();
        saveSharedScore();
        return;
      }
      index += 1;
      revealed = false;
      paint();
    });
    document.getElementById("restart").addEventListener("click", () => {
      index = 0;
      revealed = false;
      finished = false;
      answers.fill(null);
      aiButton.disabled = false;
      notButton.disabled = false;
      revealButton.disabled = false;
      nextButton.disabled = false;
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
  if (page === "counselor-prompts") renderCounselorPrompts();
  if (page === "ai-game") renderAiGame();
  if (page === "ethics-game") renderEthicsGame();
}());
