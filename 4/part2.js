var fs = require("fs");
var lines = fs.readFileSync("input.txt").toString().split("\n");

const regex = /\d+/g;
let cards = Array(lines.length).fill(0);
lines.forEach((line, index) => {
  cards[index] += 1;
  [_, numbers] = line.split(":");
  const matches = numbers.match(regex);
  const duplicatedValues = matches.filter(
    (item, dIndex) => matches.indexOf(item) !== dIndex
  );

  for (let j = 0; j < duplicatedValues.length; j++) {
    cards[index + j + 1] += cards[index];
  }
});

console.log(cards.length);

const total = cards.reduce((acc, curr) => acc + curr, 0);

console.log(total);
