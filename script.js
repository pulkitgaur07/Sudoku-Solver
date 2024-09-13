let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	xhrRequest.send()
}

var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);
	}
}

var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j];
			} else {
				arr[i][j].innerText = '';
			}
		}
	}
}

SolvePuzzle.onclick = () => {
	sudokuSolver(board, 0, 0, 9);
	FillBoard(board); // Update the board with the solution
};

function isSafe(board, row, col, val, n) {
	// Row check
	for (let i = 0; i < n; i++) {
		if (board[row][i] == val) return false;
	}

	// Column check
	for (let i = 0; i < n; i++) {
		if (board[i][col] == val) return false;
	}

	// 3x3 matrix check
	let startRow = Math.floor(row / 3) * 3;
	let startCol = Math.floor(col / 3) * 3;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[startRow + i][startCol + j] == val) return false;
		}
	}

	return true;
}

function sudokuSolver(board, row, col, n) {
	if (row == n) return true;
	if (col == n) return sudokuSolver(board, row + 1, 0, n);
	if (board[row][col] != 0) return sudokuSolver(board, row, col + 1, n);
	for (let val = 1; val <= 9; val++) {
		if (isSafe(board, row, col, val, n)) {
			board[row][col] = val;
			if (sudokuSolver(board, row, col + 1, n)) return true;
			board[row][col] = 0;
		}
	}
	return false;
}
