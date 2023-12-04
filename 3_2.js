var fs = require("fs");
var input = fs.readFileSync("3.txt").toString();

// mymatch: line 1, pos: 3, length: 3
// kalkuler så en matrix av karakterer som må sjekkes rundt matchen
// sjekk om det finnes et symbol annet enn "." i noen av disse posisjonene

const lines = input.split("\n");

const starRegex = /\*/g;
let total = 0;
lines.forEach((line, lineIndex) => {
  let m;
  while ((m = starRegex.exec(line)) !== null) {
    m.forEach((match) => {
      let starPos = m.index;

      // find matching numbers on line above, line below, and on same line
      const matchesAbove = findNumbersTouchingStarOnLine(
        lines[lineIndex - 1],
        starPos
      );
      const matchesBelow = findNumbersTouchingStarOnLine(
        lines[lineIndex + 1],
        starPos
      );
      const matchesOnSameLine = findNumbersTouchingStarOnLine(
        lines[lineIndex],
        starPos
      );

      const allMatches = [
        ...matchesAbove,
        ...matchesBelow,
        ...matchesOnSameLine,
      ];

      if (allMatches.length > 1) {
        const product = allMatches.reduce((acc, cur) => {
          return acc * cur;
        }, 1);
        total += product;
      }
    });
  }
});

console.log(total);

function findNumbersTouchingStarOnLine(line, starPos) {
  const numbers = [];
  const regex = /\d+/g;

  while ((m = regex.exec(line)) !== null) {
    m.forEach((match) => {
      if (m.index < starPos && m.index + match.length >= starPos) {
        numbers.push(parseInt(match));
      }

      if (m.index === starPos) {
        numbers.push(parseInt(match));
      }

      if (m.index === starPos + 1) {
        numbers.push(parseInt(match));
      }
    });
  }
  return numbers;
}
