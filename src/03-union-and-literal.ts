// ============================================================
// 03-union-and-literal.ts
// ユニオン型・リテラル型・判別共用体 ― React の状態管理の要
// ============================================================

import type { BaseTask } from "./02-interface-and-type";

// --------------------------------------------------
// 1. ユニオン型（Union Types）
// --------------------------------------------------

// | を使って「A または B」という型を表現する
// React では「まだ読み込んでいない or 読み込み済み」のような状態を表す

// 基本的なユニオン型: string または number
type StringOrNumber = string | number;

const taskIdFlexible: StringOrNumber = 1;        // number でOK
const taskIdString: StringOrNumber = "task-1";   // string でもOK

// null を許容するユニオン型（React でとても頻出）
// 「ユーザーを選択していない状態」を null で表す
type NullableString = string | null;
let currentUser: NullableString = null;           // 最初は未選択
currentUser = "田中太郎";                          // ユーザーを選択した

// --------------------------------------------------
// 2. リテラル型（Literal Types）
// --------------------------------------------------

// 特定の値だけを許可する型
// React では Props で受け付ける値を制限するのに使う

// 文字列リテラル型: 指定した文字列のいずれかしか代入できない
type TaskStatus = "todo" | "in-progress" | "done";

let status: TaskStatus = "todo";        // OK
status = "in-progress";                  // OK
status = "done";                         // OK
// status = "cancelled";                 // ← コンパイルエラー！許可された値ではない

// 数値リテラル型
type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;
const rolled: DiceValue = 3;             // OK
// const invalid: DiceValue = 7;         // ← コンパイルエラー！

// boolean リテラル型（あまり使わないが、知っておくとよい）
type AlwaysTrue = true;
const yes: AlwaysTrue = true;

// --------------------------------------------------
// 3. 判別共用体（Discriminated Unions）
// --------------------------------------------------

// 「共通のプロパティ（タグ）」を持つユニオン型
// React の useReducer のアクション定義で非常によく使うパターン

// 各アクションに共通の type プロパティを持たせる
// type の値がそれぞれ違うので、TypeScript はこれを手がかりに型を判別できる

// タスク管理アプリのアクション型を定義
type TaskAction =
  // タスクを追加するアクション
  | { type: "ADD_TASK"; payload: { title: string } }
  // タスクの完了状態を切り替えるアクション
  | { type: "TOGGLE_TASK"; payload: { id: number } }
  // タスクを削除するアクション
  | { type: "DELETE_TASK"; payload: { id: number } }
  // タスクのタイトルを編集するアクション
  | { type: "EDIT_TASK"; payload: { id: number; title: string } };

// 判別共用体を使った関数（React の useReducer に渡す reducer と同じパターン）
function describeAction(action: TaskAction): string {
  // switch 文で type プロパティを調べることで、payload の型が自動的に絞り込まれる
  switch (action.type) {
    case "ADD_TASK":
      // ここでは payload は { title: string } と TypeScript が認識している
      return `タスク「${action.payload.title}」を追加します`;

    case "TOGGLE_TASK":
      // ここでは payload は { id: number } と TypeScript が認識している
      return `タスク(ID: ${action.payload.id})の完了状態を切り替えます`;

    case "DELETE_TASK":
      return `タスク(ID: ${action.payload.id})を削除します`;

    case "EDIT_TASK":
      // ここでは payload は { id: number; title: string } と認識されている
      return `タスク(ID: ${action.payload.id})を「${action.payload.title}」に変更します`;
  }
}

// --------------------------------------------------
// 4. API レスポンスの状態をユニオン型で表現する
// --------------------------------------------------

// React でデータフェッチの状態管理をするときの代表的なパターン
// ローディング・成功・エラーの3状態を型安全に管理する

// ローディング中の状態
interface LoadingState {
  status: "loading";     // status が判別タグ
}

// 成功した状態（データを持つ）
interface SuccessState {
  status: "success";
  data: BaseTask[];      // 取得したタスクの配列
}

// エラーの状態（エラーメッセージを持つ）
interface ErrorState {
  status: "error";
  errorMessage: string;
}

// 3つの状態をユニオン型にまとめる
type FetchState = LoadingState | SuccessState | ErrorState;

// 状態に応じたメッセージを返す関数
function renderFetchStatus(state: FetchState): string {
  switch (state.status) {
    case "loading":
      // この中では state は LoadingState 型
      return "読み込み中...";

    case "success":
      // この中では state は SuccessState 型 → data プロパティにアクセスできる
      return `${state.data.length}件のタスクを取得しました`;

    case "error":
      // この中では state は ErrorState 型 → errorMessage にアクセスできる
      return `エラー: ${state.errorMessage}`;
  }
}

// --------------------------------------------------
// 5. exhaustive check（網羅性チェック）
// --------------------------------------------------

// switch 文で全てのケースを処理したことをコンパイラに保証させるテクニック
// React の reducer で「アクションの追加し忘れ」を防げる

type Color = "red" | "green" | "blue";

function getColorCode(color: Color): string {
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
// もし Color に "yellow" を追加して case を書き忘れたら、
// default の never 代入でコンパイルエラーが発生して教えてくれる

// --------------------------------------------------
// 確認用のエクスポート
// --------------------------------------------------
export { describeAction, renderFetchStatus, getColorCode };
export type { TaskStatus, TaskAction, FetchState, NullableString, Color };
