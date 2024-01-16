const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-Info");
const newGamebtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPostions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//let create a function to intilize the game 
  function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // ui par desplay karna padega 
    boxes.forEach((box,index) => {
        box.innerText=""; // inner text kahali karne ke liye
        boxes[index].style.pointerEvents = "all";
  // green colour hatne ke liye 
       box.classList = `box box${index+1}`;

    })
    newGamebtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
  function swapTurn(){
      if(currentPlayer === "X"){
          currentPlayer ="O";
    }
    else{
        currentPlayer = "X";
    }
    // UI update 
    gameInfo.innerText = `Current Player -${currentPlayer}`;
}



function handleClick(index){
    // box khali hai samjha tabhi proceesing hoga;
    if(gameGrid[index] ===""){
        boxes[index].innerText = currentPlayer; // innr text change kar dena ok;
        gameGrid[index] = currentPlayer; // gird me replace karna hai ok
        boxes[index].style.pointerEvents = "none";
        // swap kare turn ko 
        swapTurn();
        //check koi jeet toh nahi gai hai
        checkGameOver();
        
    }
}
function checkGameOver(){
    let answer ="";
    winningPostions.forEach((position) => {
        // all 3 boxes should be non -empty and excatly same in value;
        if (
            (gameGrid[position[0]] !== "" ||
            gameGrid[position[1]] !== "" ||
            gameGrid[position[2]] !== "") &&
            gameGrid[position[0]] === gameGrid[position[1]] &&
            gameGrid[position[0]] === gameGrid[position[2]]
            ){
                // check if winner is x
                if(gameGrid[position[0]] === "X")
                answer="X";
                else
                answer ="O";
            //now we know x/0 is a winner
            // matlab apan ko winner mil chuka hia okk 
            //  isliye apan ko aage pointer ki jarrurat nii hai 
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            
            // now we know that X/0 is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
        
    });
    
    // it means that we have a winner
    if(answer !==""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGamebtn.classList.add("active");
        return;
    }
    // lets check whether there is tie 
    let fillCount =0;
    gameGrid.forEach((box) => {
        if(box !== "" )
        fillCount++;
    });
    // board is filled ,game is tie
    if(fillCount == 9){
        gameInfo.innerText = "Game Tied !";
        newGamebtn.classList.add("active");
    }   
}
boxes.forEach((box,index)=>{
    box.addEventListener("click",() => {
        handleClick(index);
    })
})
initGame();
newGamebtn.addEventListener("click",initGame); // button pe click karne ke baaad ye hoga okk
