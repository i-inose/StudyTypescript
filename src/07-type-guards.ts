// ============================================================
// 07-type-guards.ts
// 型ガードと型の絞り込み ― React で安全にデータを扱うための技術
// ============================================================

import type { Task, BaseTask } from "./02-interface-and-type";

// --------------------------------------------------
// 1. typeof による型ガード
// --------------------------------------------------

// typeof: JavaScript のプリミティブ型を判定する演算子
// TypeScript はこの判定結果を元に、ブロック内の型を自動で絞り込む

function formatValue(value: string | number | boolean): string {
  // typeof で型をチェックすると、各ブロック内で型が確定する
  if (typeof value === "string") {
    // ここでは value は string 型として扱える
    return `文字列: "${value.toUpperCase()}"`;
  }
  if (typeof value === "number") {
    // ここでは value は number 型として扱える
    return `数値: ${value.toFixed(2)}`;
  }
  // ここに到達するのは boolean の場合だけ
  return `真偽値: ${value ? "はい" : "いいえ"}`;
}

// --------------------------------------------------
// 2. instanceof による型ガード
// --------------------------------------------------

// instanceof: オブジェクトがどのクラスのインスタンスかを判定する
// React ではエラーハンドリングで使うことが多い

class TaskNotFoundError extends Error {
  taskId: number;
  constructor(taskId: number) {
    super(`タスク(ID: ${taskId})が見つかりません`);
    this.taskId = taskId;
  }
}

class TaskPermissionError extends Error {
  userId: string;
  constructor(userId: string) {
    super(`ユーザー「${userId}」にはタスク操作の権限がありません`);
    this.userId = userId;
  }
}

function handleError(error: Error): string {
  // instanceof で具体的なエラークラスを判定する
  if (error instanceof TaskNotFoundError) {
    // ここでは error は TaskNotFoundError 型 → taskId にアクセスできる
    return `タスク検索エラー: ID=${error.taskId} が存在しません`;
  }
  if (error instanceof TaskPermissionError) {
    // ここでは error は TaskPermissionError 型 → userId にアクセスできる
    return `権限エラー: ユーザー=${error.userId}`;
  }
  // どちらでもない一般的なエラー
  return `予期しないエラー: ${error.message}`;
}

// --------------------------------------------------
// 3. in 演算子による型ガード
// --------------------------------------------------

// "プロパティ名" in オブジェクト: オブジェクトが特定のプロパティを持つか判定
// React ではユニオン型のオブジェクトを区別するのに使う

// 通知の種類をユニオン型で定義
interface EmailNotification {
  email: string;           // メールアドレスを持つ
  subject: string;
}

interface PushNotification {
  deviceToken: string;     // デバイストークンを持つ
  title: string;
}

type Notification = EmailNotification | PushNotification;

function sendNotification(notification: Notification): string {
  // "email" プロパティを持っているかで判別する
  if ("email" in notification) {
    // ここでは notification は EmailNotification 型
    return `メール送信: ${notification.email} - ${notification.subject}`;
  }
  // ここでは notification は PushNotification 型
  return `プッシュ通知: ${notification.deviceToken} - ${notification.title}`;
}

// --------------------------------------------------
// 4. カスタム型ガード（ユーザー定義型ガード）
// --------------------------------------------------

// is キーワードを使って、独自の型判定関数を作れる
// 戻り値が「引数 is 型」の形になる特殊な関数

// Task型かどうかを判定するカスタム型ガード
function isTask(value: unknown): value is Task {
  // value is Task → この関数が true を返したら、value は Task 型として扱える
  return (
    typeof value === "object" &&  // オブジェクトであること
    value !== null &&             // null でないこと
    "id" in value &&              // id プロパティを持つこと
    "title" in value &&           // title プロパティを持つこと
    "done" in value               // done プロパティを持つこと
  );
}

// カスタム型ガードの使用例
function processApiData(data: unknown): string {
  // isTask が true を返すと、data は Task 型に絞り込まれる
  if (isTask(data)) {
    // ここでは data は Task 型 → id, title, done にアクセスできる
    return `タスク: #${data.id} ${data.title} (${data.done ? "完了" : "未完了"})`;
  }
  return "不明なデータ形式です";
}

// 配列から特定の型だけを抽出するのにも使える
function filterTasks(items: unknown[]): Task[] {
  // filter + 型ガードで、Task型の要素だけを抽出する
  return items.filter(isTask);
}

// --------------------------------------------------
// 5. null / undefined チェックによる絞り込み
// --------------------------------------------------

// React では「データがまだ読み込まれていない（null）」状態が頻出

interface UserProfile {
  name: string;
  avatar: string | null;     // アバターは設定されていない場合 null
}

function getAvatarUrl(profile: UserProfile): string {
  // null チェックで型を絞り込む
  if (profile.avatar !== null) {
    // ここでは profile.avatar は string 型（null が除外された）
    return profile.avatar;
  }
  return "/default-avatar.png";
}

// オプショナルチェイニング（?.）も型の絞り込みに使える
interface TaskDetail {
  task: Task;
  assignee?: UserProfile;    // 担当者は未設定の場合 undefined
}

function getAssigneeName(detail: TaskDetail): string {
  // ?. で安全にアクセス（undefined の場合は undefined を返す）
  const name = detail.assignee?.name;

  // Null合体演算子（??）で undefined/null の場合のデフォルト値を指定
  return name ?? "未割り当て";
}

// --------------------------------------------------
// 6. 型アサーション（as）
// --------------------------------------------------

// as: 「この値はこの型だ」とコンパイラに明示する
// 型ガードで絞り込めない場合の最終手段（多用は避ける）

// React では DOM 要素を取得するときに使うことがある
// 例: const input = document.getElementById("name") as HTMLInputElement;

// 安全な型アサーションの例
function parseTaskFromJson(json: string): Task {
  // JSON.parse は any を返すので、型アサーションが必要
  const parsed = JSON.parse(json) as Task;
  return parsed;
}

// 非nullアサーション演算子（!）
// 「この値は null/undefined ではない」とコンパイラに伝える
function getTaskTitle(tasks: Task[], id: number): string {
  const task = tasks.find((t) => t.id === id);
  // task は Task | undefined だが、存在が確実な場合に ! を使う
  // ※ 安全のため、なるべく if チェックの方を使うこと
  // return task!.title;  // ← 非nullアサーション（危険な場合がある）

  // 推奨: if チェックで安全に処理する
  if (task) {
    return task.title;
  }
  return "不明なタスク";
}

// --------------------------------------------------
// 確認用のエクスポート
// --------------------------------------------------
export {
  formatValue,
  handleError,
  sendNotification,
  isTask,
  processApiData,
  filterTasks,
  getAvatarUrl,
  getAssigneeName,
  parseTaskFromJson,
  TaskNotFoundError,
  TaskPermissionError,
};
