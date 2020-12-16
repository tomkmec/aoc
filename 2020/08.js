function parse(input) {
    return input.split('\n').map(r => r.split(' '));
}

function execute(instructions) {
    let visited = {}, acc = 0, line = 0;
    while (visited[line] === undefined) {
        visited[line] = true;
        switch (instructions[line][0]) {
            case 'acc':
                acc += parseInt(instructions[line][1]);
            case 'nop':
                line++;
                break;
            case 'jmp':
                line += parseInt(instructions[line][1]);
                break;
            case 'end':
                return { success: true, acc: acc };
        }
    }
    return { success: false, acc: acc };
}

function solvePart1(input) {
    return execute(parse(input)).acc;
}

function solvePart2(input) {
    let instructions = parse(input);
    instructions.push(['end',0]);
    let result, i=-1, prev;
    do {
        let instruction = instructions[++i][0];
        if (instruction == 'nop' || instruction == 'jmp') {
            if (prev !== undefined) {
                instructions[prev][0] = instructions[prev][0] == 'nop' ? 'jmp' : 'nop';
            }
            instructions[i][0] = instructions[i][0] == 'nop' ? 'jmp' : 'nop';
            result = execute(instructions)
            prev = i;
        } else {
            continue;
        }
        console.log(i, result)
    } while ((result === undefined || !result.success) && (i < instructions.length))
    return result;
}
