import { performance } from "perf_hooks";
import fs from "fs";

var data = fs.readFileSync("data.txt", "utf8");
const day12 = data.split("\n").map((a: string) => a.split(""));

const map = structuredClone(day12);

function measure(f: Function) {
  const start = performance.now();
  f();
  const end = performance.now();
  console.log("speed:", end - start);
}

function explore(a: string, i: number, j: number): number[][] {
  if (i < 0 || j < 0 || i >= day12.length || j >= day12[i].length) {
    return [];
  }
  if (day12[i][j] !== a) {
    return [];
  }
  day12[i][j] = ".";
  return [
    [i, j],
    ...(day12[i + 1]?.[j] === a ? explore(a, i + 1, j) : []),
    ...(day12[i - 1]?.[j] === a ? explore(a, i - 1, j) : []),
    ...(day12[i][j + 1] === a ? explore(a, i, j + 1) : []),
    ...(day12[i][j - 1] === a ? explore(a, i, j - 1) : []),
  ];
}

function regionSplit() {
  const regions = [];
  for (let i = 0; i < day12.length; i++) {
    for (let j = 0; j < day12[i].length; j++) {
      const r = day12[i][j];
      if (r == ".") {
        continue;
      }
      // console.log(day12.join("\n"));
      regions.push(explore(r, i, j));
    }
  }
  return regions;
}

const regions = regionSplit();

const dir = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function calculatePerimeter(region: number[][]) {
  let perimeter = 0;
  for (let i = 0; i < region.length; i++) {
    const [x, y] = region[i];
    perimeter += region.some((r) => r[0] === x + 1 && r[1] === y) ? 0 : 1;
    perimeter += region.some((r) => r[0] === x - 1 && r[1] === y) ? 0 : 1;
    perimeter += region.some((r) => r[0] === x && r[1] === y + 1) ? 0 : 1;
    perimeter += region.some((r) => r[0] === x && r[1] === y - 1) ? 0 : 1;
  }
  return { area: region.length, perimeter };
}

function part121() {
  const cost = regions.map(calculatePerimeter);
  console.log(
    "part 1:",
    cost.reduce((acc, { area, perimeter }) => acc + area * perimeter, 0)
  );
}

function isBorder(
  region: number[][],
  x: number,
  y: number,
  di: number
): boolean {
  const [a, b] = [x + dir[di][0], y + dir[di][1]];
  return !region.some((r) => r[0] === a && r[1] === b);
}

function calculateSide(region: number[][]) {
  let side = 0;
  const counted = new Set<string>();
  for (let i = 0; i < region.length; i++) {
    const [x, y] = region[i];
    for (let di = 0; di < dir.length; di++) {
      const key = `${x}:${y}|${di}`;
      const isB = isBorder(region, x, y, di);
      if (counted.has(key) || !isB) {
        continue;
      }
      if (isB) {
        counted.add(key);
        side++;
        // find all the other contiguous border points and mark them as counted
        const ortho = [dir[di][1], dir[di][0]];
        for (const xpl of [-1, 1]) {
          let z = xpl;
          while (
            region.some(
              (r) => r[0] === x + z * ortho[0] && r[1] === y + z * ortho[1]
            )
          ) {
            const [x1, y1] = [x + z * ortho[0], y + z * ortho[1]];
            const isBorder1 = isBorder(region, x1, y1, di);
            if (!isBorder1) {
              break;
            }
            if (isBorder1) {
              counted.add(`${x1}:${y1}|${di}`);
            }
            z += xpl;
          }
        }
      }
    }
  }
  return { area: region.length, side };
}

function part122() {
  const cost = regions.map(calculateSide);
  console.log(
    "part 2:",
    cost.reduce((acc, { area, side }) => acc + area * side, 0)
  );
}

measure(part121);
measure(part122);
