// ============================================================
// index.ts
// メインエントリポイント ― 全ファイルの機能を実際に動かして確認する
// ============================================================

// 各モジュールから関数やデータをインポートする
import { appTitle, logMessage, STATUS_OPTIONS } from "./01-basic-types";
import { myTask, importantTask, tasks as taskMap } from "./02-interface-and-type";
import { describeAction, renderFetchStatus, getColorCode } from "./03-union-and-literal";
import { createTask, filterTasks, sortByTitle, findTask, allTasks } from "./04-functions";
import { getLast, findById, Store, taskListResponse } from "./05-generics";
import { updateTask, statusLabels, getTaskStats } from "./06-utility-types";
import { formatValue, handleError, isTask, processApiData, TaskNotFoundError } from "./07-type-guards";
import { getTaskProperty, defaultConfig, createConfig } from "./08-advanced-types";
import { fetchTasks, getIncompleteTasks, fetchDashboardData } from "./09-async-and-promise";
import { useTaskManager, taskReducer, initialState, List } from "./10-react-patterns";

import type { Task } from "./02-interface-and-type";
import type { TaskAction, FetchState } from "./03-union-and-literal";

// --------------------------------------------------
// ヘルパー関数: セクション区切り線を表示する
// --------------------------------------------------
function printSection(title: string): void {
  console.log("\n" + "=".repeat(50));
  console.log(`  ${title}`);
  console.log("=".repeat(50));
}

