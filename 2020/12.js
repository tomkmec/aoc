const rotations = ['N','E','S','W'];

function parse(input) {
    return input.split('\n').filter(r => r.length>0).map(r => {
        let match = /([A-Z])([0-9]+)/.exec(r);
        return [match[1], parseInt(match[2])]
    });
}

function solvePart1(input) {
    const instructions = {
        N: (status, arg) => { status.y -= arg },
        S: (status, arg) => { status.y += arg },
        W: (status, arg) => { status.x -= arg },
        E: (status, arg) => { status.x += arg },
        L: (status, arg) => { status.heading = rotations[(4+ rotations.indexOf(status.heading) - arg/90) % 4] },
        R: (status, arg) => { status.heading = rotations[(4+ rotations.indexOf(status.heading) + arg/90) % 4] },
        F: (status, arg) => { instructions[status.heading](status, arg) }
    }

    let status = { x:0, y:0, heading: 'E' };
    parse(input).forEach(i => { instructions[i[0]](status, i[1]); })
    return Math.abs(status.x) + Math.abs(status.y);
}
function solvePart2(input) {
    const instructions = {
        N: (status, arg) => { status.wp.y -= arg },
        S: (status, arg) => { status.wp.y += arg },
        W: (status, arg) => { status.wp.x -= arg },
        E: (status, arg) => { status.wp.x += arg },
        R: (status, arg) => { for (let i=0; i<arg/90; i++) status.wp = { x:-status.wp.y, y:status.wp.x} },
        L: (status, arg) => { for (let i=0; i<arg/90; i++) status.wp = { x:status.wp.y, y:-status.wp.x} },
        F: (status, arg) => { status.x += status.wp.x * arg; status.y += status.wp.y * arg }
    }

    let status = { x:0, y:0, heading: 'E', wp: {x:10, y:-1} };
    parse(input).forEach(i => { instructions[i[0]](status, i[1]); })
    return Math.abs(status.x) + Math.abs(status.y);
}
