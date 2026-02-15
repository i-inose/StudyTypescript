// ============================================================
// 07章テスト: 型ガードと型の絞り込み
// 各問題の「ここに回答」部分を書き換えて、npm test で答え合わせしよう！
// ============================================================

import { assert, runTest } from "./test-runner";
import type { ChapterResult, TestResult } from "./test-runner";

// ============================================================
// Q1: typeof で型を絞り込もう
// string | number を受け取り、
// string なら "string: 値" を、number なら "number: 値" を返してください
// ============================================================
// ここに回答 ↓
function q1Answer(value: string | number): string {
  return ""; // typeof を使って絞り込んでください
}

// ============================================================
// Q2: null チェックで絞り込もう
// string | null を受け取り、
// string なら文字数を、null なら -1 を返してください
// ============================================================
// ここに回答 ↓
function q2Answer(value: string | null): number {
  return 0; // null チェックを使って絞り込んでください
}

// ============================================================
// Q3: instanceof で型を絞り込もう
// Date | string を受け取り、
// Date なら年（getFullYear()）を文字列で、string ならそのまま返してください
// ============================================================
// ここに回答 ↓
function q3Answer(value: Date | string): string {
  return ""; // instanceof を使って絞り込んでください
}

// ============================================================
// Q4: in 演算子で型を絞り込もう
// { name: string } | { title: string } を受け取り、
// name があればそれを、title があればそれを返してください
// ============================================================
interface WithName {
  name: string;
}
interface WithTitle {
  title: string;
}

// ここに回答 ↓
function q4Answer(obj: WithName | WithTitle): string {
  return ""; // "name" in obj で絞り込んでください
}

// ============================================================
// Q5: カスタム型ガード（is キーワード）を書こう
// unknown を受け取り、{ id: number; name: string } 型かどうか判定する
// 型ガード関数 isUser を書いてください
// ============================================================
interface SimpleUser {
  id: number;
  name: string;
}

// ここに回答 ↓
function q5Answer(value: unknown): value is SimpleUser {
  return false; // 型ガードの条件を書いてください
}

// ============================================================
// Q6: カスタム型ガードを使って配列をフィルタリングしよう
// (string | number)[] から number だけを抽出する関数を書いてください
// 型ガード (value): value is number を使ってください
// ============================================================
// ここに回答 ↓
function q6Answer(items: (string | number)[]): number[] {
  return []; // filter + 型ガードを使ってください
}

// ============================================================
// Q7: オプショナルチェイニング（?.）を使おう
// { user?: { name?: string } } を受け取り、
// name があればその値を、なければ "anonymous" を返してください
// ============================================================
interface NestedUser {
  user?: {
    name?: string;
  };
}

// ここに回答 ↓
function q7Answer(data: NestedUser): string {
  return ""; // ?. と ?? を使ってください
}

// ============================================================
// Q8: 複合的な型の絞り込みをしよう
// string | number | boolean | null を受け取り、
// string → "文字列", number → "数値", boolean → "真偽値", null → "空" を返してください
// ============================================================
// ここに回答 ↓
function q8Answer(value: string | number | boolean | null): string {
  return ""; // typeof と null チェックを組み合わせてください
}

// ============================================================
// Q9: 判別共用体 + 型ガードで安全に処理しよう
// 以下の Result 型を処理する関数を書いてください
// ok: true なら data を返し、ok: false なら "Error: " + error を返す
// ============================================================
type Result =
  | { ok: true; data: string }
  | { ok: false; error: string };

// ここに回答 ↓
function q9Answer(result: Result): string {
  return ""; // result.ok で絞り込んでください
}

// ============================================================
// Q10: Null 合体演算子（??）とオプショナルチェイニング（?.）の組み合わせ
// config?.settings?.theme ?? "light" のパターンで、
// ネストされたオブジェクトから安全に値を取得する関数を書いてください
// ============================================================
interface AppConfig {
  settings?: {
    theme?: string;
    fontSize?: number;
  };
}

// ここに回答 ↓
function q10Answer(config: AppConfig): { theme: string; fontSize: number } {
  // config から theme (デフォルト "light") と fontSize (デフォルト 14) を取得してください
  return { theme: "", fontSize: 0 }; // ?. と ?? を使って書き直してください
}

// ============================================================
// テスト実行（この部分は変更しないでください）
// ============================================================
function runChapter07Tests(): ChapterResult {
  const results: TestResult[] = [];

  results.push(runTest(1, "typeof で型を絞り込む", () => {
    assert.equal(q1Answer("hello"), "string: hello");
    assert.equal(q1Answer(42), "number: 42");
  }));

  results.push(runTest(2, "null チェックで絞り込む", () => {
    assert.equal(q2Answer("hello"), 5);
    assert.equal(q2Answer(""), 0);
    assert.equal(q2Answer(null), -1);
  }));

  results.push(runTest(3, "instanceof で型を絞り込む", () => {
    assert.equal(q3Answer(new Date("2026-01-15")), "2026");
    assert.equal(q3Answer("テスト"), "テスト");
  }));

  results.push(runTest(4, "in 演算子で型を絞り込む", () => {
    assert.equal(q4Answer({ name: "田中" }), "田中");
    assert.equal(q4Answer({ title: "レポート" }), "レポート");
  }));

  results.push(runTest(5, "カスタム型ガード（is キーワード）", () => {
    assert.isTrue(q5Answer({ id: 1, name: "太郎" }));
    assert.isFalse(q5Answer({ id: 1 }));
    assert.isFalse(q5Answer("not a user"));
    assert.isFalse(q5Answer(null));
  }));

  results.push(runTest(6, "型ガードで配列フィルタリング", () => {
    assert.deepEqual(q6Answer([1, "a", 2, "b", 3]), [1, 2, 3]);
    assert.deepEqual(q6Answer(["a", "b"]), []);
    assert.deepEqual(q6Answer([1, 2]), [1, 2]);
  }));

  results.push(runTest(7, "オプショナルチェイニング（?.）", () => {
    assert.equal(q7Answer({ user: { name: "太郎" } }), "太郎");
    assert.equal(q7Answer({ user: {} }), "anonymous");
    assert.equal(q7Answer({}), "anonymous");
  }));

  results.push(runTest(8, "複合的な型の絞り込み", () => {
    assert.equal(q8Answer("hello"), "文字列");
    assert.equal(q8Answer(42), "数値");
    assert.equal(q8Answer(true), "真偽値");
    assert.equal(q8Answer(null), "空");
  }));

  results.push(runTest(9, "判別共用体 + 型ガード", () => {
    assert.equal(q9Answer({ ok: true, data: "成功" }), "成功");
    assert.equal(q9Answer({ ok: false, error: "失敗" }), "Error: 失敗");
  }));

  results.push(runTest(10, "?. と ?? の組み合わせ", () => {
    assert.deepEqual(q10Answer({ settings: { theme: "dark", fontSize: 20 } }), { theme: "dark", fontSize: 20 });
    assert.deepEqual(q10Answer({ settings: {} }), { theme: "light", fontSize: 14 });
    assert.deepEqual(q10Answer({}), { theme: "light", fontSize: 14 });
  }));

  const passed = results.filter((r) => r.passed).length;
  return { chapter: "07章: 型ガードと型の絞り込み", results, passed, total: results.length };
}

export { runChapter07Tests };
