const fs = require("fs");

let rawin = fs.readFileSync("./input").toString().trim().split("\n\n");

let rawnodes = rawin[1];
let instructions = rawin[0].trim();

let nodes = {};

for (let i of rawnodes.split("\n")) {
  let tokens = i.split(/[ =(,)]+/);
  nodes[tokens[0]] = [tokens[1], tokens[2]]; 
}

console.log(nodes);

let currentnode = "AAA";
let steps = 0;
while (currentnode != "ZZZ") {
  if (instructions[steps % instructions.length] == "L") currentnode = nodes[currentnode][0];
  if (instructions[steps % instructions.length] == "R") currentnode = nodes[currentnode][1];
  steps++;
}

function finished(cn) {
  for (let i of cn) {
    if (!i.endsWith("Z")) return false;
    // else console.log(i, "is a valid endpoint");
  }
  return true;
}

let currentnodes = [];

for (let i in nodes) {
  if (i.endsWith("A")) currentnodes.push(i);
}

let howlongittakes = [];

for (let node = 0; node < currentnodes.length; node++) {
  let steps = 0;
  while (!finished([currentnodes[node]])) {
    // console.log(currentnodes[node], nodes[currentnodes[node]]);
    if (instructions[steps % instructions.length] == "L") currentnodes[node] = nodes[currentnodes[node]][0];
    if (instructions[steps % instructions.length] == "R") currentnodes[node] = nodes[currentnodes[node]][1];
    // console.log(currentnodes[node], nodes[currentnodes[node]]);
    steps++;
    if (steps % 10000000 == 0) console.log(steps);
  }
  howlongittakes.push(steps);
}

howlongittakes.sort((a, b) => b - a); // From high to low

let primes = [];

for (let i = 2; i <= howlongittakes[0]; i++) {
  let failed = false;
  for (let p of primes) {
    if (i % p == 0) {
      failed = true;
      break;
    }
  }
  if (!failed) {
    primes.push(i);
  }
}

function multipleMultiple(nums) {
  let final = 1;
  for (let i of nums) final *= i;
  return final;
}

let allprimes = [];

for (let i of howlongittakes) {
  let currentprimes = [];
  let ii = 0;
  while (multipleMultiple(currentprimes) != i) {
    // console.log(primes[ii], i);
    if (i % primes[ii] == 0) currentprimes.push(primes[ii]);

    ii++;
  }
  allprimes.push(currentprimes);
}

let tupleprimes = [];

for (let i of allprimes) {
  for (let ii of i) {
    if (!tupleprimes.includes(ii)) tupleprimes.push(ii);
  }
}


console.log(steps);
console.log(multipleMultiple(tupleprimes));