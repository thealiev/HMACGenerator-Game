const crypto = require("crypto");
const readline = require("readline");

class KeyGenerator {
  static generateKey() {
    return crypto.randomBytes(32).toString("hex");
  }
}

class HMACGenerator {
  static generateHMAC(key, message) {
    return crypto.createHmac("sha256", key).update(message).digest("hex");
  }
}

class GameRules {
  constructor(moves) {
    this.moves = moves;
    this.rules = this.generateRules();
  }

  generateRules() {
    const numMoves = this.moves.length;
    const rules = Array(numMoves)
      .fill()
      .map(() => Array(numMoves));
    const half = Math.floor(numMoves / 2);

    for (let i = 0; i < numMoves; i++) {
      for (let j = 0; j < numMoves; j++) {
        if (i === j) {
          rules[i][j] = "Draw";
        } else if (
          (j + half) % numMoves === i ||
          (j + half) % numMoves === (i + half) % numMoves
        ) {
          rules[i][j] = "Win";
        } else {
          rules[i][j] = "Lose";
        }
      }
    }
    return rules;
  }

  getWinner(playerMove, computerMove) {
    return this.rules[playerMove][computerMove];
  }
}

class HelpTable {
  static generateTable(moves, rules) {
    const numMoves = moves.length;
    const table = Array(numMoves + 1)
      .fill()
      .map(() => Array(numMoves + 1).fill("PC\\User"));

    for (let i = 0; i < numMoves; i++) {
      table[0][i + 1] = moves[i];
      table[i + 1][0] = moves[i];
      for (let j = 0; j < numMoves; j++) {
        table[i + 1][j + 1] = rules[i][j];
      }
    }
    return table;
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function printMenu(moves) {
  console.log("Available moves:");
  moves.forEach((move, index) => {
    console.log(`${index + 1} - ${move}`);
  });
  console.log("0 - exit");
  console.log("? - help");
}

function playGame(moves) {
  const key = KeyGenerator.generateKey();
  const computerMove = Math.floor(Math.random() * moves.length);
  const hmac = HMACGenerator.generateHMAC(key, computerMove.toString());
  const gameRules = new GameRules(moves);

  console.log(`HMAC: ${hmac}`);
  printMenu(moves);
  console.log("Enter your move:");

  rl.on("line", (userInput) => {
    if (userInput === "?") {
      const helpTable = HelpTable.generateTable(moves, gameRules.rules);
      console.table(helpTable);
    } else if (userInput === "0") {
      rl.close();
    } else {
      const playerMove = parseInt(userInput) - 1;
      if (playerMove < 0 || playerMove >= moves.length) {
        console.log(
          "Invalid input. Please enter a valid move or '?' for help."
        );
      } else {
        const winner = gameRules.getWinner(playerMove, computerMove);
        console.log(`Your move: ${moves[playerMove]}`);
        console.log(`Computer move: ${moves[computerMove]}`);
        console.log(`Result: ${winner}`);
        console.log(`HMAC key: ${key}`);
      }
      console.log("\nEnter your move:");
    }
  });
}

const moves = process.argv.slice(2);
if (
  moves.length < 3 ||
  moves.length % 2 === 0 ||
  new Set(moves).size !== moves.length
) {
  console.error(
    "Error: Incorrect number of moves or duplicate moves. Please provide an odd number of unique moves greater or equal to 3."
  );
  console.error("Example usage: node game.js rock paper scissors");
} else {
  playGame(moves);
}
