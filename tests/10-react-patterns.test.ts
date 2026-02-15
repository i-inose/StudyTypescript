// ============================================================
// 10章テスト: React 頻出パターン
// 各問題の「ここに回答」部分を書き換えて、npm test で答え合わせしよう！
// ============================================================

import { assert, runTest } from "./test-runner";
import type { ChapterResult, TestResult } from "./test-runner";

// ============================================================
// Q1: コンポーネントの Props 型を定義しよう
// label (string, 必須), onClick (() => void, 必須),
// disabled (boolean, 省略可能) を持つ ButtonProps を定義してください
// ============================================================
// ここに回答 ↓

// interface ButtonProps { ... } を定義してください

const q1Answer: any = {
  label: "送信",
  onClick: () => {},
  disabled: false,
};

// ============================================================
// Q2: Props を使ったコンポーネント関数を書こう
// Q1 の Props を受け取り、disabled が true なら "disabled: label" を、
// false/未指定なら "active: label" を返す関数を書いてください
// ============================================================
// ここに回答 ↓
function q2Answer(props: any): string {
  return ""; // 分割代入で props を展開して処理してください
}

// ============================================================
// Q3: children を含む Props を定義しよう
// children (string), className (string, 省略可能) を持つ
// WrapperProps を定義してください
// ============================================================
// ここに回答 ↓

// interface WrapperProps { ... } を定義してください

function q3Answer(props: any): string {
  return ""; // `<div class="${className}">${children}</div>` を返してください
  // className が未指定なら "wrapper" をデフォルトにしてください
}

// ============================================================
// Q4: イベントハンドラの型を定義しよう
// { target: { value: string } } を受け取り void を返す
// InputHandler 型を定義してください
// ============================================================
// ここに回答 ↓
type InputHandler = any; // (event: { target: { value: string } }) => void

const q4Answer: any = (event: { target: { value: string } }) => {
  return event.target.value.toUpperCase();
};

// ============================================================
// Q5: useReducer 用の Action 型を定義しよう
// 以下の3つのアクションを持つ TodoAction 型を定義してください:
//   { type: "ADD"; text: string }
//   { type: "REMOVE"; id: number }
//   { type: "CLEAR" }
// ============================================================
// ここに回答 ↓
type TodoAction = any; // 判別共用体でここを修正

// ============================================================
// Q6: useReducer 用の reducer を書こう
// state: string[] と Q5 の TodoAction を受け取り、新しい string[] を返してください
// ADD → 末尾に text を追加
// REMOVE → id 番目の要素を削除（filter で index !== id）
// CLEAR → 空配列を返す
// ============================================================
// ここに回答 ↓
function q6Answer(state: string[], action: any): string[] {
  return state; // switch 文で action.type を判定してください
}

// ============================================================
// Q7: ジェネリックなリスト Props を定義しよう
// items (T[]), renderItem ((item: T) => string) を持つ
// ListProps<T> を定義してください
// ============================================================
// ここに回答 ↓

// interface ListProps<T> { ... } を定義してください

function q7Answer<T>(items: T[], renderItem: (item: T) => string): string {
  return ""; // items.map(renderItem).join(", ") を返してください
}

// ============================================================
// Q8: Context の値の型を定義しよう
// user (string | null), login ((name: string) => void),
// logout (() => void) を持つ AuthContextType を定義してください
// ============================================================
// ここに回答 ↓

// interface AuthContextType { ... } を定義してください

const q8Answer: any = {
  user: null,
  login: (name: string) => {},
  logout: () => {},
};

// ============================================================
// Q9: Props 拡張パターンを使おう
// HTMLAttributes { id?: string; className?: string } を拡張して、
// variant ("primary" | "secondary") と children (string) を追加した
// CardProps を定義してください
// ============================================================
interface HTMLAttributes {
  id?: string;
  className?: string;
}

// ここに回答 ↓

// interface CardProps extends HTMLAttributes { ... } を定義してください

function q9Answer(props: any): string {
  const { variant, children, className, id } = props;
  return `<div id="${id ?? ""}" class="${className ?? ""} card-${variant}">${children}</div>`;
}

