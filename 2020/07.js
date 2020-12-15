function parse(input) {
    let edges = [];
    input.split('\n').forEach(line => {
        let rule = line.split(' bags contain ');
        rule[1].split(',').forEach(atomicRule => {
            let match = /([\d]+) ([a-z]+ [a-z]+) bags?/.exec(atomicRule);
            if (match) {
                edges.push([rule[0], match[2], parseInt(match[1])])
            }
        })
    })
    return edges;
}

function solvePart1(input) {
    let edges = parse(input);
    let queue = ['shiny gold'];
    let containers = [];
    do {
        let bagType = queue.pop();
        edges.filter(e => e[1] == bagType).forEach(e => {
            if (containers.indexOf(e[0]) == -1) {
                containers.push(e[0]);
                queue.push(e[0]);
            }
        })
    } while (queue.length > 0);
    return containers.length;
}

function solvePart2(input) {
    let edges = parse(input);
    let nest = (bagType) => edges.filter(e => e[0] == bagType).map(e => e[2] + e[2] * nest(e[1])).reduce((a,b) => a+b, 0)
    return nest('shiny gold');
}
