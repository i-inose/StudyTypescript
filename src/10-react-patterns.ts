// ============================================================
// 10-react-patterns.ts
// React 頻出パターンのシミュレーション
// ― 実際の React コードを読み書きする際に出会う型パターン
// ============================================================
//
// ※ このファイルは React をインストールせずに、React で使われる
//    TypeScript パターンの「型の仕組み」を理解するための教材です。
//    実際の React コードでは import React が必要です。

import type { Task, Priority } from "./02-interface-and-type";
import type { TaskStatus, TaskAction } from "./03-union-and-literal";

// ==================================================
// パターン1: コンポーネントの Props 型定義
// ==================================================

// React コンポーネントの Props は interface で定義するのが一般的
interface TaskItemProps {
  task: Task;                             // 必須: 表示するタスク
  onToggle: (id: number) => void;         // 必須: 完了状態切り替えハンドラ
  onDelete: (id: number) => void;         // 必須: 削除ハンドラ
  onEdit?: (id: number, title: string) => void;  // 省略可能: 編集ハンドラ
  className?: string;                     // 省略可能: CSSクラス名
}

// コンポーネントをシミュレートする関数
// 実際の React: const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, ... }) => { ... }
function TaskItem(props: TaskItemProps): string {
  const { task, onToggle, onDelete, onEdit, className } = props;
  // ↑ 分割代入でpropsを展開する。React コンポーネントの定番パターン

  // オプショナルな onEdit は呼ぶ前にチェックが必要
  if (onEdit) {
    onEdit(task.id, task.title);
  }

  return `<div class="${className ?? "task-item"}">${task.title}</div>`;
}

// ==================================================
// パターン2: children を含む Props
// ==================================================

// React で children を受け取るコンポーネントの型
// 実際のReactでは React.ReactNode を使う
type ReactNode = string | number | boolean | null | undefined | ReactNode[];

interface ContainerProps {
  children: ReactNode;                    // 子要素
  maxWidth?: number;                      // 最大幅（省略可能）
  padding?: number;                       // パディング（省略可能）
}

function Container(props: ContainerProps): string {
  const { children, maxWidth = 1200, padding = 16 } = props;
  // ↑ デフォルト引数を分割代入時に設定できる
  return `<div style="max-width: ${maxWidth}px; padding: ${padding}px">${children}</div>`;
}

// ==================================================
// パターン3: イベントハンドラの型
// ==================================================

// React のイベント型をシミュレーション
// 実際の React では React.ChangeEvent<HTMLInputElement> などを使う

// イベントオブジェクトの型定義
interface ChangeEvent<T> {
  target: T;                              // イベントが発生した要素
  preventDefault: () => void;             // デフォルト動作を防ぐ
}

interface InputElement {
  value: string;                          // input の現在の値
  name: string;                           // input の name 属性
}

interface FormElement {
  elements: Record<string, InputElement>; // フォーム内の要素
}

// イベントハンドラの型定義
type ChangeHandler = (event: ChangeEvent<InputElement>) => void;
type SubmitHandler = (event: ChangeEvent<FormElement>) => void;

// 使用例: フォーム入力ハンドラ
const handleInputChange: ChangeHandler = (event) => {
  // event.target は InputElement 型に推論される
  const { name, value } = event.target;
  console.log(`フィールド「${name}」の値: ${value}`);
};

// 使用例: フォーム送信ハンドラ
const handleSubmit: SubmitHandler = (event) => {
  event.preventDefault();  // フォームのデフォルト送信を防ぐ
  console.log("フォーム送信");
};

// ==================================================
// パターン4: useReducer パターン（状態管理）
// ==================================================

// React の useReducer で使う reducer 関数の型パターン
// ここまでの知識（ユニオン型、判別共用体、ジェネリクス）を全て活用する

// State の型
interface TaskState {
  tasks: Task[];
  filter: TaskStatus;
  nextId: number;
}

// 初期状態
const initialState: TaskState = {
  tasks: [],
  filter: "todo",
  nextId: 1,
};

// Reducer 関数: 現在の state と action を受け取り、新しい state を返す
// React では: const [state, dispatch] = useReducer(taskReducer, initialState);
function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "ADD_TASK":
      // 新しいタスクを追加して、nextId をインクリメント
      return {
        ...state,                // 既存の state をスプレッドでコピー
        tasks: [
          ...state.tasks,        // 既存のタスクを展開
          {
            id: state.nextId,
            title: action.payload.title,
            done: false,
          },
        ],
        nextId: state.nextId + 1,
      };

    case "TOGGLE_TASK":
      // 指定IDのタスクの done を反転させる
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, done: !task.done }   // 該当タスクの done を反転
            : task                             // それ以外はそのまま
        ),
      };

    case "DELETE_TASK":
      // 指定IDのタスクを除外する
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };

    case "EDIT_TASK":
      // 指定IDのタスクのタイトルを変更する
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, title: action.payload.title }
            : task
        ),
      };
  }
}

// ==================================================
// パターン5: カスタムフック風の関数
// ==================================================

