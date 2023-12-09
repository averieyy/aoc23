const fs = require("fs");

let lines = fs.readFileSync("./input")
  .toString()
  .trim()
  .split("\n")
  .map((v) => {
    return v.split(" ");
  }
);

console.log(lines);

let historylines = [];

function convertToDiffs(line) {
  let allines = [line.map(v => parseInt(v))];
  let lastline = line;
  while (lastline.length != 1) {
    let currentdiff = [];
    for (let i = 1; i < lastline.length; i++) {
      currentdiff.push(lastline[i] - lastline[i-1]);
    }
    allines.push(currentdiff);
    lastline = currentdiff;
  }
  return allines;
}

for (let i of lines) {
  historylines.push(convertToDiffs(i));
}

function addUp(historyline) {
  let hiscopy = JSON.parse(JSON.stringify(historyline));
  for (let i = hiscopy.length; i >= 1; i--) {
    hiscopy[i-1].push((hiscopy[i] == undefined ? 0 : hiscopy[i][hiscopy[i].length-1]) + hiscopy[i-1][hiscopy[i-1].length-1]);
  }
  return hiscopy;
}

function subtractback(historyline) {
  let outp = [];
  for (let i = historyline.length; i >= 1; i--) {
    console.log(historyline[i-1][0], (historyline[i] == undefined ? 0 : historyline[i][0]));
    outp.push((historyline[i-1][0] - (historyline[i] == undefined ? 0 : outp[outp.length-1])));
  }
  return outp;
}

let sum1 = 0, sum2 = 0;
for (let i of historylines) {
  console.log(i);
  let addedup = addUp(i);
  console.log(addedup[0][addedup.length]);
  console.log(i);
  sum1 += addedup[0][addedup.length];

  let subbed = subtractback(i);
  for (let ii of subbed) {
    console.log(ii);
  }
  sum2 += subbed[subbed.length - 1];
}

console.log(sum1, "sum1");
console.log(sum2, "sum2");