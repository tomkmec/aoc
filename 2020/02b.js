function solve(input) {
  const regex = /([\d]+)-([\d]+) ([a-z]): ([a-z]+)/;
  let rows = input.split('\n');
  
  return rows.filter(r => {
    let match = regex.exec(r);
    // a function iterating over string indices looking ar charAt would be nicer to memory, but ¯\_(ツ)_/¯
    let actualCount = match[4].split('').filter(ch => ch == match[3]).length;
    return actualCount >= parseInt(match[1]) && actualCount <= parseInt(match[2]);
  }).length
}
