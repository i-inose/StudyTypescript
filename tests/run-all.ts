// ============================================================
// run-all.ts
// 全章のテストを一括実行するエントリポイント
// 使い方: npm test
// 特定の章だけ: npm test -- 01 03  (01章と03章だけ実行)
// ============================================================

import { printChapterResult } from "./test-runner";
import type { ChapterResult } from "./test-runner";

import { runChapter01Tests } from "./01-basic-types.test";
import { runChapter02Tests } from "./02-interface-and-type.test";
import { runChapter03Tests } from "./03-union-and-literal.test";
import { runChapter04Tests } from "./04-functions.test";
import { runChapter05Tests } from "./05-generics.test";
import { runChapter06Tests } from "./06-utility-types.test";
import { runChapter07Tests } from "./07-type-guards.test";
import { runChapter08Tests } from "./08-advanced-types.test";
import { runChapter09Tests } from "./09-async-and-promise.test";
import { runChapter10Tests } from "./10-react-patterns.test";

async function main(): Promise<void> {
  console.log("\n📝 TypeScript コーディングテスト\n");
  console.log("各テストファイルの「ここに回答」部分を書き換えてから実行してください。");
  console.log("参考: src/ 内の同じ番号のファイルに解説があります。\n");

  // コマンドライン引数で特定の章だけ実行できる
  const args = process.argv.slice(2);
  const selectedChapters = args.length > 0
    ? args.map((a) => parseInt(a, 10))
    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const allResults: ChapterResult[] = [];

  // 同期テスト（01〜08, 10章）
  const syncTests: { chapter: number; run: () => ChapterResult }[] = [
    { chapter: 1, run: runChapter01Tests },
    { chapter: 2, run: runChapter02Tests },
    { chapter: 3, run: runChapter03Tests },
    { chapter: 4, run: runChapter04Tests },
    { chapter: 5, run: runChapter05Tests },
    { chapter: 6, run: runChapter06Tests },
    { chapter: 7, run: runChapter07Tests },
    { chapter: 8, run: runChapter08Tests },
    { chapter: 10, run: runChapter10Tests },
  ];

  for (const test of syncTests) {
    if (selectedChapters.includes(test.chapter)) {
      const result = test.run();
      printChapterResult(result);
      allResults.push(result);
    }
  }

  // 非同期テスト（09章）
  if (selectedChapters.includes(9)) {
    const result = await runChapter09Tests();
    printChapterResult(result);
    allResults.push(result);
  }

  // 総合結果
  console.log("\n" + "═".repeat(60));
  console.log("  📊 総合結果");
  console.log("═".repeat(60));

  let totalPassed = 0;
  let totalQuestions = 0;

  for (const result of allResults) {
    const icon = result.passed === result.total ? "✅" : "📖";
    console.log(`  ${icon} ${result.chapter}: ${result.passed}/${result.total}`);
    totalPassed += result.passed;
    totalQuestions += result.total;
  }

  console.log("-".repeat(60));
  console.log(`  合計: ${totalPassed}/${totalQuestions} 問正解`);

  if (totalPassed === totalQuestions) {
    console.log("\n  🎉🎉🎉 全問正解！TypeScript マスターです！🎉🎉🎉\n");
  } else {
    const percentage = Math.round((totalPassed / totalQuestions) * 100);
    console.log(`  正答率: ${percentage}%`);
    console.log(`  あと ${totalQuestions - totalPassed} 問！src/ の解説を読んで再挑戦しましょう！\n`);
  }
}

main().catch(console.error);
