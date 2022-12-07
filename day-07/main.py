from os import path


def get_containing_dirs(dir):
    # Convert a directory path to a list of all containing directories
    # input: /foo/bar/baz
    # output: ["/", "/foo", "/foo/bar", "/foo/bar/baz"]
    dirs = dir.split('/')
    parent_dirs = []
    for i in range(1, len(dirs)+1):
        parent_dirs.append(path.realpath('/' + '/'.join(dirs[:i])))
    return [*set(parent_dirs)]


with open(path.join(path.dirname(__file__), "input.txt")) as f:
    cwd = '/'
    dir_sizes = {}

    for line in f:
        args = line.strip().split(" ")

        if line.startswith("$ cd"):
            cwd = path.realpath(cwd + "/" + args[2])
        elif line[0].isdigit():
            dirs = get_containing_dirs(cwd)
            for dir in dirs:
                dir_sizes.setdefault(dir, 0)
                dir_sizes[dir] += int(args[0])

upTo100k = dict(filter(lambda item: item[1] <= 100_000, dir_sizes.items()))
print('part 1:', sum(upTo100k.values()))

disk_space_needed = abs(70_000_000 - 30_000_000 - dir_sizes['/'])
for dir in sorted(dir_sizes.items(), key=lambda x: x[1]):
    if dir[1] >= disk_space_needed:
        print('part 2:', dir[1])
        break
