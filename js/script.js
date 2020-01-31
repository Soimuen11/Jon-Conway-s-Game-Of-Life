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
				let i_r = Math.floor(Math.random() * rows)
				let j_r = Math.floor(Math.random() * cols);
				if (grid[i_r][j_r] === false){
						grid[i_r][j_r] = true;
						alive--
				}
		}
		console.log(grid)
		return grid;
}

function draw(grid){
		console.log(grid)
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
		$('#init').on('click', function(){
				let rows = parseInt(prompt('how many rows do you want?'))
				let	cols = parseInt(prompt('how many cols do you want?'))
				let	alive = parseInt(prompt('how many living cells do you want?'))
				let grid = create_grid(rows, cols, alive);
				draw(grid)
				let new_grid = next_gen(grid)
				let delay = setInterval(function (event){
						new_grid = next_gen(new_grid)
						draw(new_grid)
				}, 100, this)
		});
});
