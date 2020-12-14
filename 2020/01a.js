function solve(desiredSum, input) {
  let nums = input.split('\n').map(n => parseInt(n));
  nums.sort((a,b) => a-b);
  let maxI = nums.findIndex(n => n>desiredSum/2);
  let numbers; 
  for(let i=0; i<maxI; i++) { 
    let j=y.length; 
    let sum; 
    do { 
      sum = y[i] + y[--j] 
    } while (sum > desiredSum); 
    if (sum == desiredSum) {
      numbers = [y[i],y[j]]; 
      break;
    } 
  }
  return numbers[0]*numbers[1];
}
