const gameboard = (function () {
  let board = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];

  const getBoard = () => board;

  const setBoard = (marker, pos) => {
    if (board[pos] === "_") {
      board[pos] = marker;
    }
  };

  const resetBoard = () => {
    board = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];
  };

  return {
    getBoard,
    setBoard,
    resetBoard
  };
})();



function createPlayer(name, marker) {
  return { name, marker };
}

const gameController = (function () {
  const player1 = createPlayer("Ayush", "X");
  const player2 = createPlayer("Santanu", "O");


  // lets run the game
  //1. we have to get the board and display it
  const board = gameboard.getBoard();

  let currentPlayer = player1;

  const startGame = () => {
    displayController.disp(board);//renders the board

    let i;
    for (i = 0; i < 9; i++) {
      const pos = Number(prompt(`enter the position ${currentPlayer.name}: `));

      gameboard.setBoard(currentPlayer.marker, pos);//sets the current marker to the following position
      displayController.disp(board);

      if (checkWinner(currentPlayer.marker, pos)) {
        console.log(currentPlayer.name + " is the Winner");
        return;
      }
      currentPlayer = currentPlayer.marker === "X" ? player2 : player1;
    }

    if (i === 9) console.log("Draw");
  }

  const checkWinner = (marker, pos) => {
    const posMap = {
      0: [[0, 1, 2], [0, 3, 6], [0, 4, 8]],
      1: [[0, 1, 2], [1, 4, 7]],
      2: [[0, 1, 2], [2, 5, 8], [2, 4, 6]],
      3: [[3, 4, 5], [0, 3, 6]],
      4: [[3, 4, 5], [1, 4, 7], [0, 4, 8], [2, 4, 6]],
      5: [[3, 4, 5], [2, 5, 8]],
      6: [[6, 7, 8], [0, 3, 6], [2, 4, 6]],
      7: [[6, 7, 8], [1, 4, 7]],
      8: [[6, 7, 8], [2, 5, 8], [0, 4, 8]]
    };

    if (pos in posMap) {
      const winnerArr = posMap[pos];
       let flag = false;

      for (let i = 0; i < winnerArr.length; i++) {
        if (board[winnerArr[i][0]] === marker &&
          board[winnerArr[i][1]] === marker &&
          board[winnerArr[i][2]] === marker) {
          flag = true;
          return flag;
        }
      }
    }

    return false;
  }

  const restartGame = () => {
    gameboard.resetBoard();
    startGame();    
  }

  return { startGame, restartGame };

})();

const displayController = (function () {
  const disp = (board) => {
    for (let i = 0; i < board.length; i++) {
      console.log(board[i] + " at " + i);
      if ((i + 1) % 3 === 0) {
        console.log("\n");
      }
    }
  };

  return { disp, }
})();


gameController.startGame();