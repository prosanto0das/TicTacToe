let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameButton = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let count = 0;
let turn0 = true;
let winmoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () =>{
    turn0 = true;
    count = 0;  // Reset
    enableboxes();
    msgContainer.classList.add("hide");
};

const enableboxes = () => {
    for(box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
        // Remove all animation and symbol classes
        box.classList.remove("celebrate-x", "celebrate-o", "celebrate-draw", "x-symbol", "o-symbol");
    }
};

const disableboxes = () => {
    for(box of boxes)
    {
        box.disabled = true;
    }
};

const showWinner = (val, winningPositions) =>{
    disableboxes();
    
    
    winningPositions.forEach(pos => {
        if(val === "X") {
            boxes[pos].classList.add("celebrate-x");
        } else {
            boxes[pos].classList.add("celebrate-o");
        }
    });
    
    msg.classList.add("winner-message");
    msg.innerText = `🎉 Congratulations! ${val} Wins! 🎉`;
    msgContainer.classList.remove("hide");
    
    setTimeout(() => {
        msg.classList.remove("winner-message");
    }, 800);
};


const showDraw = () =>{
    disableboxes();
    
    boxes.forEach(box => {
        box.classList.add("celebrate-draw");
    });
    
    msg.classList.add("winner-message");
    msg.innerText = "🤝 It's a Draw! Good Game! 🤝";
    msgContainer.classList.remove("hide");
    
    setTimeout(() => {
        msg.classList.remove("winner-message");
    }, 800);
};

const checkwinner = () => {
    for(moves of winmoves)
    {
        let posval1 = boxes[moves[0]].innerText;
        let posval2 = boxes[moves[1]].innerText;
        let posval3 = boxes[moves[2]].innerText;

        if(posval1 === posval2 && posval2 === posval3 && posval1 != "")
        {
           showWinner(posval1, moves); // Pass winning positions
           return; 
        }
    }
    
   
    if(count === 9)
    {
        showDraw();
    }
};
boxes.forEach((box) =>{
    
    box.addEventListener("click", () => {
        if(turn0)
        {
            box.innerText = "O" ;
            box.classList.add("o-symbol");
            turn0 = false ;
        }
        else
        {
            box.innerText = "X" ;
            box.classList.add("x-symbol");
            turn0 = true ;
        }
        box.disabled = true;
        count++;
        checkwinner();
        // console.log(count);
        
    });
});

newGameButton.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
    




// console.log(boxes[0].innerHTML);
// console.log(boxes[1].innerHTML);

