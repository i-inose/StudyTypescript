// ============================================================
// 02-interface-and-type.ts
// インターフェースと型エイリアス ― React の Props/State 定義の基本
// ============================================================

// --------------------------------------------------
// 1. interface（インターフェース）
// --------------------------------------------------

// interface: オブジェクトの「形」を定義する
// React では Props の型定義に最もよく使われる
interface Task {
  id: number;           // タスクのID（必須）
  title: string;        // タスク名（必須）
  done: boolean;        // 完了状態（必須）
}

// interface で定義した型を使ってオブジェクトを作る
const myTask: Task = {
  id: 1,
  title: "TypeScriptを学ぶ",
  done: false,
};

// --------------------------------------------------
// 2. オプショナルプロパティ（?）
// --------------------------------------------------

// プロパティ名の後に ? をつけると「あってもなくてもいい」プロパティになる
// React の Props で「指定しなくてもいいProp」を定義するときに頻出
interface TaskWithOptions {
  id: number;                 // 必須
  title: string;              // 必須
  done: boolean;              // 必須
  description?: string;       // 省略可能（string | undefined と同じ意味）
  dueDate?: Date;             // 省略可能
  tags?: string[];            // 省略可能
}

// description, dueDate, tags を省略してもエラーにならない
const simpleTask: TaskWithOptions = {
  id: 1,
  title: "買い物",
  done: false,
};

// もちろん指定してもOK
const detailedTask: TaskWithOptions = {
  id: 2,
  title: "レポート作成",
  done: false,
  description: "月次レポートを仕上げる",
  dueDate: new Date("2026-03-01"),
  tags: ["仕事", "優先度高"],
};

// --------------------------------------------------
// 3. readonly プロパティ
// --------------------------------------------------

// readonly をつけると、一度設定した値を変更できなくなる
// React では state を直接変更してはいけないので、この考え方が重要
interface ImmutableTask {
  readonly id: number;        // 一度設定したら変更不可
  readonly title: string;     // 一度設定したら変更不可
  done: boolean;              // これは変更可能
}

const frozenTask: ImmutableTask = {
  id: 1,
  title: "変更できないタスク",
  done: false,
};
// frozenTask.id = 2;        // ← コンパイルエラー！readonly なので変更不可
frozenTask.done = true;      // ← これはOK（readonly ではないため）

// --------------------------------------------------
// 4. type エイリアス（型エイリアス）
// --------------------------------------------------

// type: 型に名前をつける。interface と似ているが、より柔軟
// ユニオン型やプリミティブ型にも名前をつけられる

// プリミティブ型に名前をつける（interface ではできない）
type TaskId = number;
type TaskTitle = string;

// オブジェクト型を定義する（interface と同じことができる）
type TaskType = {
  id: TaskId;
  title: TaskTitle;
  done: boolean;
};

// ユニオン型に名前をつける（interface ではできない）
type Priority = "low" | "medium" | "high";

// タプル型に名前をつける（interface ではできない）
type IdAndName = [number, string];

// --------------------------------------------------
// 5. interface の拡張（extends）
// --------------------------------------------------

// extends: 既存の interface を引き継いで、新しいプロパティを追加する
// React では基本 Props を拡張して、特定のコンポーネント用 Props を作る

// 基本のタスク
interface BaseTask {
  id: number;
  title: string;
}

// BaseTask を拡張して、完了フラグと優先度を追加
interface DetailedTask extends BaseTask {
  done: boolean;              // 追加プロパティ
  priority: Priority;         // 上で定義した型を使う
}

// DetailedTask は BaseTask のプロパティ（id, title）も持つ
const importantTask: DetailedTask = {
  id: 1,
  title: "プレゼン準備",
  done: false,
  priority: "high",
};

// 複数の interface を同時に継承することもできる
interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface TimestampedTask extends BaseTask, Timestamped {
  done: boolean;
}

const stampedTask: TimestampedTask = {
  id: 1,
  title: "タイムスタンプ付きタスク",
  done: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// --------------------------------------------------
// 6. type の交差型（Intersection: &）
// --------------------------------------------------

// & を使って複数の型を合成する（interface の extends に相当）
// React では複数の Props を合成するときに使う

type WithPriority = {
  priority: Priority;
};

type WithTimestamp = {
  createdAt: Date;
  updatedAt: Date;
};

// BaseTask と WithPriority と WithTimestamp を全て合成
type FullTask = BaseTask & WithPriority & WithTimestamp & { done: boolean };

const fullTask: FullTask = {
  id: 1,
  title: "フルスペックタスク",
  priority: "medium",
  createdAt: new Date(),
  updatedAt: new Date(),
  done: false,
};

// --------------------------------------------------
// 7. interface vs type ― どちらを使うべきか？
// --------------------------------------------------

// 【React 開発での使い分けガイド】
//
// interface を使う場面:
//   - コンポーネントの Props 定義（最も一般的）
//   - オブジェクトの形状を定義するとき
//   - extends で継承したいとき
//
// type を使う場面:
//   - ユニオン型（"a" | "b" | "c"）に名前をつけるとき
//   - タプル型に名前をつけるとき
//   - プリミティブ型にエイリアスをつけるとき
//   - 複数の型を & で合成するとき
//
// 実務では「Props は interface、それ以外は type」というルールが多い

// --------------------------------------------------
// 8. インデックスシグネチャ
// --------------------------------------------------

// キー名が動的なオブジェクトの型を定義する
// React で API レスポンスの動的なデータを扱うときに使う
interface TaskMap {
  [taskId: string]: Task;  // string型のキーで Task型の値を持つ
}

const tasks: TaskMap = {
  "task-1": { id: 1, title: "掃除", done: false },
  "task-2": { id: 2, title: "洗濯", done: true },
};

// --------------------------------------------------
// 確認用のエクスポート
// --------------------------------------------------
export { myTask, simpleTask, detailedTask, frozenTask, importantTask, fullTask, tasks };
export type {
  Task,
  TaskWithOptions,
  ImmutableTask,
  Priority,
  BaseTask,
  DetailedTask,
  FullTask,
  TaskMap,
};
