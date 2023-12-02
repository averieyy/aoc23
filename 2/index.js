const fs = require("fs");

let data = fs.readFileSync("./input").toString().trim();

let sum = 0;

for (let i of data.split("\n")) {
  let tokens = i.split(/[ :,;]+/);
  let id = tokens[1];
  let invalid = false;
  for (let ii = 2; ii < tokens.length; ii+=2) {
    if (tokens[ii] > (tokens[ii+1] == "red" ? 12 : (tokens[ii+1] == "green" ? 13 : 14))) {
      invalid = true;
      break
    }
  }
  if (!invalid) {
    sum += parseInt(id);
    console.log(id);
  }
}
console.log(sum);

sum = 0

for (let i of data.split("\n")) {
  let tokens = i.split(/[ :,;]+/);
  let colors = {"red": [], "green": [], "blue": []};
  for (let ii = 2; ii < tokens.length; ii += 2) {
    colors[tokens[ii + 1]].push(parseInt(tokens[ii])); 
  }
  let sortfunc = (a , b) => b - a;
  colors.green.sort(sortfunc);
  colors.blue.sort(sortfunc);
  colors.red.sort(sortfunc);
  // console.log(colors);
  sum += colors.red[0] * colors.green[0] * colors.blue[0];
}
console.log(sum);