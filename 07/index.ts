var fs = require("fs");

var data = fs.readFileSync("data.txt", "utf8");

const day07 = data
  .toString()
  .split("\n")
  .map((a: string) => {
    const [result, data] = a.split(":");
    const test = parseInt(result);
    const values = data
      .trim()
      .split(" ")
      .map((a) => parseInt(a.trim()));
    return { test, values };
  });

const ops = [
  (a: number, b: number) => a + b,
  (a: number, b: number) => a * b,
  (a: number, b: number) => parseInt(a.toString() + b.toString()),
];

function valid({ test, values }: { test: number; values: number[] }) {
  console.log(test, values);
  const len = values.length;
  const options = Math.pow(3, len);
  for (let i = 0; i < options; i++) {
    const op = i.toString(3).padStart(len, "0");
    let result = 0;
    for (let j = 0; j < len; j++) {
      result = ops[parseInt(op[j])](result, values[j]);
    }
    if (result === test) {
      return true;
    }
  }
  return false;
}

function part71() {
  return day07
    .filter(valid)
    .map(({ test }: { test: number }) => test)
    .reduce((a: number, b: number) => a + b);
}

console.log(part71());
