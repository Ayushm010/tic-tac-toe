let xWin = 0;
let oWin = 0;
let tie = 0;
const gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const setBoard = (marker, pos) => {
    if (board[pos] === "") {
      board[pos] = marker; // place marker if cell is empty
    }
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""]; // reset board to empty
    return board;
  };

  return {
    getBoard,
    setBoard,
    resetBoard
  };
})();

function createPlayer(name, marker) {
  return { name, marker }; // player factory function
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

        gameboard.setBoard(currentPlayer.marker, pos); // place marker
        displayController.disp(board); // update UI

        if (checkWinner(currentPlayer.marker, pos)) {
          console.log(currentPlayer.name + " is the Winner");
          displayController.disp(board);
          showDialogbox(currentPlayer.name); // show win dialog
          return;
        }

        if (!gameboard.getBoard().includes("")) {
          showDialogbox();
          console.log("Draw"); // all cells filled, no winner
          return;
        }

        // toggle player
        currentPlayer = currentPlayer.marker === "X" ? player2 : player1;
      });
    });
  }

  const checkWinner = (marker, pos) => {
    // possible winning lines depending on the last move position
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
          return true; // winning line found
        }
      }
    }

    return false;
  }

  function showDialogbox(name) {
    const dialog = document.getElementById('myDialog');
    const btn = document.getElementsByClassName("restart-btn")[0];
    const msg = document.getElementsByClassName("win-msg")[0];
    msg.textContent = `${name} Won!!`
    dialog.showModal(name); // open dialog
    btn.addEventListener("click", () => {
      restartGame(); // reset board and UI
      dialog.close(); // close dialog
    });
  }

  const restartGame = () => {
    board = gameboard.resetBoard(); // reset game state
    displayController.disp(board);  // re-render empty board
    startGame(); // reattach listeners
  }

  return { startGame, restartGame };
})();

const displayController = (function () {
  const disp = (board) => {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
      const idx = Number(cell.id);
      console.log("init:"+board[idx]+":");
      cell.textContent = board[idx]; // update cell with marker
    });
  };

  return { disp };
})();

gameController.startGame(); // initialize the game
