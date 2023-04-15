//adding base global variables to regulate functions
let player = "X";
let end = false;
let winner = null;

//creating an array that includes the winning combination of cells to call back to
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//selecting a variable for "blocks" and button using querySelector
const blocks = document.querySelectorAll("cell");
const newGame = document.getElementById("restart");

