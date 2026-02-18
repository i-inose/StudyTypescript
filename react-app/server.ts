// ============================================================
// server.ts ― Express によるバックエンド API サーバー
// React アプリのデータ永続化と CRUD 操作を提供する
// ============================================================

// --------------------------------------------------
// モジュールのインポート
// --------------------------------------------------
import express from "express";  // Express: Node.js の Web フレームワーク
import cors from "cors";        // CORS: 異なるオリジン（ポート）間の通信を許可するミドルウェア

// Express アプリケーションのインスタンスを作成する
const app = express();

// サーバーのポート番号（React の Vite 開発サーバーとは別のポートを使う）
const PORT = 3001;

// --------------------------------------------------
// ミドルウェアの設定
// ミドルウェア = リクエストとレスポンスの間に挟まる処理
// --------------------------------------------------

// CORS を有効にする
// React（localhost:5173）から Express（localhost:3001）への通信を許可する
app.use(cors());

// JSON リクエストボディを自動でパースするミドルウェア
// これがないと req.body が undefined になる
app.use(express.json());

// --------------------------------------------------
// タスクの型定義（フロントエンドと同じ構造）
// --------------------------------------------------
interface Task {
  id: number;
  title: string;
  done: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
}

// --------------------------------------------------
// インメモリデータストア（簡易的なデータベース代わり）
// 本番環境では PostgreSQL や MongoDB などの DB を使う
// --------------------------------------------------
let tasks: Task[] = [
  {
    id: 1,
    title: "React の基礎を学ぶ",
    done: false,
    priority: "high",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "TypeScript の型定義を理解する",
    done: true,
    priority: "high",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Express で API を作る",
    done: false,
    priority: "medium",
    createdAt: new Date().toISOString(),
  },
];

// 次に振る ID（自動インクリメント）
let nextId = 4;

// --------------------------------------------------
// API エンドポイントの定義
// REST API の基本: GET=取得, POST=作成, PATCH=部分更新, DELETE=削除
// --------------------------------------------------

// GET /api/tasks ― 全タスクを取得する
app.get("/api/tasks", (_req, res) => {
  // _req: リクエストオブジェクト（今回は使わないので _ をつける慣習）
  // res: レスポンスオブジェクト

  // JSON 形式でレスポンスを返す
  res.json({
    data: tasks,
    message: "タスク一覧を取得しました",
  });
});

// POST /api/tasks ― 新しいタスクを作成する
app.post("/api/tasks", (req, res) => {
  // リクエストボディから title と priority を取り出す（分割代入）
  const { title, priority } = req.body;

  // バリデーション: title が空なら 400 エラーを返す
  if (!title || typeof title !== "string" || title.trim() === "") {
    // 400 = Bad Request（クライアント側のエラー）
    res.status(400).json({ data: null, message: "タイトルは必須です" });
    return;
  }

  // 新しいタスクオブジェクトを作成する
  const newTask: Task = {
    id: nextId++,                          // ID を自動採番してインクリメント
    title: title.trim(),                   // 前後の空白を除去
    done: false,                           // 新規タスクは未完了
    priority: priority || "medium",        // 優先度の指定がなければ "medium"
    createdAt: new Date().toISOString(),   // 現在日時を ISO 形式で記録
  };

  // 配列に追加する
  tasks.push(newTask);

  // 201 = Created（リソースの作成成功）
  res.status(201).json({
    data: newTask,
    message: "タスクを作成しました",
  });
});

// PATCH /api/tasks/:id/toggle ― タスクの完了状態を切り替える
app.patch("/api/tasks/:id/toggle", (req, res) => {
  // URL パラメータから id を取得する（:id の部分）
  const id = parseInt(req.params.id, 10);

  // 該当するタスクを検索する
  const task = tasks.find((t) => t.id === id);

  // 見つからなければ 404 エラー
  if (!task) {
    // 404 = Not Found（リソースが見つからない）
    res.status(404).json({ data: null, message: "タスクが見つかりません" });
    return;
  }

  // done の値を反転させる（true → false, false → true）
  task.done = !task.done;

  res.json({
    data: task,
    message: `タスクを${task.done ? "完了" : "未完了"}にしました`,
  });
});

// DELETE /api/tasks/:id ― タスクを削除する
app.delete("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  // 削除前の配列長を記録
  const before = tasks.length;

  // filter で該当 ID 以外のタスクだけ残す（イミュータブルな削除）
  tasks = tasks.filter((t) => t.id !== id);

  // 配列長が変わっていなければ、削除対象が見つからなかった
  if (tasks.length === before) {
    res.status(404).json({ data: null, message: "タスクが見つかりません" });
    return;
  }

  // 204 = No Content（成功したがレスポンスボディなし）
  res.status(204).send();
});

// --------------------------------------------------
// サーバーを起動する
// --------------------------------------------------
app.listen(PORT, () => {
  console.log(`API サーバーが http://localhost:${PORT} で起動しました`);
});
