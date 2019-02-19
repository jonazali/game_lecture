import { checkWin } from './win-logic.js';
import { BOARDCOLS, BOARDROWS, board, playerIndicator, resetButton } from './constants.js';

var val1 = 0;
var val2 = 0;
redo();

function redo(){

//Make the reset button into nothing
resetButton.innerHTML = ``;

//store the scores
localStorage.setItem("score1", val1);
localStorage.setItem("score2", val2);

//display the scores on the scoreboard
document.getElementById("score1").innerHTML = localStorage.getItem("score1");
document.getElementById("score2").innerHTML = localStorage.getItem("score2");

// setup board
  let boardHTML = '';
  for (let row = BOARDROWS - 1; row >= 0; row--) {
    // iterate over rows, going down
    for (let col = 0; col < BOARDCOLS; col++) {
      // iterate over columns, going up
      // prettier-ignore
      boardHTML += `
        <div class="slot">
          <label for="slot${col}${row}">
            <input type="checkbox" ${row > 0 ? 'disabled' : ''} name="slot${col}${row}" id="slot${col}${row}" data-row="${row}" data-col="${col}" >
          </label>
        </div>
      `;
    }
  }

// set the board's HTML
board.innerHTML = boardHTML;

document.querySelectorAll('input').forEach(input => 
  input.addEventListener('change', runTurn));

let player1Turn = true;
// eslint-disable-next-line no-unused-vars
function runTurn(event) {
  // change color of labellabel
  
  const input = event.target;
  input.parentElement.className = player1Turn ? 'player1' : 'player2';

  // disable the input
  input.disabled = true;

  // enable the slot at (row + 1, col)
  const { col, row } = input.dataset;

  // check if input is on the top row
  if (row < BOARDROWS - 1) {
    const neighbor = document.getElementById(`slot${col}${parseInt(row) + 1}`);
    neighbor.disabled = false;
  }

  // check if it's a win
  const isWin = checkWin(parseInt(col), parseInt(row), player1Turn ? 'player1' : 'player2');
  if (isWin) {
    // update win text
    const turnIndicator = document.getElementById('turn-indicator');
    const player = player1Turn ? 'player1' : 'player2';
    turnIndicator.innerHTML += `<span class="${player}" id="player-indicator"></span> wins`;

    console.log(player);
    if(player == "player1"){
      val1++;
    }

    else{
      val2++;
    }

    // get all checkboxs
    const checkboxes = document.querySelectorAll('.slot input[type=checkbox]');

    // and disable all of them
    checkboxes.forEach(checkbox => {
      checkbox.disabled = true;
    });

    resetButton.innerHTML = `<button id="actual_button"><h2>RESET</h2></button>`;

    actual_button.onclick = redo;

    return;
  }



  // change whose turn it is
  player1Turn = !player1Turn;

  // update player-indicator text
  if (player1Turn) {
    playerIndicator.innerText = 'Player 1';
    playerIndicator.className = 'player1';
    playerIndicator.style.color = 'yellow';
  } else {
    playerIndicator.innerText = 'Player 2';
    playerIndicator.className = 'player2';
    playerIndicator.style.color = 'red';
  }
}

window.runTurn = runTurn;

}


