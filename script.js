const frame = document.querySelector("body");
const main = document.querySelector("main");
const btn = document.querySelector("button");
const guess = document.querySelector("input");
const guessedArray = document.querySelectorAll(".number");

let emptyBoxes = null;

const choseNumber = () => {
  return Math.round(Math.random() * 10) + 1;
};

const createPopUp = () => {
  const popup = document.createElement("div");
  const backblure = document.createElement("div");
  popup.classList.add("popup");
  backblure.classList.add("bg-blure");
  frame.appendChild(popup);
  frame.appendChild(backblure);
  const congratHeading = document.createElement("h1");
  congratHeading.textContent = "Congrats number was: ";
  const congratsNumber = document.createElement("h2");
  congratsNumber.textContent = randomNumber;
  popup.appendChild(congratHeading);
  popup.appendChild(congratsNumber);
  const restartBtn = createRestart();
  popup.appendChild(restartBtn);
};

const checkGuess = (guess, chosenValue) => {
  if (parseInt(guess) === chosenValue) {
    frame.style.backgroundColor = "#4BB543";
    createPopUp();
  } else {
    frame.style.backgroundColor = "#FF9494";
    addToGuessed(guess);
  }
};

const createRestart = () => {
  const restartBtn = document.createElement("button");
  restartBtn.classList.add("form-submit");
  restartBtn.textContent = "Restart";
  restartBtn.addEventListener("click", restartFn);
  return restartBtn;
};

const restartFn = (e) => {
  e.preventDefault();
  const popup = document.querySelector(".popup");
  const backblure = document.querySelector(".bg-blure");
  if (popup && backblure) {
    frame.removeChild(popup);
    frame.removeChild(backblure);
  }
  frame.style.backgroundColor = "white";
  Array.prototype.map.call(guessedArray, (item) => {
    item.innerHTML = "";
  });
  const restartButtons = main.querySelectorAll("button");
  restartButtons[0].disabled = false;
  guess.value = null;
  if (restartButtons[1]) main.removeChild(restartButtons[1]);

  randomNumber = choseNumber();
};

const addToGuessed = (guess) => {
  emptyBoxes = Array.prototype.slice
    .call(guessedArray)
    .filter((item) => !item.firstChild);
  const guessed = document.createElement("p");
  guessed.textContent = guess;
  emptyBoxes[0].appendChild(guessed);
  if (emptyBoxes.length === 1) {
    const restart = createRestart();
    main.appendChild(restart);
    btn.disabled = true;
    return;
  }
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let number = guess.value;
  if (!number) {
    alert("Enter value");
    return;
  }
  checkGuess(number, randomNumber);
});

let randomNumber = choseNumber();

console.log(randomNumber);
