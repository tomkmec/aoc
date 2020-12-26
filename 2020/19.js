function parse(input) {
    let parts = input.split('\n\n'), rules = {};
    parts[0].split('\n').forEach(r => {
        let rule = r.split(':'), a = [];
        rules[r, rule[0]] = a;
        rule[1].split('|').forEach(v => {
            a.push(v.trim().replaceAll('"','').split(' '));
        })
    });
    return {
        rules: rules,
        data: parts[1].split('\n')
    };
}

function reverse(rules) {
    let rr = {};
    Object.keys(rules).forEach(k => {
        console.log(rules[k])
        rules[k].forEach((r, i) => {
            r.forEach((rv, j) => {
                rr[rv] = rr[rv] || [];
                rr[rv].push([k, i, j]);
            })
        })
    })
    return rr;
}
