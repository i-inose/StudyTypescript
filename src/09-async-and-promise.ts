// ============================================================
// 09-async-and-promise.ts
// 非同期処理の型 ― React のデータフェッチに不可欠
// ============================================================

import type { Task } from "./02-interface-and-type";
import type { ApiResponse } from "./05-generics";

// --------------------------------------------------
// 1. Promise の基本
// --------------------------------------------------

// Promise<T>: 非同期処理の結果として T型の値を返すことを示す型
// React では API 呼び出し（fetch, axios）で必ず使う

// タスクを取得する非同期関数（API 呼び出しのシミュレーション）
function fetchTasks(): Promise<Task[]> {
  // Promise<Task[]>: Task の配列が返ってくることを示す
  return new Promise((resolve) => {
    // setTimeout で API のレスポンス遅延をシミュレート
    setTimeout(() => {
      resolve([
        { id: 1, title: "買い物", done: false },
        { id: 2, title: "掃除", done: true },
        { id: 3, title: "勉強", done: false },
      ]);
    }, 100);
  });
}

// 単一のタスクを取得する関数（見つからない場合は null）
function fetchTaskById(id: number): Promise<Task | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tasks: Task[] = [
        { id: 1, title: "買い物", done: false },
        { id: 2, title: "掃除", done: true },
      ];
      // find は見つからないと undefined を返すので、null に変換
      const found = tasks.find((t) => t.id === id);
      resolve(found ?? null);  // ?? は null/undefined の場合に右辺を返す
    }, 100);
  });
}

// --------------------------------------------------
// 2. async/await の型
// --------------------------------------------------

// async 関数は自動的に Promise を返す
// await で Promise の中身を取り出す

// async 関数の戻り値型は自動的に Promise<T> になる
async function getIncompleteTasks(): Promise<Task[]> {
  // await で Promise の結果を待つ。tasks は Task[] 型になる
  const tasks = await fetchTasks();
  // filter で未完了のタスクだけ抽出する
  return tasks.filter((task) => !task.done);
}

// エラーハンドリング付きの非同期関数
async function safeGetTasks(): Promise<ApiResponse<Task[]>> {
  try {
    // try ブロック内で await する
    const tasks = await fetchTasks();
    // 成功時のレスポンス
    return {
      data: tasks,
      status: 200,
      message: "取得成功",
    };
  } catch (error) {
    // エラー時のレスポンス
    // catch の error は unknown 型なので、型チェックが必要
    const errorMessage =
      error instanceof Error ? error.message : "不明なエラー";
    return {
      data: [],
      status: 500,
      message: errorMessage,
    };
  }
}

// --------------------------------------------------
// 3. 複数の非同期処理を並列実行
// --------------------------------------------------

// Promise.all: 複数の Promise を並列に実行し、全ての結果を待つ
// React で複数の API を同時に呼び出すときに使う
async function fetchDashboardData(): Promise<{
  tasks: Task[];
  taskCount: number;
}> {
  // Promise.all に渡す配列の各要素の型から、結果の型が推論される
  const [tasks, task] = await Promise.all([
    fetchTasks(),         // Promise<Task[]>
    fetchTaskById(1),     // Promise<Task | null>
  ]);
  // ↑ tasks は Task[] 型、task は Task | null 型と推論される

  return {
    tasks,
    taskCount: tasks.length,
  };
}

// Promise.race: 最も早く完了した Promise の結果を返す
// タイムアウト処理の実装に使える
function fetchWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  // タイムアウト用の Promise を作る
  const timeout = new Promise<never>((_, reject) => {
    // never型: reject が呼ばれるので、正常に値を返すことはない
    setTimeout(() => reject(new Error("タイムアウトしました")), timeoutMs);
  });

  // race で「データ取得」と「タイムアウト」を競争させる
  return Promise.race([promise, timeout]);
}

// --------------------------------------------------
// 4. 非同期ジェネリック関数
// --------------------------------------------------

// ジェネリクスと async/await を組み合わせる
// React の汎用的なデータフェッチフック（useFetch的なもの）で使う

// 汎用的な API フェッチ関数
async function apiFetch<T>(
  endpoint: string,
  // Partial<RequestInit> はフェッチの設定（method, headers等）のオプション型
  options?: { method?: string; body?: string }
): Promise<ApiResponse<T>> {
  try {
    // 実際のアプリでは fetch(endpoint, options) を使う
    // ここではシミュレーションとして空データを返す
    console.log(`Fetching: ${endpoint}`, options);
    return {
      data: {} as T,       // シミュレーションのため型アサーションを使用
      status: 200,
      message: "成功",
    };
  } catch (error) {
    return {
      data: {} as T,
      status: 500,
      message: error instanceof Error ? error.message : "不明なエラー",
    };
  }
}

// 使用例（React の useEffect 内で呼ぶイメージ）
async function exampleUsage(): Promise<void> {
  // T に Task[] を指定して呼び出す
  const response = await apiFetch<Task[]>("/api/tasks");
  // response.data は Task[] 型

  // T に Task を指定して呼び出す
  const singleResponse = await apiFetch<Task>("/api/tasks/1");
  // singleResponse.data は Task 型
}

// --------------------------------------------------
// 5. 非同期処理の状態管理パターン
// --------------------------------------------------

// React でよく使われる「ローディング状態管理」の型パターン

interface AsyncState<T> {
  data: T | null;          // 取得したデータ（未取得なら null）
  loading: boolean;        // ローディング中かどうか
  error: string | null;    // エラーメッセージ（エラーなしなら null）
}

// useAsyncState のシミュレーション
function createAsyncState<T>(): AsyncState<T> {
  return {
    data: null,
    loading: false,
    error: null,
  };
}

// 状態遷移関数（React の reducer に相当）
function asyncStateReducer<T>(
  state: AsyncState<T>,
  action:
    | { type: "FETCH_START" }
    | { type: "FETCH_SUCCESS"; payload: T }
    | { type: "FETCH_ERROR"; payload: string }
): AsyncState<T> {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { data: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { data: null, loading: false, error: action.payload };
  }
}

// 使用例
async function useFetchTasks(): Promise<void> {
  let state = createAsyncState<Task[]>();

  // ローディング開始
  state = asyncStateReducer(state, { type: "FETCH_START" });
  console.log("Loading:", state.loading);  // true

  try {
    const tasks = await fetchTasks();
    // 成功
    state = asyncStateReducer(state, {
      type: "FETCH_SUCCESS",
      payload: tasks,
    });
    console.log("Tasks:", state.data);     // Task[]
  } catch (error) {
    // エラー
    state = asyncStateReducer(state, {
      type: "FETCH_ERROR",
      payload: error instanceof Error ? error.message : "エラー",
    });
    console.log("Error:", state.error);
  }
}

// --------------------------------------------------
// 確認用のエクスポート
// --------------------------------------------------
export {
  fetchTasks,
  fetchTaskById,
  getIncompleteTasks,
  safeGetTasks,
  fetchDashboardData,
  fetchWithTimeout,
  apiFetch,
  createAsyncState,
  asyncStateReducer,
  useFetchTasks,
};
export type { AsyncState };
