// ============================================================
// 01-basic-types.ts
// TypeScriptの基本型 ― Reactで毎日使うデータ型の土台
// ============================================================

// --------------------------------------------------
// 1. プリミティブ型（最も基本的な型）
// --------------------------------------------------

// string型: 文字列を格納する。React では表示テキストやlabel等で頻出
const appTitle: string = "タスク管理アプリ";

// number型: 整数・小数の両方を格納する。IDやカウンターなどで使う
const maxTasks: number = 100;

// boolean型: true/false の2値。React ではフラグ管理（表示/非表示など）で頻出
const isAppReady: boolean = true;

// --------------------------------------------------
// 2. null と undefined
// --------------------------------------------------

// null: 「値が存在しない」ことを明示的に示す
// React では「まだデータを取得していない状態」などで使う
const selectedTaskId: number | null = null;
// ↑ number | null は「number または null」を意味する（ユニオン型。03で詳しく解説）

// undefined: 「値がまだ設定されていない」ことを示す
// JavaScriptのデフォルト値。変数宣言のみで代入していない場合もこれ
let taskDescription: string | undefined;
// ↑ 代入していないので undefined になる

// --------------------------------------------------
// 3. 配列型（Array）
// --------------------------------------------------

// 書き方1: 型名[] ― こちらが最もよく使われる
const taskNames: string[] = ["買い物", "掃除", "勉強"];

// 書き方2: Array<型名> ― ジェネリクス構文（05で詳しく解説）
const taskIds: Array<number> = [1, 2, 3];

// --------------------------------------------------
// 4. タプル型（Tuple）
// --------------------------------------------------

// タプル: 要素の数と各位置の型が固定された配列
// React の useState は [値, セッター関数] のタプルを返す
// 例: const [count, setCount] = useState(0) の戻り値は [number, 関数] のタプル
const taskEntry: [number, string, boolean] = [1, "買い物", false];
// ↑ [ID, タスク名, 完了フラグ] を1つのまとまりで管理する例

// タプルの各要素にアクセスする
const entryId: number = taskEntry[0];       // 1
const entryName: string = taskEntry[1];     // "買い物"
const entryDone: boolean = taskEntry[2];    // false

// --------------------------------------------------
// 5. any型（なるべく避ける！）
// --------------------------------------------------

// any: どんな型の値でも代入できる。型チェックが無効になる
// 既存のJSコードを移行するときなど、一時的に使うことがある
// React開発では基本的に使わないようにする（型の恩恵が失われるため）
let legacyData: any = "文字列";
legacyData = 42;      // エラーにならない（型チェックが効かない）
legacyData = true;    // これもエラーにならない

// --------------------------------------------------
// 6. unknown型（anyの安全な代替）
// --------------------------------------------------

// unknown: any と同じく何でも代入できるが、使う前に型チェックが必要
// API からのレスポンスなど、型が不明なデータに使う
let apiResponse: unknown = "サーバーからの応答";

// unknown型はそのままでは使えない。型チェックしてから使う
if (typeof apiResponse === "string") {
  // この if ブロックの中では apiResponse は string 型として扱える
  const upperCase: string = apiResponse.toUpperCase();
}

// --------------------------------------------------
// 7. void型
// --------------------------------------------------

// void: 「戻り値がない」関数の戻り値型
// React のイベントハンドラ（onClick, onChangeなど）で頻出
function logMessage(message: string): void {
  // この関数は何も return しない
  console.log(`[LOG] ${message}`);
}

// --------------------------------------------------
// 8. never型
// --------------------------------------------------

// never: 「絶対に値を返さない」ことを示す型
// エラーを投げる関数や、無限ループする関数に使う
// React では switch 文の網羅性チェック（exhaustive check）で使う
function throwError(message: string): never {
  // この関数は例外を投げて、正常には終了しない
  throw new Error(message);
}

// --------------------------------------------------
// 9. オブジェクト型（インラインで定義）
// --------------------------------------------------

// オブジェクトの型をその場で定義する書き方
// React の Props をインラインで書く場合にこの形になる
const task: { id: number; title: string; done: boolean } = {
  id: 1,
  title: "TypeScriptを学ぶ",
  done: false,
};

// --------------------------------------------------
// 10. 型推論（Type Inference）
// --------------------------------------------------

// TypeScript は代入された値から型を自動で推論してくれる
// 明示的に型を書かなくても、正しく推論される場合は省略できる
const inferredString = "これは string と推論される";  // string型
const inferredNumber = 42;                              // number型
const inferredBoolean = true;                           // boolean型
const inferredArray = [1, 2, 3];                        // number[]型

// ただし、null や undefined になりうる場合は明示したほうが安全
// 例: APIから取得するデータは最初 null の可能性がある
let userName: string | null = null;  // 明示しないと null型に推論されてしまう

// --------------------------------------------------
// 11. const アサーション（as const）
// --------------------------------------------------

// as const をつけると、値をリテラル型（変更不可能な定数）として扱う
// React の useReducer のアクション定義などで活用する
const STATUS_OPTIONS = ["todo", "doing", "done"] as const;
// ↑ 型は readonly ["todo", "doing", "done"] になる（普通の string[] ではない）

// typeof と組み合わせてユニオン型を作れる（08で詳しく解説）
type StatusOption = typeof STATUS_OPTIONS[number];
// ↑ "todo" | "doing" | "done" というユニオン型が作られる

// --------------------------------------------------
// 確認用のエクスポート
// --------------------------------------------------
export {
  appTitle,
  maxTasks,
  isAppReady,
  selectedTaskId,
  taskNames,
  taskIds,
  taskEntry,
  logMessage,
  task,
  STATUS_OPTIONS,
};
export type { StatusOption };
