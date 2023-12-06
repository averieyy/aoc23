const fs = require("fs");
let timeraces = fs.readFileSync("./input").toString().trim();
console.log(timeraces);
let races = [];

let splitrace = timeraces.split("\n");

for (let i = 0; i < splitrace[0].split(/ +/).length; i++) {
  races.push([splitrace[0].split(/ +/)[i], splitrace[1].split(/ +/)[i]]);
}

races.splice(0,1);

console.log(races);

let sum = 1;

for (let i of races) {
  let solutions = 0;
  for (let j = 0; j < i[0]; j++) {
    if (j * (i[0]-j) > i[1]) solutions++;
  }
  sum *= solutions;
}

console.log(sum);

sum = 1;

let newrace = ["",""];

for (let i of races) {
  newrace[0] += i[0];
  newrace[1] += i[1];
}

for (let i = 0; i < newrace.length; i++) {
  newrace[i] = parseInt(newrace[i]);
}

newrace = [newrace];

for (let i of newrace) {
  let solutions = 0;
  for (let j = 0; j < i[0]; j++) {
    if (j * (i[0]-j) > i[1]) 
      {
        solutions++;
      }
  }
  sum *= solutions;
}

console.log(sum);