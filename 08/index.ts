var fs = require("fs");

var data = fs.readFileSync("data.txt", "utf8");

type Point = { x: number; y: number };

const day08 = data
  .toString()
  .split("\n")
  .map((a: string) => a.split(""));

function buildAntiNodes(a: Point, b: Point): Point[] {
  const c: Point = {
    x: a.x - 2 * (a.x - b.x),
    y: a.y - 2 * (a.y - b.y),
  };
  const d = {
    x: b.x + 2 * (a.x - b.x),
    y: b.y + 2 * (a.y - b.y),
  };

  return [c, d];
}

function part81() {
  const antennas = new Map<string, Point[]>();
  day08.forEach((a: string[], x: number) =>
    a.forEach((b: string, y: number) => {
      if (b !== ".") {
        if (!antennas.has(b)) {
          antennas.set(b, [{ x, y }]);
        } else {
          antennas.get(b)?.push({ x, y });
        }
      }
    })
  );
  const part1 = structuredClone(day08);
  antennas.forEach((points: { x: number; y: number }[]) => {
    // build pair of points
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const p = buildAntiNodes(points[i], points[j]);
        if (part1[p[0].x]?.[p[0].y]) {
          part1[p[0].x][p[0].y] = "#";
        }
        if (part1[p[1].x]?.[p[1].y]) {
          part1[p[1].x][p[1].y] = "#";
        }
      }
    }
  });
  let count = 0;
  for (let i = 0; i < part1.length; i++) {
    for (let j = 0; j < part1[i].length; j++) {
      if (part1[i][j] === "#") {
        count++;
      }
    }
  }
  console.log(count);
}

part81();

function buildAllAntiNodes(
  a: Point,
  b: Point,
  maxX: number,
  maxY: number
): Point[] {
  const result: Point[] = [];
  let n = 1;
  while (
    a.x - n * (a.x - b.x) >= 0 &&
    a.y - n * (a.y - b.y) >= 0 &&
    a.x - n * (a.x - b.x) < maxX &&
    a.y - n * (a.y - b.y) < maxY
  ) {
    const c: Point = {
      x: a.x - n * (a.x - b.x),
      y: a.y - n * (a.y - b.y),
    };
    result.push(c);
    n++;
  }
  n = 1;
  while (
    b.x + n * (a.x - b.x) >= 0 &&
    b.y + n * (a.y - b.y) >= 0 &&
    b.x + n * (a.x - b.x) < maxX &&
    b.y + n * (a.y - b.y) < maxY
  ) {
    const d: Point = {
      x: b.x + n * (a.x - b.x),
      y: b.y + n * (a.y - b.y),
    };
    result.push(d);
    n++;
  }

  return result;
}

function part82() {
  const antennas = new Map<string, Point[]>();
  day08.forEach((a: string[], x: number) =>
    a.forEach((b: string, y: number) => {
      if (b !== ".") {
        if (!antennas.has(b)) {
          antennas.set(b, [{ x, y }]);
        } else {
          antennas.get(b)?.push({ x, y });
        }
      }
    })
  );
  const part2 = structuredClone(day08);
  antennas.forEach((points: { x: number; y: number }[]) => {
    // build pair of points
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const p = buildAllAntiNodes(
          points[i],
          points[j],
          part2.length,
          part2[0].length
        );
        p.forEach((a: Point) => {
          part2[a.x][a.y] = "#";
        });
      }
    }
  });
  console.log(part2.map((a: string[]) => a.join("")).join("\n"));

  let count = 0;
  for (let i = 0; i < part2.length; i++) {
    for (let j = 0; j < part2[i].length; j++) {
      if (part2[i][j] === "#") {
        count++;
      }
    }
  }
  console.log(count);
}

part82();
