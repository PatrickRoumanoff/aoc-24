import { parse } from "path";
import { start } from "repl";
import { convertToObject } from "typescript";

var fs = require("fs");

var data = fs.readFileSync("test.txt", "utf8");
const day10 = data
  .toString()
  .split("\n")
  .map((a: string) => a.split("").map((a) => (a != "." ? parseInt(a) : -1)));

type Point = { x: number; y: number; v: number; di: number };

function findValue(data: number[][], value: number) {
  const result: Point[] = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === value) {
        result.push({ x: i, y: j, v: value, di: 0 });
      }
    }
  }
  return result;
}

const d = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
];

function findNext(data: number[][], p: Point) {
  const result: Point[] = [];
  d.forEach((a, di) => {
    const i = p.x + a.x;
    const j = p.y + a.y;
    if (data[i]?.[j] === p.v + 1) {
      result.push({ x: i, y: j, v: p.v + 1, di });
    }
  });
  return result;
}

function* findPath(data: number[][], start: Point) {
  const next = findNext(data, start);
  for (let i = 0; i < next.length; i++) {
    yield next[i];
  }
}

function* deep(data: number[][], start: Point) {
  for (let i = 0; i < 4; i++) {
    const p = {
      x: start.x + d[i].x,
      y: start.y + d[i].y,
      v: start.v + 1,
      di: 0,
    };
    if (data[p.x]?.[p.y] === start.v + 1) {
      yield p;
    }
  }
}

function* deep2(data: number[][], path: Point[]): Generator<Point[]> {
  const start = path[path.length - 1];
  for (let i = 0; i < 4; i++) {
    const p = {
      x: start.x + d[i].x,
      y: start.y + d[i].y,
      v: start.v + 1,
      di: 0,
    };
    if (data[p.x]?.[p.y] === 9 && start.v === 8) {
      yield [...path, p];
    }
    if (data[p.x]?.[p.y] === start.v + 1) {
      yield* deep2(data, [...path, p]);
    }
  }
}

function toString(p: Point) {
  return `${p.x},${p.y}`;
}

function part1012() {
  const start = findValue(day10, 0);
  let count = 0;
  start.forEach((p0) => {
    for (const p1 of deep2(day10, [p0])) {
      count++;
    }
  });
  console.log(count);
}

function part101() {
  const start = findValue(day10, 0);
  console.log(start.length);
  let count = 0;
  const paths: Record<string, string[]> = {};
  start.forEach((p0) => {
    for (const p1 of deep(day10, p0)) {
      for (const p2 of deep(day10, p1)) {
        for (const p3 of deep(day10, p2)) {
          for (const p4 of deep(day10, p3)) {
            for (const p5 of deep(day10, p4)) {
              for (const p6 of deep(day10, p5)) {
                for (const p7 of deep(day10, p6)) {
                  for (const p8 of deep(day10, p7)) {
                    for (const p9 of deep(day10, p8)) {
                      const start = toString(p0);
                      const end = toString(p9);
                      if (!paths[start]) {
                        paths[start] = [];
                      }
                      if (!paths[start].includes(end)) {
                        paths[toString(p0)].push(end);
                      }
                      count++;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
  console.log(paths);
  console.log(
    Object.values(paths)
      .map((a) => a.length)
      .reduce((a, b) => a + b)
  );
  console.log(count);
}

part1012();
