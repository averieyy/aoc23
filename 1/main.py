with open("./input", "r") as f:
  inp = f.readlines()

# print(inp)

def fromstringtonum(string: str):
  if (string.startswith("one")): return "1"
  if (string.startswith("two")): return "2"
  if (string.startswith("three")): return "3"
  if (string.startswith("four")): return "4"
  if (string.startswith("five")): return "5"
  if (string.startswith("six")): return "6"
  if (string.startswith("seven")): return "7"
  if (string.startswith("eight")): return "8"
  if (string.startswith("nine")): return "9"
  return None

if __name__ == "__main__":
  sumfirst = 0
  sumsecond = 0
  for line in inp:
    print(inp.index(line))
    for i in range(len(line)):
      first = fromstringtonum(line[i:])
      if line[i] not in "12345657890" and first == None: continue
      if first == None:
        first = line[i]
        print(first)
      for ii in range(len(line)-1, -1, -1):
        second = fromstringtonum(line[ii:])
        if line[ii] not in "12345657890" and second == None: continue
        if second == None:
          second = line[ii]
          print(second)
        print(first + second)
        sumsecond += int(first+second)
        break
      break

    for i in line:
      if i not in "123456789": continue
      for ii in line[::-1]:
        if ii not in "123456789": continue
        print(i+ii)
        sumfirst += int(i+ii)
        break
      break
      
  print(sumfirst)
  print(sumsecond)