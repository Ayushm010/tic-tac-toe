const gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const setBoard = (marker, pos) => {
    if (board[pos] === "") {
      board[pos] = marker;
    }
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    return board;
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

  let board = gameboard.getBoard();
  let currentPlayer = player1;

  const startGame = () => {
    displayController.disp(board); // initial render

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.addEventListener("click", () => {
        const pos = Number(cell.id);

        if (gameboard.getBoard()[pos] !== "") return; // ignore already-filled cells

        gameboard.setBoard(currentPlayer.marker, pos);
        displayController.disp(board);

        if (checkWinner(currentPlayer.marker, pos)) {
          console.log(currentPlayer.name + " is the Winner");
          displayController.disp(board);
          for (let i = 0; i < board.length; i++) console.log(board[i]);
          restartGame(); // auto-restart after win
          return;
        }

        if (!gameboard.getBoard().includes("")) {
          console.log("Draw"); // all cells filled, no winner
          return;
        }

        // toggle player turn
        currentPlayer = currentPlayer.marker === "X" ? player2 : player1;
      });
    });
  }

  const checkWinner = (marker, pos) => {
    // predefined winning combinations based on position
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
      for (let i = 0; i < winnerArr.length; i++) {
        if (board[winnerArr[i][0]] === marker &&
          board[winnerArr[i][1]] === marker &&
          board[winnerArr[i][2]] === marker) {
          return true;
        }
      }
    }

    return false;
  }

  const restartGame = () => {
    board = gameboard.resetBoard(); // clear state
    displayController.disp(board);  // clear UI
    startGame(); 
  }

  return { startGame, restartGame };

})();

const displayController = (function () {
  const disp = (board) => {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
      const idx = Number(cell.id);
      cell.textContent = board[idx];
    });
  };

  return { disp, }
})();

gameController.startGame();
