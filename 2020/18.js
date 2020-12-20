function tokenize(input) {
    return input.replaceAll('(', '( ').replaceAll(')', ' )').split(' ').map(x => (x==parseInt(x)? parseInt(x) : x))
}

function parseRow(input) {
    let result = [];
    let current = result, stack = [];
    for (t of tokenize(input)) {
        if (t==='(') {
            newLevel = [];
            current.push(newLevel);
            stack.push(current); 
            current = newLevel;
        } else if (t===')') {
            current = stack.pop();
        } else {
            current.push(t)
        }
    }
    return result;
}

function apply(arr) {
    let n1 = typeof(arr[0])=='number'? arr[0] : apply(arr[0]);
    let n2 = typeof(arr[2])=='number'? arr[2] : apply(arr[2]);
    let res = (arr[1] == '+')? n1 + n2 : n1 * n2;
    return (arr.length > 3)? apply([res].concat(arr.slice(3))) : res;
}

function solvePart1(input) {
    return input.split('\n').map(row => apply(parseRow(row))).reduce((a,b) => a+b, 0)
}
