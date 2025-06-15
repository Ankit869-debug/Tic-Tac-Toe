const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

const checkWinner = () => {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      status.textContent = `Player ${boardState[a]} Wins! 🎉`;
      gameActive = false;
      return;
    }
  }

  if (!boardState.includes('')) {
    status.textContent = `It's a Draw! 🤝`;
    gameActive = false;
  }
};

const handleCellClick = (e) => {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (boardState[index] || !gameActive) return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s Turn`;
  }
};

const resetGame = () => {
  boardState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player X's Turn`;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

resetGame(); // Initialize status
