// ============================================================
// test-runner.ts
// シンプルなテスト実行エンジン
// 各テストファイルから呼び出して、結果を自動判定する
// ============================================================

// テスト1件分の結果
interface TestResult {
  questionNumber: number;   // 問題番号
  title: string;            // 問題タイトル
  passed: boolean;          // 合格したか
  message: string;          // 結果メッセージ
}

// 章全体の結果
interface ChapterResult {
  chapter: string;          // 章の名前
  results: TestResult[];    // 各問題の結果
  passed: number;           // 合格数
  total: number;            // 合計数
}

// テスト用のアサーション関数群
const assert = {
  // 値が等しいことを確認（厳密等価 ===）
  equal<T>(actual: T, expected: T, message?: string): void {
    if (actual !== expected) {
      throw new Error(
        message ?? `期待値: ${JSON.stringify(expected)}, 実際の値: ${JSON.stringify(actual)}`
      );
    }
  },

  // 値が true であることを確認
  isTrue(value: boolean, message?: string): void {
    if (value !== true) {
      throw new Error(message ?? `true を期待しましたが、${value} でした`);
    }
  },

  // 値が false であることを確認
  isFalse(value: boolean, message?: string): void {
    if (value !== false) {
      throw new Error(message ?? `false を期待しましたが、${value} でした`);
    }
  },

  // 深い比較（オブジェクトや配列の中身まで比較）
  deepEqual<T>(actual: T, expected: T, message?: string): void {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr !== expectedStr) {
      throw new Error(
        message ?? `期待値: ${expectedStr}, 実際の値: ${actualStr}`
      );
    }
  },

  // 値が null でないことを確認
  isNotNull<T>(value: T | null | undefined, message?: string): void {
    if (value === null || value === undefined) {
      throw new Error(message ?? `null/undefined でないことを期待しましたが、${value} でした`);
    }
  },

  // 値の型を確認
  typeOf(value: unknown, expectedType: string, message?: string): void {
    if (typeof value !== expectedType) {
      throw new Error(
        message ?? `型 "${expectedType}" を期待しましたが、"${typeof value}" でした`
      );
    }
  },

  // 配列の長さを確認
  lengthOf(arr: unknown[], expectedLength: number, message?: string): void {
    if (arr.length !== expectedLength) {
      throw new Error(
        message ?? `長さ ${expectedLength} を期待しましたが、${arr.length} でした`
      );
    }
  },

  // エラーがスローされることを確認
  throws(fn: () => void, message?: string): void {
    try {
      fn();
      throw new Error(message ?? `エラーがスローされることを期待しましたが、正常に完了しました`);
    } catch (e) {
      if (e instanceof Error && e.message === (message ?? `エラーがスローされることを期待しましたが、正常に完了しました`)) {
        throw e;
      }
      // 期待通りエラーがスローされた
    }
  },
};

// 1つのテストを実行する関数
function runTest(
  questionNumber: number,
  title: string,
  testFn: () => void
): TestResult {
  try {
    testFn();
    return {
      questionNumber,
      title,
      passed: true,
      message: "正解！",
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return {
      questionNumber,
      title,
      passed: false,
      message: msg,
    };
  }
}

// 章のテスト結果を表示する関数
function printChapterResult(result: ChapterResult): void {
  console.log("\n" + "=".repeat(60));
  console.log(`  ${result.chapter}`);
  console.log("=".repeat(60));

  for (const r of result.results) {
    const icon = r.passed ? "✅" : "❌";
    console.log(`  ${icon} Q${r.questionNumber}: ${r.title}`);
    if (!r.passed) {
      console.log(`     → ${r.message}`);
    }
  }

  console.log("-".repeat(60));
  console.log(`  結果: ${result.passed}/${result.total} 問正解`);

  if (result.passed === result.total) {
    console.log("  🎉 全問正解！この章は完璧です！");
  } else {
    console.log(`  📖 あと ${result.total - result.passed} 問。src/ の該当ファイルを復習しましょう！`);
  }
}

export { assert, runTest, printChapterResult };
export type { TestResult, ChapterResult };
