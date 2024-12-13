var fs = require("fs");

var data = fs.readFileSync("data.txt", "utf8");
const d = data
  .toString()
  .split("\n")
  .map((d: string) => d.split(" "))
  .map(([a, b]: string[]) => [parseInt(a), parseInt(b)])
  .reduce(
    (acc: { a: number[]; b: number[] }, [a, b]: number[]) => {
      acc.a.push(a);
      acc.b.push(b);
      return acc;
    },
    { a: [], b: [] }
  );
d.a.sort();
d.b.sort();
let sum = 0;
for (let i = 0; i < d.a.length; i++) {
  sum += Math.abs(d.a[i] - d.b[i]);
}
console.log(sum);

function counting(a: number, list: number[]) {
  let count = 0;
  for (let i = 0; i < list.length; i++) {
    if (a === list[i]) {
      count++;
    }
  }
  return count;
}

let sum2 = 0;
for (let i = 0; i < d.a.length; i++) {
  const count = counting(d.a[i], d.b);
  const value = d.a[i] * count;
  sum2 += value;
}

console.log(sum2);
