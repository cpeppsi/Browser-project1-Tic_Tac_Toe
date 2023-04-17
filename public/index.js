//defining variables for our message container, button, and the board using querySelector
const board = document.querySelector("#gameboard")
const messageDisplay = document.querySelector("#info")
const newGameButton = document.getElementById("restart")
let startCells = [
	"", "", "", "", "", "", "", "", ""
]

//defining global variable for cross
let go = "X"
messageDisplay.textContent = "X goes first"

//adding function to make the board
function createBoard() {
	//using for each to cycle through the elements in the array
	startCells.forEach((_cell, index) => {
		//creating a container and adding each square in the board to the container
		const cellElement = document.createElement('div')
		cellElement.classList.add('square')
		cellElement.id = index
		//adding event listener so on click it adds x to the page
		cellElement.addEventListener('click', addGo)
		board.append(cellElement)
	})
}
createBoard()

//creating function
function addGo(e) {
	//creating another container and adding the x to it
	const goDisplay = document.createElement('div')
	goDisplay.classList.add(go)
	e.target.append(goDisplay)
	//if statement to switch turn
	go = go === "O"  ? "X" : "O"
	//displaying the content and adding an event listener to remove the ability to click on a cell thats already been picked
	messageDisplay.textContent = go + "'s turn"
	e.target.removeEventListener("click", addGo)
	checkScore()
}

//functions to check if circle or x get the required combinations to "win"
function checkScore() {
	const allSquares = document.querySelectorAll(".square")
	
	//adding array of possible "winning" element combinations
	let winningCombos = [
		[0,1,2], [3,4,5], [6,7,8],
		[0,3,6], [1,4,7], [2,5,8],
		[0,4,8], [2,4,6]
	]

	//using forEach to check each cell for a circle and if it is one of the "winning combinations" and displaying the win
	
	winningCombos.forEach(array => {
    const oWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("O"))
    const xWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("X"))
    if(oWins && !xWins) {
			messageDisplay.textContent = "O Wins!"
			allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
			return
		}
    else if(xWins && !oWins) {
			messageDisplay.textContent = "X Wins!"
			allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
			return
    }
	})
}

