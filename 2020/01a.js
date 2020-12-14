function solve(desiredSum, input) {
  let nums = input.split('\n').map(n => parseInt(n));
  nums.sort((a,b) => a-b);
  let maxI = nums.findIndex(n => n>desiredSum/2);
  let numbers; 
  for(let i=0; i<maxI; i++) { 
    let j=nums.length; 
    let sum; 
    do { 
      sum = nums[i] + nums[--j] 
    } while (sum > desiredSum); 
    if (sum == desiredSum) {
      numbers = [nums[i],nums[j]]; 
      break;
    } 
  }
  return numbers[0]*numbers[1];
}
