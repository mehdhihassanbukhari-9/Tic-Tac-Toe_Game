let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;

const winpattern = [
  [0, 1, 2], 
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5], 
  [6, 7, 8]
];

const resetGame = () => {
  turnO = true;
  enabledBox();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerText = turnO ? "O" : "X";
    turnO = !turnO;
    box.disabled = true;
    checkWinner();
  });
});

const disabledBox = () => {
  for (let box of boxes) box.disabled = true;
};

const enabledBox = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}!`;
  msgContainer.classList.remove("hide");
  disabledBox();
};

const checkDraw = () => {
  // Only a draw if ALL boxes are filled and no winner was found
  const allFilled = [...boxes].every(box => box.innerText !== "");
  if (allFilled) {
    msg.innerText = "It's a Draw! Try Again..!";
    msgContainer.classList.remove("hide");
  }
};

const checkWinner = () => {
  for (let pattern of winpattern) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return; 
        // Stop checking after a winner is found
      }
    }
  }
  // No winner found — check for draw
  checkDraw();
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame); 