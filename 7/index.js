const fs = require("fs");

let rawcards = fs.readFileSync("./input").toString().trim().split("\n");

let cards = [];

for (let i of rawcards) {
  let spacetokens = i.split(" ");
  let rawvalues = spacetokens[0].split("");
  let values = [];
  for (let value of rawvalues) {
    switch (value) {
      case "T":
        values.push(10);
        break;
      case "J":
        values.push(11);
        break;
      case "Q":
        values.push(12);
        break;
      case "K":
        values.push(13);
        break;
      case "A":
        values.push(14);
        break;
      default:
        values.push(parseInt(value));
        break;
    }
  }

  cards.push([values,parseInt(spacetokens[1])]);
}

function matches(array, mlist) {
  if (array.length != mlist.length) return false;
  for (let i = 0; i < array.length; i++) {
    if (array[i] != mlist[i]) return false;
  }
  return true;
}

function getValueOfCard (card) {
  let values = {};
  for (let i of card[0]) {
    if (!(i in values)) {
      values[i] = 1;
    }
    else values[i]++;
  }

  let vallist = [];
  for (let i in values) {
    vallist.push(values[i]);
  }

  vallist.sort((a, b) => b - a);

  console.log(vallist, vallist[0] );

  if (matches(vallist, [5])) return 6;
  if (matches(vallist, [4, 1])) return 5;
  if (matches(vallist, [3, 2])) return 4;
  if (matches(vallist, [3, 1, 1])) return 3;
  if (matches(vallist, [2, 2, 1])) return 2;
  if (matches(vallist, [2, 1, 1, 1])) return 1;
  if (matches(vallist, [1, 1, 1, 1, 1])) return 0;
}

cards.sort((a, b) => {
  let v = getValueOfCard(a) - getValueOfCard(b);
  if (v == 0) {
    for (let value = 0; value < a[0].length; value++) {
      if (b[0][value] < a[0][value]) {
        return 1;
      }
      else if (b[0][value] == a[0][value]) continue;
      else return -1;
    }
  }
  else {
    return v;
  }
});

console.log(cards);

let sum1 = 0;

for (let i = 0; i < cards.length; i++) {
  sum1 += cards[i][1] * (i+1);
}

console.log(sum1);

function getValueOfCard2 (card) {
  let values = {};
  for (let i of card[0]) {
    if (!(i in values)) {
      values[i] = 1;
    }
    else values[i]++;
  }

  let vallist = [];
  for (let i in values) {
    if (i != 11) {
      vallist.push(values[i]);
    }
  }

  vallist.sort((a, b) => b - a);

  if (values[11] == 4) vallist = [5];
  if (values[11] == 3) {
    if (matches(vallist, [2])) vallist = [5];
    if (matches(vallist, [1,1])) vallist = [4,1];
  }
  if (values[11] == 2) {
    if (matches(vallist, [3])) vallist = [5];
    if (matches(vallist, [2,1])) vallist = [4,1];
    if (matches(vallist, [1,1,1])) vallist = [3,1,1];
  }
  if (values[11] == 1) {
    if (matches(vallist, [4])) vallist = [5];
    if (matches(vallist, [3, 1])) vallist = [4,1];
    if (matches(vallist, [2,2])) vallist = [3,2];
    if (matches(vallist, [2,1,1])) vallist = [3,1,1];
    if (matches(vallist, [1,1,1,1])) vallist = [2,1,1,1];
  }

  if (vallist.length == 0) vallist = [5];

  if (matches(vallist, [5])) return 6;
  if (matches(vallist, [4, 1])) return 5;
  if (matches(vallist, [3, 2])) return 4;
  if (matches(vallist, [3, 1, 1])) return 3;
  if (matches(vallist, [2, 2, 1])) return 2;
  if (matches(vallist, [2, 1, 1, 1])) return 1;
  if (matches(vallist, [1, 1, 1, 1, 1])) return 0;
}

cards.sort((a, b) => {
  console.log(getValueOfCard2(a), a, getValueOfCard2(b), b);
  let v = getValueOfCard2(a) - getValueOfCard2(b);
  if (v == 0) {
    for (let value = 0; value < a[0].length; value++) {
      if (b[0][value] == a[0][value]) continue;

      if (a[0][value] == 11) return -1;
      if (b[0][value] == 11) return 1;
      if (b[0][value] < a[0][value]) {
        return 1;
      }
      else return -1;
    }
    console.log("none went through", a, b);
  }
  else {
    return v;
  }
});

let sum2 = 0;

for (let i = 0; i < cards.length; i++) {
  sum2 += cards[i][1] * (i+1);
}

console.log(sum2);

/*
245810353
246027565

246436046
*/