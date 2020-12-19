function parse(input, dimensions) {
    let result = [];
    input.split('\n').forEach((r,y) => {
        r.split('').forEach((c, x) => {
            if (c=='#') {
                result.push(`${x},${y}`+',0'.repeat(dimensions-2));
            }
        })
    });
    return result;
}

function iterate(state, dimensions) {
    let counts = {};
    state.map(c => c.split(',').map(i => parseInt(i))).forEach(c => {
        let neighbours = Math.pow(3,dimensions);
        for (let i=0; i<neighbours; i++) if (i != Math.floor(neighbours/2)) {
            let target = new Array(dimensions).fill().map((_, d) => c[d] + (Math.floor(i/Math.pow(3,d))%3) - 1).join(',');
            counts[target] = (counts[target] || 0) + 1;
        }
    })
    let newState = [];
    Object.keys(counts).forEach(k => {
        if (counts[k]==3 || counts[k]==2 && state.includes(k)) {
            newState.push(k);
        }
    })
    return newState;
}

function solve(input, dimensions) {
    let state = parse(input, dimensions);
    for (let i=0; i<6; i++) {
        //console.log(state.length, state)
        state = iterate(state, dimensions);
    }
    return state.length;
}
