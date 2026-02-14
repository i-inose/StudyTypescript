// ============================================================
// 05-generics.ts
// ジェネリクス ― React Hooks の仕組みを理解するカギ
// ============================================================

import type { Task, Priority } from "./02-interface-and-type";
import type { TaskStatus } from "./03-union-and-literal";

// --------------------------------------------------
// 1. ジェネリクスの基本
// --------------------------------------------------

// ジェネリクス: 「型を引数として受け取る」仕組み
// 関数を呼び出すときに型を指定することで、様々な型に対応できる

// <T> の T は「型パラメータ」。慣習的に T, U, V などの1文字を使う
// T = Type の略、K = Key, V = Value, E = Element なども使われる

// 基本的なジェネリック関数: 配列の最後の要素を返す
function getLast<T>(items: T[]): T | undefined {
  // T は呼び出すときに具体的な型（string, number, Task など）に置き換わる
  return items[items.length - 1];
}

// 呼び出し時に型を指定する方法（明示的）
const lastNumber = getLast<number>([1, 2, 3]);            // number | undefined
const lastString = getLast<string>(["a", "b", "c"]);      // string | undefined

// 型推論に任せる方法（引数から TypeScript が自動推論する）
const lastTask = getLast([
  { id: 1, title: "買い物", done: false },
]);
// ↑ T は自動的に { id: number; title: string; done: boolean } と推論される

// --------------------------------------------------
// 2. useState のシミュレーション
// --------------------------------------------------

// React の useState<T> がどう動くかを理解するためのシミュレーション
// 実際の useState: const [count, setCount] = useState<number>(0);

// useState と同じ仕組みを自作する
function useState<T>(initialValue: T): [T, (newValue: T) => void] {
  // [T, 関数] のタプルを返す（React の useState と同じ戻り値の形）
  let value: T = initialValue;

  // セッター関数: 新しい値を受け取って更新する
  const setValue = (newValue: T): void => {
    value = newValue;
    console.log(`State updated to:`, value);
  };

  // [現在の値, セッター関数] のタプルを返す
  return [value, setValue];
}

// 使用例（React と全く同じ使い方）
const [count, setCount] = useState<number>(0);          // number型の state
const [name, setName] = useState<string>("田中");        // string型の state
const [task, setTask] = useState<Task | null>(null);     // Task または null

// 型推論で型パラメータを省略することもできる
const [isOpen, setIsOpen] = useState(false);             // boolean と推論される

// --------------------------------------------------
// 3. useRef のシミュレーション
// --------------------------------------------------

// React の useRef<T> のシミュレーション
// DOM要素やミュータブルな値を保持するために使う

interface RefObject<T> {
  current: T;    // T型の値を保持する。React の useRef と同じ構造
}

function useRef<T>(initialValue: T): RefObject<T> {
  return { current: initialValue };
}

// 使用例
const countRef = useRef<number>(0);              // RefObject<number>
countRef.current = 1;                            // current を直接更新できる

const inputRef = useRef<string | null>(null);    // DOM要素は最初 null
// React では: const inputRef = useRef<HTMLInputElement>(null);

// --------------------------------------------------
// 4. 複数の型パラメータ
// --------------------------------------------------

// 型パラメータは複数持てる。K（Key）と V（Value）のように意味のある名前を使う

// キーと値のペアを作る関数
function createPair<K, V>(key: K, value: V): { key: K; value: V } {
  return { key, value };
}

const numberPair = createPair<string, number>("age", 25);
// ↑ { key: string; value: number } 型

const taskPair = createPair("task-1", { id: 1, title: "買い物", done: false });
// ↑ 型推論で { key: string; value: { id: number; title: string; done: boolean } } 型

// --------------------------------------------------
// 5. ジェネリック制約（extends）
// --------------------------------------------------

// <T extends 型> で「T は少なくともこの型を満たす」という制約をつける
// React では Props が特定のインターフェースを満たすことを保証する

// T は必ず { id: number } を持つ型でなければならない
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

// Task は { id: number } を持っているのでOK
const tasks: Task[] = [
  { id: 1, title: "買い物", done: false },
  { id: 2, title: "掃除", done: true },
];
const found = findById(tasks, 1);   // Task | undefined

// { id: number } を持たない型だとコンパイルエラー
// findById(["a", "b"], 1);         // ← エラー！string には id がない

// --------------------------------------------------
// 6. ジェネリックインターフェース
// --------------------------------------------------

// インターフェースにもジェネリクスを使える
// React の API レスポンスの型定義でよく使うパターン

// API レスポンスの共通型
interface ApiResponse<T> {
  data: T;               // レスポンスの中身（型はTによって変わる）
  status: number;        // HTTPステータスコード
  message: string;       // メッセージ
}

// タスク一覧の API レスポンス
const taskListResponse: ApiResponse<Task[]> = {
  data: [
    { id: 1, title: "買い物", done: false },
    { id: 2, title: "掃除", done: true },
  ],
  status: 200,
  message: "成功",
};

// 単一タスクの API レスポンス
const singleTaskResponse: ApiResponse<Task> = {
  data: { id: 1, title: "買い物", done: false },
  status: 200,
  message: "成功",
};

// --------------------------------------------------
// 7. ジェネリッククラス
// --------------------------------------------------

// クラスにもジェネリクスを使える
// React のコンテキストやストアで似たパターンが使われる

// 型安全なストア（状態管理）のシミュレーション
class Store<T> {
  // private: クラスの外からアクセスできない
  private state: T;

  // コンストラクタ: インスタンス生成時に呼ばれる
  constructor(initialState: T) {
    this.state = initialState;
  }

  // 現在の状態を取得する
  getState(): T {
    return this.state;
  }

  // 状態を更新する
  setState(newState: T): void {
    this.state = newState;
  }

  // 状態を部分的に更新する（Partial<T> はユーティリティ型。06で詳しく解説）
  updateState(partialState: Partial<T>): void {
    // スプレッド構文で既存の状態とマージする
    this.state = { ...this.state, ...partialState };
  }
}

// タスクの状態を管理するストア
interface TaskState {
  tasks: Task[];
  filter: TaskStatus;
  searchQuery: string;
}

const taskStore = new Store<TaskState>({
  tasks: [],
  filter: "todo",
  searchQuery: "",
});

// 部分更新（filter だけ変更）
taskStore.updateState({ filter: "done" });

// --------------------------------------------------
// 8. ジェネリクスのデフォルト型
// --------------------------------------------------

// 型パラメータにデフォルト値を設定できる
// React のライブラリ定義でよく見かける

interface PaginatedList<T = Task> {
  items: T[];               // T のデフォルトは Task
  currentPage: number;
  totalPages: number;
}

// T を省略すると Task が使われる
const taskList: PaginatedList = {
  items: [{ id: 1, title: "買い物", done: false }],
  currentPage: 1,
  totalPages: 5,
};

// 明示的に別の型を指定することもできる
const stringList: PaginatedList<string> = {
  items: ["a", "b", "c"],
  currentPage: 1,
  totalPages: 1,
};

// --------------------------------------------------
// 確認用のエクスポート
// --------------------------------------------------
export {
  getLast,
  useState,
  useRef,
  createPair,
  findById,
  Store,
  taskStore,
  taskListResponse,
};
export type { RefObject, ApiResponse, PaginatedList };
