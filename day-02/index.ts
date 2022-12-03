// https://adventofcode.com/2022/day/2
//
// Usage: npx ts-node index.ts

import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

type ThrowOption = "rock" | "paper" | "scissors";

let part1 = input
  .split("\n")
  .map((line) =>
    line
      .replace(/[AX]/g, "rock")
      .replace(/[BY]/g, "paper")
      .replace(/[CZ]/g, "scissors")
  );

let part2 = input
  .split("\n")
  .map((line) =>
    line
      .replace(/A X/, "rock scissors")
      .replace(/B X/, "paper rock")
      .replace(/C X/, "scissors paper")
      .replace(/A Y/, "rock rock")
      .replace(/B Y/, "paper paper")
      .replace(/C Y/, "scissors scissors")
      .replace(/A Z/, "rock paper")
      .replace(/B Z/, "paper scissors")
      .replace(/C Z/, "scissors rock")
  );

function calculatePoints(matches: string[]) {
  let extraPoints: Record<ThrowOption, number> = {
    rock: 1,
    paper: 2,
    scissors: 3,
  };

  return matches
    .map((throws) => {
      let you: ThrowOption = throws.split(" ")[1] as any;

      switch (throws) {
        // you win
        case `rock paper`:
        case `paper scissors`:
        case `scissors rock`:
          return 6 + extraPoints[you];

        // you draw
        case `rock rock`:
        case `paper paper`:
        case `scissors scissors`:
          return 3 + extraPoints[you];

        // you lose
        default:
          return 0 + extraPoints[you];
      }
    })
    .reduce((acc, curr) => acc + curr, 0);
}

console.log("part 1 points:", calculatePoints(part1));
console.log("part 2 points:", calculatePoints(part2));
