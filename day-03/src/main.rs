use itertools::Itertools;
use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();

    let backpacks = input
        .lines()
        .map(|line| line.parse::<String>().unwrap())
        .collect::<Vec<_>>();

    let mut item_priorities = ('a'..='z').into_iter().collect::<Vec<char>>();
    item_priorities.extend(('A'..='Z').into_iter().collect::<Vec<char>>());

    let part1 = part1(&backpacks, &item_priorities);
    println!("Part 1: {}", part1);

    let part2 = part2(&backpacks, &item_priorities);
    println!("Part 2: {}", part2);
}

fn part1(backpacks: &Vec<String>, item_priorities: &Vec<char>) -> usize {
    let mut priority_sum = 0;

    for (_i, backpack) in backpacks.iter().enumerate() {
        let (compartment_1, compartment_2) = backpack.split_at(backpack.len() / 2);

        let compartment_1_items = compartment_1.chars().collect::<Vec<char>>();
        let compartment_2_items = compartment_2.chars().collect::<Vec<char>>();

        let common_items = compartment_1_items
            .iter()
            .unique()
            .filter(|&item| compartment_2_items.contains(&item))
            .collect::<Vec<_>>();

        let priority_counts = common_items
            .iter()
            .map(|&item| item_priorities.iter().position(|&x| x == *item).unwrap() + 1)
            .collect::<Vec<_>>();

        let priority_total = priority_counts.iter().sum::<usize>();

        priority_sum += priority_total;
    }

    priority_sum
}

fn part2(backpacks: &Vec<String>, item_priorities: &Vec<char>) -> usize {
    let mut i = 0;

    let mut priority_sum = 0;

    while i < backpacks.len() {
        let elf_1_items = backpacks[i].chars().collect::<Vec<char>>();
        let elf_2_items = backpacks[i + 1].chars().collect::<Vec<char>>();
        let elf_3_items = backpacks[i + 2].chars().collect::<Vec<char>>();

        let common_items = elf_1_items
            .iter()
            .unique()
            .filter(|item| elf_2_items.contains(item) && elf_3_items.contains(item))
            .map(|item| item.to_string())
            .collect::<Vec<String>>()
            .join("");

        let priority_value = item_priorities
            .iter()
            .position(|item| common_items.contains(*item))
            .unwrap()
            + 1;

        priority_sum += priority_value;

        i = i + 3;
    }

    priority_sum
}
