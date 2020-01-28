//function game_loop(){
//
//}

function new_gen(gen){
		gen++
		return gen
}

function init_board(rows, cols, alive){
		grid = [];
		let nb_rows = rows
		let nb_cols = cols
		for (let i = 1; i <= nb_rows;i++){
				for(let j = 1; j <= nb_cols; j++){
						let square = {row: i, col: j, type: false}
						grid.push(square);
				}
		}
		return grid;
}

function draw(grid){
		let board = $('<table>');
		for (let i = 1; i <= nb_rows;i++){
				let tr = $('<tr>');
				for(let j = 1; j <= nb_cols; j++){
						let td= $('<td>');
						let tdId=`${i}-${j}`;	
						$('<td>')
								.attr('id', tdId)
								.appendTo(tr)
				}
				$(board).append(tr);
		}
		$('#board').html(board);
		let draw_alive = alive;
		while (draw_alive > 0){
				let random = Math.floor(Math.random() * grid.length)
				if (grid[random].type === true){
						$('td#' + grid[random].row + '-' + grid[random].col).addClass('black')
						draw_alive--
				}
		}
}


// WE START FROM A GIVEN SQUARE WITH ROW,COL && WE CHECK THE SQUARES AROUND ONE SQ 
//function find_neighbors (grid){
//		let n = 0
//		let neighbors = 0;
//		while (n < grid.length){
//				let row = grid[n].row
//				let col = grid[n].col
//				// check up, down, right, left + diagonals
//				let dirs = [ [0,1], [0,-1], [1,0], [-1,0] [1,1], [-1,-1], [1,-1], [-1,1] ] 
//				// check in 8 directions
//				for (let dir of dirs){
//						//check neighbors with range 1
//						for (let i=0; i<=1; i++){
//								let checked_row = grid[n].row + i*dirs[0];
//								let checked_col = grid[n].col + i*dirs[1];
//								let checked_type = grid[n].type;
//								if (is_inside(checked_row, checked_col) && checked_type === true){
//										neighbors++
//								}else{
//										break;
//								}
//						}
//				}
//				n++
//		}
//		return neighbors;
//}

function is_inside(row, col){
		return !(row < 1 || row > nb_rows || col < 1 || col > nb_cols)
}

// function born_or_survive(neighbors){
// 		if (neighbors == 2 || neighbors == 3
// 				&& grid[square].type === true){
// 				grid[square].type === true;
//				alive++;
// 		} 
// 		else if(neighbors == 3 && grid[square].type === false){
// 				grid[square].type === true;
//				alive++;
// 		}
// 		else if(neighbors < 2 || neighbors > 3 && grid[square].type === true){
// 				grid[square].type === false;
//				alive--;
// 		}
//}
//
//
//let delay = setInterval(function (event) {
// 						new_gen(0)
// 					//	if (alive == 0) {
// 					//			clearInterval(delay)
// 					//	}
//}, 50, this)


$(document).ready(function(){
		//FIRST, YOU INITALIZE THE BOARD WITH THE NB OF ROWS AND COLS THAT YOU WANT
		$('#init').on('click', function(){
				let rows = parseInt(prompt('how many rows do you want?'))
				let	cols = parseInt(prompt('how many cols do you want?'))
				let	alive = parseInt(prompt('how many living cells do you want?'))
				init_board(rows, cols, alive);
		});
});
