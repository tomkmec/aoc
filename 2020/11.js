function parse(input) {
    return input.split('\n').map(r => r.split(''));
}

function neighbourCounts(arr) {
    let result = Array(arr.length).fill(0).map(() => Array(arr[0].length).fill(0));
    for (let r=0; r<arr.length; r++) {
        for (let c=0; c<arr[r].length; c++) {
            if (arr[r][c]=='#') {
                for (let x=-1; x<2; x++) for (let y=-1; y<2; y++) {
                    if (!(x==0 && y==0) && x+c >= 0 && x+c < arr[0].length && y+r >= 0 && y+r < arr.length) {
                        result[y+r][x+c]++
                    }
                }
            }
        }
    }
    return result;
}

function progress(arr) {
    let counts = neighbourCounts(arr);
    return arr.map((row, y) => row.map((seat, x) => {
        if (seat == 'L' && counts[y][x] == 0) {
            return '#';
        } else if (seat == '#' && counts[y][x] >= 4) {
            return 'L';
        } else {
            return seat;
        }
    }));
}

function isEqual(arr1, arr2) {
    for (let r in arr1) {
        for (let c in arr1[r]) {
            if (arr1[r][c] !== arr2[r][c]) {
                return false;
            }
        }
    }
    return true;
}

function solvePart1(input) {
    const MAX = 10000;
    let next = parse(input), now;
    let step = 0;
    do {
        now=next;
        next = progress(now);
        step++;
    } while (!isEqual(now, next) && step < MAX)

    if (step == MAX) {
        console.log(`could not stabilize in ${MAX} steps`);
    } else {
        return now.map(r => r.reduce((count, seat) => count + ((seat=='#')? 1 : 0), 0)).reduce((c, x) => c+x, 0);
    }
}

function solvePart2(input) {

}
