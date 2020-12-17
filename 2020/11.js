function parse(input) {
    return input.split('\n').map(r => r.split(''));
}

function neighbourCounts(arr, raytrace) {
    let result = Array(arr.length).fill(0).map(() => Array(arr[0].length).fill(0));
    for (let r=0; r<arr.length; r++) {
        for (let c=0; c<arr[r].length; c++) {
            if (arr[r][c]!='.') {
                for (let x=-1; x<2; x++) for (let y=-1; y<2; y++) {
                    if (!(x==0 && y==0)) {
                        let xx=c, yy=r;
                        let inside;
                        do { 
                            xx += x; yy += y; 
                            inside = (xx >= 0 && xx < arr[0].length && yy >= 0 && yy < arr.length);
                        } while (inside && raytrace && arr[yy][xx] == '.')
                        if (inside && arr[yy][xx] == '#') {
                            result[r][c]++;
                        }
                    }
                }
            }
        }
    }
    return result;
}

function progress(arr, raytrace, minSeatsToVacate) {
    let counts = neighbourCounts(arr, raytrace);
    return arr.map((row, y) => row.map((seat, x) => {
        if (seat == 'L' && counts[y][x] == 0) {
            return '#';
        } else if (seat == '#' && counts[y][x] >= minSeatsToVacate) {
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

function solve(input, raytrace, minSeatsToVacate) {
    const MAX = 3000;
    let next = parse(input), now;
    let step = 0;
    do {
        now=next;
        next = progress(now, raytrace, minSeatsToVacate);
        step++;
    } while (!isEqual(now, next) && step < MAX)

    if (step == MAX) {
        console.log(`could not stabilize in ${MAX} steps`);
    } else {
        return now.map(r => r.reduce((count, seat) => count + ((seat=='#')? 1 : 0), 0)).reduce((c, x) => c+x, 0);
    }
}

function solvePart1(input) {
    return solve(input, false, 4)
}
function solvePart2(input) {
    return solve(input, true, 5)
}
