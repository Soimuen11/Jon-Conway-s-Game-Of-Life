'use strict'

function create_grid(rows, cols, alive){
		let grid = new Array()
		for (let i = 0; i < rows;i++){
				grid[i] = new Array()
				for(let j = 0; j < cols; j++){
						grid[i][j] = false
				}
		}
		while (alive > 0) {
				//r for random
				let i_r = Math.floor(Math.random() * rows)
				let j_r = Math.floor(Math.random() * cols);
				if (grid[i_r][j_r] === false){
						grid[i_r][j_r] = true;
						alive--
				}
		}
		return grid;
}

function draw(grid){
		let board = $('<table>');
		for (let i = 0; i < grid.length ;i++){
				let tr = $('<tr>');
				for(let j = 0; j < grid[i].length; j++){
						let td= $('<td>');
						let tdId=`${i}-${j}`;	
						$(td)
								.attr('id', tdId)
								.appendTo(tr)
						if (grid[i][j] === true){
								$(td).addClass('black')
						}
				}
				$(board).append(tr);
		}
		$('#board').html(board);
		return board
}

function is_inside(i, j, rows, cols) {
		return i >= 0 && i < rows && j >= 0 && j < cols
}

function next_gen(grid){
		let new_grid = Array()
		for (let i = 0; i < grid.length; i++){
				new_grid[i] = new Array()
				for (let j = 0; j < grid[i].length; j++){
						let dirs = [ [0,1], [0,-1], [1,0], [-1,0], [1,1], [-1,-1], [1,-1], [-1,1] ] 
						let neighbors = 0;
						for (let dir of dirs){
								if (is_inside(i + dir[0], j + dir[1], grid.length, grid[i].length) && grid[i + dir[0]][j + dir[1]] === true) {
										neighbors++
								}
						}
						new_grid[i][j] = born_or_survive(grid[i][j], neighbors)
				}
		}
		return new_grid
}

function born_or_survive(alive, neighbors){
		if (alive === true) {
				return (neighbors === 2 || neighbors === 3)
		} else {
				return neighbors === 3
		}
}

$(document).ready(function(){
				$('#draw').on('click', function(){
						let counter = 0;
						let row = parseInt($('#row').val())
						let col = parseInt($('#col').val())
						let alive = parseInt($('#alive').val())
						let grid = create_grid(row, col, alive);
						draw(grid)
						$('td').on('click', function(event){
								if ($(this).hasClass('black')){
										$(this).removeClass('black');
										alive++
								}else if (alive > 0) {
										$(this).addClass('black');
										alive--
								}
						});
						$('#start').on('click', function(){
								for (let i=0; i < grid.length; i++){
										for (let j=0; j < grid[i].length; j++){
												grid[i][j] = $('td#' + `${i}-${j}`).hasClass('black')
										}
								}
								let new_grid = next_gen(grid)
								draw(new_grid)
								let delay = setInterval(function (event){
										new_grid = next_gen(new_grid)
										draw(new_grid)
										counter++
										$('#counter').html('Generation: ' + counter)
								}, 100, this)
								$('#stop').on('click', function(){
										clearInterval(delay);
								});
						});
				});
});
