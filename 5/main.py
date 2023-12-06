# part 2 only
all = []
with open("./input", "r") as f:
  all = f.read().split("\n\n")

seeds = [int(i) for i in all[0].split(" ")[1:]]
print(seeds)

all = all[1:]

ranges = []

for i in all:
  rangs = i.split("\n")
  theserangs = []
  for ii in rangs:
    theserangs.append([int(j) for j in ii.split(" ")])
  ranges.append(theserangs)

output = []

for i in seeds:
  for j in range(i[0], i[1]):
    for rc in ranges:
      op = []
      for r in rc:
        diff = r[1] - r[0]
        if j < r[1] and j > r[1] + r[2]: 
          break