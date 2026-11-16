//your JS code here. If required.
const submitBtn = document.getElementById("submit");
const playerInputsDiv = document.getElementById("player-inputs");
const gameBoardDiv = document.getElementById("game-board");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

submitBtn.addEventListener("click", function () {
  const p1Name = document.getElementById("player-1").value.trim();
  const p2Name = document.getElementById("player-2").value.trim();

  if (p1Name === "" || p2Name === "") {
    alert("Please enter names for both players");
    return;
  }

  player1 = p1Name;
  player2 = p2Name;
  currentPlayer = player1;
  currentSymbol = "x";

  playerInputsDiv.style.display = "none";
  gameBoardDiv.style.display = "block";
  messageDiv.textContent = `${currentPlayer}, you're up`;
});

cells.forEach((cell) => {
  cell.addEventListener("click", function () {
    const index = Number(cell.id) - 1;

    if (!gameActive || boardState[index] !== "") {
      return;
    }

    boardState[index] = currentSymbol;
    cell.textContent = currentSymbol;

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer} congratulations you won!`;
      gameActive = false;
      return;
    }

    if (!boardState.includes("")) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    if (currentSymbol === "x") {
      currentSymbol = "o";
      currentPlayer = player2;
    } else {
      currentSymbol = "x";
      currentPlayer = player1;
    }

    messageDiv.textContent = `${currentPlayer}, you're up`;
  });
});

function checkLine(a, b, c) {
  if (
    boardState[a] !== "" &&
    boardState[a] === boardState[b] &&
    boardState[a] === boardState[c]
  ) {
    document.getElementById(String(a + 1)).classList.add("win");
    document.getElementById(String(b + 1)).classList.add("win");
    document.getElementById(String(c + 1)).classList.add("win");
    return true;
  }
  return false;
}

function checkWinner() {
  return (
    checkLine(0, 1, 2) ||
    checkLine(3, 4, 5) ||
    checkLine(6, 7, 8) ||
    checkLine(0, 3, 6) ||
    checkLine(1, 4, 7) ||
    checkLine(2, 5, 8) ||
    checkLine(0, 4, 8) ||
    checkLine(2, 4, 6)
  );
}
