function reverse(rules) {
    let rr = {};
    Object.keys(rules).forEach(k => {
        rules[k].forEach((r, i) => {
            if (typeof(r) == 'string') {
                rr[r].push([k, i, 0])
            } else {
                r.forEach((rv, j) => {
                    rr[rv] = rr[rv] || [];
                    rr[rv].push([k, i, j]);
                })
            }
        })
    })
    return rr;
}

function parse(input) {
    let parts = input.split('\n\n'), rules = {};
    parts[0].split('\n').forEach(r => {
        let rule = r.split(':'), a = [];
        rules[r, rule[0]] = a;
        rule[1].split('|').forEach(v => {
            a.push(v.trim().replaceAll('"','').split(' '));
            // a.push(/^[ab]*$/.test(v.trim().replaceAll('"',''))? v.trim().replaceAll('"','') : v.trim().split(' '));
        })
    });
    return {
        rules: rules,
        // rr: reverse(rules),
        data: parts[1].split('\n')
    };
}

function pure(rule) {
    return !rule.find(x => x.find(y => y!='a' && y!='b'))
}

let rules = parse(input).rules;
let r = {};
for (let i=0; i<1000 && !r.hasOwnProperty("0"); i++) {
    for (let k in rules) {
        if (pure(rules[k])) {
            r[k] = rules[k];
            delete rules[k];
        } else {
            for (let i in rules[k]) {
                let knownI = rules[k][i].findIndex(c => r.hasOwnProperty(c))
                if (knownI>-1) {
                    // debugger
                    rules[k].splice(i,1,...r[rules[k][i][knownI]].map(r=> { 
                        let res = [...rules[k][i]];
                        res.splice(knownI,1,...r) 
                        return res;
                    } ))
                }
            }
        }
    }
    // console.log(r,rules)
}



