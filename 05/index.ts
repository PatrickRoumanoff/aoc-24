var fs = require("fs");

var data = fs.readFileSync("data.txt", "utf8");

const day05 = data.toString().split("\n");

const order: { a: number; b: number }[] = [];
const update: number[][] = [];

day05.map((line: string) => {
  if (line.includes("|")) {
    const [a, b] = line.split("|");
    order.push({ a: parseInt(a), b: parseInt(b) });
  }
  if (line.includes(",")) {
    const o = line.split(",").map((d) => parseInt(d));
    update.push(o);
  }
});

function sequenceInOrder(a: number, b: number): boolean {
  for (let i = 0; i < order.length; i++) {
    if (a === order[i].a && b === order[i].b) {
      return true;
    }
  }
  return false;
}

function updateInCorrectOrder(u: number[]): boolean {
  for (let i = 0; i < u.length - 1; i++) {
    if (!sequenceInOrder(u[i], u[i + 1])) {
      return false;
    }
  }
  return true;
}

function middle(a: number[]): number {
  return a[Math.floor(a.length / 2)];
}

console.log(
  update
    .filter(updateInCorrectOrder)
    .map(middle)
    .reduce((a, b) => a + b, 0)
);

function fixupOrder(a: number[]): number[] {
  let change = false;
  do {
    change = false;
    for (let i = 0; i < a.length - 1; i++) {
      if (!sequenceInOrder(a[i], a[i + 1])) {
        change = true;
        const b = a[i];
        a[i] = a[i + 1];
        a[i + 1] = b;
      }
    }
  } while (change);
  return a;
}

console.log(
  update
    .filter((a) => !updateInCorrectOrder(a))
    .map(fixupOrder)
    .map(middle)
    .reduce((a, b) => a + b, 0)
);
