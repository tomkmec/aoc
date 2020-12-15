String.prototype.between = function between(a,b) { let nx= parseInt(this); return nx>=a && nx<=b; }
const validators = {
  byr: (x) => x.between(1920, 2002),
  iyr: (x) => x.between(2010, 2020),
  eyr: (x) => x.between(2020, 2030),
  hgt: (x) => (x.endsWith('cm') && x.substring(0,x.length-2).between(150,193)) || (x.endsWith('in') && x.substring(0,x.length-2).between(59,76)),
  hcl: (x) => /^#[0-9a-f]{6}$/.test(x),
  ecl: (x) => ['amb','blu','brn','gry','grn','hzl','oth'].indexOf(x) > -1,
  pid: (x) => /^[0-9]{9}$/.test(x)
}
function parse(input) {
  return input.split('\n\n').map(rec => rec.replaceAll('\n',' ').split(' '));
}
function validate(item) {
  let ia = item.split(':');
  return validators[ia[0]](ia[1]);
}
function solvePart1(input) {
  return parse(input).filter(r => r.filter(d => d.substring(0,3) !== 'cid').length == 7).length;
}
function solvePart2(input) {
  return parse(input).filter(r => r.filter(d => d.substring(0,3) !== 'cid').filter(i => validate(i)).length == 7).length;
}
