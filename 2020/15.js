function solve(iterations, ...input) {
    let mem = {}, spoken=0, distance=0;
    input.forEach((n,i) => {
        distance = mem[n] === undefined? 0 : i-mem[n];
        mem[n] = i;
        spoken = n;
    });
    for (let i = input.length; i<iterations; i++) {
        spoken=distance;
        distance = mem[spoken] === undefined? 0 : i-mem[spoken];
        mem[spoken] = i;
    }
    return spoken;
}
