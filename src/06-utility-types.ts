// ============================================================
// 06-utility-types.ts
// ユーティリティ型 ― TypeScript が標準提供する便利な型変換ツール
// ============================================================

import type { Task, TaskWithOptions, Priority } from "./02-interface-and-type";
import type { TaskStatus } from "./03-union-and-literal";

// --------------------------------------------------
// 1. Partial<T> ― 全プロパティをオプショナルにする
// --------------------------------------------------

// Partial<T>: T の全プロパティに ? をつけた型を作る
// React で state の部分更新をするときに頻出

type PartialTask = Partial<Task>;
// ↑ これは以下と同じ意味:
// {
//   id?: number;
//   title?: string;
//   done?: boolean;
// }

// 部分更新の関数で使う（React の setState に似たパターン）
function updateTask(task: Task, updates: Partial<Task>): Task {
  // スプレッド構文で既存の値と更新値をマージする
  return { ...task, ...updates };
}

const originalTask: Task = { id: 1, title: "買い物", done: false };
const updatedTask = updateTask(originalTask, { done: true });
// ↑ title を指定しなくてもOK（Partial なので全て省略可能）

// --------------------------------------------------
// 2. Required<T> ― 全プロパティを必須にする
// --------------------------------------------------

// Required<T>: T の全プロパティから ? を外して必須にする
// Partial の逆

type RequiredTaskOptions = Required<TaskWithOptions>;
// ↑ TaskWithOptions の description?, dueDate?, tags? が全て必須になる

// 全フィールドを埋めたオブジェクトの例
const fullOptions: RequiredTaskOptions = {
  id: 1,
  title: "レポート",
  done: false,
  description: "月次レポート",       // 必須になった
  dueDate: new Date(),               // 必須になった
  tags: ["仕事"],                    // 必須になった
};

// --------------------------------------------------
// 3. Readonly<T> ― 全プロパティを読み取り専用にする
// --------------------------------------------------

// Readonly<T>: T の全プロパティに readonly をつける
// React では state のイミュータビリティ（不変性）を保証するのに使う

type ReadonlyTask = Readonly<Task>;
// ↑ これは以下と同じ:
// {
//   readonly id: number;
//   readonly title: string;
//   readonly done: boolean;
// }

const frozenTask: ReadonlyTask = { id: 1, title: "変更不可", done: false };
// frozenTask.title = "変更したい";   // ← コンパイルエラー！readonly なので変更不可

// --------------------------------------------------
// 4. Pick<T, Keys> ― 特定のプロパティだけを抜き出す
// --------------------------------------------------

// Pick<T, K>: T から指定したプロパティだけを持つ型を作る
// React でコンポーネントに必要な Props だけを渡すときに使う

type TaskSummary = Pick<Task, "id" | "title">;
// ↑ これは以下と同じ:
// {
//   id: number;
//   title: string;
// }

const summary: TaskSummary = { id: 1, title: "買い物" };
// done プロパティは含まれない

// 使い方の例: リスト表示用コンポーネントにはIDとタイトルだけ渡す
function renderTaskItem(task: Pick<Task, "id" | "title">): string {
  return `#${task.id}: ${task.title}`;
}

// --------------------------------------------------
// 5. Omit<T, Keys> ― 特定のプロパティを除外する
// --------------------------------------------------

// Omit<T, K>: T から指定したプロパティを除いた型を作る
// Pick の逆。React で「この Props 以外は全部渡す」ときに使う

type TaskWithoutId = Omit<Task, "id">;
// ↑ これは以下と同じ:
// {
//   title: string;
//   done: boolean;
// }

// タスク作成時はIDがまだないので、id を除いた型を使う
function createNewTask(input: Omit<Task, "id">): Task {
  // IDは自動生成する
  const newId = Date.now();
  return { id: newId, ...input };
}

const newTask = createNewTask({ title: "新しいタスク", done: false });

// 複数のプロパティを除外することもできる
type TaskTitleOnly = Omit<Task, "id" | "done">;
// ↑ { title: string } だけが残る

// --------------------------------------------------
// 6. Record<Keys, Type> ― キーと値の型を指定した辞書型
// --------------------------------------------------

// Record<K, T>: キーが K型、値が T型のオブジェクトを作る
// React で「ステータスごとのラベル」「IDとデータのマッピング」などに使う

// タスクステータスごとのラベルを定義
const statusLabels: Record<TaskStatus, string> = {
  "todo": "未着手",
  "in-progress": "進行中",
  "done": "完了",
};

// 優先度ごとの色を定義
const priorityColors: Record<Priority, string> = {
  low: "#4CAF50",       // 緑
  medium: "#FF9800",    // オレンジ
  high: "#F44336",      // 赤
};

// IDをキーにしたタスクの辞書
type TaskRecord = Record<number, Task>;

const taskMap: TaskRecord = {
  1: { id: 1, title: "買い物", done: false },
  2: { id: 2, title: "掃除", done: true },
};

// --------------------------------------------------
// 7. Exclude<UnionType, ExcludedMembers> ― ユニオン型から除外
// --------------------------------------------------

// Exclude<T, U>: ユニオン型 T から U に含まれる型を除外する
type AllStatus = "todo" | "in-progress" | "done" | "cancelled";
type ActiveStatus = Exclude<AllStatus, "done" | "cancelled">;
// ↑ "todo" | "in-progress" だけが残る

const currentStatus: ActiveStatus = "todo";        // OK
// const done: ActiveStatus = "done";              // ← コンパイルエラー！

// --------------------------------------------------
// 8. Extract<Type, Union> ― ユニオン型から抽出
// --------------------------------------------------

// Extract<T, U>: ユニオン型 T から U に含まれる型だけを抽出する
// Exclude の逆
type CompletedStatus = Extract<AllStatus, "done" | "cancelled">;
// ↑ "done" | "cancelled" だけが残る

// --------------------------------------------------
// 9. NonNullable<Type> ― null と undefined を除外
// --------------------------------------------------

// NonNullable<T>: T から null と undefined を除外する
type MaybeTask = Task | null | undefined;
type DefiniteTask = NonNullable<MaybeTask>;
// ↑ Task だけが残る（null と undefined が除外された）

// React で「データが確実にある」ことを示すときに使う
function processTask(task: DefiniteTask): string {
  // task は確実に Task 型なので、安全にプロパティにアクセスできる
  return task.title;
}

// --------------------------------------------------
// 10. ReturnType<Type> ― 関数の戻り値の型を取得
// --------------------------------------------------

// ReturnType<T>: 関数型 T の戻り値の型を取得する
// 既存の関数から型を取り出したいときに便利

function getTaskStats(tasks: Task[]) {
  return {
    total: tasks.length,
    done: tasks.filter((t) => t.done).length,
    pending: tasks.filter((t) => !t.done).length,
  };
}

// getTaskStats の戻り値の型を取得する
type TaskStats = ReturnType<typeof getTaskStats>;
// ↑ { total: number; done: number; pending: number } と推論される

// --------------------------------------------------
// 11. Parameters<Type> ― 関数の引数の型を取得
// --------------------------------------------------

// Parameters<T>: 関数型 T の引数の型をタプルとして取得する
type UpdateTaskParams = Parameters<typeof updateTask>;
// ↑ [Task, Partial<Task>] というタプル型になる

// --------------------------------------------------
// 確認用のエクスポート
// --------------------------------------------------
export {
  updateTask,
  createNewTask,
  renderTaskItem,
  statusLabels,
  priorityColors,
  getTaskStats,
};
export type { TaskSummary, TaskWithoutId, TaskRecord, TaskStats };
