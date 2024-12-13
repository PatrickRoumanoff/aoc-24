var fs = require("fs");

var data = fs.readFileSync("data.txt", "utf8");

const day03 = data.toString().split("\n");

function part31() {
  const validMultiplication = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const lines = day03.map((line: string) => {
    const m = line.match(validMultiplication);
    const result = m?.map((a: string) =>
      a
        .replace("mul(", "")
        .replace(")", "")
        .split(",")
        .map(Number)
        .reduce((a, b) => a * b)
    );
    const r2 = result?.reduce((a, b) => a + b);
    // console.log(result?.join(","), r2);
    return r2;
  });

  console.log(lines.reduce((a: number, b: number) => a + b));
}

function part32() {
  const validMultiplication = /do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/g;
  let doIt = true;
  const lines = day03.map((line: string) => {
    const m = line.match(validMultiplication);
    if (m == undefined) {
      console.log("no match", line);
      return 0;
    }
    let result = 0;
    for (let i = 0; i < m.length; i++) {
      const a = m[i];
      if (a === "do()") {
        doIt = true;
        continue;
      }
      if (a === "don't()") {
        doIt = false;
        continue;
      }
      if (!doIt) continue;
      result += a
        .replace("mul(", "")
        .replace(")", "")
        .split(",")
        .map(Number)
        .reduce((a: number, b: number) => a * b, 1);
      console.log(a, result);
    }
    return result;
  });
  console.log(lines);
  console.log(lines.reduce((a: number, b: number) => a + b, 0));
}

part31();
part32();
