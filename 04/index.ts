var fs = require("fs");

var data = fs.readFileSync("data.txt", "utf8");

const day04 = data
  .toString()
  .split("\n")
  .map((line: string) => line.split(""));

function makeString4(x: number, y: number, dx: number, dy: number) {
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += day04[x]?.[y] ?? ".";
    x += dx;
    y += dy;
  }
  return result;
}

const directions = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
];

function part1() {
  let count = 0;
  for (let i = 0; i < day04.length; i++) {
    for (let j = 0; j < day04[0].length; j++) {
      for (let d of directions) {
        const s = makeString4(i, j, d[0], d[1]);
        if (s === "XMAS" || s === "SAMX") {
          count++;
        }
      }
    }
  }
  return count;
}

function part2() {
  let count = 0;
  for (let i = 0; i < day04.length; i++) {
    for (let j = 0; j < day04[0].length; j++) {
      if (day04[i]?.[j] === "A") {
        const d1 = day04[i + 1]?.[j + 1] + "A" + day04[i - 1]?.[j - 1];
        const d2 = day04[i + 1]?.[j - 1] + "A" + day04[i - 1]?.[j + 1];
        if ((d1 === "SAM" || d1 === "MAS") && (d2 === "SAM" || d2 === "MAS")) {
          count++;
        }
      }
    }
  }
  return count;
}

console.log(part1());
console.log(part2());
