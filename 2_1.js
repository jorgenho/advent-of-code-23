var fs = require('fs');
var games = fs.readFileSync('2-in.txt').toString().split("\n");

let total = 0;
games.forEach((game) => {

const [_, rounds] = game.split(":");

const currentRound = {
    red: 0,
    green: 0,
    blue: 0,
}

rounds.split(";").forEach((round) => {
      round.split(",").forEach((item) => {
          const [value, color] = item.trimStart().split(" ");
          currentRound[color] = parseInt(value) > currentRound[color] ? parseInt(value) : currentRound[color];
      });
});


total+=  currentRound.red * currentRound.green * currentRound.blue;

});

console.log(total);