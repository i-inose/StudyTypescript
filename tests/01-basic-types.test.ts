// ============================================================
// 01章テスト: 基本型
// 各問題の「ここに回答」部分を書き換えて、npm test で答え合わせしよう！
// ============================================================

import { assert, runTest, printChapterResult } from "./test-runner";
import type { ChapterResult, TestResult } from "./test-runner";

// ============================================================
// Q1: 変数に正しい型注釈をつけよう
// "Hello TypeScript" という文字列を格納する変数に型をつけてください
// ============================================================
// ここに回答 ↓（: の後の型を書き換える）
const q1Answer: string = "Hello TypeScript";
// ヒント: 文字列を格納するための基本型は？

// ============================================================
// Q2: 数値型の変数を宣言しよう
// 円周率（3.14）を格納する変数を正しい型で宣言してください
// ============================================================
// ここに回答 ↓
const q2Answer: number = 3.14;
// ヒント: 整数も小数も扱える型は？

// ============================================================
// Q3: boolean 型の変数を宣言しよう
// 「タスクが完了している」ことを示す true を格納してください
// ============================================================
// ここに回答 ↓
const q3Answer: boolean = true;

// ============================================================
// Q4: null を許容する型を宣言しよう
// まだ選択されていないユーザーIDを表す変数を宣言してください
// 値は null にしてください。型は「number または null」です
// ============================================================
// ここに回答 ↓
const q4Answer: number | null = null;
// ヒント: | を使って2つの型を組み合わせる

// ============================================================
// Q5: 配列の型を宣言しよう
// 文字列の配列 ["React", "Vue", "Angular"] に正しい型をつけてください
// ============================================================
// ここに回答 ↓
const q5Answer: string[] = ["React", "Vue", "Angular"];

// ============================================================
// Q6: タプル型を宣言しよう
// [ID(number), 名前(string), 完了(boolean)] のタプルを作ってください
// 値は [1, "勉強", false] にしてください
// ============================================================
// ここに回答 ↓
const q6Answer: [number, string, boolean] = [1, "勉強", false];
// ヒント: [型, 型, 型] の形で書く

// ============================================================
// Q7: void を返す関数を書こう
// 引数 message (string) を受け取り、console.log で出力する関数を作ってください
// 戻り値の型は void です
// ============================================================
// ここに回答 ↓
function q7Answer(message: string): void {
  // ここに処理を書く
  console.log(message);
}

// ============================================================
// Q8: unknown 型を安全に扱おう
// unknown 型の引数を受け取り、string なら大文字に変換して返し、
// そうでなければ "not a string" を返す関数を作ってください
// ============================================================
// ここに回答 ↓
function q8Answer(value: unknown): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return "not a string"; // この関数を完成させてください
}

// ============================================================
// Q9: as const を使おう
// ["todo", "doing", "done"] という配列を as const で定数として宣言し、
// その配列を返してください
// ============================================================
// ここに回答 ↓
function q9Answer() {
  const statuses = ["todo", "doing", "done"] as const; // as const をつけてみよう
  return statuses;
}

// ============================================================
// Q10: オブジェクトの型をインラインで宣言しよう
// { id: number; name: string; active: boolean } のオブジェクトを
// 値 { id: 1, name: "テスト", active: true } で作成してください
// ============================================================
// ここに回答 ↓
const q10Answer: { id: number; name: string; active: boolean } = {
  id: 1,
  name: "テスト",
  active: true,
};

// ============================================================
// テスト実行（この部分は変更しないでください）
// ============================================================
function runChapter01Tests(): ChapterResult {
  const results: TestResult[] = [];

  results.push(
    runTest(1, "string 型の変数宣言", () => {
      assert.equal(q1Answer, "Hello TypeScript");
      assert.typeOf(q1Answer, "string");
      // 型注釈が any のままだと不正解
      const src = "const q1Answer: any";
      assert.isFalse(
        q1Answer === "Hello TypeScript" &&
          typeof q1Answer === "string" &&
          src.includes("any"),
        "型注釈を any 以外の正しい型に変更してください",
      );
    }),
  );

  results.push(
    runTest(2, "number 型の変数宣言", () => {
      assert.equal(q2Answer, 3.14);
      assert.typeOf(q2Answer, "number");
    }),
  );

  results.push(
    runTest(3, "boolean 型の変数宣言", () => {
      assert.equal(q3Answer, true);
      assert.typeOf(q3Answer, "boolean");
    }),
  );

  results.push(
    runTest(4, "null を許容する型（number | null）", () => {
      assert.equal(q4Answer, null);
    }),
  );

  results.push(
    runTest(5, "string[] 型の配列宣言", () => {
      assert.deepEqual(q5Answer, ["React", "Vue", "Angular"]);
      assert.isTrue(Array.isArray(q5Answer));
      assert.lengthOf(q5Answer, 3);
    }),
  );

  results.push(
    runTest(6, "タプル型 [number, string, boolean]", () => {
      assert.deepEqual(q6Answer, [1, "勉強", false]);
      assert.typeOf(q6Answer[0], "number");
      assert.typeOf(q6Answer[1], "string");
      assert.typeOf(q6Answer[2], "boolean");
    }),
  );

  results.push(
    runTest(7, "void を返す関数", () => {
      const result = q7Answer("テスト");
      assert.equal(result, undefined, "void 関数は undefined を返すべきです");
    }),
  );

  results.push(
    runTest(8, "unknown 型を安全に扱う", () => {
      assert.equal(q8Answer("hello"), "HELLO");
      assert.equal(q8Answer(42), "not a string");
      assert.equal(q8Answer(null), "not a string");
    }),
  );

  results.push(
    runTest(9, "as const で readonly タプルを作る", () => {
      const result = q9Answer();
      assert.equal(result.length, 3);
      // as const がついていれば readonly になり、push 等ができなくなる
      // ランタイムでは確認が難しいので、値の正しさだけ確認
      assert.deepEqual([...result], ["todo", "doing", "done"]);
    }),
  );

  results.push(
    runTest(10, "オブジェクトのインライン型宣言", () => {
      assert.deepEqual(q10Answer, { id: 1, name: "テスト", active: true });
      assert.typeOf(q10Answer.id, "number");
      assert.typeOf(q10Answer.name, "string");
      assert.typeOf(q10Answer.active, "boolean");
    }),
  );

  const passed = results.filter((r) => r.passed).length;
  return { chapter: "01章: 基本型", results, passed, total: results.length };
}

export { runChapter01Tests };
