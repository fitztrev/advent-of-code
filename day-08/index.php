<?php

$input = file_get_contents(__DIR__ . '/input.txt');

$grid = [];
$visibleTreeCount = 0;
$highestScenicScore = 0;

$rows = explode("\n", $input);
foreach ($rows as $row) {
    $grid[] = str_split($row);
}

foreach ($grid as $rowNumber => $row) {
    foreach ($row as $columnNum => $treeHeight) {
        $treesToTheLeft = array_reverse(array_slice($row, 0, $columnNum));
        $treesToTheRight = array_slice($row, $columnNum + 1);

        $column = array_column($grid, $columnNum);
        $treesAbove = array_reverse(array_slice($column, 0, $rowNumber));
        $treesBelow = array_slice($column, $rowNumber + 1);

        if (
            empty($treesToTheLeft) ||
            empty($treesToTheRight) ||
            empty($treesAbove) ||
            empty($treesBelow) ||
            $treeHeight > max($treesToTheLeft) ||
            $treeHeight > max($treesToTheRight) ||
            $treeHeight > max($treesAbove) ||
            $treeHeight > max($treesBelow)
        ) {
            $visibleTreeCount++;
        }

        $highestScenicScore = max(
            $highestScenicScore,
            (treesVisibleFrom($treesToTheLeft, $treeHeight) *
                treesVisibleFrom($treesToTheRight, $treeHeight) *
                treesVisibleFrom($treesAbove, $treeHeight) *
                treesVisibleFrom($treesBelow, $treeHeight)
            )
        );
    }
}

function treesVisibleFrom(array $trees, int $yourTree): int
{
    $treesVisible = 0;

    foreach ($trees as $comparisonTree) {
        if ($comparisonTree >= $yourTree) {
            $treesVisible++;
            break;
        }

        $treesVisible++;
    }

    return $treesVisible;
}

echo 'part 1: ' . $visibleTreeCount . PHP_EOL;
echo 'part 2: ' . $highestScenicScore . PHP_EOL;
