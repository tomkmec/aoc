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

function apply(arr, precedence) {
    if (precedence) {
        arr = precedence(arr);
    }
    let n1 = typeof(arr[0])=='number'? arr[0] : apply(arr[0], precedence);
    let n2 = typeof(arr[2])=='number'? arr[2] : apply(arr[2], precedence);
    let res = (arr[1] == '+')? n1 + n2 : n1 * n2;
    return (arr.length > 3)? apply([res].concat(arr.slice(3)), precedence) : res;
}

function solvePart1(input) {
    return input.split('\n').map(row => apply(parseRow(row))).reduce((a,b) => a+b, 0)
}

function solvePart2(input) {
    let applyPrecedence = (row) => {
        if (row.length > 3 && row.includes('+') && row.includes('*')) {
            let multiplicationIndex = row.indexOf('*');
            return [applyPrecedence(row.slice(0,multiplicationIndex)), '*',applyPrecedence(row.slice(multiplicationIndex+1))];
        } else if (row.length === 1) {
            return row[0]
        } else {
            return row;
        }
    }
    return input.split('\n').map(parseRow).map(r => apply(r, applyPrecedence)).reduce((a,b) => a+b, 0)
}
