function parse(input) {
    let parts = input.split('\n\n');
    let rules = {};
    parts[0].split('\n').forEach(r => {
        let match = /([a-z ]+): ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)/.exec(r); 
        rules[match[1]] = [parseInt(match[2]), parseInt(match[3]), parseInt(match[4]), parseInt(match[5])]})
    return {
        rules: rules,
        myTicket: parts[1]
            .split('\n')[1]
            .split(',')
            .map(i => parseInt(i)),
        nearby: parts[2]
            .split('\n')
            .slice(1)
            .filter(r => r.trim().length > 0)
            .map(r => r.split(',').map(i => parseInt(i)))
    }
}

function validNumbers(rules) {
    let valid = {};
    Object.values(rules).forEach(rule => {
        for (let range=0; range<2; range++) {
            for (let i=rule[range*2]; i<=rule[range*2+1]; i++) {
                valid[i] = true;
            }
        }
    });
    return valid;
}

function solvePart1(input) {
    let data = parse(input)
    let valid = validNumbers(data.rules);
    let result = 0;
    data.nearby.forEach(t => {
        t.forEach(n => {
            if (!valid[n]) {
                result+=n;
            }
        })
    })
    return result;
}

function solvePart2(input) {
    let data = parse(input)
    let valid = validNumbers(data.rules);
    let validNearby = data.nearby.filter(t => t.find(n => !valid[n]) == undefined)
    let possibleRules = data.myTicket.map(() => Object.keys(data.rules));
    validNearby.forEach(t => {
        t.forEach((n,i) => {
            possibleRules[i] = possibleRules[i].filter(rName => {
                let r = data.rules[rName];
                return(n >= r[0] && n <= r[1]) || (n >= r[2] && n <= r[3])
            })
        })
    })

    let alreadyTakenOut = [];
    while (possibleRules.find(rules => rules.length>1) !== undefined) {
        let toTakeOut = possibleRules.find(rules => rules.length==1 && alreadyTakenOut.indexOf(rules[0]) == -1)[0];
        alreadyTakenOut.push(toTakeOut);
        possibleRules.forEach(rules => {
            if (rules.length>1 && rules.indexOf(toTakeOut)>-1) {
                rules.splice(rules.indexOf(toTakeOut), 1)
            }
        })
    }

    return data.myTicket.filter((n, i) => possibleRules[i][0].startsWith("departure")).reduce((a,b) => a*b, 1)
}
