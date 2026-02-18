// ============================================================
// 02章テスト: インターフェースと型エイリアス
// 各問題の「ここに回答」部分を書き換えて、npm test で答え合わせしよう！
// ============================================================

import { assert, runTest, printChapterResult } from "./test-runner";
import type { ChapterResult, TestResult } from "./test-runner";

// ============================================================
// Q1: interface でオブジェクトの型を定義しよう
// id (number), name (string), email (string) を持つ User インターフェースを定義し、
// そのインターフェースを使って変数 user を宣言してください
// ============================================================
// ここに回答 ↓
interface User {
  id: number;
  name: string;
  email: string;
}
// interface User { ... } を定義してください

const q1Answer: User = { id: 1, name: "田中", email: "tanaka@example.com" };

// ============================================================
// Q2: オプショナルプロパティ（?）を使おう
// name (string, 必須) と age (number, 省略可能) を持つ
// interface Profile を定義してください
// age を省略した { name: "太郎" } というオブジェクトを作ってください
// ============================================================
// ここに回答 ↓
interface Profile {
  name: string;
  age?: number;
}
// interface Profile { ... } を定義してください

const q2Answer: Profile = { name: "太郎" };

// ============================================================
// Q3: readonly プロパティを使おう
// readonly な id (number) と、変更可能な name (string) を持つ
// interface Item を定義してください
// { id: 100, name: "ペン" } で作成してください
// ============================================================
// ここに回答 ↓
interface Item {
  readonly id: number;
  name: string;
}
// interface Item { ... } を定義してください

const q3Answer: Item = { id: 100, name: "ペン" };

// ============================================================
// Q4: type エイリアスでユニオン型に名前をつけよう
// "small" | "medium" | "large" というユニオン型に Size という名前をつけ、
// Size 型の変数に "medium" を代入してください
// ============================================================
// ここに回答 ↓
type Size = "small" | "medium" | "large"; // ここを修正

const q4Answer: Size = "medium";

// ============================================================
// Q5: interface を extends で拡張しよう
// BaseAnimal { name: string } を継承して、
// Dog { name: string; breed: string } を作ってください
// { name: "ポチ", breed: "柴犬" } で変数を作ってください
// ============================================================
// ここに回答 ↓

interface BaseAnimal {
  name: string;
}

interface Dog extends BaseAnimal {
  breed: string;
}

// interface Dog extends ... を定義してください

const q5Answer: Dog = { name: "ポチ", breed: "柴犬" };

// ============================================================
// Q6: 交差型（&）で型を合成しよう
// type WithId = { id: number } と type WithName = { name: string } を定義し、
// 両方を & で合成した型 Identified を作ってください
// { id: 1, name: "テスト" } で変数を作ってください
// ============================================================
// ここに回答 ↓

type WithId = { id: number }; // ここを修正
type WithName = { name: string }; // ここを修正
type Identified = WithId & WithName; // ここを修正 (& を使う)

const q6Answer: Identified = { id: 1, name: "テスト" };

// ============================================================
// Q7: インデックスシグネチャを使おう
// string をキーに、number を値に持つ辞書型 ScoreMap を定義してください
// { math: 90, english: 85, science: 78 } で変数を作ってください
// ============================================================
// ここに回答 ↓
interface ScoreMap {
  [name: string]: number;
}
// interface ScoreMap または type ScoreMap を定義してください

const q7Answer: ScoreMap = { math: 90, english: 85, science: 78 };

// ============================================================
// Q8: 複数の interface を継承しよう
// Printable { print(): string } と Saveable { save(): boolean } の
// 2つの interface を作り、両方を継承した Document interface を定義してください
// Document に title: string も追加してください
// ============================================================
// ここに回答 ↓
interface Printable {
  print(): string;
}

interface Saveable {
  save(): boolean;
}

interface Document extends Printable, Saveable {
  title: string;
}
// interface Printable { ... }
// interface Saveable { ... }
// interface Document extends Printable, Saveable { ... }

const q8Answer: Document = {
  title: "レポート",
  print() {
    return this.title;
  },
  save() {
    return true;
  },
};

// ============================================================
// Q9: type でタプル型に名前をつけよう
// [string, number] のタプルに NameAndAge という型名をつけて、
// ["田中", 25] で変数を作ってください
// ============================================================
// ここに回答 ↓

type NameAndAge = [string, number]; // ここを修正

const q9Answer: NameAndAge = ["田中", 25];

// ============================================================
// Q10: 型エイリアスでオブジェクト型を定義しよう（interface と同等）
// type を使って、x (number) と y (number) を持つ Point 型を定義してください
// { x: 10, y: 20 } で変数を作ってください
// ============================================================
// ここに回答 ↓

type Point = {
  x: number;
  y: number;
}; // ここを修正

const q10Answer: Point = { x: 10, y: 20 };

// ============================================================
// テスト実行（この部分は変更しないでください）
// ============================================================
function runChapter02Tests(): ChapterResult {
  const results: TestResult[] = [];

  results.push(
    runTest(1, "interface でオブジェクトの型を定義", () => {
      assert.deepEqual(q1Answer, {
        id: 1,
        name: "田中",
        email: "tanaka@example.com",
      });
      assert.typeOf(q1Answer.id, "number");
      assert.typeOf(q1Answer.name, "string");
      assert.typeOf(q1Answer.email, "string");
    }),
  );

  results.push(
    runTest(2, "オプショナルプロパティ（?）", () => {
      assert.equal(q2Answer.name, "太郎");
      assert.equal(q2Answer.age, undefined);
    }),
  );

  results.push(
    runTest(3, "readonly プロパティ", () => {
      assert.equal(q3Answer.id, 100);
      assert.equal(q3Answer.name, "ペン");
    }),
  );

  results.push(
    runTest(4, "type エイリアスでユニオン型", () => {
      assert.equal(q4Answer, "medium");
      // Size 型が正しく定義されていれば "medium" を受け入れる
    }),
  );

  results.push(
    runTest(5, "interface の extends による拡張", () => {
      assert.equal(q5Answer.name, "ポチ");
      assert.equal(q5Answer.breed, "柴犬");
    }),
  );

  results.push(
    runTest(6, "交差型（&）で型を合成", () => {
      assert.equal(q6Answer.id, 1);
      assert.equal(q6Answer.name, "テスト");
    }),
  );

  results.push(
    runTest(7, "インデックスシグネチャ", () => {
      assert.equal(q7Answer.math, 90);
      assert.equal(q7Answer.english, 85);
      assert.equal(q7Answer.science, 78);
    }),
  );

  results.push(
    runTest(8, "複数 interface の継承", () => {
      assert.equal(q8Answer.title, "レポート");
      assert.equal(q8Answer.print(), "レポート");
      assert.equal(q8Answer.save(), true);
    }),
  );

  results.push(
    runTest(9, "type でタプル型に名前をつける", () => {
      assert.deepEqual(q9Answer, ["田中", 25]);
      assert.typeOf(q9Answer[0], "string");
      assert.typeOf(q9Answer[1], "number");
    }),
  );

  results.push(
    runTest(10, "type でオブジェクト型を定義", () => {
      assert.deepEqual(q10Answer, { x: 10, y: 20 });
      assert.typeOf(q10Answer.x, "number");
      assert.typeOf(q10Answer.y, "number");
    }),
  );

  const passed = results.filter((r) => r.passed).length;
  return {
    chapter: "02章: インターフェースと型エイリアス",
    results,
    passed,
    total: results.length,
  };
}

export { runChapter02Tests };
