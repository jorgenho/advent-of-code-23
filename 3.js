var fs = require("fs");
var input = fs.readFileSync("3.txt").toString();

// mymatch: line 1, pos: 3, length: 3
// kalkuler så en matrix av karakterer som må sjekkes rundt matchen
// sjekk om det finnes et symbol annet enn "." i noen av disse posisjonene
const regex = /\d+/g;

let total = 0;

const lines = input.split("\n");

lines.forEach((line, index) => {
  let m;
  while ((m = regex.exec(line)) !== null) {
    m.forEach((match) => {
      const leftPointer = m.index - 1;
      const rightPointer = m.index + match.length;
      const upPointer = index - 1;
      const downPointer = index + 1;

      let adjacentChars = [];

      if (upPointer >= 0) {
        for (let i = leftPointer; i <= rightPointer; i++) {
          if (i < 0 || i >= lines[upPointer].length) {
            // skip
          } else {
            adjacentChars.push(lines[upPointer].charAt(i));
          }
        }
      }
      // right of match
      if (rightPointer < line.length) {
        adjacentChars.push(line.charAt(rightPointer));
      }

      // below match
      if (downPointer < lines.length) {
        for (let i = rightPointer; i >= leftPointer; i--) {
          if (i < 0 || i >= lines[downPointer].length) {
            // skip
          } else {
            adjacentChars.push(lines[downPointer].charAt(i));
          }
        }
      }

      // left of match
      if (leftPointer !== -1) {
        adjacentChars.push(line.charAt(leftPointer));
      }
      const hasNoAdjacentSymbol = adjacentChars.every((char) => char === ".");

      if (!hasNoAdjacentSymbol) {
        console.log(adjacentChars.filter((char) => char !== ".").join("-"), {
          match,
        });
        total += parseInt(match);
      }
    });
  }
});

console.log(total);
