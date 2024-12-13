var fs = require("fs");

var data = fs.readFileSync("data.txt", "utf8");

const day06 = data
  .toString()
  .split("\n")
  .map((a: string) => a.split(""));

function find(c: string, a: string[][]) {
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[i].length; j++) {
      if (a[i][j] === c) {
        return [i, j];
      }
    }
  }
  throw new Error("not found");
}

const dir = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
};

const list = Object.keys(dir);

const loopDetector = new Set<string>();

function move(from: number[], a: string[][]) {
  const d = a[from[0]][from[1]] as keyof typeof dir;
  const x1 = from[0] + dir[d][0];
  const y1 = from[1] + dir[d][1];
  if (a[x1]?.[y1] == undefined) {
    a[from[0]][from[1]] = "X";
    return [-1, -1];
  }
  if (a[x1]?.[y1] !== "#" && a[x1]?.[y1] !== "O") {
    a[from[0]][from[1]] = "X";
    if (loopDetector.has(`${x1},${y1},${d}`)) {
      return [-10, -10];
    }
    loopDetector.add(`${x1},${y1},${d}`);
    a[x1][y1] = d;
    return [x1, y1];
  } else {
    const index = list.indexOf(d);
    const nextDir = list[(index + 1) % list.length];
    a[from[0]][from[1]] = nextDir;
    return from;
  }
}

function part61(data: string[][]) {
  let next: number[] = find("^", data);

  while (true) {
    next = move(next, data);
    if (next[0] === -10) {
      return true;
    }
    if (
      next[0] < 0 ||
      next[1] < 0 ||
      next[0] >= data.length ||
      next[1] >= data[0].length
    ) {
      return false;
    }
  }
}

const day061 = structuredClone(day06);

part61(day061);
const map = day061.map((a: string[]) => a.join("")).join("\n");
let count = [...map.matchAll(/X/g)].length;
console.log(count);

function part62(loopStart: string[][], data: string[][]) {
  //loopstart contains the possible obstacle positions
  //but the starting point.
  const start: number[] = find("^", data);
  loopStart[start[0]][start[1]] = "^";
  let result = 0;
  for (let i = 0; i < loopStart.length; i++) {
    for (let j = 0; j < loopStart[i].length; j++) {
      if (loopStart[i][j] === "X") {
        loopDetector.clear();
        const copy = structuredClone(data);
        copy[i][j] = "O";
        const loop = part61(copy);
        if (loop) {
          result++;
        }
        // console.log(copy.map((a: string[]) => a.join("")).join("\n"));
      }
    }
  }
  console.log(result);
}

part62(day061, day06);
