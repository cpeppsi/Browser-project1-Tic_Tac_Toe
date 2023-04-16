//defining variables for our message container, button, and the board using querySelector
const board = document.querySelector("#gameboard")
const messageDisplay = document.querySelector("#info")
const newGameButton = document.getElementById("restart")
const container = document.getElementById("gameboard")
const startCells = [
	"", "", "", "", "", "", "", "", ""
]
//defining global variable for cross
let go = "cross"
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
	go = go === "circle"  ? "cross" : "circle"
	//displaying the content and adding an event listener to remove the ability to click on a cell thats already been picked
	messageDisplay.textContent = "it is now " + go + "'s go."
	e.target.removeEventListener("click", addGo)
	checkScore()
}

//adding event listener to button
newGameButton.addEventListener('click', () => {
	container.remove(createBoard())
	container.append(createBoard())
})



//functions to check if circle or x get the required combinations to "win"
function checkScore() {
	const allSquares = document.querySelectorAll(".square")
	
	//adding array of possible "winning" element combinations
	const winningCombos = [
		[0,1,2], [3,4,5], [6,7,8],
		[0,3,6], [1,4,7], [2,5,8],
		[0,4,8], [2,4,6]
	]

	//using forEach to check each cell for a circle and if it is one of the "winning combinations" and displaying the win
	let oWin;
	winningCombos.forEach(array => {
		const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("circle"))
		if(circleWins) {
			messageDisplay.textContent = "Circle Wins!"
			allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
			return
		}
	})

	//same as above except it is checking for X
	let xWin;
	winningCombos.forEach(array => {
		const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("cross"))
		if(crossWins) {
			messageDisplay.textContent = "Cross Wins!"
			allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
			return
		}
	})
	
	// let tie;
	// winningCombos.forEach(array => {
	// 	if(!xWin && !oWin) {
	// 		messageDisplay.textContent = "Tie"
	// 		return
	// 	}
	// })
}