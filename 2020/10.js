function parseAndSort(input) {
    let list = input.split('\n').map(r => parseInt(r));
    list.sort((a,b) => a-b);
    return list;
}

function solvePart1(input) {
    let diffs = [0,0,0,1];
    parseAndSort(input).forEach((x,i,a) => { let d = x - (i==0? 0 : a[i-1]); diffs[d]++ });
    return diffs[1] * diffs[3];
}

function solvePart2(input) {
    let diffs = parseAndSort(input).map((x,i,a) => x - (i==0? 0 : a[i-1]));
    let segments = diffs.join('').split('3').filter(s => s.length>1).map(s => s.split('').map(x => parseInt(x)));
    // simplification by the actual data: there is no joltage gap of 2 initially
    // using lego bricks visualization, realization came that it's Fibonacci-like and
    // combinations for n hops of 1 = c(n) = c(n-1) + c(n-2) + c(n-3). Would be ... + c(n-X) where X is the max diff
    let maxLength = segments.reduce((m, x) => Math.max(m,x.length) , 0);
    let combinations = [1,1,2];
    for (let i=3; i<=maxLength; i++) { combinations[i] = combinations[i-1] + combinations[i-2] + combinations[i-3]; }
    return segments.map(s => combinations[s.length]).reduce((a,b) => a*b, 1);
}
