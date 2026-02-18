# コードリーディングガイド

このリポジトリは **TypeScript → React** の順に段階的に学べる構成になっています。
以下の順番で読み進めることで、前の章の知識が次の章の前提になるよう設計されています。

---

## 全体マップ

```
StudyTypescript/
├── src/           ← Part 1: TypeScript 基礎（まずここから）
├── tests/         ← Part 2: 理解度チェック（穴埋め問題 100 問）
└── docs/          ← Part 3: スマホ版テスト（ブラウザで実行）
```

---

## Part 1: TypeScript 基礎 ― `src/`

React のコードを読む前に、TypeScript そのものを理解します。
**必ず 01 → 10 の順番で読んでください。**

| # | ファイル | 学べること | キーワード |
|---|---------|-----------|-----------|
| 1 | `src/01-basic-types.ts` | TypeScript の基本的な型 | `string`, `number`, `boolean`, `array`, `tuple`, `enum`, `any`, `unknown`, `void`, `null`, `undefined`, `never` |
| 2 | `src/02-interface-and-type.ts` | オブジェクトの型定義方法 | `interface`, `type`, `extends`, `&`（交差型）, `readonly`, `?`（オプショナル） |
| 3 | `src/03-union-and-literal.ts` | 複数の型を組み合わせる方法 | ユニオン型 `\|`, リテラル型, 型の絞り込み, 判別共用体 |
| 4 | `src/04-functions.ts` | 関数の型付け | 引数の型, 戻り値の型, オプショナル引数, デフォルト引数, レストパラメータ, アロー関数, コールバック型 |
| 5 | `src/05-generics.ts` | 型を引数として受け取る仕組み | `<T>`, ジェネリック関数, ジェネリックインターフェース, `extends` による制約 |
| 6 | `src/06-utility-types.ts` | TypeScript 組み込みの便利な型 | `Partial`, `Required`, `Pick`, `Omit`, `Record`, `Readonly`, `ReturnType`, `Parameters` |
| 7 | `src/07-type-guards.ts` | 実行時に型を安全に判定する方法 | `typeof`, `instanceof`, `in`, ユーザー定義型ガード (`is`), `as`（型アサーション） |
| 8 | `src/08-advanced-types.ts` | 高度な型の操作 | Mapped Types, Conditional Types, Template Literal Types, `infer`, `keyof`, `typeof` |
| 9 | `src/09-async-and-promise.ts` | 非同期処理 | `Promise`, `async/await`, `Promise.all`, `Promise.race`, エラーハンドリング |
| 10 | `src/10-react-patterns.ts` | React でよく使う TypeScript パターン | Props 型, State 型, イベント型, ジェネリックコンポーネント型, Children 型 |

最後にエントリーポイントを確認します:

| ファイル | 内容 |
|---------|------|
| `src/index.ts` | 全章を統合して実行するメインファイル。各章がどう呼び出されるか確認できる |

---

## Part 2: コーディングテスト ― `tests/`

Part 1 で読んだ内容を、穴埋め式の問題で確認します。
各章 10 問 × 10 章 = 計 100 問。

まずテストの仕組みを理解してから、各章のテストに取り組みます。

| # | ファイル | 内容 |
|---|---------|------|
| - | `tests/test-runner.ts` | **最初に読む。** テストエンジンの実装。`assert` 関数やテスト結果表示のロジック |
| - | `tests/run-all.ts` | テスト実行のエントリーポイント。CLI 引数でのチャプター指定方法 |
| 1 | `tests/01-basic-types.test.ts` | 基本型の問題 |
| 2 | `tests/02-interface-and-type.test.ts` | interface / type の問題 |
| 3 | `tests/03-union-and-literal.test.ts` | ユニオン型 / リテラル型の問題 |
| 4 | `tests/04-functions.test.ts` | 関数の型付けの問題 |
| 5 | `tests/05-generics.test.ts` | ジェネリクスの問題 |
| 6 | `tests/06-utility-types.test.ts` | ユーティリティ型の問題 |
| 7 | `tests/07-type-guards.test.ts` | 型ガードの問題 |
| 8 | `tests/08-advanced-types.test.ts` | 高度な型の問題 |
| 9 | `tests/09-async-and-promise.test.ts` | 非同期処理の問題 |
| 10 | `tests/10-react-patterns.test.ts` | React パターンの問題 |

---

## Part 3: ブラウザ版テスト ― `docs/`

Part 2 と同じ 100 問をスマホのブラウザで解けるバージョンです。
`new Function()` を使ったブラウザ上でのコード実行の仕組みも学べます。

| # | ファイル | 学べること |
|---|---------|-----------|
| 1 | `docs/index.html` | モバイル対応の UI 構造、ダークテーマ、レスポンシブデザイン |
| 2 | `docs/questions.js` | 全 100 問のデータ定義。テスト関数の設計パターン |
| 3 | `docs/app.js` | `new Function()` によるコード評価、`localStorage` による進捗保存 |

---

## Part 4: React + TypeScript 実践（別リポジトリ）

Part 1 の TypeScript 知識を前提に、React の全主要概念を実際のアプリ（タスク管理）で学びます。

> **[reactReading リポジトリ](https://github.com/i-inose/reactReading)** に移動しました。
> 詳しい読み順やセットアップ方法は、そちらの README を参照してください。

---

## おすすめの進め方

1. **Part 1 を通読する** ― TypeScript の文法を一通り理解する
2. **Part 2 で腕試し** ― `npm test` でテストを実行し、穴埋めを解く
3. **Part 3 でスマホ復習** ― 通勤中などに `docs/index.html` で復習する
4. **Part 4 を Step 順に読む** ― [reactReading リポジトリ](https://github.com/i-inose/reactReading) で React の仕組みを理解する
5. **Part 4 のアプリを動かす** ― reactReading リポジトリの README に従ってバックエンドとフロントエンドを起動する

---

## コマンド一覧

```bash
# TypeScript 学習コード実行
npm run build && npm start

# コーディングテスト（全章）
npm test

# コーディングテスト（特定の章だけ）
npm test -- 1 5 9

# React アプリは別リポジトリに移動しました
# https://github.com/i-inose/reactReading
```
