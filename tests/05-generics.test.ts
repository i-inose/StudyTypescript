// ============================================================
// 05章テスト: ジェネリクス
// 各問題の「ここに回答」部分を書き換えて、npm test で答え合わせしよう！
// ============================================================

import { assert, runTest } from "./test-runner";
import type { ChapterResult, TestResult } from "./test-runner";

// ============================================================
// Q1: ジェネリック関数を書こう（基本）
// 任意の型 T の値をそのまま返す identity 関数を作ってください
// 例: identity<number>(42) → 42,  identity<string>("hi") → "hi"
// ============================================================
// ここに回答 ↓
function q1Answer(value: any): any {
  return undefined; // <T> を使って書き直してください
}

// ============================================================
// Q2: 配列の最初の要素を返すジェネリック関数を書こう
// T[] を受け取り、最初の要素（T | undefined）を返してください
// ============================================================
// ここに回答 ↓
function q2Answer(items: any[]): any {
  return undefined; // <T> を使って書き直してください
}

// ============================================================
// Q3: 2つの型パラメータを使おう
// キー（K型）と値（V型）を受け取り、{ key: K; value: V } を返す関数を書いてください
// ============================================================
// ここに回答 ↓
function q3Answer(key: any, value: any): any {
  return undefined; // <K, V> を使って書き直してください
}

// ============================================================
// Q4: ジェネリック制約（extends）を使おう
// { length: number } を持つ型に制約した T を受け取り、
// その length を返す関数を書いてください
// 例: q4Answer("hello") → 5,  q4Answer([1,2,3]) → 3
// ============================================================
// ここに回答 ↓
function q4Answer(value: any): number {
  return 0; // <T extends ...> を使って書き直してください
}

// ============================================================
// Q5: ジェネリックインターフェースを定義しよう
// { data: T; error: string | null } という形の Box<T> インターフェースを定義し、
// Box<number> 型の変数を { data: 42, error: null } で作ってください
// ============================================================
// ここに回答 ↓

// interface Box<T> { ... } を定義してください

const q5Answer: any = { data: 42, error: null };

// ============================================================
// Q6: ジェネリック関数で配列をラップしよう
// T型の値を受け取り、T[] を返す toArray 関数を作ってください
// 例: toArray(5) → [5],  toArray("hi") → ["hi"]
// ============================================================
// ここに回答 ↓
function q6Answer(value: any): any {
  return undefined; // <T> を使って書き直してください
}

// ============================================================
// Q7: useState のシミュレーションを書こう
// 初期値 T を受け取り、[T, (newValue: T) => void] のタプルを返す
// simpleState 関数を作ってください
// セッター関数は何もしなくてOK（空の関数でよい）
// ============================================================
// ここに回答 ↓
function q7Answer(initial: any): any {
  return undefined; // <T> を使って [値, セッター] のタプルを返してください
}

// ============================================================
// Q8: ジェネリック関数で配列をマージしよう
// T[] と T[] を受け取り、結合した T[] を返す関数を書いてください
// 例: merge([1,2], [3,4]) → [1,2,3,4]
// ============================================================
// ここに回答 ↓
function q8Answer(a: any[], b: any[]): any[] {
  return []; // <T> を使って書き直してください
}

// ============================================================
// Q9: ジェネリック制約で keyof を使おう
// オブジェクト T とそのキー K を受け取り、T[K] を返す関数を書いてください
// 例: q9Answer({ name: "太郎", age: 20 }, "name") → "太郎"
// ============================================================
// ここに回答 ↓
function q9Answer(obj: any, key: any): any {
  return undefined; // <T, K extends keyof T> を使って書き直してください
}

// ============================================================
// Q10: デフォルト型パラメータを使おう
// T のデフォルトが string の Container<T> インターフェースを定義してください
// { value: T } という形です
// Container（型パラメータ省略）で { value: "hello" } を作ってください
// ============================================================
// ここに回答 ↓

// interface Container<T = ...> { ... } を定義してください

const q10Answer: any = { value: "hello" };

// ============================================================
// テスト実行（この部分は変更しないでください）
// ============================================================
function runChapter05Tests(): ChapterResult {
  const results: TestResult[] = [];

  results.push(runTest(1, "identity ジェネリック関数", () => {
    assert.equal(q1Answer(42), 42);
    assert.equal(q1Answer("hello"), "hello");
    assert.equal(q1Answer(true), true);
  }));

  results.push(runTest(2, "配列の最初の要素を返す", () => {
    assert.equal(q2Answer([10, 20, 30]), 10);
    assert.equal(q2Answer(["a", "b"]), "a");
    assert.equal(q2Answer([]), undefined);
  }));

  results.push(runTest(3, "2つの型パラメータ（key-value ペア）", () => {
    assert.deepEqual(q3Answer("name", "太郎"), { key: "name", value: "太郎" });
    assert.deepEqual(q3Answer(1, true), { key: 1, value: true });
  }));

  results.push(runTest(4, "ジェネリック制約（extends { length }）", () => {
    assert.equal(q4Answer("hello"), 5);
    assert.equal(q4Answer([1, 2, 3]), 3);
    assert.equal(q4Answer(""), 0);
  }));

  results.push(runTest(5, "ジェネリックインターフェース Box<T>", () => {
    assert.deepEqual(q5Answer, { data: 42, error: null });
    assert.typeOf(q5Answer.data, "number");
  }));

  results.push(runTest(6, "値を配列にラップする toArray", () => {
    assert.deepEqual(q6Answer(5), [5]);
    assert.deepEqual(q6Answer("hi"), ["hi"]);
    assert.deepEqual(q6Answer(true), [true]);
  }));

  results.push(runTest(7, "useState シミュレーション", () => {
    const [value, setter] = q7Answer(42);
    assert.equal(value, 42);
    assert.typeOf(setter, "function");

    const [strValue, strSetter] = q7Answer("hello");
    assert.equal(strValue, "hello");
    assert.typeOf(strSetter, "function");
  }));

  results.push(runTest(8, "2つの配列をマージ", () => {
    assert.deepEqual(q8Answer([1, 2], [3, 4]), [1, 2, 3, 4]);
    assert.deepEqual(q8Answer(["a"], ["b", "c"]), ["a", "b", "c"]);
    assert.deepEqual(q8Answer([], [1]), [1]);
  }));

  results.push(runTest(9, "keyof 制約でオブジェクトのプロパティ取得", () => {
    assert.equal(q9Answer({ name: "太郎", age: 20 }, "name"), "太郎");
    assert.equal(q9Answer({ name: "太郎", age: 20 }, "age"), 20);
    assert.equal(q9Answer({ x: 1, y: 2 }, "x"), 1);
  }));

  results.push(runTest(10, "デフォルト型パラメータ", () => {
    assert.deepEqual(q10Answer, { value: "hello" });
    assert.typeOf(q10Answer.value, "string");
  }));

  const passed = results.filter((r) => r.passed).length;
  return { chapter: "05章: ジェネリクス", results, passed, total: results.length };
}

export { runChapter05Tests };
