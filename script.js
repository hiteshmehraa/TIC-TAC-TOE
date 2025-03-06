let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let button = document.querySelector(".button"); 
let winnerMsg = document.querySelector("#winner");
let msgContainer = document.querySelector(".msg");

let turn0 = true;
let gameActive = true; 

const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], 
    [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameActive || box.innerText !== "") return; 

        box.innerText = turn0 ? "0" : "X";
        turn0 = !turn0;
        box.disabled = true;
        
        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach((box) => box.disabled = true);
    gameActive = false;
};

const showWinner = (player) => {
    winnerMsg.innerText = `🎉 Winner is ${player}! 🎉`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Function to Reset Game
const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    msgContainer.classList.add("hide"); 
    winnerMsg.innerText = "🎉 Winner 🎉"; 
    turn0 = true;
    gameActive = true;
};

// Check Winner Logic
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let pos1 = boxes[a].innerText;
        let pos2 = boxes[b].innerText;
        let pos3 = boxes[c].innerText;

        if (pos1 && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
        }
    }
};

// Reset Button Click
reset.addEventListener("click", resetGame);
button.addEventListener("click", resetGame); 
