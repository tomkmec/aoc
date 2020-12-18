function parse(input) {
    let mask;
    let result = [];
    input.split('\n').forEach(line => {
        if (line.startsWith('mask')) {
            mask = line.split(' = ')[1]
        } else {
            let match = /mem\[([0-9]+)\] = ([0-9]+)/.exec(line);
            result.push({
                mask: mask,
                addr: parseInt(match[1]).toString(2),
                value: parseInt(match[2]).toString(2),
            })
        }
    });
    return result;
}

function solvePart1(input) {
    let r = {};
    parse(input).forEach(inst => {
        let bin = inst.value, masked='';
        bin = "0".repeat(inst.mask.length-bin.length) + bin;
        for (let i=0; i<bin.length; i++) {
            masked += inst.mask.charAt(i) == 'X' ? bin.charAt(i) : inst.mask.charAt(i)
        }
        r[inst.addr] = parseInt(masked,2);
    });
    return Object.values(r).reduce((a,b) => a+b,0);
}

function resolveAddresses(a, m) {
    let floatingBitsCount = m.split('').filter(c => c=='X').length;
    let count = Math.pow(2, floatingBitsCount);
    let result = [];
    for (let i=0; i<count; i++) {
        let floatingBits = (i).toString(2);
        floatingBits = ("0".repeat(floatingBitsCount-floatingBits.length) + floatingBits).split('');
        result.push(a.split('').map((ch,j) => {
            if (m.charAt(j) == '0') {
                return ch;
            } else if (m.charAt(j) == '1') {
                return '1';
            } else {
                return floatingBits.splice(0,1)[0];
            }
        }).join(''))        
    }
    return result;
}


function solvePart2(input) {
    let r = {};
    parse(input).forEach(inst => {
        resolveAddresses("0".repeat(inst.mask.length-inst.addr.length) + inst.addr, inst.mask)
            .forEach(a => r[a] = parseInt(inst.value, 2))
    });
    return Object.values(r).reduce((a,b) => a+b,0);
}
