/*
 Cell  sum of live cells   new Cell
   1   0,1             ->  0  # Lonely
   1   4,5,6,7,8       ->  0  # Overcrowded
   1   2,3             ->  1  # Lives
   0   3               ->  1  # It takes three to give birth!
   0   0,1,2,4,5,6,7,8 ->  0  # Barren
*/
let square = {}
let grid = []

function init_board(row, col){
		board = $('<table>');
		for (let i = 1; i <= row;i++){
				let tr = $('<tr>');
				for(let j = 1; j <= col; j++){
						let td= $('<td>');
						let tdId=`${i}-${j}`;	
						$('<td>')
								.attr('id', tdId)
								.appendTo(tr)
						//BY DEFAULT, ALL SQUARES ARE DEAD
						square = {row: i,
						     	  col: j,
								  class: null,
								  clicked: false}
						grid.push(square);
				}
				$(board).append(tr);
		}
		$('#board').html(board);
}

// function start(){}
// goes through the board to check which square were clicked / are alive
// and determines if they can still live

function check_around(square){
		if(square_exists){
				
		}
}

function new_gen(){
		let generation = 0;
		generation += 1;
}

// function check_click() {
// 		let position = null
// 		let clicked = false
// 		for (let i=0; i<=this.nb_rows && !clicked; i++){
// 				for (let j=0; j<=this.nb_cols && !clicked; j++) {
// 						if (this.model[i][j].clicked === true){
// 								clicked = true;
// 								position = {row: i, col: j};
// 						}
// 				}
// 		}
// 		return position	
// }
//function square_exists(square){
//		//if (row < 1 || row > grid.row
//		// 		|| col < 1 || col > grid.col){
//		// 			return false
//		// 		}
//		return true
//}

$(document).ready(function(){
		//FIRST, YOU INITALIZE THE BOARD WITH THE NB OF ROWS AND COLS THAT YOU WANT
		$('#init').on('click', function(){
				row = parseInt(prompt('how many rows do you want?'))
				col = parseInt(prompt('how many cols do you want?'))
				init_board(row, col);
		});
		//THEN YOU DETERMINE WITH A CLICK WHERE YOU WILL PLACE LIVING SQUARES
		$('td').on('click', function(event){
				//when you click on a square, it becomes black / clicked
				$(event.target).addClass('clicked black')
				console.log(event.target)
		});
		//FINALLY, YOU START THE GAME OF LIFE
		// $('button').on('click', function(){
		// 		start(row, col)
		// });
});
