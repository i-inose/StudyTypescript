// ============================================================
// 08章テスト: 高度な型操作
// 各問題の「ここに回答」部分を書き換えて、npm test で答え合わせしよう！
// ============================================================

import { assert, runTest } from "./test-runner";
import type { ChapterResult, TestResult } from "./test-runner";

// テストで使う共通の型
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

// ============================================================
// Q1: keyof を使おう
// Product のキー名を取得する型 ProductKey を定義し、
// "name" を代入した変数を作ってください
// ============================================================
// ここに回答 ↓
type ProductKey = any; // keyof を使ってここを修正

const q1Answer: any = "name";

// ============================================================
// Q2: keyof を使った関数を書こう
// オブジェクト T とキー K を受け取り、値を返す汎用関数を書いてください
// 例: getValue(product, "name") → product.name
// ============================================================
// ここに回答 ↓
function q2Answer(obj: any, key: any): any {
  return undefined; // <T, K extends keyof T> を使ってください
}

// ============================================================
// Q3: typeof で変数から型を取得しよう
// 以下の defaultSettings の型を typeof で取得し、
// 同じ型の別のオブジェクトを作ってください
// ============================================================
const defaultSettings = {
  volume: 50,
  muted: false,
  quality: "high" as const,
};

// ここに回答 ↓
// type Settings = typeof ... を定義してください

const q3Answer: any = {
  volume: 80,
  muted: true,
  quality: "high",
};

// ============================================================
// Q4: マップ型を使おう
// Product の全プロパティを string に変換する型 StringProduct を定義し、
// オブジェクトを作ってください
// ============================================================
// ここに回答 ↓
type StringProduct = any; // マップ型 { [K in keyof Product]: string } を使う

const q4Answer: any = {
  id: "1",
  name: "ペン",
  price: "100",
  inStock: "true",
};

// ============================================================
// Q5: マップ型でオプショナルにしよう
// Product の全プロパティをオプショナルにするマップ型を自作してください
// （Partial を使わずに、[K in keyof T]?: T[K] の形で書く）
// ============================================================
// ここに回答 ↓
type MyPartial<T> = any; // マップ型を使ってここを修正

const q5Answer: any = { name: "ペン" };
// id, price, inStock は省略可能

// ============================================================
// Q6: インデックスアクセス型を使おう
// Product["price"] で price の型を取得し、
// その型の変数を作ってください
// ============================================================
// ここに回答 ↓
type PriceType = any; // Product["price"] を使ってここを修正

const q6Answer: any = 1500;

// ============================================================
// Q7: テンプレートリテラル型を使おう
// "get" | "set" と "Name" | "Age" を組み合わせて
// "getName" | "getAge" | "setName" | "setAge" という型を作ってください
// ============================================================
// ここに回答 ↓
type Prefix = "get" | "set";
type Suffix = "Name" | "Age";
type MethodName = any; // テンプレートリテラル型 `${...}${...}` を使う

const q7Answer: any = "getName";

// ============================================================
// Q8: 条件型を使おう
// T が string なら "文字列" を、そうでなければ "その他" を返す型
// StringCheck<T> を定義してください
// ============================================================
// ここに回答 ↓
type StringCheck<T> = any; // T extends string ? "文字列" : "その他" を使う

// 以下で型が正しいか確認（値はテストで使います）
const q8a: any = "文字列";   // StringCheck<string> なら "文字列"
const q8b: any = "その他";   // StringCheck<number> なら "その他"

// ============================================================
// Q9: keyof と typeof の組み合わせ
// 以下のオブジェクトのキーだけをユニオン型として取得してください
// ============================================================
const colorMap = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
} as const;

// ここに回答 ↓
type ColorName = any; // keyof typeof colorMap を使う

const q9Answer: any = "red";

// ============================================================
// Q10: マップ型で全プロパティを関数に変換しよう
// Product の各プロパティを () => T[K] に変換する型 Getters<T> を作ってください
// { id: () => number; name: () => string; ... } のような型になります
// ============================================================
// ここに回答 ↓
type Getters<T> = any; // { [K in keyof T]: () => T[K] } を使う

const q10Answer: any = {
  id: () => 1,
  name: () => "ペン",
  price: () => 100,
  inStock: () => true,
};

// ============================================================
// テスト実行（この部分は変更しないでください）
// ============================================================
function runChapter08Tests(): ChapterResult {
  const results: TestResult[] = [];

  results.push(runTest(1, "keyof でキー名を取得", () => {
    assert.equal(q1Answer, "name");
  }));

  results.push(runTest(2, "keyof を使った汎用プロパティ取得関数", () => {
    const product: Product = { id: 1, name: "ペン", price: 100, inStock: true };
    assert.equal(q2Answer(product, "name"), "ペン");
    assert.equal(q2Answer(product, "price"), 100);
    assert.equal(q2Answer(product, "inStock"), true);
  }));

  results.push(runTest(3, "typeof で変数から型を取得", () => {
    assert.typeOf(q3Answer.volume, "number");
    assert.typeOf(q3Answer.muted, "boolean");
    assert.equal(q3Answer.quality, "high");
  }));

  results.push(runTest(4, "マップ型で全プロパティを string に", () => {
    assert.typeOf(q4Answer.id, "string");
    assert.typeOf(q4Answer.name, "string");
    assert.typeOf(q4Answer.price, "string");
    assert.typeOf(q4Answer.inStock, "string");
  }));

  results.push(runTest(5, "マップ型でオプショナル化（Partial 自作）", () => {
    assert.equal(q5Answer.name, "ペン");
    assert.equal(q5Answer.id, undefined);
  }));

  results.push(runTest(6, "インデックスアクセス型", () => {
    assert.typeOf(q6Answer, "number");
    assert.equal(q6Answer, 1500);
  }));

  results.push(runTest(7, "テンプレートリテラル型", () => {
    assert.equal(q7Answer, "getName");
  }));

  results.push(runTest(8, "条件型（Conditional Types）", () => {
    assert.equal(q8a, "文字列");
    assert.equal(q8b, "その他");
  }));

  results.push(runTest(9, "keyof typeof の組み合わせ", () => {
    assert.equal(q9Answer, "red");
    // "red" | "green" | "blue" のいずれかであること
    assert.isTrue(["red", "green", "blue"].includes(q9Answer));
  }));

  results.push(runTest(10, "マップ型で全プロパティをゲッター関数に", () => {
    assert.typeOf(q10Answer.id, "function");
    assert.typeOf(q10Answer.name, "function");
    assert.equal(q10Answer.id(), 1);
    assert.equal(q10Answer.name(), "ペン");
    assert.equal(q10Answer.price(), 100);
    assert.equal(q10Answer.inStock(), true);
  }));

  const passed = results.filter((r) => r.passed).length;
  return { chapter: "08章: 高度な型操作", results, passed, total: results.length };
}

export { runChapter08Tests };
