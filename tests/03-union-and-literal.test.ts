// ============================================================
// 03章テスト: ユニオン型・リテラル型・判別共用体
// 各問題の「ここに回答」部分を書き換えて、npm test で答え合わせしよう！
// ============================================================

import { assert, runTest, printChapterResult } from "./test-runner";
import type { ChapterResult, TestResult } from "./test-runner";

// ============================================================
// Q1: ユニオン型を使おう
// string | number 型の変数を2つ作り、
// 1つには数値 42 を、もう1つには文字列 "hello" を代入してください
// ============================================================
// ここに回答 ↓
const q1a: string | number = 42;
const q1b: string | number = "hello";

// ============================================================
// Q2: リテラル型を定義しよう
// "success" | "error" | "pending" というリテラル型を Status と名付けて、
// "pending" を代入した変数を作ってください
// ============================================================
// ここに回答 ↓
type Status = "success" | "error" | "pending"; // ここを修正

const q2Answer: Status = "pending";

// ============================================================
// Q3: ユニオン型を使って関数を書こう
// string | number を受け取り、string なら文字数を、number ならそのまま返す
// 関数 getLength を作ってください
// 例: getLength("abc") → 3,  getLength(42) → 42
// ============================================================
// ここに回答 ↓
function q3Answer(value: string | number): number {
  if (typeof value === "string") {
    return value.length;
  }
  return value; // この関数を完成させてください
}

// ============================================================
// Q4: 判別共用体を定義しよう
// type プロパティで区別できるユニオン型を作ってください:
//   { type: "circle"; radius: number }
//   { type: "rectangle"; width: number; height: number }
// Shape という型名をつけてください
// ============================================================
// ここに回答 ↓
type Shape =
  | { type: "circle"; radius: number }
  | { type: "rectangle"; width: number; height: number }; // ここを修正

// ============================================================
// Q5: 判別共用体を switch で処理しよう
// Q4 の Shape 型を受け取り、面積を計算する関数を作ってください
// circle: π × radius²   rectangle: width × height
// ============================================================
// ここに回答 ↓
function q5Answer(shape: Shape): number {
  switch (shape.type) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  } // この関数を完成させてください
}

// ============================================================
// Q6: null を含むユニオン型を安全に処理しよう
// string | null を受け取り、
// string なら大文字に変換、null なら "N/A" を返す関数を作ってください
// ============================================================
// ここに回答 ↓
function q6Answer(value: string | null): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return "N/A"; // この関数を完成させてください
}

// ============================================================
// Q7: API の状態をユニオン型で表現しよう
// 以下の3つの状態を持つ ApiState 型を定義してください:
//   { status: "idle" }
//   { status: "loading" }
//   { status: "done"; data: string }
// ============================================================
// ここに回答 ↓
type ApiState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; data: string }; // ここを修正

// ============================================================
// Q8: ApiState に応じたメッセージを返す関数を書こう
// idle → "待機中"、loading → "読込中"、done → data の値をそのまま返す
// ============================================================
// ここに回答 ↓
function q8Answer(state: ApiState): string {
  if (state.status === "idle") {
    return "待機中";
  } else if (state.status === "loading") {
    return "読込中";
  }
  return state.data; // この関数を完成させてください
}

// ============================================================
// Q9: exhaustive check を実装しよう
// "red" | "green" | "blue" を受け取り、色コードを返す関数を書いてください
// red → "#FF0000", green → "#00FF00", blue → "#0000FF"
// default で never を使った exhaustive check を入れてください
// ============================================================
// ここに回答 ↓
function q9Answer(color: "red" | "green" | "blue"): string {
  switch (color) {
    case "red":
      return "#FF0000";
    case "green":
      return "#00FF00";
    case "blue":
      return "#0000FF";
    default:
      // ここに到達するのは全ケースを書き忘れたときだけ
      // never型に代入することで、漏れがあればコンパイルエラーになる
      const _exhaustiveCheck: never = color;
      return _exhaustiveCheck;
  }
}

