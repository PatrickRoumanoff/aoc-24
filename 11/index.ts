import { parse } from "path";
import { start } from "repl";
import { convertToObject } from "typescript";

import { performance } from "perf_hooks";

var fs = require("fs");

var data = fs.readFileSync("data.txt", "utf8");
const day11 = data
  .toString()
  .split(" ")
  .map((a: string) => parseInt(a));

/*
If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
*/
function applyRules(a: number) {
  if (a === 0) {
    return [1];
  }

  const s = a.toString();
  if (s.length % 2 === 0) {
    return [
      parseInt(s.slice(0, s.length / 2)),
      parseInt(s.slice(s.length / 2)),
    ];
  }
  return [a * 2024];
}

const memo25 = new Map<string, number[]>();

function part111() {
  let stones = [...day11];
  for (let i = 0; i < 25; i++) {
    stones = stones.flatMap(applyRules);
  }
  console.log("part 1:", stones.length);
}

measure(part111);

function measure(f: Function) {
  const start = performance.now();
  f();
  const end = performance.now();
  console.log("speed:", end - start);
}

function part112() {
  const cache = new Map();
  function blink(a: number, blinks: number): number {
    const cacheKey = `${a}:${blinks}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    if (blinks === 0) {
      return 1;
    }

    if (a === 0) {
      const result = blink(1, blinks - 1);
      cache.set(cacheKey, result);
      return result;
    }
    const s = a.toString();
    if (s.length % 2 === 0) {
      const middle = s.length / 2;
      const result =
        blink(Number(s.slice(0, middle)), blinks - 1) +
        blink(Number(s.slice(middle)), blinks - 1);
      cache.set(cacheKey, result);
      return result;
    }
    const result = blink(a * 2024, blinks - 1);
    cache.set(cacheKey, result);
    return result;
  }
  console.log(
    "Part 2",
    day11.reduce((a: number, b: number) => a + blink(b, 75), 0)
  );
}

measure(part112);