// --------------------------------------------------
// メイン関数: 非同期処理を含むため async にする
// --------------------------------------------------
async function main(): Promise<void> {
  console.log(`\n🎯 ${appTitle} ― TypeScript 学習デモ\n`);

  // ========================================
  // 01: 基本型
  // ========================================
  printSection("01: 基本型");

  logMessage("アプリケーションを起動しました");
  console.log("ステータス選択肢:", STATUS_OPTIONS);

  // ========================================
  // 02: インターフェースと型エイリアス
  // ========================================
  printSection("02: インターフェースと型エイリアス");

  console.log("基本タスク:", myTask);
  console.log("優先度付きタスク:", importantTask);
  console.log("タスクマップ:", taskMap);

  // ========================================
  // 03: ユニオン型と判別共用体
  // ========================================
  printSection("03: ユニオン型と判別共用体");

  // 判別共用体を使ったアクション処理
  const actions: TaskAction[] = [
    { type: "ADD_TASK", payload: { title: "新しいタスク" } },
    { type: "TOGGLE_TASK", payload: { id: 1 } },
    { type: "DELETE_TASK", payload: { id: 2 } },
    { type: "EDIT_TASK", payload: { id: 1, title: "変更後のタスク" } },
  ];

  actions.forEach((action) => {
    console.log(describeAction(action));
  });

  // API 状態のシミュレーション
  const states: FetchState[] = [
    { status: "loading" },
    { status: "success", data: [{ id: 1, title: "買い物" }] },
    { status: "error", errorMessage: "ネットワークエラー" },
  ];

  states.forEach((state) => {
    console.log(renderFetchStatus(state));
  });

  console.log("赤の色コード:", getColorCode("red"));

  // ========================================
  // 04: 関数の型定義
  // ========================================
  printSection("04: 関数の型定義");

  const newTask = createTask(10, "アロー関数で作成したタスク");
  console.log("作成したタスク:", newTask);

  const incomplete = filterTasks(allTasks, (t) => !t.done);
  console.log("未完了タスク:", incomplete);

  const sorted = sortByTitle(allTasks);
  console.log("タイトル順:", sorted.map((t) => t.title));

  const found = findTask(allTasks, 1);
  console.log("ID=1 のタスク:", found);

  const foundByTitle = findTask(allTasks, "買");
  console.log("「買」を含むタスク:", foundByTitle);

  // ========================================
  // 05: ジェネリクス
  // ========================================
  printSection("05: ジェネリクス");

  const lastItem = getLast([10, 20, 30, 40, 50]);
  console.log("配列の最後の要素:", lastItem);

  const foundTask = findById(allTasks, 2);
  console.log("ID=2 のタスク（ジェネリック検索）:", foundTask);

  console.log("API レスポンス:", taskListResponse);

  // Store クラスのデモ
  const store = new Store({ count: 0, name: "カウンター" });
  console.log("Store 初期状態:", store.getState());
  store.updateState({ count: 5 });
  console.log("Store 更新後:", store.getState());

  // ========================================
  // 06: ユーティリティ型
  // ========================================
  printSection("06: ユーティリティ型");

  const original: Task = { id: 1, title: "買い物", done: false };
  const updated = updateTask(original, { done: true });
  console.log("更新前:", original);
  console.log("更新後:", updated);

  console.log("ステータスラベル:", statusLabels);

  const stats = getTaskStats(allTasks);
  console.log("タスク統計:", stats);

  // ========================================
  // 07: 型ガード
  // ========================================
  printSection("07: 型ガード");

  console.log(formatValue("hello"));
  console.log(formatValue(3.14159));
  console.log(formatValue(true));

  // カスタム型ガード
  const unknownData = { id: 1, title: "テスト", done: false };
  console.log("isTask チェック:", isTask(unknownData));
  console.log("processApiData:", processApiData(unknownData));

  // エラーハンドリング
  const errors = [
    new TaskNotFoundError(999),
    new Error("一般的なエラー"),
  ];
  errors.forEach((err) => console.log(handleError(err)));

  // ========================================
  // 08: 高度な型操作
  // ========================================
  printSection("08: 高度な型操作");

  const sampleTask: Task = { id: 1, title: "テスト", done: false };
  console.log("keyof でアクセス (id):", getTaskProperty(sampleTask, "id"));
  console.log("keyof でアクセス (title):", getTaskProperty(sampleTask, "title"));
  console.log("keyof でアクセス (done):", getTaskProperty(sampleTask, "done"));

  console.log("デフォルト設定:", defaultConfig);
  const customConfig = createConfig({ theme: "light", showCompleted: false });
  console.log("カスタム設定:", customConfig);

  // ========================================
  // 09: 非同期処理
  // ========================================
  printSection("09: 非同期処理");

  // async/await でタスクを取得
  const fetchedTasks = await fetchTasks();
  console.log("取得したタスク:", fetchedTasks);

  const incompleteFetched = await getIncompleteTasks();
  console.log("未完了タスク（非同期）:", incompleteFetched);

  const dashboard = await fetchDashboardData();
  console.log("ダッシュボード:", dashboard);

  // ========================================
  // 10: React パターン
  // ========================================
  printSection("10: React パターン (useReducer + カスタムフック)");

  // useTaskManager（カスタムフック風関数）のデモ
  const manager = useTaskManager();

  // タスクを追加
  manager.addTask("TypeScript を学ぶ");
  manager.addTask("React を学ぶ");
  manager.addTask("Next.js を学ぶ");
  console.log("追加後:", manager.getTasks());

  // タスクを完了にする
  manager.toggleTask(1);
  console.log("タスク1を完了:", manager.getTasks());

  // タスクを編集する
  manager.editTask(2, "React + TypeScript を学ぶ");
  console.log("タスク2を編集:", manager.getTasks());

  // タスクを削除する
  manager.deleteTask(3);
  console.log("タスク3を削除:", manager.getTasks());

  // ジェネリックリストコンポーネントのデモ
  printSection("10: React パターン (ジェネリックリスト)");

  const listHtml = List<Task>({
    items: manager.getTasks(),
    renderItem: (task) => `${task.done ? "✓" : "□"} ${task.title}`,
    keyExtractor: (task) => task.id,
    emptyMessage: "タスクがありません",
  });
  console.log("リスト HTML:", listHtml);

  // ========================================
  // 完了
  // ========================================
  printSection("学習完了！");
  console.log(`
以下の TypeScript の概念を全て網羅しました:

  01. 基本型 (string, number, boolean, null, undefined, any, unknown, void, never)
  02. インターフェースと型エイリアス (interface, type, extends, &, readonly, ?)
  03. ユニオン型・リテラル型・判別共用体 (|, as const, switch + type タグ)
  04. 関数の型定義 (引数型, 戻り値型, コールバック, オーバーロード)
  05. ジェネリクス (<T>, 制約, デフォルト型, ジェネリッククラス)
  06. ユーティリティ型 (Partial, Required, Readonly, Pick, Omit, Record, Exclude, Extract, ReturnType)
  07. 型ガード (typeof, instanceof, in, カスタム型ガード, 型アサーション)
  08. 高度な型操作 (keyof, typeof, マップ型, 条件型, テンプレートリテラル型)
  09. 非同期処理 (Promise, async/await, Promise.all, Promise.race)
  10. React パターン (Props, children, イベント, useReducer, カスタムフック, Context, ジェネリックコンポーネント)

これらを理解すれば、React + TypeScript のコードを読み書きする準備は万全です！
`);
}

// メイン関数を実行する
main().catch(console.error);