// ============================================================
// Q10: 複数の型を組み合わせた実践問題
// 以下のアクション型を定義し、reducer 関数を書いてください:
//   { type: "INCREMENT" }
//   { type: "DECREMENT" }
//   { type: "SET"; payload: number }
//
// reducer は現在の数値（number）とアクションを受け取り、新しい数値を返します
//   INCREMENT → +1, DECREMENT → -1, SET → payload の値にする
// ============================================================
// ここに回答 ↓
type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET"; payload: number }; // ここを修正

function q10Answer(state: number, action: CounterAction): number {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "SET":
      return action.payload;
  }
}

// ============================================================
// テスト実行（この部分は変更しないでください）
// ============================================================
function runChapter03Tests(): ChapterResult {
  const results: TestResult[] = [];

  results.push(
    runTest(1, "ユニオン型（string | number）", () => {
      assert.equal(q1a, 42);
      assert.equal(q1b, "hello");
    }),
  );

  results.push(
    runTest(2, "リテラル型の定義", () => {
      assert.equal(q2Answer, "pending");
    }),
  );

  results.push(
    runTest(3, "ユニオン型を使った関数", () => {
      assert.equal(q3Answer("abc"), 3);
      assert.equal(q3Answer(""), 0);
      assert.equal(q3Answer(42), 42);
      assert.equal(q3Answer(0), 0);
    }),
  );

  results.push(
    runTest(4, "判別共用体の定義", () => {
      const circle: Shape = { type: "circle", radius: 5 } as any;
      const rect: Shape = { type: "rectangle", width: 3, height: 4 } as any;
      assert.equal(circle.type, "circle");
      assert.equal(rect.type, "rectangle");
    }),
  );

  results.push(
    runTest(5, "判別共用体を switch で処理", () => {
      const circle = { type: "circle" as const, radius: 5 };
      const rect = { type: "rectangle" as const, width: 3, height: 4 };
      assert.equal(Math.round(q5Answer(circle) * 100) / 100, 78.54);
      assert.equal(q5Answer(rect), 12);
    }),
  );

  results.push(
    runTest(6, "null を含むユニオン型の処理", () => {
      assert.equal(q6Answer("hello"), "HELLO");
      assert.equal(q6Answer("abc"), "ABC");
      assert.equal(q6Answer(null), "N/A");
    }),
  );

  results.push(
    runTest(7, "API 状態のユニオン型定義", () => {
      const idle: ApiState = { status: "idle" } as any;
      const loading: ApiState = { status: "loading" } as any;
      const done: ApiState = { status: "done", data: "結果" } as any;
      assert.equal(idle.status, "idle");
      assert.equal(loading.status, "loading");
      assert.equal(done.status, "done");
    }),
  );

  results.push(
    runTest(8, "API 状態に応じたメッセージ", () => {
      assert.equal(q8Answer({ status: "idle" }), "待機中");
      assert.equal(q8Answer({ status: "loading" }), "読込中");
      assert.equal(
        q8Answer({ status: "done", data: "完了データ" }),
        "完了データ",
      );
    }),
  );

  results.push(
    runTest(9, "exhaustive check", () => {
      assert.equal(q9Answer("red"), "#FF0000");
      assert.equal(q9Answer("green"), "#00FF00");
      assert.equal(q9Answer("blue"), "#0000FF");
    }),
  );

  results.push(
    runTest(10, "reducer パターン（useReducer 風）", () => {
      assert.equal(q10Answer(0, { type: "INCREMENT" }), 1);
      assert.equal(q10Answer(5, { type: "DECREMENT" }), 4);
      assert.equal(q10Answer(0, { type: "SET", payload: 100 }), 100);
      assert.equal(q10Answer(10, { type: "INCREMENT" }), 11);
    }),
  );

  const passed = results.filter((r) => r.passed).length;
  return {
    chapter: "03章: ユニオン型・リテラル型・判別共用体",
    results,
    passed,
    total: results.length,
  };
}

export { runChapter03Tests };
