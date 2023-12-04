const fs = require("fs");

let scratchcards = fs.readFileSync("./input").toString().trim().split("\n");
let sum = 0

function checkcard (yournums, winnums) {
  let yourwinnums = [];
  let score = 0;
  for (let n of yournums) {
    if (winnums.includes(n)) {
      score++;
      yourwinnums.push(n);
    }
  }
  return score;
}

for (let sc of scratchcards) {
  let tokens = sc.split(/ +/).slice(2);
  let yournums = tokens.join(" ").split("|")[0].trim().split(" ");
  let winnums = tokens.join(" ").split("|")[1].trim().split(" ");
  console.log(yournums);
  console.log(winnums);
  let score = checkcard(yournums, winnums);
  if (score > 0) {
    sum += Math.pow(2,score-1);
  }
}

let sum2 = scratchcards.length;
let card_worth = [];
let copies = [];

for (let sc of scratchcards) {
  let tokens = sc.split(/ +/).slice(2);
  let yournums = tokens.join(" ").split("|")[0].trim().split(" ");
  let winnums = tokens.join(" ").split("|")[1].trim().split(" ");
  card_worth.push(checkcard(yournums, winnums));
}

for (let i = 0; i < scratchcards.length; i++) {
  copies[i] = 1;
}

function create_copies (card) {
  for (let i = 0; i < card_worth[card]; i++) {
    copies[card+i+1]+=copies[card];
    sum2+=copies[card];
    console.log(card+i+1, copies[card]);
  }
}

for (let i = 0; i < scratchcards.length; i++) {
  create_copies(i);
}

console.log(sum);
console.log(sum2);