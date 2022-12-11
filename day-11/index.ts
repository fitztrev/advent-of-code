import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf-8");

type Monkey = {
  startingItems: number[];
  operation: Function;
  modulo: number;
  recipientWhenTrue: number;
  recipientWhenFalse: number;
  totalItemsInspected: number;
};

function parseInput(input: string) {
  let monkeys: Monkey[] = [];

  input.split("\n\n").forEach((block) => {
    const lines = block.split("\n");

    monkeys.push({
      startingItems: getNumbersInString(lines[1]),
      operation: (value: number) =>
        new Function("old", "return " + lines[2].split("=")[1])(value),
      modulo: getNumbersInString(lines[3]).slice(-1)[0],
      recipientWhenTrue: getNumbersInString(lines[4]).slice(-1)[0],
      recipientWhenFalse: getNumbersInString(lines[5]).slice(-1)[0],
      totalItemsInspected: 0,
    });
  });

  return monkeys;
}

function getNumbersInString(string: string) {
  return string
    .split(" ")
    .map((number) => parseInt(number))
    .filter((number) => !isNaN(number));
}

function calculateMonkeyBusiness(
  monkeys: Monkey[],
  rounds: number,
  worryDivisor: number
) {
  let stressManagementDivisor = monkeys.reduce(
    (acc, monkey) => acc * monkey.modulo,
    1
  );
  for (let round = 1; round <= rounds; round++) {
    for (let monkey of monkeys) {
      while (monkey.startingItems.length > 0) {
        let item = monkey.startingItems.shift();
        let newWorryLevel =
          Math.floor(monkey.operation(item) / worryDivisor) %
          stressManagementDivisor;
        let recipient =
          newWorryLevel % monkey.modulo === 0
            ? monkey.recipientWhenTrue
            : monkey.recipientWhenFalse;
        monkeys[recipient].startingItems.push(newWorryLevel);

        monkey.totalItemsInspected++;
      }
    }
  }

  return monkeys
    .map((monkey) => monkey.totalItemsInspected)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b);
}

console.log("part 1:", calculateMonkeyBusiness(parseInput(input), 20, 3));
console.log("part 2:", calculateMonkeyBusiness(parseInput(input), 10_000, 1));
