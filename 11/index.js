const fs = require("fs");

const inp = fs.readFileSync("./input").toString().trim().split("\n");

let galaxies = [];
let clearylines = [];
let clearxlines = [];

// Find galaxies

for (let y = 0; y < inp.length; y++) {
  for (let x = 0; x < inp[y].length; x++) {
    if (inp[y][x] == "#") galaxies.push([x,y]);
  }
}

let xarrs = [];

let gap = 999999;

for (let y = 0; y < inp.length; y++) {
  if (!inp[y].includes("#")) clearylines.push(y);
  for (let x = 0; x < inp[y].length; x++) {
    if (xarrs.length != inp[y].length) xarrs.push("");
    xarrs[x] += inp[y][x];
  }
}

for (let x = 0; x < xarrs.length; x++) {
  if (!xarrs[x].includes("#")) clearxlines.push(x);
}

console.log(clearxlines);
console.log(clearylines);

let modifiedgalaxies = [];

for (let i of galaxies) {
  let x = i[0];
  let y = i[1];

  for (let ii of clearxlines) {
    if (i[0] < ii) break;
    x += gap;
  }
  for (let ii of clearylines) {
    if (i[1] < ii) break;
    y += gap;
  }
  modifiedgalaxies.push([x,y]);
}

// Get distances

console.log(galaxies);
console.log(modifiedgalaxies);

let sum = 0;

for (let i = 0; i < modifiedgalaxies.length; i++) {
  for (let ii of modifiedgalaxies.slice(i)) {
    sum += Math.abs(modifiedgalaxies[i][0] - ii[0]) + Math.abs(modifiedgalaxies[i][1] - ii[1]);
  }
}

console.log(sum);