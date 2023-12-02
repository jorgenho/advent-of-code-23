// read contents of 2-in.txt file into array
var fs = require('fs');
var games = fs.readFileSync('2-in.txt').toString().split("\n");

let total = 0; 
const REDS = 12;
const GREENS = 13;
const BLUES = 14;


games.forEach((game) => {

const [gameId, rounds] = game.split(":");

const currentRound = {
    red: 0,
    green: 0,
    blue: 0,
    id: parseInt(gameId.split(" ")[1])
}

let hasInvalidRound = false;
rounds.split(";").forEach((round) => {
      round.split(",").forEach((item) => {
          const [value, color] = item.trimStart().split(" ");
          currentRound[color] = parseInt(value);
      });
      if(!hasInvalidRound) {
       hasInvalidRound = currentRound.red > REDS || currentRound.green > GREENS || currentRound.blue > BLUES;
      }
      
});



if(!hasInvalidRound) {
    total += currentRound.id;
}

});

console.log(total)