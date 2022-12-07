from os import path
import re

with open(path.join(path.dirname(__file__), "input.txt")) as f:
    (startingStacks, moves) = f.read().split("\n\n")
    startingStacks = startingStacks.split("\n")[:-1]

    # create string representation of each of the stacks
    stacks = {}
    for row in startingStacks:
        for column in range(int(len(row) / 4) + 1):
            stacks.setdefault(column+1, '')
            stacks[column+1] += row[column*4 + 1].strip()

    stacks_part1 = stacks.copy()
    stacks_part2 = stacks.copy()

    for move in moves.split("\n"):
        (qty, fromStack, toStack) = [int(x) for x in re.findall(r'\d+', move)]
        # in part 1, crates are moved 1 at a time
        for i in range(qty):
            stacks_part1[toStack] = stacks_part1[fromStack][0] + \
                stacks_part1[toStack]
            stacks_part1[fromStack] = stacks_part1[fromStack][1:]

        # in part 2, crates are all moved at once
        stacks_part2[toStack] = stacks_part2[fromStack][:qty] + \
            stacks_part2[toStack]
        stacks_part2[fromStack] = stacks_part2[fromStack][qty:]

    print('part 1: {}'.format(
        ''.join([stacks_part1[index][0] for index in stacks_part1])))
    print('part 2: {}'.format(
        ''.join([stacks_part2[index][0] for index in stacks_part2])))
