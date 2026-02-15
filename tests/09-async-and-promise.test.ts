// ============================================================
// 09章テスト: 非同期処理の型
// 各問題の「ここに回答」部分を書き換えて、npm test で答え合わせしよう！
// ============================================================

import { assert, runTest } from "./test-runner";
import type { ChapterResult, TestResult } from "./test-runner";

// ============================================================
// Q1: Promise を返す関数を書こう
// number を受け取り、その値を Promise で返す関数を作ってください
// 例: q1Answer(42) → Promise<number> が resolve(42)
// ============================================================
// ここに回答 ↓
function q1Answer(value: number): Promise<number> {
  return undefined as any; // Promise.resolve を使ってください
}

// ============================================================
// Q2: async 関数を書こう
// async キーワードを使って、"hello" を返す関数を作ってください
// async 関数は自動的に Promise<string> を返す
// ============================================================
// ここに回答 ↓
async function q2Answer(): Promise<string> {
  return ""; // async 関数にして "hello" を返してください
}

// ============================================================
// Q3: await で Promise の中身を取り出そう
// Promise<number> を受け取り、その値を2倍にして返す
// async 関数を書いてください
// ============================================================
// ここに回答 ↓
async function q3Answer(promise: Promise<number>): Promise<number> {
  return 0; // await を使って Promise の値を取り出し、2倍にしてください
}

// ============================================================
// Q4: try/catch でエラーハンドリングしよう
// Promise<string> を受け取り、成功したらその値を、
// 失敗したら "エラー発生" を返す async 関数を書いてください
// ============================================================
// ここに回答 ↓
async function q4Answer(promise: Promise<string>): Promise<string> {
  return ""; // try/catch を使ってください
}

// ============================================================
// Q5: Promise.all を使おう
// Promise<number> の配列を受け取り、全ての値の合計を返す
// async 関数を書いてください
// ============================================================
// ここに回答 ↓
async function q5Answer(promises: Promise<number>[]): Promise<number> {
  return 0; // Promise.all を使ってください
}

// ============================================================
// Q6: 非同期データ取得関数を書こう
// id (number) を受け取り、{ id, name: "User${id}" } を返す
// 非同期関数を書いてください（Promise.resolve で即座に返してOK）
// ============================================================
interface UserData {
  id: number;
  name: string;
}

// ここに回答 ↓
async function q6Answer(id: number): Promise<UserData> {
  return undefined as any; // { id, name: `User${id}` } を返してください
}

// ============================================================
// Q7: 複数の非同期処理を並列実行しよう
// id の配列 [1, 2, 3] を受け取り、Q6 の関数を全て並列実行して
// UserData[] を返す async 関数を書いてください
// ============================================================
// ここに回答 ↓
async function q7Answer(ids: number[]): Promise<UserData[]> {
  return []; // Promise.all + map を使ってください
}

// ============================================================
// Q8: 非同期処理の結果を変換しよう
// Promise<string> を受け取り、文字列を大文字にした Promise<string> を返す
// async 関数を書いてください
// ============================================================
// ここに回答 ↓
async function q8Answer(promise: Promise<string>): Promise<string> {
  return ""; // await で取り出して変換してください
}

// ============================================================
// Q9: ジェネリックな非同期関数を書こう
// Promise<T> と T のデフォルト値を受け取り、
// Promise が reject した場合はデフォルト値を返す関数を書いてください
// ============================================================
// ここに回答 ↓
async function q9Answer<T>(promise: Promise<T>, defaultValue: T): Promise<T> {
  return defaultValue; // try/catch を使ってください
}

// ============================================================
// Q10: 非同期処理の状態管理パターンを実装しよう
// fetchFn (非同期関数) を受け取り、
// { data: T | null; error: string | null } を返す async 関数を書いてください
// 成功時: { data: 値, error: null }
// 失敗時: { data: null, error: エラーメッセージ }
// ============================================================
interface AsyncResult<T> {
  data: T | null;
  error: string | null;
}

// ここに回答 ↓
async function q10Answer<T>(fetchFn: () => Promise<T>): Promise<AsyncResult<T>> {
  return { data: null, error: null }; // try/catch を使ってください
}

