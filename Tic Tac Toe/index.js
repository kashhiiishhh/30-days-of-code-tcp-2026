const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let gameActive = true;
let board = Array(9).fill("");

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);

function handleClick() {
  const index = this.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  this.textContent = currentPlayer;
  this.classList.add(currentPlayer.toLowerCase());

  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      combo.forEach(i => cells[i].classList.add('win'));
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a Draw 🤝";
    cells.forEach(c => c.classList.add('draw'));
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
  board.fill("");
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = "Player X's turn";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.className = "cell";
  });
}
