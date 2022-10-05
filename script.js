let squares = document.querySelectorAll(".square");
let stantText = document.querySelector("#stantText");
let restartBtn = document.querySelector("#restartButton");

let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();


function initializeGame(){
    squares.forEach(square => square.addEventListener("click", cellClicked));
   restartBtn.addEventListener("click", restartGame);
    stantText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(event){
    const id = event.target.getAttribute("id");
    console.log(id)

    if(options[id] != "" || !running){
        return;
    }

  updateCell(this, id);
    checkWinner();
}
function updateCell(square, index){
    options[index] = currentPlayer;
    square.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    stantText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        let condition = winConditions[i];
        let squareA = options[condition[1]];
        let squareB = options[condition[2]];
        let squareC = options[condition[3]];

        if(squareA == "" || squareB == "" || squareC == ""){
            continue;
        }
        if(squareA == squareB && squareB == squareC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        stantText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        stantText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    stantText.textContent = `${currentPlayer}'s turn`;
    squares.forEach(square => square.textContent = "");
    running = true;
}