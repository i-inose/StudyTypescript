// ============================================================
// 04-functions.ts
// 関数の型定義 ― React のイベントハンドラ・コールバックに必須
// ============================================================

import type { Task, Priority } from "./02-interface-and-type";

// --------------------------------------------------
// 1. 関数の基本的な型定義
// --------------------------------------------------

// 引数と戻り値に型をつける
function createTask(id: number, title: string): Task {
  // Task型のオブジェクトを返す
  return {
    id,        // id: id の省略記法（プロパティ名と変数名が同じとき）
    title,     // title: title の省略記法
    done: false,
  };
}

// --------------------------------------------------
// 2. アロー関数の型定義
// --------------------------------------------------

// React ではアロー関数をよく使う（コンポーネント定義やイベントハンドラ）
const createTaskArrow = (id: number, title: string): Task => {
  return { id, title, done: false };
};

// 1行で書ける場合は {} と return を省略できる
const createTaskShort = (id: number, title: string): Task => ({
  id,
  title,
  done: false,
});
// ↑ オブジェクトリテラルを返すときは () で囲む必要がある

// --------------------------------------------------
// 3. オプショナル引数とデフォルト引数
// --------------------------------------------------

// ? をつけるとオプショナル引数になる（渡さなくてもOK）
function formatTaskTitle(title: string, prefix?: string): string {
  // prefix が渡されていない場合は undefined になる
  if (prefix) {
    return `${prefix} ${title}`;
  }
  return title;
}

// デフォルト引数: 値が渡されなかった場合のデフォルト値を指定
function formatTaskWithDefault(title: string, prefix: string = "□"): string {
  return `${prefix} ${title}`;
}

// 使用例
const formatted1 = formatTaskTitle("買い物");              // "買い物"
const formatted2 = formatTaskTitle("買い物", "★");         // "★ 買い物"
const formatted3 = formatTaskWithDefault("買い物");         // "□ 買い物"
const formatted4 = formatTaskWithDefault("買い物", "✓");   // "✓ 買い物"

// --------------------------------------------------
// 4. レストパラメータ（...rest）
// --------------------------------------------------

// ...（スプレッド構文）を使って可変長の引数を受け取る
function addMultipleTasks(baseTasks: Task[], ...newTitles: string[]): Task[] {
  // newTitles は string[] として扱える
  const maxId = baseTasks.reduce((max, t) => Math.max(max, t.id), 0);
  // ↑ reduce: 配列を1つの値にまとめる。ここでは最大IDを求めている

  const newTasks: Task[] = newTitles.map((title, index) => ({
    // map: 配列の各要素を変換して新しい配列を作る
    id: maxId + index + 1,
    title,
    done: false,
  }));

  // スプレッド構文で既存配列と新しい配列を結合して返す
  return [...baseTasks, ...newTasks];
}

// --------------------------------------------------
// 5. コールバック関数の型
// --------------------------------------------------

// 関数を引数として受け取る（コールバックパターン）
// React では onClick, onChange などのイベントハンドラがこのパターン

// 型を直接書く方法
function filterTasks(
  tasks: Task[],
  predicate: (task: Task) => boolean  // ← 関数型を引数の型として定義
): Task[] {
  return tasks.filter(predicate);
}

// 使用例: 完了していないタスクだけ抽出する
const allTasks: Task[] = [
  { id: 1, title: "買い物", done: true },
  { id: 2, title: "掃除", done: false },
  { id: 3, title: "勉強", done: false },
];
const incompleteTasks = filterTasks(allTasks, (task) => !task.done);
// ↑ task の型は自動推論される（Task型）

// --------------------------------------------------
// 6. 関数型の型エイリアス
// --------------------------------------------------

// 関数の型に名前をつけておくと再利用しやすい
// React の Props で「イベントハンドラの型」を定義するのによく使う

// タスクIDを受け取って何も返さない関数の型（クリックハンドラなど）
type OnTaskClick = (taskId: number) => void;

// タスクIDとフィールド名と値を受け取る関数の型（フォーム更新など）
type OnTaskUpdate = (taskId: number, field: string, value: string) => void;

// タスクの配列を並び替える関数の型
type TaskSorter = (tasks: Task[]) => Task[];

// 型エイリアスを使ってハンドラを定義
const handleTaskClick: OnTaskClick = (taskId) => {
  console.log(`タスク ${taskId} がクリックされました`);
};

// 並び替え関数の例
const sortByTitle: TaskSorter = (tasks) => {
  // スプレッドで元の配列をコピーしてからソート（元の配列を変更しない）
  return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
};

// --------------------------------------------------
// 7. オーバーロード（関数の多重定義）
// --------------------------------------------------

// 同じ関数名で、引数の型によって戻り値の型が変わる定義
// React ではライブラリ内部で使われていることが多い

// オーバーロードシグネチャ: 「この引数のときはこの戻り値」を宣言
function findTask(tasks: Task[], id: number): Task | undefined;
function findTask(tasks: Task[], title: string): Task[];

// 実装シグネチャ: 実際の処理を書く
function findTask(
  tasks: Task[],
  idOrTitle: number | string
): Task | undefined | Task[] {
  if (typeof idOrTitle === "number") {
    // number が渡された場合 → IDで検索して1件返す
    return tasks.find((t) => t.id === idOrTitle);
  } else {
    // string が渡された場合 → タイトルで部分一致検索して配列を返す
    return tasks.filter((t) => t.title.includes(idOrTitle));
  }
}

// 使用例
const foundById = findTask(allTasks, 1);          // 戻り値: Task | undefined
const foundByTitle = findTask(allTasks, "買");     // 戻り値: Task[]

// --------------------------------------------------
// 8. 関数のジェネリクス（プレビュー ― 05で詳しく解説）
// --------------------------------------------------

// <T> を使うと、呼び出し時に型が決まる柔軟な関数が作れる
// React の useState<T> がまさにこのパターン
function getFirst<T>(items: T[]): T | undefined {
  // T は呼び出し時に具体的な型に置き換わる
  return items[0];
}

const firstTask = getFirst<Task>(allTasks);          // Task | undefined
const firstNumber = getFirst([10, 20, 30]);          // number | undefined（型推論）
const firstString = getFirst(["a", "b", "c"]);      // string | undefined（型推論）

// --------------------------------------------------
// 確認用のエクスポート
// --------------------------------------------------
export {
  createTask,
  createTaskArrow,
  formatTaskTitle,
  formatTaskWithDefault,
  addMultipleTasks,
  filterTasks,
  handleTaskClick,
  sortByTitle,
  findTask,
  getFirst,
  allTasks,
};
export type { OnTaskClick, OnTaskUpdate, TaskSorter };
