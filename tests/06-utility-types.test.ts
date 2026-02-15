// ============================================================
// 06章テスト: ユーティリティ型
// 各問題の「ここに回答」部分を書き換えて、npm test で答え合わせしよう！
// ============================================================

import { assert, runTest } from "./test-runner";
import type { ChapterResult, TestResult } from "./test-runner";

// テストで使う共通の型
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// ============================================================
// Q1: Partial<T> を使おう
// User の全プロパティをオプショナルにした型を使って、
// { name: "田中" } だけのオブジェクトを作ってください
// ============================================================
// ここに回答 ↓
const q1Answer: any = { name: "田中" };
// ヒント: Partial<User> を使う

// ============================================================
// Q2: Partial を使った更新関数を書こう
// User と Partial<User> を受け取り、マージした User を返す関数を書いてください
// ============================================================
// ここに回答 ↓
function q2Answer(user: User, updates: any): User {
  return user; // この関数を完成させてください（スプレッド構文を使う）
}

// ============================================================
// Q3: Required<T> を使おう
// 以下の PartialConfig の全プロパティを必須にした型を作り、
// 全プロパティを埋めたオブジェクトを作成してください
// ============================================================
interface PartialConfig {
  theme?: string;
  language?: string;
  fontSize?: number;
}

// ここに回答 ↓
const q3Answer: any = { theme: "dark", language: "ja", fontSize: 16 };
// ヒント: Required<PartialConfig> を使う

// ============================================================
// Q4: Pick<T, Keys> を使おう
// User から id と name だけを抜き出した型を作り、
// { id: 1, name: "田中" } でオブジェクトを作ってください
// ============================================================
// ここに回答 ↓
const q4Answer: any = { id: 1, name: "田中" };
// ヒント: Pick<User, "id" | "name"> を使う

// ============================================================
// Q5: Omit<T, Keys> を使おう
// User から id を除いた型を使って、
// { name: "田中", email: "a@b.com", age: 30 } でオブジェクトを作ってください
// ============================================================
// ここに回答 ↓
const q5Answer: any = { name: "田中", email: "a@b.com", age: 30 };
// ヒント: Omit<User, "id"> を使う

// ============================================================
// Q6: Record<Keys, Type> を使おう
// "morning" | "afternoon" | "evening" をキーに、string を値にした
// Record 型の変数を作ってください
// ============================================================
// ここに回答 ↓
type TimeOfDay = "morning" | "afternoon" | "evening";

const q6Answer: any = {
  morning: "おはよう",
  afternoon: "こんにちは",
  evening: "こんばんは",
};
// ヒント: Record<TimeOfDay, string> を使う

// ============================================================
// Q7: Exclude を使おう
// "a" | "b" | "c" | "d" から "c" | "d" を除外した型を作り、
// "a" を代入した変数を作ってください
// ============================================================
// ここに回答 ↓
type Letters = "a" | "b" | "c" | "d";
type FilteredLetters = any; // Exclude を使ってここを修正

const q7Answer: any = "a";

// ============================================================
// Q8: ReturnType を使おう
// 以下の関数 createUser の戻り値の型を ReturnType で取得し、
// その型の変数を作ってください
// ============================================================
function createUser(name: string, age: number) {
  return { name, age, createdAt: new Date() };
}

// ここに回答 ↓
type CreatedUser = any; // ReturnType<typeof createUser> を使ってここを修正

const q8Answer: any = { name: "太郎", age: 25, createdAt: new Date() };

// ============================================================
// Q9: Readonly<T> を使おう
// User を Readonly にした型の変数を作ってください
// 値は { id: 1, name: "田中", email: "a@b.com", age: 30 } にしてください
// ============================================================
// ここに回答 ↓
const q9Answer: any = { id: 1, name: "田中", email: "a@b.com", age: 30 };
// ヒント: Readonly<User> を使う

// ============================================================
// Q10: ユーティリティ型を組み合わせよう
// User から id を Omit で除き、さらに Partial にした型を使って、
// { name: "鈴木" } だけのオブジェクトを作ってください
// （id なし、かつ全プロパティ省略可能）
// ============================================================
// ここに回答 ↓
const q10Answer: any = { name: "鈴木" };
// ヒント: Partial<Omit<User, "id">> を使う

// ============================================================
// テスト実行（この部分は変更しないでください）
// ============================================================
function runChapter06Tests(): ChapterResult {
  const results: TestResult[] = [];

  results.push(runTest(1, "Partial<T> で部分オブジェクト", () => {
    assert.equal(q1Answer.name, "田中");
    assert.equal(q1Answer.id, undefined);
    assert.equal(q1Answer.email, undefined);
  }));

  results.push(runTest(2, "Partial を使った更新関数", () => {
    const user: User = { id: 1, name: "田中", email: "a@b.com", age: 30 };
    const updated = q2Answer(user, { name: "鈴木", age: 25 });
    assert.equal(updated.id, 1);
    assert.equal(updated.name, "鈴木");
    assert.equal(updated.email, "a@b.com");
    assert.equal(updated.age, 25);
  }));

  results.push(runTest(3, "Required<T> で全プロパティ必須", () => {
    assert.equal(q3Answer.theme, "dark");
    assert.equal(q3Answer.language, "ja");
    assert.equal(q3Answer.fontSize, 16);
  }));

  results.push(runTest(4, "Pick<T, Keys> で抜き出し", () => {
    assert.deepEqual(q4Answer, { id: 1, name: "田中" });
    assert.equal(q4Answer.email, undefined);
  }));

  results.push(runTest(5, "Omit<T, Keys> で除外", () => {
    assert.equal(q5Answer.name, "田中");
    assert.equal(q5Answer.email, "a@b.com");
    assert.equal(q5Answer.age, 30);
    assert.equal(q5Answer.id, undefined);
  }));

  results.push(runTest(6, "Record<Keys, Type> で辞書型", () => {
    assert.equal(q6Answer.morning, "おはよう");
    assert.equal(q6Answer.afternoon, "こんにちは");
    assert.equal(q6Answer.evening, "こんばんは");
  }));

  results.push(runTest(7, "Exclude でユニオンから除外", () => {
    assert.equal(q7Answer, "a");
  }));

  results.push(runTest(8, "ReturnType で戻り値の型を取得", () => {
    assert.equal(q8Answer.name, "太郎");
    assert.equal(q8Answer.age, 25);
    assert.isNotNull(q8Answer.createdAt);
  }));

  results.push(runTest(9, "Readonly<T> で読み取り専用", () => {
    assert.equal(q9Answer.id, 1);
    assert.equal(q9Answer.name, "田中");
    assert.equal(q9Answer.email, "a@b.com");
    assert.equal(q9Answer.age, 30);
  }));

  results.push(runTest(10, "Partial<Omit<T, K>> の組み合わせ", () => {
    assert.equal(q10Answer.name, "鈴木");
    assert.equal(q10Answer.id, undefined);
  }));

  const passed = results.filter((r) => r.passed).length;
  return { chapter: "06章: ユーティリティ型", results, passed, total: results.length };
}

export { runChapter06Tests };
