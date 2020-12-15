function parse(input) {
  return input.split('\n').map(r => [parseInt(r.substring(0,7).replaceAll('F','0').replaceAll('B','1'),2), parseInt(r.substring(7).replaceAll('L','0').replaceAll('R','1'),2)])
}

function solvePart1(input) {
  return parse(input).map(a=>a[0]*8+a[1]).sort((a,b) => b-a)[0]
}

function solvePart2(input) {
  //binary search would be more effective but ¯\_(ツ)_/¯
  return parse(input).map(a=>a[0]*8+a[1]).sort((a,b) => a-b).find((n, i, a) => n-a[0] != i)-1;
}
