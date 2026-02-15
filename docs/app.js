// ============================================================
// app.js
// ブラウザ版テストのアプリケーションロジック
// ============================================================

// --- テストユーティリティ ---

function assertEqual(actual, expected, msg) {
  if (actual !== expected) {
    throw new Error(msg || `期待値: ${JSON.stringify(expected)}, 実際の値: ${JSON.stringify(actual)}`);
  }
}

function assertDeepEqual(actual, expected, msg) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(msg || `期待値: ${JSON.stringify(expected)}, 実際の値: ${JSON.stringify(actual)}`);
  }
}

function assertIncludes(str, substr, msg) {
  if (!str.includes(substr)) {
    throw new Error(msg || `"${substr}" が含まれていません`);
  }
}

// ユーザーコードを安全に実行して変数/関数を取り出す
function runUserCode(code, varName) {
  const wrapped = `${code}\nreturn typeof ${varName} !== 'undefined' ? ${varName} : undefined;`;
  try {
    const fn = new Function(wrapped);
    return fn();
  } catch (e) {
    throw new Error(`コードの実行エラー: ${e.message}`);
  }
}

// --- 状態管理 ---

const STORAGE_KEY = "ts-test-answers";
let currentChapter = 0;
let answers = {}; // { questionId: code }
let results = {}; // { questionId: "correct" | "wrong" | "pending" }

function loadAnswers() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) answers = JSON.parse(saved);
  } catch {}
}

function saveAnswers() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {}
}

// --- レンダリング ---

function renderChapterNav() {
  const nav = document.getElementById("chapter-nav");
  nav.innerHTML = "";

  ALL_CHAPTERS.forEach((ch, i) => {
    const btn = document.createElement("button");
    const chCorrect = ch.questions.filter(q => results[q.id] === "correct").length;
    const allDone = chCorrect === ch.questions.length;

    btn.textContent = ch.title.replace("章:", "").trim();
    btn.className = (i === currentChapter ? "active " : "") + (allDone ? "done" : "");
    btn.onclick = () => {
      currentChapter = i;
      renderChapterNav();
      renderQuestions();
    };
    nav.appendChild(btn);
  });
}

function renderQuestions() {
  const main = document.getElementById("main-content");
  const chapter = ALL_CHAPTERS[currentChapter];

  let html = `<h2 style="margin-bottom:16px;font-size:18px;">${chapter.title}</h2>`;

  chapter.questions.forEach((q) => {
    const code = answers[q.id] || q.initial;
    const status = results[q.id] || "pending";
    const badgeClass = status;
    const badgeText = status === "correct" ? "正解" : status === "wrong" ? "不正解" : "未回答";

    html += `
      <div class="question-card" id="card-${q.id}">
        <div class="question-header">
          <h3>${q.title}</h3>
          <span class="badge ${badgeClass}" id="badge-${q.id}">${badgeText}</span>
        </div>
        <div class="question-body">
          <p>${q.description.replace(/\n/g, "<br>")}</p>
          <textarea
            class="code-editor"
            id="editor-${q.id}"
            spellcheck="false"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
          >${escapeHtml(code)}</textarea>
        </div>
        <div class="question-footer">
          <button class="btn btn-hint" onclick="showHint('${q.id}')">ヒント</button>
          <button class="btn btn-run" onclick="runQuestion('${q.id}')">実行して判定</button>
        </div>
        <div class="hint-area hidden" id="hint-${q.id}" style="padding:4px 16px 12px;font-size:13px;color:#a08eff;">
          💡 ${escapeHtml(q.hint)}
        </div>
        <div class="result-message hidden" id="result-${q.id}"></div>
      </div>
    `;
  });

  // 章のサマリー
  const chCorrect = chapter.questions.filter(q => results[q.id] === "correct").length;
  html += `
    <div class="summary-section">
      <h2>この章の結果: ${chCorrect} / ${chapter.questions.length}</h2>
      ${chCorrect === chapter.questions.length
        ? "<p style='color:var(--correct);font-size:18px;margin-top:8px;'>全問正解！</p>"
        : `<p style='color:var(--text-muted);margin-top:8px;'>あと ${chapter.questions.length - chCorrect} 問</p>`
      }
    </div>
  `;

  main.innerHTML = html;

  // Tab キーサポート
  chapter.questions.forEach((q) => {
    const editor = document.getElementById(`editor-${q.id}`);
    editor.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start) + "  " + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 2;
      }
    });
  });
}

function updateScoreBar() {
  const totalCorrect = Object.values(results).filter(r => r === "correct").length;
  const totalQuestions = ALL_CHAPTERS.reduce((sum, ch) => sum + ch.questions.length, 0);
  document.getElementById("total-correct").textContent = totalCorrect;
  document.getElementById("total-questions").textContent = totalQuestions;
}

// --- アクション ---

async function runQuestion(qId) {
  const chapter = ALL_CHAPTERS[currentChapter];
  const question = chapter.questions.find(q => q.id === qId);
  if (!question) return;

  const editor = document.getElementById(`editor-${qId}`);
  const badge = document.getElementById(`badge-${qId}`);
  const resultDiv = document.getElementById(`result-${qId}`);
  const code = editor.value;

  answers[qId] = code;
  saveAnswers();

  try {
    const testResult = question.test(code);
    // async テストをサポート
    if (testResult instanceof Promise) {
      await testResult;
    }
    results[qId] = "correct";
    badge.className = "badge correct";
    badge.textContent = "正解";
    resultDiv.className = "result-message correct";
    resultDiv.textContent = "✅ 正解！";
  } catch (e) {
    results[qId] = "wrong";
    badge.className = "badge wrong";
    badge.textContent = "不正解";
    resultDiv.className = "result-message wrong";
    resultDiv.textContent = `❌ ${e.message}`;
  }

  resultDiv.classList.remove("hidden");
  updateScoreBar();
  renderChapterNav();
}

function showHint(qId) {
  const hint = document.getElementById(`hint-${qId}`);
  hint.classList.toggle("hidden");
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// --- 初期化 ---

loadAnswers();
renderChapterNav();
renderQuestions();
updateScoreBar();
