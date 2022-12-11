<?php

$input = file_get_contents(__DIR__ . '/input.txt');

$headAt = [0, 0];
$tailAt = [0, 0];
$tailPositions = [];

foreach (explode("\n", $input) as $line) {
    [$dir, $steps] = explode(' ', $line);

    $move = [
        'U' => [0, 1],
        'D' => [0, -1],
        'L' => [-1, 0],
        'R' => [1, 0],
    ][$dir];

    foreach (range(1, $steps) as $step) {
        $headAt[0] += $move[0];
        $headAt[1] += $move[1];

        // if tail is not adjacent to head, move it
        while (abs($headAt[0] - $tailAt[0]) > 1 || abs($headAt[1] - $tailAt[1]) > 1) {
            if (in_array($dir, ['U', 'D'])) {
                $tailAt[0] = $headAt[0];
                $tailAt[1] += $move[1];
            } else if (in_array($dir, ['L', 'R'])) {
                $tailAt[0] += $move[0];
                $tailAt[1] = $headAt[1];
            } else {
                throw new Exception('unknown direction: ' . $dir);
            }

            $tailPositions[] = [$tailAt[0], $tailAt[1]];
        }
    }
}

echo 'part 1: ' . count(array_unique($tailPositions, SORT_REGULAR)) . PHP_EOL;
