from os import path
import re

fully_contained_count = 0
overlapping_count = 0

with open(path.join(path.dirname(__file__), "input.txt")) as f:
    for line in f:
        # get each of the lower/upper bounds and convert to integers
        bounds = [int(x) for x in re.split('[,-]', line)]
        elf_1 = set(range(bounds[0], bounds[1] + 1))
        elf_2 = set(range(bounds[2], bounds[3] + 1))

        overlapping_sections = elf_1.intersection(elf_2)

        if overlapping_sections == elf_1 or overlapping_sections == elf_2:
            fully_contained_count += 1

        if overlapping_sections:
            overlapping_count += 1

print(f'part 1: {fully_contained_count}')
print(f'part 2: {overlapping_count}')
