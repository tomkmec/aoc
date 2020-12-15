function parse(input) {
  return input.split('\n\n').map(g => g.split('\n'));
}

function uniqueChars(s) {
  let chars = {};
  for (let c of s) {
    chars[c] = true;
  }
  return Object.keys(chars);
}

function unionChars(sa) {
  let chars = {};
  for (let c of sa.join('')) {
    chars[c] = chars[c]? chars[c] + 1 : 1;
  }
  return Object.keys(chars).filter(ch => chars[ch] == sa.length);
}


function solvePart1(input) {
  return parse(input).map(g => uniqueChars(g.join('')).length).reduce((a,b) => a+b, 0)
}

function solvePart2(input) {
  return parse(input).map(g => unionChars(g).length).reduce((a,b) => a+b, 0)
}
