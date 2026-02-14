// ============================================================
// 08-advanced-types.ts
// 高度な型操作 ― ライブラリのコードリーディングに必要な知識
// ============================================================

import type { Task, Priority } from "./02-interface-and-type";
import type { TaskStatus } from "./03-union-and-literal";

// --------------------------------------------------
// 1. keyof ― オブジェクト型のキーをユニオン型で取得
// --------------------------------------------------

// keyof T: T のプロパティ名をユニオン型として取り出す
type TaskKeys = keyof Task;
// ↑ "id" | "title" | "done" というユニオン型になる

// keyof を使って「安全にプロパティにアクセスする」関数を作る
// React の setState({ [key]: value }) のようなパターンで活用
function getTaskProperty<K extends keyof Task>(task: Task, key: K): Task[K] {
  // K は Task のキー名に制限される
  // Task[K] は、K に対応する値の型
  return task[key];
}

const sampleTask: Task = { id: 1, title: "買い物", done: false };

const taskId = getTaskProperty(sampleTask, "id");       // number型
const taskTitle = getTaskProperty(sampleTask, "title");  // string型
const taskDone = getTaskProperty(sampleTask, "done");    // boolean型
// getTaskProperty(sampleTask, "invalid");               // ← コンパイルエラー！

// --------------------------------------------------
// 2. typeof ― 値から型を取得する
// --------------------------------------------------

// typeof: 変数やオブジェクトから型を逆引きする
// JavaScript の typeof（ランタイム判定）とは異なる、TypeScript の型レベルの typeof

const defaultConfig = {
  theme: "light" as const,
  language: "ja" as const,
  itemsPerPage: 20,
  showCompleted: true,
};

// typeof でオブジェクトの型を取得する
type AppConfig = typeof defaultConfig;
// ↑ {
//   theme: "light";
//   language: "ja";
//   itemsPerPage: number;
//   showCompleted: boolean;
// }

// as const がない場合は string に推論されるが、
// as const をつけるとリテラル型（"light", "ja"）になる

// 関数と組み合わせて使う
function createConfig(overrides: Partial<AppConfig>): AppConfig {
  return { ...defaultConfig, ...overrides };
}

// --------------------------------------------------
// 3. マップ型（Mapped Types）
// --------------------------------------------------

// マップ型: 既存の型のプロパティを変換して新しい型を作る
// [K in keyof T] で T の各プロパティに対して操作を行う

// 全プロパティを string 型に変換する型
type Stringify<T> = {
  [K in keyof T]: string;   // T の各プロパティを string に変換
};

type StringifiedTask = Stringify<Task>;
// ↑ {
//   id: string;
//   title: string;
//   done: string;
// }

// フォーム入力値は全て string なので、このパターンが使える
const formValues: StringifiedTask = {
  id: "1",
  title: "買い物",
  done: "false",
};

// 全プロパティをオプショナルかつ readonly にする型
// （Partial と Readonly を同時に適用するのと同じ）
type ReadonlyPartial<T> = {
  readonly [K in keyof T]?: T[K];
};

type FlexibleTask = ReadonlyPartial<Task>;
// ↑ {
//   readonly id?: number;
//   readonly title?: string;
//   readonly done?: boolean;
// }

// --------------------------------------------------
// 4. 条件型（Conditional Types）
// --------------------------------------------------

// T extends U ? A : B: T が U を満たすなら A型、そうでなければ B型
// 三項演算子と同じ構文を型レベルで使う

// 配列型なら要素の型を取り出し、そうでなければそのまま返す
type Unwrap<T> = T extends Array<infer U> ? U : T;
// ↑ infer U: 条件型の中で「推論される型」を変数のように使う

type UnwrappedTasks = Unwrap<Task[]>;    // Task
type UnwrappedString = Unwrap<string>;   // string

// null を許容する型を作る条件型
type Nullable<T> = T extends null | undefined ? T : T | null;

// Promise の中身の型を取り出す
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type ResolvedType = UnwrapPromise<Promise<Task>>;  // Task
type NotPromise = UnwrapPromise<string>;            // string

// --------------------------------------------------
// 5. テンプレートリテラル型
// --------------------------------------------------

// テンプレートリテラル（`${}`）を型レベルで使う
// React のイベントハンドラ名の生成パターンに似ている

// イベントハンドラの名前を自動生成する型
type EventName = "click" | "change" | "submit";
type OnHandler = `on${Capitalize<EventName>}`;
// ↑ "onClick" | "onChange" | "onSubmit"

// CSS クラス名のプレフィックスを付ける型
type Variant = "primary" | "secondary" | "danger";
type Size = "sm" | "md" | "lg";
type ButtonClass = `btn-${Variant}-${Size}`;
// ↑ "btn-primary-sm" | "btn-primary-md" | "btn-primary-lg" |
//   "btn-secondary-sm" | ... 全9パターンの組み合わせ

// --------------------------------------------------
// 6. インデックスアクセス型
// --------------------------------------------------

// T[K]: 型の特定のプロパティの型を取得する（値のアクセスと同じ構文）

type TaskIdType = Task["id"];         // number
type TaskTitleType = Task["title"];   // string

// ユニオンでアクセスすると、各プロパティの型のユニオンが得られる
type TaskValueTypes = Task["id" | "title"];  // number | string

// 配列の要素の型を取得する
type TaskArray = Task[];
type TaskElement = TaskArray[number];  // Task
// ↑ [number] で配列のインデックスアクセスをシミュレートする

// --------------------------------------------------
// 7. ユーティリティ型の自作例（学習目的）
// --------------------------------------------------

// 標準の Partial<T> を自作してみる（仕組みの理解用）
type MyPartial<T> = {
  [K in keyof T]?: T[K];  // T の各キーに ? を付けて、値の型はそのまま
};

// 標準の Required<T> を自作してみる
type MyRequired<T> = {
  [K in keyof T]-?: T[K]; // -? で ? を外す（必須にする）
};

// 標準の Readonly<T> を自作してみる
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];  // 各キーに readonly を付ける
};

// 標準の Pick<T, K> を自作してみる
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];   // K で指定されたキーだけを抜き出す
};

type PickedTask = MyPick<Task, "id" | "title">;
// ↑ { id: number; title: string }

// --------------------------------------------------
// 8. 実践例: フォームフィールド型の自動生成
// --------------------------------------------------

// タスクの各フィールドに対して、フォーム用のメタデータ型を自動生成する
type FormField<T> = {
  [K in keyof T]: {
    value: T[K];               // フィールドの現在の値
    error: string | null;      // バリデーションエラー（なければ null）
    touched: boolean;          // ユーザーがフィールドに触れたか
  };
};

type TaskForm = FormField<Pick<Task, "title">>;
// ↑ {
//   title: {
//     value: string;
//     error: string | null;
//     touched: boolean;
//   };
// }

// React のフォーム管理で使うパターン
const taskForm: TaskForm = {
  title: {
    value: "",
    error: null,
    touched: false,
  },
};

// --------------------------------------------------
// 確認用のエクスポート
// --------------------------------------------------
export { getTaskProperty, defaultConfig, createConfig, formValues, taskForm };
export type {
  TaskKeys,
  AppConfig,
  Stringify,
  Unwrap,
  UnwrapPromise,
  OnHandler,
  ButtonClass,
  FormField,
};