// ============================================================
// テスト実行（この部分は変更しないでください）
// ============================================================
async function runChapter09Tests(): Promise<ChapterResult> {
  const results: TestResult[] = [];

  results.push(await (async () => {
    try {
      const p = q1Answer(42);
      const result = await p;
      return runTest(1, "Promise を返す関数", () => {
        assert.isTrue(p instanceof Promise);
        assert.equal(result, 42);
      });
    } catch {
      return runTest(1, "Promise を返す関数", () => { throw new Error("Promise.resolve(value) で値を返してください"); });
    }
  })());

  results.push(await (async () => {
    try {
      const result = await q2Answer();
      return runTest(2, "async 関数", () => {
        assert.equal(result, "hello");
      });
    } catch {
      return runTest(2, "async 関数", () => { throw new Error("async 関数が失敗しました"); });
    }
  })());

  results.push(await (async () => {
    try {
      const result = await q3Answer(Promise.resolve(21));
      return runTest(3, "await で値を2倍にする", () => {
        assert.equal(result, 42);
      });
    } catch {
      return runTest(3, "await で値を2倍にする", () => { throw new Error("関数が失敗しました"); });
    }
  })());

  results.push(await (async () => {
    try {
      const success = await q4Answer(Promise.resolve("成功"));
      // reject する Promise を作るが、q4Answer が catch しない場合に備え外側でも catch する
      const rejectedPromise = Promise.reject(new Error("失敗"));
      rejectedPromise.catch(() => {}); // 未ハンドル reject 防止
      const failure = await q4Answer(rejectedPromise);
      return runTest(4, "try/catch でエラーハンドリング", () => {
        assert.equal(success, "成功");
        assert.equal(failure, "エラー発生");
      });
    } catch {
      return runTest(4, "try/catch でエラーハンドリング", () => { throw new Error("エラーハンドリングに失敗"); });
    }
  })());

  results.push(await (async () => {
    try {
      const result = await q5Answer([Promise.resolve(10), Promise.resolve(20), Promise.resolve(30)]);
      return runTest(5, "Promise.all で合計を計算", () => {
        assert.equal(result, 60);
      });
    } catch {
      return runTest(5, "Promise.all で合計を計算", () => { throw new Error("Promise.all が失敗"); });
    }
  })());

  results.push(await (async () => {
    try {
      const result = await q6Answer(5);
      return runTest(6, "非同期データ取得関数", () => {
        assert.deepEqual(result, { id: 5, name: "User5" });
      });
    } catch {
      return runTest(6, "非同期データ取得関数", () => { throw new Error("関数が失敗しました"); });
    }
  })());

  results.push(await (async () => {
    try {
      const result = await q7Answer([1, 2, 3]);
      return runTest(7, "複数の非同期処理を並列実行", () => {
        assert.deepEqual(result, [
          { id: 1, name: "User1" },
          { id: 2, name: "User2" },
          { id: 3, name: "User3" },
        ]);
      });
    } catch {
      return runTest(7, "複数の非同期処理を並列実行", () => { throw new Error("並列実行が失敗"); });
    }
  })());

  results.push(await (async () => {
    try {
      const result = await q8Answer(Promise.resolve("hello"));
      return runTest(8, "非同期の文字列変換", () => {
        assert.equal(result, "HELLO");
      });
    } catch {
      return runTest(8, "非同期の文字列変換", () => { throw new Error("変換が失敗"); });
    }
  })());

  results.push(await (async () => {
    try {
      const success = await q9Answer(Promise.resolve(42), 0);
      const rejP9 = Promise.reject(new Error("error"));
      rejP9.catch(() => {}); // 未ハンドル reject 防止
      const failure = await q9Answer(rejP9, 99);
      return runTest(9, "ジェネリック非同期関数（デフォルト値）", () => {
        assert.equal(success, 42);
        assert.equal(failure, 99);
      });
    } catch {
      return runTest(9, "ジェネリック非同期関数（デフォルト値）", () => { throw new Error("関数が失敗"); });
    }
  })());

  results.push(await (async () => {
    try {
      const success = await q10Answer(() => Promise.resolve("データ"));
      const failFn = () => { const p = Promise.reject(new Error("ネットワークエラー")); p.catch(() => {}); return p; };
      const failure = await q10Answer(failFn);
      return runTest(10, "非同期処理の状態管理パターン", () => {
        assert.deepEqual(success, { data: "データ", error: null });
        assert.equal(failure.data, null);
        assert.equal(failure.error, "ネットワークエラー");
      });
    } catch {
      return runTest(10, "非同期処理の状態管理パターン", () => { throw new Error("状態管理が失敗"); });
    }
  })());

  const passed = results.filter((r) => r.passed).length;
  return { chapter: "09章: 非同期処理の型", results, passed, total: results.length };
}

export { runChapter09Tests };
