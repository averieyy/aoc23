const fs = require("fs");

let inplines = fs.readFileSync("./input").toString().trim().split("\n");
let inp = inplines.join("\n");

let sum = 0;

let width = inplines[0].length;
let height = inplines.length;

let numbers = Array.from(inp.matchAll(/[0123456789]+/g));

for (const i of numbers) {
  console.log(i[0]);
  let xind = i.index % (width + 1);
  let yind = Math.floor(i.index / (height + 1));
  let found = false;
  for (let x = -1; x < i[0].length + 1; x++) {
    if (x + xind >= width || x + xind < 0) continue
    for (let y = -1; y < 2; y++) {
      if (y + yind >= height || y + yind < 0) continue
      console.log(`${yind + y},${xind + x}: ${inplines[yind + y][xind + x]}`);
      if (inplines[yind + y][xind + x].match(/[1234567890. \n]/) == null) {
        sum += parseInt(i[0]);
        console.log("found " + i[0]);
        found = true;
      }
      if (found) break;
    }
    if (found) break;
  }

  if (!found) console.log("not found " + i[0]);
}

let sum2 = 0;
let gears = Array.from(inp.matchAll(/[*]/g));

let allnums = []

for (const i of gears) {
  let xind = i.index % (width + 1);
  let yind = Math.floor(i.index / (height + 1));
  console.log(xind, yind);
  let nums = [];
  let lastwas = false;
  for (let y = -1; y < 2; y++) {
    if (y + yind >= height || y + yind < 0) continue;
    for (let x = -1; x < i[0].length + 1; x++) {
      if (x + xind >= width || x + xind < 0) continue;
      if ("1234567890".includes(inplines[yind + y][xind + x])) {
        if (!lastwas) nums.push([xind+x, yind+y]);
        lastwas = true;
      }
      else lastwas = false;
    }
    lastwas = false;
  }
  if (nums.length == 2) {
    let mult = 1;
    let debugnum = [];
    for (let num of nums) {
      let ii = num[0];
      if (num[0] < xind) {
        console.log("looping through");
        console.log(ii);
        for (; "1234567890".includes(inplines[num[1]][ii]); ii--) {}
        ii++;
      }
      else ii = num[0];
      debugnum.push([ii, num[1], inplines[num[1]].slice(ii).match(/[\d]+/)[0]]);
      console.log(inplines[num[1]].slice(ii).match(/[\d]+/)[0]);
      console.log(num[1], ii);
      mult = mult * inplines[num[1]].slice(ii).match(/[\d]+/)[0];
    }

    sum2 += mult;
    allnums.push(debugnum);
  }
}

for (let num of allnums) {
  console.log(num);
}

console.log(sum);
console.log(sum2);