// React のカスタムフック（useXxx）の型パターンをシミュレーション
// カスタムフックはロジックを再利用可能な関数に切り出すパターン

// useTaskManager: タスク管理のロジックを提供するカスタムフック風関数
function useTaskManager() {
  // state の初期化（React では useState や useReducer を使う）
  let state = { ...initialState };

  // dispatch 関数: action を受け取って state を更新する
  const dispatch = (action: TaskAction): void => {
    state = taskReducer(state, action);
  };

  // 公開する関数群（React のカスタムフックの戻り値）
  return {
    // ゲッター
    getState: (): TaskState => state,
    getTasks: (): Task[] => state.tasks,

    // アクション（dispatch をラップして使いやすくする）
    addTask: (title: string): void => {
      dispatch({ type: "ADD_TASK", payload: { title } });
    },
    toggleTask: (id: number): void => {
      dispatch({ type: "TOGGLE_TASK", payload: { id } });
    },
    deleteTask: (id: number): void => {
      dispatch({ type: "DELETE_TASK", payload: { id } });
    },
    editTask: (id: number, title: string): void => {
      dispatch({ type: "EDIT_TASK", payload: { id, title } });
    },
  };
  // ↑ 戻り値の型は TypeScript が自動推論してくれる
}

// 戻り値の型を取得する（ReturnType の実用例）
type TaskManager = ReturnType<typeof useTaskManager>;

// ==================================================
// パターン6: ジェネリックコンポーネント風の型
// ==================================================

// React でリスト表示コンポーネントを作るときのジェネリックパターン
// 実際の React: <List<Task> items={tasks} renderItem={(task) => ...} />

interface ListProps<T> {
  items: T[];                                   // 表示するアイテムの配列
  renderItem: (item: T, index: number) => string;  // 各アイテムの表示方法
  keyExtractor: (item: T) => string | number;   // 各アイテムのユニークキー
  emptyMessage?: string;                        // アイテムがない場合のメッセージ
}

// ジェネリックなリスト表示関数
function List<T>(props: ListProps<T>): string {
  const { items, renderItem, keyExtractor, emptyMessage = "データがありません" } = props;

  if (items.length === 0) {
    return `<p>${emptyMessage}</p>`;
  }

  const listItems = items.map((item, index) => {
    const key = keyExtractor(item);
    return `<li key="${key}">${renderItem(item, index)}</li>`;
  });

  return `<ul>${listItems.join("")}</ul>`;
}

// 使用例: Task のリストを表示
const taskListHtml = List<Task>({
  items: [
    { id: 1, title: "買い物", done: false },
    { id: 2, title: "掃除", done: true },
  ],
  renderItem: (task) => `${task.done ? "✓" : "□"} ${task.title}`,
  keyExtractor: (task) => task.id,
  emptyMessage: "タスクがありません",
});

// ==================================================
// パターン7: Context の型パターン
// ==================================================

// React の Context（グローバルな状態共有）の型パターン

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// createContext のシミュレーション（実際は React.createContext を使う）
function createContext<T>(defaultValue: T): {
  Provider: (props: { value: T; children: ReactNode }) => string;
  getContext: () => T;
} {
  let currentValue: T = defaultValue;

  return {
    Provider: (props) => {
      currentValue = props.value;
      return `<ContextProvider>${props.children}</ContextProvider>`;
    },
    getContext: () => currentValue,
  };
}

// テーマの Context を作成
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},  // デフォルトは空の関数
});

// ==================================================
// パターン8: コンポーネント Props の拡張パターン
// ==================================================

// HTML 要素の Props を拡張する React のパターン
// 実際の React: interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>

// HTML要素の基本プロパティをシミュレーション
interface HTMLAttributes {
  id?: string;
  className?: string;
  style?: Record<string, string>;
  onClick?: () => void;
}

// Button コンポーネントの Props（HTML属性を拡張）
interface ButtonProps extends HTMLAttributes {
  variant: "primary" | "secondary" | "danger";   // 追加: ボタンの種類
  size?: "sm" | "md" | "lg";                     // 追加: サイズ
  loading?: boolean;                              // 追加: ローディング状態
  children: ReactNode;                            // 追加: ボタンのテキスト
}

function Button(props: ButtonProps): string {
  // レストパターンで追加分と HTML属性を分ける
  const { variant, size = "md", loading = false, children, ...htmlAttrs } = props;
  // ↑ htmlAttrs には id, className, style, onClick が入る

  const buttonClass = `btn btn-${variant} btn-${size}`;
  return `<button class="${buttonClass}" ${loading ? "disabled" : ""}>${children}</button>`;
}

// --------------------------------------------------
// 確認用のエクスポート
// --------------------------------------------------
export {
  TaskItem,
  Container,
  taskReducer,
  initialState,
  useTaskManager,
  List,
  ThemeContext,
  Button,
  handleInputChange,
  handleSubmit,
};
export type {
  TaskItemProps,
  ContainerProps,
  TaskState,
  TaskManager,
  ListProps,
  ThemeContextType,
  ButtonProps,
  ChangeEvent,
  ChangeHandler,
  SubmitHandler,
};
