var fs = require("fs");
var lines = fs.readFileSync("input.txt").toString().split("\n");

const regex = /\d+/g;
let total = 0;
lines.forEach((line) => {
  [_, numbers] = line.split(":");
  const matches = numbers.match(regex);
  const duplicatedValues = matches.filter(
    (item, index) => matches.indexOf(item) !== index
  );

  const score =
    duplicatedValues.length > 1
      ? doubleValueNTimes(1, duplicatedValues.length - 1)
      : duplicatedValues.length;
  total += score;
});

function doubleValueNTimes(value, n) {
  for (let i = 0; i < n; i++) {
    value *= 2;
  }
  return value;
}

console.log(total);
