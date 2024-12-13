import { performance } from "perf_hooks";
import fs from "fs";

var data = fs.readFileSync("data.txt", "utf8");

type Point = { x: number; y: number };
type Machine = {
  A: Point;
  B: Point;
  Prize: Point;
};

function parseToPoint(a: RegExpMatchArray | null): Point {
  return {
    x: parseInt(a?.groups?.X ?? "0"),
    y: parseInt(a?.groups?.Y ?? "0"),
  };
}

const cost = { A: 3, B: 1 };

const day13 = data.split("\n\n").map((a: string) => {
  const [A, B, P] = a.split("\n");
  const button = /Button (A|B): X\+(?<X>\d+), Y\+(?<Y>\d+)/;
  const prize = /Prize: X=(?<X>\d+), Y=(?<Y>\d+)/;
  const buttonA = A.match(button);
  const buttonB = B.match(button);
  const p = P.match(prize);
  return {
    A: parseToPoint(buttonA),
    B: parseToPoint(buttonB),
    Prize: parseToPoint(p),
  };
});

function measure(f: Function) {
  const start = performance.now();
  f();
  const end = performance.now();
  console.log("speed:", end - start);
}

function solveMachine(m: Machine): [number, number] {
  const c = m.A.x * m.B.y - m.A.y * m.B.x;
  if (c === 0) {
    return [0, 0];
  }
  const a = (m.Prize.x * m.B.y - m.Prize.y * m.B.x) / c;
  const b = -(m.Prize.x * m.A.y - m.Prize.y * m.A.x) / c;
  if (a >= 0 && a === Math.floor(a) && b === Math.floor(b) && b >= 0) {
    return [a, b];
  }
  return [0, 0];
}

function calcOneMachine(m: Machine): number {
  const [a, b] = solveMachine(m);
  return a * cost.A + b * cost.B;
}

function part131() {
  const result = day13.reduce(
    (acc, machine) => acc + calcOneMachine(machine),
    0
  );
  console.log("part 1:", result);
}

measure(part131);

function part132() {
  const data = day13.map((machine) => ({
    A: machine.A,
    B: machine.B,
    Prize: {
      x: machine.Prize.x + 10000000000000,
      y: machine.Prize.y + 10000000000000,
    },
  }));

  const result = data.reduce(
    (acc, machine) => acc + calcOneMachine(machine),
    0
  );
  console.log("part 2:", result);
}

measure(part132);
