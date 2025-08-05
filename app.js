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


    for (let i = 0; i < 9; i++) {
      const pos = Number(prompt(`enter the position ${currentPlayer.name}: `));
      gameboard.setBoard(currentPlayer.marker, pos);
      displayController.disp(board);
      checkWinner(currentPlayer.marker);
      currentPlayer = currentPlayer.marker === "X" ? player2 : player1;

    }
  }

  const checkWinner = (marker) => {
    
  }

  return { startGame, };

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