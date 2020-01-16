/*
 Cell  sum of live cells   new Cell
   1   0,1             ->  0  # Lonely
   1   4,5,6,7,8       ->  0  # Overcrowded
   1   2,3             ->  1  # Lives
   0   3               ->  1  # It takes three to give birth!
   0   0,1,2,4,5,6,7,8 ->  0  # Barren
*/

let square = {};
let grid = []
let $class = null;

function draw(row, col){
		board = $('<table>');
		for (let i = 1; i <= row;i++){
				let tr = $('<tr>');
				for(let j = 1; j <= col; j++){
						let td= $('<td>');
						let tdId=`${i}-${j}`;	
						$('<td>')
								.attr('id', tdId)
								.appendTo(tr)
				}
				$(board).append(tr);
		}
		$('#board').html(board);
}

function start(row, col){
		for (let i=1; i<=row; i++){
				for(let j=1; j<=col; j++){
						square = {row: i,
						     	  col: j,
								  class: $class,
								  clicked: false}
						grid.push(square);
				}
		}		
		console.log(grid)
		return grid;
}

$(document).ready(function(){
		draw(5,5);
		$('td').on('click', function(event){
				$(event.target).addClass('clicked black')
				$class = 'black';
				console.log($class)
				console.log(grid)
		});
		$('button').on('click', function(){
				start(5,5)
		});
});