// ============================================================
// Q10: カスタムフック風の関数を書こう
// useCounter() を作ってください。以下を返すオブジェクトを返してください:
//   count: number (初期値 0)
//   increment: () => void (count を +1)
//   decrement: () => void (count を -1)
//   reset: () => void (count を 0 に戻す)
//   getCount: () => number (現在の count を返す)
// ============================================================
// ここに回答 ↓
function q10Answer() {
  return {
    count: 0,
    increment: () => {},
    decrement: () => {},
    reset: () => {},
    getCount: () => 0,
  };
  // この関数を完成させてください（クロージャで count を管理する）
}

// ============================================================
// テスト実行（この部分は変更しないでください）
// ============================================================
function runChapter10Tests(): ChapterResult {
  const results: TestResult[] = [];

  results.push(runTest(1, "Props 型の定義", () => {
    assert.equal(q1Answer.label, "送信");
    assert.typeOf(q1Answer.onClick, "function");
    assert.typeOf(q1Answer.disabled, "boolean");
  }));

  results.push(runTest(2, "Props を使ったコンポーネント関数", () => {
    assert.equal(q2Answer({ label: "送信", onClick: () => {}, disabled: true }), "disabled: 送信");
    assert.equal(q2Answer({ label: "送信", onClick: () => {} }), "active: 送信");
    assert.equal(q2Answer({ label: "実行", onClick: () => {}, disabled: false }), "active: 実行");
  }));

  results.push(runTest(3, "children を含む Props", () => {
    assert.equal(
      q3Answer({ children: "中身", className: "custom" }),
      '<div class="custom">中身</div>'
    );
    assert.equal(
      q3Answer({ children: "中身" }),
      '<div class="wrapper">中身</div>'
    );
  }));

  results.push(runTest(4, "イベントハンドラの型", () => {
    const result = q4Answer({ target: { value: "hello" } });
    assert.equal(result, "HELLO");
  }));

  results.push(runTest(5, "useReducer 用の Action 型", () => {
    const add: TodoAction = { type: "ADD", text: "テスト" } as any;
    const remove: TodoAction = { type: "REMOVE", id: 0 } as any;
    const clear: TodoAction = { type: "CLEAR" } as any;
    assert.equal(add.type, "ADD");
    assert.equal(remove.type, "REMOVE");
    assert.equal(clear.type, "CLEAR");
  }));

  results.push(runTest(6, "useReducer 用の reducer 関数", () => {
    let state = ["a", "b", "c"];
    state = q6Answer(state, { type: "ADD", text: "d" });
    assert.deepEqual(state, ["a", "b", "c", "d"]);

    state = q6Answer(state, { type: "REMOVE", id: 1 });
    assert.deepEqual(state, ["a", "c", "d"]);

    state = q6Answer(state, { type: "CLEAR" });
    assert.deepEqual(state, []);
  }));

  results.push(runTest(7, "ジェネリックなリスト描画関数", () => {
    assert.equal(
      q7Answer([1, 2, 3], (n) => `#${n}`),
      "#1, #2, #3"
    );
    assert.equal(
      q7Answer(["a", "b"], (s) => s.toUpperCase()),
      "A, B"
    );
  }));

  results.push(runTest(8, "Context の値の型定義", () => {
    assert.equal(q8Answer.user, null);
    assert.typeOf(q8Answer.login, "function");
    assert.typeOf(q8Answer.logout, "function");
  }));

  results.push(runTest(9, "Props 拡張パターン（extends）", () => {
    const result = q9Answer({
      variant: "primary",
      children: "カード内容",
      className: "my-card",
      id: "card-1",
    });
    assert.equal(result, '<div id="card-1" class="my-card card-primary">カード内容</div>');
  }));

  results.push(runTest(10, "カスタムフック風の関数（useCounter）", () => {
    const counter = q10Answer();
    assert.equal(counter.getCount(), 0);
    counter.increment();
    counter.increment();
    assert.equal(counter.getCount(), 2);
    counter.decrement();
    assert.equal(counter.getCount(), 1);
    counter.reset();
    assert.equal(counter.getCount(), 0);
  }));

  const passed = results.filter((r) => r.passed).length;
  return { chapter: "10章: React 頻出パターン", results, passed, total: results.length };
}

export { runChapter10Tests };
