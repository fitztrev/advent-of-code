// https://adventofcode.com/2022/day/1
//
// Usage: npx ts-node 1.ts

import fs from "fs";

const inputs = fs.readFileSync("1-inputs.txt", "utf-8");

let elves = inputs
  .split("\n\n")
  .map((group) => group.split("\n"))
  .map((group) => group.reduce((acc, calories) => acc + parseInt(calories), 0))
  .sort((a, b) => b - a);

let elfWithMostCalories = elves[0];

let topThreeElvesTotalCalories = elves
  .slice(0, 3)
  .reduce((acc, calories) => acc + calories, 0);

console.log({
  elfWithMostCalories,
  topThreeElvesTotalCalories,
});
