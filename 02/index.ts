var fs = require("fs");

var data = fs.readFileSync("data.txt", "utf8");

function isSafe(input: number[]) {
  const a = input.map((a, i, all) => a - all[i + 1]);
  a.pop();
  const sign = Math.sign(a[0]);
  if (sign === 0) {
    return false;
  }
  for (let i = 1; i < a.length; i++) {
    if (sign !== Math.sign(a[i])) {
      return false;
    }
  }
  for (let i = 0; i < a.length; i++) {
    if (Math.abs(a[i]) > 3) {
      return false;
    }
  }
  return true;
}

const b = data
  .toString()
  .split("\n")
  .map((dat: string) => dat.split(" "))
  .map((a: string[]) => {
    const array = a.map((d) => parseInt(d));
    return isSafe(array);
  });

console.log(b.filter((a: boolean) => a).length);

//for unsafe array, try removing one element at a time and check if the array is safe
const c = data
  .toString()
  .split("\n")
  .map((dat: string) => dat.split(" "))
  .map((a: string[], index: number) => {
    const array = a.map((d) => parseInt(d));
    if (isSafe(array)) {
      //   console.log("safe", index, array.join(","));
      return true;
    }
    // console.log("unsafe", index, array.join(","));
    for (let i = 0; i < array.length; i++) {
      const copy = array.toSpliced(i, 1);
      if (isSafe(copy)) {
        // console.log("  safe", index, copy.join(","), "from", array.join(","));
        return true;
      }
    }
    // console.log("unsafe", index, array.length, array.join(","));
    return false;
  });

console.log(c.filter((a: boolean) => a).length);
