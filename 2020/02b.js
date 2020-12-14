function solve(input) {
  const regex = /([\d]+)-([\d]+) ([a-z]): ([a-z]+)/;
  let rows = input.split('\n');
  
  return rows.filter(r => {
    let match = regex.exec(r);
    return match[4].charAt(parseInt(match[1])-1) == match[3] ^ match[4].charAt(parseInt(match[2])-1) == match[3];
  }).length
}
