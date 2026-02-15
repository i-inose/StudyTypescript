// ============================================================
// 04章テスト: 関数の型定義
// 各問題の「ここに回答」部分を書き換えて、npm test で答え合わせしよう！
// ============================================================

import { assert, runTest } from "./test-runner";
import type { ChapterResult, TestResult } from "./test-runner";

// ============================================================
// Q1: 引数と戻り値に型をつけた関数を書こう
// 2つの number を受け取り、合計を返す関数 add を作ってください
// ============================================================
// ここに回答 ↓
function q1Answer(a: any, b: any): any {
  return undefined; // この関数を完成させてください
}

// ============================================================
// Q2: アロー関数で書こう
// 文字列を受け取り、その文字数を返すアロー関数を作ってください
// ============================================================
// ここに回答 ↓
const q2Answer = (s: any): any => {
  return undefined; // この関数を完成させてください
};

// ============================================================
// Q3: オプショナル引数を使おう
// name (string, 必須) と greeting (string, 省略可能) を受け取り、
// greeting があれば "greeting, name!" を、なければ "Hello, name!" を返してください
// ============================================================
// ここに回答 ↓
function q3Answer(name: string, greeting?: any): string {
  return ""; // この関数を完成させてください
}

// ============================================================
// Q4: デフォルト引数を使おう
// price (number) と taxRate (number, デフォルト 0.1) を受け取り、
// 税込み価格（price * (1 + taxRate)）を返してください
// ============================================================
// ここに回答 ↓
function q4Answer(price: number, taxRate: number = 0.1): number {
  return 0; // この関数を完成させてください（税込み価格を計算する）
}

// ============================================================
// Q5: レストパラメータを使おう
// 最初の引数 prefix (string) と、残りの引数 names (string[]) を受け取り、
// 各名前に prefix をつけた配列を返してください
// 例: q5Answer("Mr.", "田中", "鈴木") → ["Mr. 田中", "Mr. 鈴木"]
// ============================================================
// ここに回答 ↓
function q5Answer(prefix: string, ...names: any[]): string[] {
  return []; // この関数を完成させてください
}

// ============================================================
// Q6: コールバック関数を引数に取る関数を書こう
// number の配列と、number を受け取り boolean を返す関数を受け取り、
// 条件を満たす要素だけの配列を返す myFilter 関数を作ってください
// （Array.filter と同じ動きを自作する）
// ============================================================
// ここに回答 ↓
function q6Answer(
  numbers: number[],
  predicate: any  // ← 正しい関数型を書いてください
): number[] {
  return []; // この関数を完成させてください
}

// ============================================================
// Q7: 関数型のエイリアスを定義しよう
// (a: number, b: number) => number という関数型に Calculator という名前をつけ、
// Calculator 型の変数 multiply に掛け算の関数を代入してください
// ============================================================
// ここに回答 ↓
type Calculator = any; // ここを修正

const q7Answer: any = (a: number, b: number) => {
  return 0; // この関数を完成させてください
};

// ============================================================
// Q8: 戻り値がオブジェクトのアロー関数を書こう
// name (string) と age (number) を受け取り、
// { name: string; age: number; isAdult: boolean } を返すアロー関数を作ってください
// isAdult は age >= 18 なら true
// ============================================================
// ここに回答 ↓
const q8Answer = (name: any, age: any): any => {
  return undefined; // この関数を完成させてください
};

// ============================================================
// Q9: 配列を操作する関数を書こう
// string の配列を受け取り、各文字列を大文字にして返す関数を作ってください
// Array.map を使ってください
// 例: ["hello", "world"] → ["HELLO", "WORLD"]
// ============================================================
// ここに回答 ↓
function q9Answer(items: string[]): string[] {
  return []; // この関数を完成させてください
}

// ============================================================
// Q10: 高階関数を書こう
// number を受け取り「number を受け取って number を返す関数」を返す関数を作ってください
// 外側で受け取った数値を掛ける関数を返します
// 例: const double = q10Answer(2); double(5) → 10
// ============================================================
// ここに回答 ↓
function q10Answer(multiplier: number): any {
  return undefined; // この関数を完成させてください
}

// ============================================================
// テスト実行（この部分は変更しないでください）
// ============================================================
function runChapter04Tests(): ChapterResult {
  const results: TestResult[] = [];

  results.push(runTest(1, "引数と戻り値に型をつけた関数", () => {
    assert.equal(q1Answer(2, 3), 5);
    assert.equal(q1Answer(-1, 1), 0);
    assert.equal(q1Answer(0, 0), 0);
  }));

  results.push(runTest(2, "アロー関数で文字数を返す", () => {
    assert.equal(q2Answer("hello"), 5);
    assert.equal(q2Answer(""), 0);
    assert.equal(q2Answer("TypeScript"), 10);
  }));

  results.push(runTest(3, "オプショナル引数", () => {
    assert.equal(q3Answer("田中"), "Hello, 田中!");
    assert.equal(q3Answer("田中", "こんにちは"), "こんにちは, 田中!");
  }));

  results.push(runTest(4, "デフォルト引数", () => {
    assert.equal(q4Answer(1000), 1100);
    assert.equal(q4Answer(1000, 0.08), 1080);
    assert.equal(q4Answer(200, 0), 200);
  }));

  results.push(runTest(5, "レストパラメータ", () => {
    assert.deepEqual(q5Answer("Mr.", "田中", "鈴木"), ["Mr. 田中", "Mr. 鈴木"]);
    assert.deepEqual(q5Answer("Dr.", "佐藤"), ["Dr. 佐藤"]);
    assert.deepEqual(q5Answer("Ms."), []);
  }));

  results.push(runTest(6, "コールバック関数を引数に取る関数", () => {
    assert.deepEqual(q6Answer([1, 2, 3, 4, 5], (n: number) => n > 3), [4, 5]);
    assert.deepEqual(q6Answer([10, 20, 30], (n: number) => n < 25), [10, 20]);
    assert.deepEqual(q6Answer([], (n: number) => true), []);
  }));

  results.push(runTest(7, "関数型エイリアスと掛け算", () => {
    assert.equal(q7Answer(3, 4), 12);
    assert.equal(q7Answer(5, 5), 25);
    assert.equal(q7Answer(0, 100), 0);
  }));

  results.push(runTest(8, "オブジェクトを返すアロー関数", () => {
    assert.deepEqual(q8Answer("太郎", 20), { name: "太郎", age: 20, isAdult: true });
    assert.deepEqual(q8Answer("花子", 15), { name: "花子", age: 15, isAdult: false });
    assert.deepEqual(q8Answer("次郎", 18), { name: "次郎", age: 18, isAdult: true });
  }));

  results.push(runTest(9, "配列の map で大文字に変換", () => {
    assert.deepEqual(q9Answer(["hello", "world"]), ["HELLO", "WORLD"]);
    assert.deepEqual(q9Answer(["a"]), ["A"]);
    assert.deepEqual(q9Answer([]), []);
  }));

  results.push(runTest(10, "高階関数（関数を返す関数）", () => {
    const double = q10Answer(2);
    const triple = q10Answer(3);
    assert.equal(double(5), 10);
    assert.equal(triple(5), 15);
    assert.equal(q10Answer(10)(3), 30);
  }));

  const passed = results.filter((r) => r.passed).length;
  return { chapter: "04章: 関数の型定義", results, passed, total: results.length };
}

export { runChapter04Tests };
