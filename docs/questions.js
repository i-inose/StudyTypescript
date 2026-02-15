// ============================================================
// questions.js
// 全10章 x 10問の問題データ
// ============================================================

const ALL_CHAPTERS = [
  // ===================== 01章: 基本型 =====================
  {
    id: 1,
    title: "01章: 基本型",
    questions: [
      {
        id: "01-01",
        title: "Q1: string 型の変数宣言",
        description: "\"Hello TypeScript\" という文字列を格納する変数 answer を宣言してください。型注釈もつけましょう。",
        hint: "const answer: string = ...;",
        initial: "const answer = \"Hello TypeScript\";",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertEqual(answer, "Hello TypeScript");
          assertIncludes(code, ": string", "型注釈 : string を書いてください");
        },
      },
      {
        id: "01-02",
        title: "Q2: number 型の変数宣言",
        description: "円周率 3.14 を格納する変数 answer に、number 型の型注釈をつけてください。",
        hint: "const answer: number = ...;",
        initial: "const answer = 3.14;",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertEqual(answer, 3.14);
          assertIncludes(code, ": number", "型注釈 : number を書いてください");
        },
      },
      {
        id: "01-03",
        title: "Q3: boolean 型の変数宣言",
        description: "true を格納する変数 answer に、boolean 型の型注釈をつけてください。",
        hint: "const answer: boolean = ...;",
        initial: "const answer = true;",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertEqual(answer, true);
          assertIncludes(code, ": boolean", "型注釈 : boolean を書いてください");
        },
      },
      {
        id: "01-04",
        title: "Q4: null を許容する型",
        description: "値が null の変数 answer を宣言してください。型は「number または null」です。\n（ヒント: | を使います）",
        hint: "const answer: number | null = ...;",
        initial: "const answer = null;",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertEqual(answer, null);
          assertIncludes(code, "number | null", "型注釈 number | null を書いてください");
        },
      },
      {
        id: "01-05",
        title: "Q5: 配列の型宣言",
        description: "[\"React\", \"Vue\", \"Angular\"] を格納する変数 answer に string[] の型注釈をつけてください。",
        hint: "const answer: string[] = ...;",
        initial: "const answer = [\"React\", \"Vue\", \"Angular\"];",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertDeepEqual(answer, ["React", "Vue", "Angular"]);
          assertIncludes(code, "string[]", "型注釈 string[] を書いてください");
        },
      },
      {
        id: "01-06",
        title: "Q6: タプル型",
        description: "[1, \"勉強\", false] を格納する変数 answer にタプル型 [number, string, boolean] の型注釈をつけてください。",
        hint: "const answer: [number, string, boolean] = ...;",
        initial: "const answer = [1, \"勉強\", false];",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertDeepEqual(answer, [1, "勉強", false]);
          assertIncludes(code, "[number, string, boolean]", "タプル型 [number, string, boolean] を書いてください");
        },
      },
      {
        id: "01-07",
        title: "Q7: void を返す関数",
        description: "引数 message (string) を受け取り、何も返さない関数 answer を作ってください。\n中身は空でOKです。",
        hint: "function answer(message: string): void { }",
        initial: "function answer(message) {\n  \n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(typeof fn, "function");
          assertEqual(fn("test"), undefined);
          assertIncludes(code, ": void", "戻り値の型注釈 : void を書いてください");
        },
      },
      {
        id: "01-08",
        title: "Q8: unknown 型の安全な使い方",
        description: "unknown 型の引数 value を受け取り、string なら大文字に変換して返し、それ以外は \"not a string\" を返す関数 answer を書いてください。",
        hint: "typeof value === \"string\" で判定します",
        initial: "function answer(value) {\n  return \"not a string\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn("hello"), "HELLO");
          assertEqual(fn(42), "not a string");
          assertEqual(fn(null), "not a string");
        },
      },
      {
        id: "01-09",
        title: "Q9: as const",
        description: "[\"todo\", \"doing\", \"done\"] を as const で定数として宣言し、変数 answer に代入してください。",
        hint: "const answer = [...] as const;",
        initial: "const answer = [\"todo\", \"doing\", \"done\"];",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertDeepEqual([...answer], ["todo", "doing", "done"]);
          assertIncludes(code, "as const", "as const をつけてください");
        },
      },
      {
        id: "01-10",
        title: "Q10: オブジェクトのインライン型",
        description: "{ id: 1, name: \"テスト\", active: true } を格納する変数 answer に、インラインで型注釈をつけてください。",
        hint: "const answer: { id: number; name: string; active: boolean } = ...;",
        initial: "const answer = { id: 1, name: \"テスト\", active: true };",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertDeepEqual(answer, { id: 1, name: "テスト", active: true });
          assertIncludes(code, "id:", "インライン型注釈を書いてください");
          assertIncludes(code, "name:", "インライン型注釈を書いてください");
        },
      },
    ],
  },

  // ===================== 02章: インターフェースと型エイリアス =====================
  {
    id: 2,
    title: "02章: インターフェースと型エイリアス",
    questions: [
      {
        id: "02-01",
        title: "Q1: interface の定義",
        description: "id(number), name(string), email(string) を持つ User 型のオブジェクトを変数 answer に作ってください。",
        hint: "interface は JS にコンパイルすると消えるので、ここではオブジェクトの形が合っていればOK",
        initial: "const answer = { id: 1, name: \"田中\", email: \"tanaka@example.com\" };",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertEqual(answer.id, 1);
          assertEqual(answer.name, "田中");
          assertEqual(answer.email, "tanaka@example.com");
        },
      },
      {
        id: "02-02",
        title: "Q2: オプショナルプロパティ",
        description: "name(string, 必須) を持ち、age(number) は省略可能なオブジェクトを変数 answer に作ってください。age は省略してください。",
        hint: "age を書かなければOK",
        initial: "const answer = { name: \"太郎\" };",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertEqual(answer.name, "太郎");
          assertEqual(answer.age, undefined);
        },
      },
      {
        id: "02-03",
        title: "Q3: readonly の理解",
        description: "{ id: 100, name: \"ペン\" } を answer に代入し、answer.name を \"鉛筆\" に変更するコードを追加してください。（id は readonly なので変更しない）",
        hint: "answer.name = \"鉛筆\"; を追加する",
        initial: "const answer = { id: 100, name: \"ペン\" };\n// name を \"鉛筆\" に変更してください\n",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertEqual(answer.id, 100);
          assertEqual(answer.name, "鉛筆");
        },
      },
      {
        id: "02-04",
        title: "Q4: type エイリアス",
        description: "\"small\" | \"medium\" | \"large\" のいずれかの値を変数 answer に代入してください。値は \"medium\" にしてください。",
        hint: "const answer = \"medium\";",
        initial: "const answer = \"\";",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertEqual(answer, "medium");
        },
      },
      {
        id: "02-05",
        title: "Q5: extends による拡張",
        description: "{ name: \"ポチ\", breed: \"柴犬\" } を変数 answer に代入してください。",
        hint: "name と breed を持つオブジェクト",
        initial: "const answer = {};",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertEqual(answer.name, "ポチ");
          assertEqual(answer.breed, "柴犬");
        },
      },
      {
        id: "02-06",
        title: "Q6: 交差型（&）",
        description: "id(number) と name(string) の両方を持つオブジェクトを変数 answer に作ってください。{ id: 1, name: \"テスト\" }",
        hint: "型の合成。値としては両方のプロパティを持つオブジェクトを作る",
        initial: "const answer = {};",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertEqual(answer.id, 1);
          assertEqual(answer.name, "テスト");
        },
      },
      {
        id: "02-07",
        title: "Q7: インデックスシグネチャ",
        description: "{ math: 90, english: 85, science: 78 } を変数 answer に代入してください。キーは動的な文字列、値は number です。",
        hint: "普通のオブジェクトリテラルで書けばOK",
        initial: "const answer = {};",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertEqual(answer.math, 90);
          assertEqual(answer.english, 85);
          assertEqual(answer.science, 78);
        },
      },
      {
        id: "02-08",
        title: "Q8: 複数 interface の継承",
        description: "title(string), print()(string を返す), save()(boolean を返す) を持つオブジェクトを answer に作ってください。\ntitle は \"レポート\"、print() は title を返し、save() は true を返す。",
        hint: "メソッドは print() { return this.title; } のように書く",
        initial: "const answer = {\n  title: \"レポート\",\n};",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertEqual(answer.title, "レポート");
          assertEqual(answer.print(), "レポート");
          assertEqual(answer.save(), true);
        },
      },
      {
        id: "02-09",
        title: "Q9: タプル型",
        description: "[\"田中\", 25] を answer に代入してください（名前と年齢のタプル）。",
        hint: "const answer = [\"田中\", 25];",
        initial: "const answer = [];",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertDeepEqual(answer, ["田中", 25]);
        },
      },
      {
        id: "02-10",
        title: "Q10: type でオブジェクト型",
        description: "x(number) と y(number) を持つオブジェクト { x: 10, y: 20 } を answer に作ってください。",
        hint: "const answer = { x: 10, y: 20 };",
        initial: "const answer = {};",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertDeepEqual(answer, { x: 10, y: 20 });
        },
      },
    ],
  },

  // ===================== 03章: ユニオン型・リテラル型・判別共用体 =====================
  {
    id: 3,
    title: "03章: ユニオン型・判別共用体",
    questions: [
      {
        id: "03-01",
        title: "Q1: ユニオン型を処理する関数",
        description: "string | number を受け取り、string なら文字数を、number ならそのまま返す関数 answer を作ってください。",
        hint: "typeof で string か number か判定する",
        initial: "function answer(value) {\n  return 0;\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn("abc"), 3);
          assertEqual(fn(""), 0);
          assertEqual(fn(42), 42);
        },
      },
      {
        id: "03-02",
        title: "Q2: null を含むユニオン型",
        description: "string | null を受け取り、string なら大文字、null なら \"N/A\" を返す関数 answer を書いてください。",
        hint: "if (value === null) で null チェック",
        initial: "function answer(value) {\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn("hello"), "HELLO");
          assertEqual(fn(null), "N/A");
        },
      },
      {
        id: "03-03",
        title: "Q3: 判別共用体の処理",
        description: "{ type: \"circle\", radius: number } | { type: \"rectangle\", width: number, height: number } を受け取り、面積を返す関数 answer を書いてください。\ncircle: Math.PI * radius * radius\nrectangle: width * height",
        hint: "switch (shape.type) で分岐する",
        initial: "function answer(shape) {\n  return 0;\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(Math.round(fn({ type: "circle", radius: 5 }) * 100) / 100, 78.54);
          assertEqual(fn({ type: "rectangle", width: 3, height: 4 }), 12);
        },
      },
      {
        id: "03-04",
        title: "Q4: API 状態の表示",
        description: "{ status: \"idle\" } → \"待機中\"、{ status: \"loading\" } → \"読込中\"、{ status: \"done\", data: string } → data の値を返す関数 answer を書いてください。",
        hint: "switch (state.status) で分岐する",
        initial: "function answer(state) {\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn({ status: "idle" }), "待機中");
          assertEqual(fn({ status: "loading" }), "読込中");
          assertEqual(fn({ status: "done", data: "完了" }), "完了");
        },
      },
      {
        id: "03-05",
        title: "Q5: exhaustive check",
        description: "\"red\" | \"green\" | \"blue\" を受け取り色コードを返す関数 answer を書いてください。\nred→\"#FF0000\", green→\"#00FF00\", blue→\"#0000FF\"",
        hint: "switch 文で全ケースを処理する",
        initial: "function answer(color) {\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn("red"), "#FF0000");
          assertEqual(fn("green"), "#00FF00");
          assertEqual(fn("blue"), "#0000FF");
        },
      },
      {
        id: "03-06",
        title: "Q6: reducer パターン",
        description: "state(number) と action を受け取る reducer 関数 answer を書いてください。\n{ type: \"INCREMENT\" } → +1\n{ type: \"DECREMENT\" } → -1\n{ type: \"SET\", payload: number } → payload の値",
        hint: "switch (action.type) で分岐する",
        initial: "function answer(state, action) {\n  return state;\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn(0, { type: "INCREMENT" }), 1);
          assertEqual(fn(5, { type: "DECREMENT" }), 4);
          assertEqual(fn(0, { type: "SET", payload: 100 }), 100);
        },
      },
      {
        id: "03-07",
        title: "Q7: 型による分岐処理",
        description: "string | number | boolean を受け取り、\nstring→\"文字列\", number→\"数値\", boolean→\"真偽値\" を返す関数 answer を書いてください。",
        hint: "typeof で型を判定する",
        initial: "function answer(value) {\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn("hello"), "文字列");
          assertEqual(fn(42), "数値");
          assertEqual(fn(true), "真偽値");
        },
      },
      {
        id: "03-08",
        title: "Q8: Result パターン",
        description: "{ ok: true, data: string } | { ok: false, error: string } を受け取り、\nok なら data を、そうでなければ \"Error: \" + error を返す関数 answer を書いてください。",
        hint: "if (result.ok) で分岐する",
        initial: "function answer(result) {\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn({ ok: true, data: "成功" }), "成功");
          assertEqual(fn({ ok: false, error: "失敗" }), "Error: 失敗");
        },
      },
      {
        id: "03-09",
        title: "Q9: リテラル型の活用",
        description: "direction(\"up\"|\"down\"|\"left\"|\"right\") を受け取り、\n上下左右の日本語を返す関数 answer を書いてください。",
        hint: "up→\"上\", down→\"下\", left→\"左\", right→\"右\"",
        initial: "function answer(direction) {\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn("up"), "上");
          assertEqual(fn("down"), "下");
          assertEqual(fn("left"), "左");
          assertEqual(fn("right"), "右");
        },
      },
      {
        id: "03-10",
        title: "Q10: 通知システム",
        description: "{ type: \"email\", to: string } → \"メール送信: {to}\"\n{ type: \"push\", title: string } → \"プッシュ通知: {title}\"\nを返す関数 answer を書いてください。",
        hint: "notification.type で判別する",
        initial: "function answer(notification) {\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn({ type: "email", to: "a@b.com" }), "メール送信: a@b.com");
          assertEqual(fn({ type: "push", title: "新着" }), "プッシュ通知: 新着");
        },
      },
    ],
  },

  // ===================== 04章: 関数の型定義 =====================
  {
    id: 4,
    title: "04章: 関数の型定義",
    questions: [
      {
        id: "04-01",
        title: "Q1: 2数の合計",
        description: "2つの数値 a, b を受け取り合計を返す関数 answer を書いてください。",
        hint: "return a + b;",
        initial: "function answer(a, b) {\n  \n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn(2, 3), 5);
          assertEqual(fn(-1, 1), 0);
        },
      },
      {
        id: "04-02",
        title: "Q2: アロー関数で文字数",
        description: "文字列を受け取り文字数を返すアロー関数 answer を書いてください。",
        hint: "const answer = (s) => s.length;",
        initial: "const answer = (s) => {\n  \n};",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn("hello"), 5);
          assertEqual(fn(""), 0);
        },
      },
      {
        id: "04-03",
        title: "Q3: デフォルト引数",
        description: "price と taxRate（デフォルト0.1）を受け取り、税込み価格 price*(1+taxRate) を返す関数 answer を書いてください。",
        hint: "function answer(price, taxRate = 0.1)",
        initial: "function answer(price, taxRate) {\n  return 0;\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn(1000), 1100);
          assertEqual(fn(1000, 0.08), 1080);
        },
      },
      {
        id: "04-04",
        title: "Q4: レストパラメータ",
        description: "prefix(string) と ...names(string[]) を受け取り、各名前に prefix をつけた配列を返す関数 answer を書いてください。\n例: answer(\"Mr.\", \"田中\", \"鈴木\") → [\"Mr. 田中\", \"Mr. 鈴木\"]",
        hint: "names.map(n => `${prefix} ${n}`)",
        initial: "function answer(prefix, ...names) {\n  return [];\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn("Mr.", "田中", "鈴木"), ["Mr. 田中", "Mr. 鈴木"]);
          assertDeepEqual(fn("Dr.", "佐藤"), ["Dr. 佐藤"]);
        },
      },
      {
        id: "04-05",
        title: "Q5: コールバック関数",
        description: "numbers(number[]) と predicate(関数) を受け取り、条件を満たす要素だけ返す関数 answer を書いてください。",
        hint: "return numbers.filter(predicate);",
        initial: "function answer(numbers, predicate) {\n  return [];\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn([1,2,3,4,5], n => n > 3), [4, 5]);
          assertDeepEqual(fn([10,20,30], n => n < 25), [10, 20]);
        },
      },
      {
        id: "04-06",
        title: "Q6: オブジェクトを返す関数",
        description: "name(string) と age(number) を受け取り、{ name, age, isAdult: age>=18 } を返す関数 answer を書いてください。",
        hint: "return { name, age, isAdult: age >= 18 };",
        initial: "const answer = (name, age) => {\n  \n};",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn("太郎", 20), { name: "太郎", age: 20, isAdult: true });
          assertDeepEqual(fn("花子", 15), { name: "花子", age: 15, isAdult: false });
        },
      },
      {
        id: "04-07",
        title: "Q7: 掛け算関数",
        description: "2つの数値を受け取り掛け算の結果を返す関数 answer を書いてください。",
        hint: "return a * b;",
        initial: "const answer = (a, b) => {\n  return 0;\n};",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn(3, 4), 12);
          assertEqual(fn(5, 5), 25);
        },
      },
      {
        id: "04-08",
        title: "Q8: map で大文字変換",
        description: "文字列の配列を受け取り、各要素を大文字にした配列を返す関数 answer を書いてください。",
        hint: "items.map(s => s.toUpperCase())",
        initial: "function answer(items) {\n  return [];\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn(["hello", "world"]), ["HELLO", "WORLD"]);
          assertDeepEqual(fn([]), []);
        },
      },
      {
        id: "04-09",
        title: "Q9: 高階関数",
        description: "multiplier(number) を受け取り、「数値を受け取って multiplier を掛けた値を返す関数」を返す関数 answer を書いてください。\n例: answer(2)(5) → 10",
        hint: "return (n) => n * multiplier;",
        initial: "function answer(multiplier) {\n  \n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn(2)(5), 10);
          assertEqual(fn(3)(5), 15);
          assertEqual(fn(10)(3), 30);
        },
      },
      {
        id: "04-10",
        title: "Q10: 配列の reduce",
        description: "数値の配列を受け取り、合計値を返す関数 answer を書いてください。reduce を使ってください。",
        hint: "arr.reduce((sum, n) => sum + n, 0)",
        initial: "function answer(arr) {\n  return 0;\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn([1, 2, 3, 4, 5]), 15);
          assertEqual(fn([]), 0);
          assertEqual(fn([10]), 10);
        },
      },
    ],
  },

  // ===================== 05章: ジェネリクス =====================
  {
    id: 5,
    title: "05章: ジェネリクス",
    questions: [
      {
        id: "05-01",
        title: "Q1: identity 関数",
        description: "値をそのまま返す関数 answer を書いてください。",
        hint: "function answer(value) { return value; }",
        initial: "function answer(value) {\n  \n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn(42), 42);
          assertEqual(fn("hello"), "hello");
          assertEqual(fn(true), true);
        },
      },
      {
        id: "05-02",
        title: "Q2: 配列の最初の要素",
        description: "配列を受け取り最初の要素を返す関数 answer を書いてください。空なら undefined を返す。",
        hint: "return items[0];",
        initial: "function answer(items) {\n  \n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn([10, 20, 30]), 10);
          assertEqual(fn([]), undefined);
        },
      },
      {
        id: "05-03",
        title: "Q3: key-value ペア",
        description: "key と value を受け取り { key, value } を返す関数 answer を書いてください。",
        hint: "return { key, value };",
        initial: "function answer(key, value) {\n  \n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn("name", "太郎"), { key: "name", value: "太郎" });
          assertDeepEqual(fn(1, true), { key: 1, value: true });
        },
      },
      {
        id: "05-04",
        title: "Q4: length プロパティを返す",
        description: "length プロパティを持つ値（文字列や配列）を受け取り、length を返す関数 answer を書いてください。",
        hint: "return value.length;",
        initial: "function answer(value) {\n  return 0;\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn("hello"), 5);
          assertEqual(fn([1, 2, 3]), 3);
        },
      },
      {
        id: "05-05",
        title: "Q5: 値を配列にラップ",
        description: "任意の値を受け取り、1要素の配列にして返す関数 answer を書いてください。\n例: answer(5) → [5]",
        hint: "return [value];",
        initial: "function answer(value) {\n  \n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn(5), [5]);
          assertDeepEqual(fn("hi"), ["hi"]);
        },
      },
      {
        id: "05-06",
        title: "Q6: useState シミュレーション",
        description: "初期値を受け取り、[値, セッター関数] のタプルを返す関数 answer を書いてください。\nセッターは空の関数でOK。",
        hint: "return [initial, () => {}];",
        initial: "function answer(initial) {\n  \n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          const [val, setter] = fn(42);
          assertEqual(val, 42);
          assertEqual(typeof setter, "function");
        },
      },
      {
        id: "05-07",
        title: "Q7: 2つの配列をマージ",
        description: "2つの配列を受け取り結合した配列を返す関数 answer を書いてください。",
        hint: "return [...a, ...b];",
        initial: "function answer(a, b) {\n  return [];\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn([1, 2], [3, 4]), [1, 2, 3, 4]);
          assertDeepEqual(fn(["a"], ["b", "c"]), ["a", "b", "c"]);
        },
      },
      {
        id: "05-08",
        title: "Q8: プロパティ取得関数",
        description: "オブジェクトとキー名を受け取り、そのプロパティの値を返す関数 answer を書いてください。\n例: answer({name:\"太郎\"}, \"name\") → \"太郎\"",
        hint: "return obj[key];",
        initial: "function answer(obj, key) {\n  \n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn({ name: "太郎", age: 20 }, "name"), "太郎");
          assertEqual(fn({ name: "太郎", age: 20 }, "age"), 20);
        },
      },
      {
        id: "05-09",
        title: "Q9: 配列の最後の要素",
        description: "配列を受け取り最後の要素を返す関数 answer を書いてください。空なら undefined。",
        hint: "return items[items.length - 1];",
        initial: "function answer(items) {\n  \n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn([1, 2, 3]), 3);
          assertEqual(fn([]), undefined);
        },
      },
      {
        id: "05-10",
        title: "Q10: API レスポンスの構造",
        description: "data, status(number), message(string) を受け取り、{ data, status, message } を返す関数 answer を書いてください。",
        hint: "return { data, status, message };",
        initial: "function answer(data, status, message) {\n  \n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn([1,2], 200, "OK"), { data: [1,2], status: 200, message: "OK" });
        },
      },
    ],
  },

  // ===================== 06章: ユーティリティ型 =====================
  {
    id: 6,
    title: "06章: ユーティリティ型",
    questions: [
      {
        id: "06-01",
        title: "Q1: Partial（部分更新）",
        description: "user オブジェクトと updates オブジェクトを受け取り、マージした結果を返す関数 answer を書いてください。（スプレッド構文を使う）",
        hint: "return { ...user, ...updates };",
        initial: "function answer(user, updates) {\n  return user;\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          const r = fn({ id: 1, name: "田中", age: 30 }, { name: "鈴木", age: 25 });
          assertEqual(r.id, 1);
          assertEqual(r.name, "鈴木");
          assertEqual(r.age, 25);
        },
      },
      {
        id: "06-02",
        title: "Q2: Pick（必要なプロパティだけ取り出す）",
        description: "オブジェクトとキーの配列を受け取り、指定キーだけのオブジェクトを返す関数 answer を書いてください。\n例: answer({a:1,b:2,c:3}, [\"a\",\"c\"]) → {a:1,c:3}",
        hint: "keys.reduce で新しいオブジェクトを構築する",
        initial: "function answer(obj, keys) {\n  return {};\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn({ a: 1, b: 2, c: 3 }, ["a", "c"]), { a: 1, c: 3 });
          assertDeepEqual(fn({ x: 10, y: 20 }, ["x"]), { x: 10 });
        },
      },
      {
        id: "06-03",
        title: "Q3: Omit（指定プロパティを除外）",
        description: "オブジェクトと除外するキーの配列を受け取り、それ以外のプロパティだけ返す関数 answer を書いてください。\n例: answer({a:1,b:2,c:3}, [\"b\"]) → {a:1,c:3}",
        hint: "Object.entries + filter + Object.fromEntries",
        initial: "function answer(obj, keysToOmit) {\n  return {};\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn({ a: 1, b: 2, c: 3 }, ["b"]), { a: 1, c: 3 });
          assertDeepEqual(fn({ x: 10, y: 20, z: 30 }, ["x", "z"]), { y: 20 });
        },
      },
      {
        id: "06-04",
        title: "Q4: Record（辞書型）",
        description: "\"morning\"→\"おはよう\", \"afternoon\"→\"こんにちは\", \"evening\"→\"こんばんは\" のオブジェクトを変数 answer に代入してください。",
        hint: "const answer = { morning: \"おはよう\", ... };",
        initial: "const answer = {};",
        test: (code) => {
          const answer = runUserCode(code, "answer");
          assertEqual(answer.morning, "おはよう");
          assertEqual(answer.afternoon, "こんにちは");
          assertEqual(answer.evening, "こんばんは");
        },
      },
      {
        id: "06-05",
        title: "Q5: Readonly（不変オブジェクトのコピー更新）",
        description: "readonly なオブジェクトを直接変更せず、スプレッド構文で新しいオブジェクトを作って特定のプロパティを変更する関数 answer を書いてください。\n引数: (obj, key, value) → obj の key を value に変えた新しいオブジェクト",
        hint: "return { ...obj, [key]: value };",
        initial: "function answer(obj, key, value) {\n  return obj;\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          const orig = { a: 1, b: 2 };
          const result = fn(orig, "b", 99);
          assertEqual(result.a, 1);
          assertEqual(result.b, 99);
          assertEqual(orig.b, 2); // 元は変更されていない
        },
      },
      {
        id: "06-06",
        title: "Q6: ReturnType 的な理解",
        description: "関数を受け取り、その関数を呼び出した戻り値を返す関数 answer を書いてください。\n例: answer(() => 42) → 42",
        hint: "return fn();",
        initial: "function answer(fn) {\n  \n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn(() => 42), 42);
          assertEqual(fn(() => "hello"), "hello");
        },
      },
      {
        id: "06-07",
        title: "Q7: タスク統計を計算",
        description: "タスク配列 [{done:true},{done:false},...] を受け取り、{ total, done, pending } を返す関数 answer を書いてください。",
        hint: "filter で done/not done をカウントする",
        initial: "function answer(tasks) {\n  return { total: 0, done: 0, pending: 0 };\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn([{done:true},{done:false},{done:true}]), { total: 3, done: 2, pending: 1 });
          assertDeepEqual(fn([]), { total: 0, done: 0, pending: 0 });
        },
      },
      {
        id: "06-08",
        title: "Q8: NonNullable 的フィルタ",
        description: "(string | null | undefined)[] を受け取り、null と undefined を除外した string[] を返す関数 answer を書いてください。",
        hint: "filter(item => item != null)",
        initial: "function answer(items) {\n  return [];\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn(["a", null, "b", undefined, "c"]), ["a", "b", "c"]);
          assertDeepEqual(fn([null, undefined]), []);
        },
      },
      {
        id: "06-09",
        title: "Q9: オブジェクトのキー配列",
        description: "オブジェクトを受け取り、そのキーの配列を返す関数 answer を書いてください。\n（Object.keys を使う）",
        hint: "return Object.keys(obj);",
        initial: "function answer(obj) {\n  return [];\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn({ a: 1, b: 2 }), ["a", "b"]);
          assertDeepEqual(fn({}), []);
        },
      },
      {
        id: "06-10",
        title: "Q10: 組み合わせ（新規作成用の型）",
        description: "id を除いて残りのプロパティで新しいオブジェクトを作る関数 answer を書いてください。\nautoId と Omit<T,'id'> 相当のオブジェクトを受け取り、{ id: autoId, ...rest } を返す。",
        hint: "return { id: autoId, ...rest };",
        initial: "function answer(autoId, rest) {\n  return {};\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn(99, { name: "太郎", age: 20 }), { id: 99, name: "太郎", age: 20 });
        },
      },
    ],
  },

  // ===================== 07章: 型ガード =====================
  {
    id: 7,
    title: "07章: 型ガード",
    questions: [
      {
        id: "07-01",
        title: "Q1: typeof ガード",
        description: "string | number を受け取り、\"string: 値\" または \"number: 値\" を返す関数 answer を書いてください。",
        hint: "if (typeof value === \"string\")",
        initial: "function answer(value) {\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn("hello"), "string: hello");
          assertEqual(fn(42), "number: 42");
        },
      },
      {
        id: "07-02",
        title: "Q2: null チェック",
        description: "string | null を受け取り、string なら文字数を、null なら -1 を返す関数 answer を書いてください。",
        hint: "if (value === null) return -1;",
        initial: "function answer(value) {\n  return 0;\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn("hello"), 5);
          assertEqual(fn(null), -1);
        },
      },
      {
        id: "07-03",
        title: "Q3: instanceof ガード",
        description: "Date | string を受け取り、Date なら年(文字列)を、string ならそのまま返す関数 answer を書いてください。",
        hint: "if (value instanceof Date) return String(value.getFullYear());",
        initial: "function answer(value) {\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn(new Date("2026-01-15")), "2026");
          assertEqual(fn("テスト"), "テスト");
        },
      },
      {
        id: "07-04",
        title: "Q4: in ガード",
        description: "{name: string} | {title: string} を受け取り、name または title の値を返す関数 answer を書いてください。",
        hint: "if (\"name\" in obj) return obj.name;",
        initial: "function answer(obj) {\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn({ name: "田中" }), "田中");
          assertEqual(fn({ title: "レポート" }), "レポート");
        },
      },
      {
        id: "07-05",
        title: "Q5: カスタム型ガード",
        description: "値が { id: number, name: string } の形かどうか判定する関数 answer を書いてください。true/false を返す。",
        hint: "typeof, !== null, \"id\" in value, \"name\" in value をチェック",
        initial: "function answer(value) {\n  return false;\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn({ id: 1, name: "太郎" }), true);
          assertEqual(fn({ id: 1 }), false);
          assertEqual(fn("not object"), false);
          assertEqual(fn(null), false);
        },
      },
      {
        id: "07-06",
        title: "Q6: 型ガードで配列フィルタ",
        description: "(string|number)[] から number だけを抽出する関数 answer を書いてください。",
        hint: "filter(item => typeof item === \"number\")",
        initial: "function answer(items) {\n  return [];\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn([1, "a", 2, "b", 3]), [1, 2, 3]);
          assertDeepEqual(fn(["a", "b"]), []);
        },
      },
      {
        id: "07-07",
        title: "Q7: オプショナルチェイニング",
        description: "{ user?: { name?: string } } を受け取り、name があればその値、なければ \"anonymous\" を返す関数 answer を書いてください。",
        hint: "data?.user?.name ?? \"anonymous\"",
        initial: "function answer(data) {\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn({ user: { name: "太郎" } }), "太郎");
          assertEqual(fn({ user: {} }), "anonymous");
          assertEqual(fn({}), "anonymous");
        },
      },
      {
        id: "07-08",
        title: "Q8: ?? (Null合体演算子)",
        description: "value(any) と defaultValue を受け取り、value が null または undefined なら defaultValue を返す関数 answer を書いてください。",
        hint: "return value ?? defaultValue;",
        initial: "function answer(value, defaultValue) {\n  return value;\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn(null, "default"), "default");
          assertEqual(fn(undefined, 42), 42);
          assertEqual(fn(0, 99), 0); // 0 は null でも undefined でもない
          assertEqual(fn("", "fallback"), ""); // "" も同様
        },
      },
      {
        id: "07-09",
        title: "Q9: 安全な JSON パース",
        description: "JSON 文字列を受け取り、パースに成功したらオブジェクトを、失敗したら null を返す関数 answer を書いてください。",
        hint: "try { return JSON.parse(json); } catch { return null; }",
        initial: "function answer(json) {\n  return null;\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn('{"a":1}'), { a: 1 });
          assertEqual(fn("invalid json"), null);
        },
      },
      {
        id: "07-10",
        title: "Q10: ネストされた安全アクセス",
        description: "config = { settings?: { theme?: string, fontSize?: number } } から theme(デフォルト\"light\") と fontSize(デフォルト14) を取得して { theme, fontSize } を返す関数 answer を書いてください。",
        hint: "config?.settings?.theme ?? \"light\"",
        initial: "function answer(config) {\n  return { theme: \"\", fontSize: 0 };\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn({ settings: { theme: "dark", fontSize: 20 } }), { theme: "dark", fontSize: 20 });
          assertDeepEqual(fn({ settings: {} }), { theme: "light", fontSize: 14 });
          assertDeepEqual(fn({}), { theme: "light", fontSize: 14 });
        },
      },
    ],
  },

  // ===================== 08章: 高度な型操作 =====================
  {
    id: 8,
    title: "08章: 高度な型操作",
    questions: [
      {
        id: "08-01",
        title: "Q1: プロパティの安全な取得",
        description: "obj と key を受け取り obj[key] を返す関数 answer を書いてください。",
        hint: "return obj[key];",
        initial: "function answer(obj, key) {\n  \n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn({ name: "ペン", price: 100 }, "name"), "ペン");
          assertEqual(fn({ name: "ペン", price: 100 }, "price"), 100);
        },
      },
      {
        id: "08-02",
        title: "Q2: オブジェクトの全値を変換",
        description: "オブジェクトと変換関数を受け取り、全ての値を変換した新しいオブジェクトを返す関数 answer を書いてください。\n例: answer({a:1,b:2}, n=>n*2) → {a:2,b:4}",
        hint: "Object.fromEntries(Object.entries(obj).map(...))",
        initial: "function answer(obj, transform) {\n  return {};\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn({ a: 1, b: 2 }, n => n * 2), { a: 2, b: 4 });
          assertDeepEqual(fn({ x: "hello" }, s => s.toUpperCase()), { x: "HELLO" });
        },
      },
      {
        id: "08-03",
        title: "Q3: ゲッター関数を生成",
        description: "オブジェクトを受け取り、各プロパティをゲッター関数にしたオブジェクトを返す関数 answer を書いてください。\n例: answer({a:1}).a() → 1",
        hint: "各値を () => value の関数にラップする",
        initial: "function answer(obj) {\n  return {};\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          const getters = fn({ id: 1, name: "テスト" });
          assertEqual(getters.id(), 1);
          assertEqual(getters.name(), "テスト");
        },
      },
      {
        id: "08-04",
        title: "Q4: テンプレートリテラル文字列",
        description: "prefix と name を受け取り `${prefix}${Name}` の形の文字列を返す関数 answer を書いてください。name の頭文字を大文字にする。\n例: answer(\"get\", \"name\") → \"getName\"",
        hint: "name[0].toUpperCase() + name.slice(1)",
        initial: "function answer(prefix, name) {\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn("get", "name"), "getName");
          assertEqual(fn("set", "age"), "setAge");
          assertEqual(fn("on", "click"), "onClick");
        },
      },
      {
        id: "08-05",
        title: "Q5: オブジェクトのディープコピー",
        description: "オブジェクト（ネストあり）を受け取り、ディープコピーを返す関数 answer を書いてください。",
        hint: "JSON.parse(JSON.stringify(obj))",
        initial: "function answer(obj) {\n  return obj;\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          const orig = { a: { b: 1 } };
          const copy = fn(orig);
          assertEqual(copy.a.b, 1);
          copy.a.b = 99;
          assertEqual(orig.a.b, 1); // 元は変わらない
        },
      },
      {
        id: "08-06",
        title: "Q6: keyof typeof パターン",
        description: "以下の colorMap のキーの1つを受け取り、値を返す関数 answer を書いてください。\nconst colorMap = { red: \"#FF0000\", green: \"#00FF00\", blue: \"#0000FF\" };",
        hint: "return colorMap[key];",
        initial: "function answer(key) {\n  const colorMap = { red: \"#FF0000\", green: \"#00FF00\", blue: \"#0000FF\" };\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn("red"), "#FF0000");
          assertEqual(fn("green"), "#00FF00");
          assertEqual(fn("blue"), "#0000FF");
        },
      },
      {
        id: "08-07",
        title: "Q7: 全プロパティを string に変換",
        description: "オブジェクトの全ての値を String() で文字列にした新しいオブジェクトを返す関数 answer を書いてください。",
        hint: "Object.fromEntries(Object.entries(obj).map(([k,v]) => [k, String(v)]))",
        initial: "function answer(obj) {\n  return {};\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn({ id: 1, active: true }), { id: "1", active: "true" });
        },
      },
      {
        id: "08-08",
        title: "Q8: フォームフィールドの初期化",
        description: "フィールド名の配列を受け取り、各フィールドの { value: \"\", error: null, touched: false } を持つオブジェクトを返す関数 answer を書いてください。\n例: answer([\"name\"]) → { name: { value: \"\", error: null, touched: false } }",
        hint: "reduce でオブジェクトを構築する",
        initial: "function answer(fields) {\n  return {};\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          const r = fn(["name", "email"]);
          assertDeepEqual(r.name, { value: "", error: null, touched: false });
          assertDeepEqual(r.email, { value: "", error: null, touched: false });
        },
      },
      {
        id: "08-09",
        title: "Q9: 条件分岐マッピング",
        description: "値と { 条件値: 結果値 } のマッピングオブジェクトを受け取り、一致する結果を返す関数 answer を書いてください。一致しなければ null。\n例: answer(\"a\", {a:1,b:2}) → 1",
        hint: "return mapping[value] ?? null;",
        initial: "function answer(value, mapping) {\n  return null;\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn("a", { a: 1, b: 2 }), 1);
          assertEqual(fn("c", { a: 1, b: 2 }), null);
        },
      },
      {
        id: "08-10",
        title: "Q10: オブジェクトの差分検出",
        description: "2つのオブジェクトを比較し、値が異なるキーの配列を返す関数 answer を書いてください。\n例: answer({a:1,b:2},{a:1,b:3}) → [\"b\"]",
        hint: "Object.keys(a).filter(key => a[key] !== b[key])",
        initial: "function answer(a, b) {\n  return [];\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn({ a: 1, b: 2 }, { a: 1, b: 3 }), ["b"]);
          assertDeepEqual(fn({ x: 1 }, { x: 1 }), []);
        },
      },
    ],
  },

  // ===================== 09章: 非同期処理 =====================
  {
    id: 9,
    title: "09章: 非同期処理",
    questions: [
      {
        id: "09-01",
        title: "Q1: Promise.resolve",
        description: "数値を受け取り、その値を Promise で返す関数 answer を書いてください。",
        hint: "return Promise.resolve(value);",
        initial: "function answer(value) {\n  \n}",
        test: async (code) => {
          const fn = runUserCode(code, "answer");
          const r = await fn(42);
          assertEqual(r, 42);
        },
      },
      {
        id: "09-02",
        title: "Q2: async 関数",
        description: "\"hello\" を返す async 関数 answer を書いてください。",
        hint: "async function answer() { return \"hello\"; }",
        initial: "async function answer() {\n  return \"\";\n}",
        test: async (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(await fn(), "hello");
        },
      },
      {
        id: "09-03",
        title: "Q3: await で値を変換",
        description: "Promise<number> を受け取り、値を2倍にして返す async 関数 answer を書いてください。",
        hint: "const val = await promise; return val * 2;",
        initial: "async function answer(promise) {\n  return 0;\n}",
        test: async (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(await fn(Promise.resolve(21)), 42);
          assertEqual(await fn(Promise.resolve(5)), 10);
        },
      },
      {
        id: "09-04",
        title: "Q4: try/catch エラーハンドリング",
        description: "Promise<string> を受け取り、成功ならその値、失敗なら \"エラー発生\" を返す async 関数 answer を書いてください。",
        hint: "try { return await promise; } catch { return \"エラー発生\"; }",
        initial: "async function answer(promise) {\n  return \"\";\n}",
        test: async (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(await fn(Promise.resolve("成功")), "成功");
          const p = Promise.reject(new Error("失敗")); p.catch(()=>{});
          assertEqual(await fn(p), "エラー発生");
        },
      },
      {
        id: "09-05",
        title: "Q5: Promise.all で合計",
        description: "Promise<number>[] を受け取り、全値の合計を返す async 関数 answer を書いてください。",
        hint: "const values = await Promise.all(promises); return values.reduce((s,n)=>s+n, 0);",
        initial: "async function answer(promises) {\n  return 0;\n}",
        test: async (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(await fn([Promise.resolve(10), Promise.resolve(20), Promise.resolve(30)]), 60);
        },
      },
      {
        id: "09-06",
        title: "Q6: 非同期データ取得",
        description: "id を受け取り { id, name: \"User${id}\" } を Promise で返す関数 answer を書いてください。",
        hint: "return { id, name: `User${id}` };",
        initial: "async function answer(id) {\n  \n}",
        test: async (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(await fn(5), { id: 5, name: "User5" });
        },
      },
      {
        id: "09-07",
        title: "Q7: 並列フェッチ",
        description: "id の配列を受け取り、各 id で Q6 と同様の { id, name } を全て並列取得して配列で返す async 関数 answer を書いてください。",
        hint: "Promise.all(ids.map(id => ...))",
        initial: "async function answer(ids) {\n  return [];\n}",
        test: async (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(await fn([1,2,3]), [
            { id: 1, name: "User1" },
            { id: 2, name: "User2" },
            { id: 3, name: "User3" },
          ]);
        },
      },
      {
        id: "09-08",
        title: "Q8: 非同期文字列変換",
        description: "Promise<string> を受け取り、文字列を大文字にして返す async 関数 answer を書いてください。",
        hint: "const s = await promise; return s.toUpperCase();",
        initial: "async function answer(promise) {\n  return \"\";\n}",
        test: async (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(await fn(Promise.resolve("hello")), "HELLO");
        },
      },
      {
        id: "09-09",
        title: "Q9: デフォルト値付き非同期取得",
        description: "Promise<T> とデフォルト値を受け取り、成功なら値、失敗ならデフォルト値を返す async 関数 answer を書いてください。",
        hint: "try/catch パターン",
        initial: "async function answer(promise, defaultValue) {\n  return defaultValue;\n}",
        test: async (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(await fn(Promise.resolve(42), 0), 42);
          const p = Promise.reject(new Error("err")); p.catch(()=>{});
          assertEqual(await fn(p, 99), 99);
        },
      },
      {
        id: "09-10",
        title: "Q10: 非同期状態管理",
        description: "fetchFn (async関数) を実行し、{ data: 結果|null, error: エラーメッセージ|null } を返す async 関数 answer を書いてください。\n成功: {data: 値, error: null}  失敗: {data: null, error: e.message}",
        hint: "try { const data = await fetchFn(); ... } catch (e) { ... }",
        initial: "async function answer(fetchFn) {\n  return { data: null, error: null };\n}",
        test: async (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(await fn(() => Promise.resolve("OK")), { data: "OK", error: null });
          const failFn = () => { const p = Promise.reject(new Error("NG")); p.catch(()=>{}); return p; };
          const r = await fn(failFn);
          assertEqual(r.data, null);
          assertEqual(r.error, "NG");
        },
      },
    ],
  },

  // ===================== 10章: React パターン =====================
  {
    id: 10,
    title: "10章: React パターン",
    questions: [
      {
        id: "10-01",
        title: "Q1: Props の分割代入",
        description: "{ label, disabled } を受け取り、disabled なら \"disabled: label\" を、そうでなければ \"active: label\" を返す関数 answer を書いてください。disabled が未指定なら false 扱い。",
        hint: "const { label, disabled = false } = props;",
        initial: "function answer(props) {\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn({ label: "送信", disabled: true }), "disabled: 送信");
          assertEqual(fn({ label: "送信" }), "active: 送信");
          assertEqual(fn({ label: "実行", disabled: false }), "active: 実行");
        },
      },
      {
        id: "10-02",
        title: "Q2: children の表示",
        description: "{ children, className? } を受け取り <div class=\"{className}\">{children}</div> を返す関数 answer を書いてください。className 未指定時は \"wrapper\"。",
        hint: "className ?? \"wrapper\"",
        initial: "function answer(props) {\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn({ children: "中身", className: "custom" }), '<div class="custom">中身</div>');
          assertEqual(fn({ children: "中身" }), '<div class="wrapper">中身</div>');
        },
      },
      {
        id: "10-03",
        title: "Q3: useReducer (TodoList)",
        description: "state(string[]) と action を受け取る reducer 関数 answer を書いてください。\nADD: { type:\"ADD\", text } → 末尾に追加\nREMOVE: { type:\"REMOVE\", id } → id番目を削除\nCLEAR: { type:\"CLEAR\" } → 空配列",
        hint: "switch + スプレッド構文 / filter",
        initial: "function answer(state, action) {\n  return state;\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertDeepEqual(fn(["a","b"], { type: "ADD", text: "c" }), ["a","b","c"]);
          assertDeepEqual(fn(["a","b","c"], { type: "REMOVE", id: 1 }), ["a","c"]);
          assertDeepEqual(fn(["a","b"], { type: "CLEAR" }), []);
        },
      },
      {
        id: "10-04",
        title: "Q4: リスト描画",
        description: "items(T[]) と renderItem(関数) を受け取り、renderItem の結果を \", \" で結合した文字列を返す関数 answer を書いてください。",
        hint: "items.map(renderItem).join(\", \")",
        initial: "function answer(items, renderItem) {\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn([1,2,3], n => `#${n}`), "#1, #2, #3");
          assertEqual(fn(["a","b"], s => s.toUpperCase()), "A, B");
        },
      },
      {
        id: "10-05",
        title: "Q5: useCounter カスタムフック",
        description: "useCounter() を書いてください。{ getCount, increment, decrement, reset } を返す。\n初期値0、increment→+1、decrement→-1、reset→0",
        hint: "let count = 0; をクロージャで管理する",
        initial: "function answer() {\n  return {\n    getCount: () => 0,\n    increment: () => {},\n    decrement: () => {},\n    reset: () => {},\n  };\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          const c = fn();
          assertEqual(c.getCount(), 0);
          c.increment(); c.increment();
          assertEqual(c.getCount(), 2);
          c.decrement();
          assertEqual(c.getCount(), 1);
          c.reset();
          assertEqual(c.getCount(), 0);
        },
      },
      {
        id: "10-06",
        title: "Q6: イベントハンドラ",
        description: "{ target: { value } } を受け取り value を大文字にして返す関数 answer を書いてください。",
        hint: "return event.target.value.toUpperCase();",
        initial: "function answer(event) {\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn({ target: { value: "hello" } }), "HELLO");
        },
      },
      {
        id: "10-07",
        title: "Q7: Context 値の作成",
        description: "初期テーマ (\"light\"|\"dark\") を受け取り、{ theme, toggleTheme, getTheme } を返す関数 answer を書いてください。toggleTheme は light↔dark を切り替える。",
        hint: "let theme = initial; toggleTheme で切り替える",
        initial: "function answer(initial) {\n  return {\n    getTheme: () => \"\",\n    toggleTheme: () => {},\n  };\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          const ctx = fn("light");
          assertEqual(ctx.getTheme(), "light");
          ctx.toggleTheme();
          assertEqual(ctx.getTheme(), "dark");
          ctx.toggleTheme();
          assertEqual(ctx.getTheme(), "light");
        },
      },
      {
        id: "10-08",
        title: "Q8: Props の rest パターン",
        description: "{ variant, size, ...rest } を分割代入し、{ variant, size, rest } をまとめて返す関数 answer を書いてください。size のデフォルトは \"md\"。",
        hint: "const { variant, size = \"md\", ...rest } = props;",
        initial: "function answer(props) {\n  return {};\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          const r = fn({ variant: "primary", size: "lg", id: "btn", className: "x" });
          assertEqual(r.variant, "primary");
          assertEqual(r.size, "lg");
          assertDeepEqual(r.rest, { id: "btn", className: "x" });
          const r2 = fn({ variant: "secondary" });
          assertEqual(r2.size, "md");
        },
      },
      {
        id: "10-09",
        title: "Q9: 条件付きレンダリング",
        description: "items(配列) を受け取り、空なら \"データなし\" を、あれば items.length + \"件\" を返す関数 answer を書いてください。",
        hint: "items.length === 0 で判定",
        initial: "function answer(items) {\n  return \"\";\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          assertEqual(fn([]), "データなし");
          assertEqual(fn([1,2,3]), "3件");
          assertEqual(fn(["a"]), "1件");
        },
      },
      {
        id: "10-10",
        title: "Q10: useForm（フォーム管理フック）",
        description: "初期値オブジェクトを受け取り、{ getValues, setValue, reset } を返す関数 answer を書いてください。\nsetValue(key, value) でフィールドを更新、reset で初期値に戻す。",
        hint: "let values = {...initial}; でコピーを管理する",
        initial: "function answer(initial) {\n  return {\n    getValues: () => ({}),\n    setValue: (key, value) => {},\n    reset: () => {},\n  };\n}",
        test: (code) => {
          const fn = runUserCode(code, "answer");
          const form = fn({ name: "", age: 0 });
          assertDeepEqual(form.getValues(), { name: "", age: 0 });
          form.setValue("name", "太郎");
          form.setValue("age", 20);
          assertDeepEqual(form.getValues(), { name: "太郎", age: 20 });
          form.reset();
          assertDeepEqual(form.getValues(), { name: "", age: 0 });
        },
      },
    ],
  },
];
