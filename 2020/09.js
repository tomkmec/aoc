function parse(input) {
    return input.split('\n').map(r => parseInt(r));
}

function validate(arr, idx, len) {
    return idx<len || arr.slice(idx-len, idx).find((x,i,a) => a.indexOf(arr[idx]-x)>-1) !== undefined;
}

function solvePart1Parsed(arr) {
    return arr.find((x, i, a) => !validate(a, i, 25));
}

function solvePart1(input) {
    return solvePart1Parsed(parse(input));
}

function solvePart2(input) {
    let arr = parse(input);
    let target = solvePart1Parsed(arr);
    for (let i in arr) {
        let j, sum;
        for (j=i, sum=0; sum < target; j++) { sum += arr[j] }
        if (sum == target) {
            let slice = arr.slice(i,j);
            slice.sort((a,b) => a-b);
            return slice[0]+slice[slice.length-1];
        }
    }
}
