function solvePart1(input) {
    let lines = input.split('\n');
    let notes = {
        ts: parseInt(lines[0]),
        buses: lines[1].split(',').filter(x => x != 'x').map(x => {return {id: parseInt(x)}})
    };
    notes.buses.forEach(b => { b.waitTime = b.id - notes.ts % b.id });
    notes.buses.sort((a,b) => a.waitTime - b.waitTime);
    return notes.buses[0].waitTime * notes.buses[0].id;
}

function primes(num) {
    let result = [];
    let x = num;
    do {
        for (d = 2; d<=Math.sqrt(x); d++) {
            if (x%d == 0) {
                result.push(d);
                x /= d;
                break;
            }
        }
    } while (d<=Math.sqrt(x));
    return result.concat([x]);
}

function lcm(x,y) {
    let xPrimes = primes(x), yPrimes = primes(y);
    let result =  [...xPrimes];
    for (yp of yPrimes) {
        let i = xPrimes.indexOf(yp);
        if (i == -1) {
            result.push(yp);
        } else {
            xPrimes.splice(i,1);
        }
    }
    return result.reduce((a,b) => a*b, 1);
}

function offsetIndex(x,y,o) {
    for (let i=1; i<y; i++) {
        if ((i*x+o) % y == 0 ) { return i*x }
    }
}

function solvePart2(input) {
    let offset = 0, freq = 1;
    input.split(',').forEach((sb,i) => { if (sb!='x') {
        let b = parseInt(sb);
        if (i > 0) {
            offset = offsetIndex(freq,b,i+offset)+offset
        }
        freq = lcm(freq, b)
        console.log(offset, freq)
    }})
    return offset;
}
