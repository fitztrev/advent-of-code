import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

let cycleValues: Array<number> = [1];
let crt: string = "";

input.split("\n").forEach((instruction) => {
  let [command, value] = instruction.split(" ");

  let lastRegisterValue = cycleValues[cycleValues.length - 1];
  cycleValues.push(lastRegisterValue);

  if (command === "addx") {
    cycleValues.push(lastRegisterValue + parseInt(value));
  }
});

console.log(
  "part 1:",
  [20, 60, 100, 140, 180, 220].reduce((acc, cycle) => {
    return acc + cycleValues[cycle - 1] * cycle;
  }, 0)
);

for (let i = 0; i < cycleValues.length - 1; i++) {
  let spriteMiddle = cycleValues[i];
  let rowPosition = i % 40;

  if (rowPosition === 0) {
    crt += "\n";
  }

  if (spriteMiddle - 1 <= rowPosition && rowPosition <= spriteMiddle + 1) {
    crt += "#";
  } else {
    crt += " ";
  }
}

console.log("part 2:", crt);
