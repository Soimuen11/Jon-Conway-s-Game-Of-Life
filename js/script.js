let grid = []
let current_gen = 0
let nb_rows = 0
let nb_cols = 0

function init_board(row, col, alive){
		let square = {}
		nb_rows = row
		nb_cols = col
		board = $('<table>');
		for (let i = 1; i <= row;i++){
				let tr = $('<tr>');
				for(let j = 1; j <= col; j++){
						let td= $('<td>');
						let tdId=`${i}-${j}`;	
						$('<td>')
								.attr('id', tdId)
								.appendTo(tr)
						square = {row: i, col: j, type: false}
						grid.push(square);
				}
				$(board).append(tr);
		}
		$('#board').html(board);
		// init the board with the nb of living cells in the first gen
		is_alive(alive)
		new_gen();
}

function is_alive(alive){
		while (alive > 0){
				let random = Math.floor(Math.random() * grid.length)
				if (grid[random].type === false){
						grid[random].type = true;
						$('td#' + grid[random].row + '-' + grid[random].col).addClass('black')
						alive--
				}
		}
}

// WE START FROM A GIVEN SQUARE WITH ROW,COL && WE CHECK THE SQUARES AROUND ONE SQ 
function find_neighbors (){
		let n = 0
		let neighbors = 0;
		while (n < grid.length){
				let row = grid[n].row
				let col = grid[n].col
				// check up, down, right, left + diagonals
				let dirs = [ [0,1], [0,-1], [1,0], [-1,0] [1,1], [-1,-1], [1,-1], [-1,1] ] 
				// check in 8 directions
				for (let dir of dirs){
						//check neighbors with range 1
						for (let i=0; i<=1; i++){
								let checked_row = grid[n].row + i*dirs[0];
								let checked_col = grid[n].col + i*dirs[1];
								let checked_type = grid[n].type;
								if (is_inside(checked_row, checked_col) && checked_type === true){
										neighbors++
								}else{
										break;
								}
						}
				}
				n++
		}
		return neighbors;
}

function is_inside(row, col){
		return !(row < 1 || row > nb_rows || col < 1 || col > nb_cols)
}

 function born_or_survive(neighbors){
 		if (neighbors == 2 || neighbors == 3
 				&& grid[square].type === true){
 				grid[square].type === true;
				alive++;
 		} 
 		else if(neighbors == 3 && grid[square].type === false){
 				grid[square].type === true;
				alive++;
 		}
 		else if(neighbors < 2 || neighbors > 3 && grid[square].type === true){
 				grid[square].type === false;
				alive--;
 		}
}

function new_gen(){
		let current_gen = 0;
		current_gen++ 
		find_neighbors();
		born_or_survive();
		//init_board();
}

let delay = setInterval(function (event) {
 						new_gen()
 					//	if (alive == 0) {
 					//			clearInterval(delay)
 					//	}
}, 50, this)


$(document).ready(function(){
		//FIRST, YOU INITALIZE THE BOARD WITH THE NB OF ROWS AND COLS THAT YOU WANT
		$('#init').on('click', function(){
				let row = parseInt(prompt('how many rows do you want?'))
				let	col = parseInt(prompt('how many cols do you want?'))
				let	alive = parseInt(prompt('how many living cells do you want?'))
				init_board(row, col, alive);
		});
});
