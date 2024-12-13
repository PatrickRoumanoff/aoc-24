import { start } from "repl";

var fs = require("fs");

var data = fs.readFileSync("data.txt", "utf8");
// data = "12345";
const day09 = data.toString().split("");

function expand(data: string[]): string[] {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < parseInt(data[i]); j++) {
      if (i % 2 === 0) {
        result.push(`${i / 2}`);
      } else {
        result.push(".");
      }
    }
  }
  return result;
}

function part91() {
  let next = expand(day09);
  let nextFree = 0;
  for (let i = next.length - 1; i >= 0; i--) {
    if (next[i] !== ".") {
      nextFree = next.indexOf(".", nextFree);
      if (nextFree >= i) {
        break;
      }
      next[nextFree] = next[i];
      next[i] = ".";
    }
    // console.log(next.join(""));
  }
  // console.log(next.join(""));

  console.log(
    next
      .filter((a) => a != ".")
      .map((a) => parseInt(a))
      .reduce((acc: number, a: number, i: number) => acc + a * i)
  );
}

part91();

function findFreeBlock(data: string[], len: number): number {
  for (let i = 0; i < data.length - len; i++) {
    let j = 0;
    while (data[i + j] === ".") {
      j++;
    }
    if (j >= len) {
      return i;
    }
  }
  return -1;
}

function part92() {
  let next = expand(day09);
  let nextFree = 0;
  for (let i = next.length - 1; i >= 0; i--) {
    if (next[i] !== ".") {
      const startOfBlock = next.indexOf(next[i], nextFree);
      const lenOfBlock = i - startOfBlock + 1;
      i = startOfBlock;
      const freeBlock = findFreeBlock(next, lenOfBlock);
      // console.log(next[i], { startOfBlock, lenOfBlock, freeBlock });
      if (freeBlock == -1) {
        continue;
      }
      if (freeBlock >= startOfBlock) {
        continue;
      }
      const id = next[startOfBlock];
      for (let j = freeBlock; j < freeBlock + lenOfBlock; j++) {
        // console.log(j, freeBlock, freeBlock + lenOfBlock);
        next[j] = id;
        next[startOfBlock + j - freeBlock] = ".";
        // console.log(next.join(""));
      }
      // console.log(next.join(""));
    }
  }
  console.log(
    next
      .map((a) => {
        if (a != ".") return parseInt(a);
        return 0;
      })
      .reduce((acc: number, a: number, i: number) => acc + a * i)
  );
}

part92();
