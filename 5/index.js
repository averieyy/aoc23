const fs = require("fs");

let inp = fs.readFileSync("./input").toString().trim();
let categories = inp.split("\n\n");

let lastcat = [];

for (let i of categories) {
  if (i.startsWith("seeds:")) {
    lastcat = i.split(" ").slice(1).map(s => parseInt(s));
  }
  else {
    console.log(i.split("\n")[0]);
    let newcat = i.split("\n").slice(1);
    let found = [];
    let lastcatcopy = lastcat;
    lastcat = [];
    for (let i of newcat) {
      let rangetokens = i.split(" ").map(rt => parseInt(rt));
      let differance = rangetokens[0] - rangetokens[1];
      let end = rangetokens[1] + rangetokens[2];
      for (let ii = 0; ii < lastcatcopy.length; ii++) {
        console.log(lastcatcopy);
        if (lastcatcopy[ii] < end) {
          if (lastcatcopy[ii] >= rangetokens[1]) {
            console.log(lastcatcopy[ii], lastcatcopy[ii] + differance);
            lastcat.push(lastcatcopy[ii] + differance);
            found.push(lastcatcopy[ii]);
          }
        }
        console.log(lastcatcopy[ii], rangetokens[1], end);
      }
    }
    for (let i of lastcatcopy) {
      if (!found.includes(i)) {
        lastcat.push(i);
        console.log("failed", i);
      }
    }
  }
}

let lowest = Infinity;
for (let i of lastcat) {
  if (i < lowest) lowest = i;
}

console.log(lowest);

lastcat = [];
let lowestfromentire = [];

let seeds = categories.splice(0,1)[0].split(" ").slice(1).map(s => parseInt(s));

for (let seed = 0; seed < seeds.length; seed += 2) {
  lastcat = [seeds[seed], seeds[seed+1]];
  for (let i of categories) {
    {
      console.log(i.split("\n")[0]);
      let newcat = i.split("\n").slice(1);
      let lastcatcopy = lastcat;
      lastcat = [];
      let catmetas = [];
      for (let i of newcat) {
        let rangetokens = i.split(" ").map(rt => parseInt(rt));
        let differance = rangetokens[0] - rangetokens[1];
        let end = rangetokens[1] + rangetokens[2];
        catmetas.push([rangetokens, differance, end]);
      }
      for (let i = 0; i < lastcatcopy.length; i++) {
        let localranges = [];
  
        for (let ii = 0; ii < newcat.length; ii++) {
          const rangetokens = catmetas[ii][0];
          const differance = catmetas[ii][1];
          const end = catmetas[ii][2];
    
          let f = lastcatcopy[i];
          let l = lastcatcopy[i+1] + f;
          let start = rangetokens[1];
          if (f < start) {
            if (l > start) {
              localranges.push(f, start, start+differance);
    
              if (l > end)
                localranges.push(end+differance, end, l);
              else
                localranges.push(l+differance);
            }
          }
          if (f > start) {
            localranges.push(f+differance);
    
            if (l > end)
              localranges.push(end+differance, end, l);
            else
              localranges.push(l+differance);
          }
        }
    
        if (localranges == []) {
          localranges = [lastcatcopy[ii], lastcatcopy[ii+1]];
        }

        lastcat.push(...localranges);
      }
      console.log(lastcat.length);
    }
  }
  let lowestthistime = Infinity;
  for (let i of lastcat) {
    if (lowestthistime > i) lowestthistime = i; 
  }
  lowestfromentire.push(lowestthistime);
}

// lastcat = seeds.split(" ").slice(1).map(s => parseInt(s));
// for (let i = 1; i < lastcat.length; i += 2) lastcat[i] += lastcat[i-1];

// for (let seed = 0; seed < seeds.length; seed += 2) {
//   lastcat = [seeds[seed], seeds[seed+1]];
//   for (let i of categories) {
//     console.log(i.split("\n")[0]);
//     let newcat = i.split("\n").slice(1);
//     let lastcatcopy = lastcat;
//     lastcat = [];
//     let newcatmeta = [];
//     for (let i of newcat) {
//       let rangetokens = i.split(" ").map(rt => parseInt(rt));
//       newcatmeta.push({
//         differance: rangetokens[0] - rangetokens[1],
//         end: rangetokens[1] + rangetokens[2],
//         start: rangetokens[1]
//       });
//     }
//     for (let ii = 0; ii < lastcatcopy.length; ii+=2) {
//       let localranges = [];
  
//       for (let i = 0; i < newcat.length; i++) {
//         const { differance, end, start } = newcatmeta[i];
  
//         let f = lastcatcopy[ii];
//         let l = lastcatcopy[ii+1] + f;
//         if (f < start) {
//           if (l > start) {
//             localranges.push(f, start, start+differance);
  
//             if (l > end)
//               localranges.push(end+differance, end, l);
//             else
//               localranges.push(l+differance);
//           }
//         }
//         if (f > start) {
//           localranges.push(f+differance);
  
//           if (l > end)
//             localranges.push(end+differance, end, l);
//           else
//             localranges.push(l+differance);
//         }
//       }
  
//       if (localranges == []) {
//         localranges = [lastcatcopy[ii], lastcatcopy[ii+1]];
//       }
  
//       lastcat.push(...localranges);
//       console.log(localranges);
//     }
//   }
  
//   let lowestfromthis = Infinity;
//   for (let i of lastcat) {
//     if (i < lowestfromthis) lowestfromentire = i;
//   }
//   lowestfromentire.push(lowestfromthis);
// }

lowest = Infinity;
for (let i of lowestfromentire) {
  if (i < lowest) lowest = i;
}

console.log(lowest);