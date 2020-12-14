function solve(desiredSum, input) {
  let cycles=0;
  let nums = input.split('\n').map(n => parseInt(n));
  nums.sort((a,b) => a-b);
  let numbers; 
  for(let i=0; i<nums.length && nums[i] + nums[i+1] + nums[i+2] <= desiredSum; i++) { 
    for(let j=i+1; j<nums.length && nums[i] + nums[j] + nums[j+1] <= desiredSum; j++) { 
      for(let k=j+1; k<nums.length && nums[i] + nums[j] + nums[k] <= desiredSum; k++) { 
        cycles++;
        let sum = nums[i] + nums[j] + nums[k];
        console.log(nums[i] + nums[j] + nums[k], nums[i], nums[j], nums[k])
        if (sum == desiredSum) {
          return [nums[i]*nums[j]*nums[k], cycles, nums[i], nums[j], nums[k]].concat(numbers);
        }
      }
    }
  }
}
