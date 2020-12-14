function solvePattern(input, pattern) {
  let rows = input.split('\n').filter((r,i) => i%pattern[1] == 0);
  let l = rows[0].length;
  return rows.filter((r, i) => r.charAt((i*pattern[0])%l) === '#').length;
}

function solvePart1(input) {
  return solvePattern(input, [3,1]);
}

function solvePart2(input) {
  let patterns = [ [1,1], [3,1], [5,1], [7,1], [1,2] ]
  return patterns.map(p => solvePattern(input, p)).reduce((a,b) => a*b, 1);
}
