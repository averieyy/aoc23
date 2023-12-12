import * as fs from 'fs';

let rawinput = fs.readFileSync("./input").toString().trim().split("\n");

let matrix : number[][] = [];

let width = rawinput[0].length;
let height = rawinput.length;

let currentx = 0;
let currenty = 0;
let direction : 0 | 1 | 2 | 3 = 0;

/**
 *
 * S - 0
 * | - 1
 * L - 2
 * - - 3
 * J - 4
 * 7 - 5
 * F - 6
 *
 */

for (let y = 0; y < rawinput.length; y++) {
  let currentline : number[] = [];

  for (let x = 0; x < rawinput[y].length; x++) {
    switch (rawinput[y][x]) {
      case "S": currentline.push(0); break;
      case "|": currentline.push(1); break;
      case "L": currentline.push(2); break;
      case "-": currentline.push(3); break;
      case "J": currentline.push(4); break;
      case "7": currentline.push(5); break;
      case "F": currentline.push(6); break;
      default: currentline.push(-1); break;
    }
  }

  if (currentline.includes(0)) {
    currenty = y;
    currentx = currentline.indexOf(0);
  }

  matrix.push(currentline);
}

console.log(matrix);

/**
 * [..., [x, y], ...]
 */
let pipe : number[][] = [];

// function isConnected(x1 : number, y1 : number, x2 : number, y2 : number) : boolean {
//   let firstpos = matrix[x1][y1];
//   let secondpos = matrix[x2][y2];
//   if (x1 == x2) {
//     if (x1 < x2) {
//       if (!(firstpos == 2 || firstpos == 3 || firstpos == 6 || firstpos == 0)) return false;
//       if (!(secondpos == 2 || secondpos == 3 || secondpos == 6 || secondpos == 0)) return false;
//     }
//     else {
//       if (firstpos == 3 || firstpos == 4 || firstpos == 5) return true;
//       else if (firstpos != 0) return false;
//     }
//   }
//   else if (y1 == y2) {

//   }
//   else return false;

//   return true;
// }

console.log(currentx, currenty);

// Start it up
if (currentx != 0) {
  const left = matrix[currenty][currentx-1];
  if (left == 2 || left == 3 || left == 6) direction = 3;
}
if (currenty != width-1) {
  const right = matrix[currenty][currentx+1];
  if (right == 4 || right == 3 || right == 5) direction = 1;
}
if (currenty != 0) {
  const up = matrix[currenty-1][currentx];
  if (up == 2 || up == 3 || up == 6) direction = 0;
}
if (currenty != height-1) {
  const down = matrix[currenty+1][currentx];
  if (down == 4 || down == 3 || down == 5) direction = 2;
}

// Follow the pipe

let started = false;

while (matrix[currenty][currentx] != 0 || !started) {
  started = true;
  // move 
  let c = 0;
  switch(direction) {
    case 0:
      currenty--;
      c = matrix[currenty][currentx];
      if (c == 1) direction = 0;
      if (c == 5) direction = 3;
      if (c == 6) direction = 1;
      break;
    case 1:
      currentx++;
      c = matrix[currenty][currentx];
      if (c == 3) direction = 1;
      if (c == 4) direction = 0;
      if (c == 5) direction = 2;
      break;
    case 2:
      currenty++;
      c = matrix[currenty][currentx];
      if (c == 1) direction = 2;
      if (c == 2) direction = 1;
      if (c == 4) direction = 3;
      break;
    case 3:
      currentx--;
      c = matrix[currenty][currentx];
      if (c == 2) direction = 0;
      if (c == 3) direction = 3;
      if (c == 6) direction = 2;
      break;
  }

  console.log(currentx, currenty);

  pipe.push([currentx, currenty]);
}

console.log(Math.floor((pipe.length-1) / 2) + 1);

let inside : number[][] = [];

function findprox(pos : number[]) {
  let x = pos[0];
  let y = pos[1];
  if (!inside.includes([x, y])) inside.push([x, y]);

  if (!inside.includes([y-1, x]) && !pipe.includes([y-1, x])){
    inside.push();
    findprox([y-1, x]);
  }
  if (!inside.includes([y, x-1]) && !pipe.includes([y, x-1])) {
    inside.push([y, x-1]);
    findprox([y, x-1]);
  }
  if (!inside.includes([y+1, x]) && !pipe.includes([y+1, x])) {
    inside.push([y+1, x]);
    findprox([y+1, x]);
  }
  if (!inside.includes([y, x+1]) && !pipe.includes([y, x+1])) {
    inside.push([y, x+1]);
    findprox([y, x+1]);
  }
}

for (let pipepart of pipe) {
  currentx = pipepart[0];
  currenty = pipepart[1];
  let c = 0;

  let totheright : number[] = [];

  if (direction == 0) totheright = [currentx + 1, currenty];
  if (direction == 1) totheright = [currentx, currenty + 1];
  if (direction == 2) totheright = [currentx - 1, currenty];
  if (direction == 3) totheright = [currentx, currenty - 1];

  if (!pipe.includes(totheright) && !inside.includes(totheright)) {
    findprox(totheright);
  }

  switch(direction) {
    case 0:
      currenty--;
      c = matrix[currenty][currentx];
      if (c == 1) direction = 0;
      if (c == 5) direction = 3;
      if (c == 6) direction = 1;
      break;
    case 1:
      currentx++;
      c = matrix[currenty][currentx];
      if (c == 3) direction = 1;
      if (c == 4) direction = 0;
      if (c == 5) direction = 2;
      break;
    case 2:
      currenty++;
      c = matrix[currenty][currentx];
      if (c == 1) direction = 2;
      if (c == 2) direction = 1;
      if (c == 4) direction = 3;
      break;
    case 3:
      currentx--;
      c = matrix[currenty][currentx];
      if (c == 2) direction = 0;
      if (c == 3) direction = 3;
      if (c == 6) direction = 2;
      break;
  }
}

console.log(inside.length);