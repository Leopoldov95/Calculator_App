/////challenges for me////////////
//Make app work without using eval
//make sure user cannot double press an oper btn - FINISHED
//display user number input on user screen - FINISHED
//make the operations work - FINISHED
//fix overflow issue (no e+)
//clear user input disaply once user has pushed new number after hitting equal - FINISHED
//make combinations work (5 + 5 + 6 + 7 - 2)

//////////how to make operations work/////////
//when user presses an oper btn, the value on the screen should be stored somewhere,
//user should not be able to press the oper btn if there is no input value
//user should be able to string arithmetic combinations (ex) 5 + 5 + 5)

//DOM Selector
const mainContainer = document.querySelector(".main-container");
const userDisplay = document.querySelector("#user-display");

//State manager
let firstOper;
let btnOper;
let secondOper;
let isFinished = false;
let isCombo = false; //helper variable for stringing multiple operations, not very pretty but not sure of other way on how to mkake it work

//update after calculation
function updateAfterCalc() {
  firstOper = parseFloat(userDisplay.innerHTML);
  btnOper = undefined;
  secondOper = undefined;
}

//Determine what the solution/output will be, handling exponential numbers
function calcOutputDisplay(calculateSolution) {
  if (calculateSolution.toString().includes("e")) {
    //if number is too large, user must clear before continuing
    userDisplay.innerHTML = calculateSolution.toExponential(9);
  } else if (calculateSolution.toString().length > 14) {
    userDisplay.innerHTML = calculateSolution.toExponential(9);
  } else {
    userDisplay.innerHTML = calculateSolution;
  }
}

//determine the operator
const determineOper = (oper) => {
  switch (oper) {
    case "*":
      return firstOper * secondOper;
      break;
    case "+":
      return firstOper + secondOper;
      break;
    case "-":
      return firstOper - secondOper;
      break;
    case "/":
      return firstOper / secondOper;
      break;
  }
};

//calculates the input values
function equalCalculate() {
  secondOper = parseFloat(userDisplay.innerHTML);
  let solution;
  solution = Math.round(determineOper(btnOper) * 100) / 100;
  calcOutputDisplay(solution);
  updateAfterCalc();
}

//main event listener
mainContainer.addEventListener("click", function (e) {
  //check to make sure no more than one decimal can exist
  if (e.target.value === "." && userDisplay.innerHTML.includes(".")) {
    return;
  }

  //user number input handler

  if (
    e.target.className === "btn-input" &&
    userDisplay.innerHTML.length <= 14
  ) {
    if (isFinished === true) {
      isFinished = false;
      firstOper = undefined;
      userDisplay.innerHTML = "";
    }
    //this line was tricky!
    if (btnOper !== undefined && isCombo === true) {
      isCombo = false;
      userDisplay.innerHTML = "";
    }

    userDisplay.innerHTML += e.target.value;
  }

  //user operator btn handler
  if (
    e.target.className === "btn-oper" &&
    !userDisplay.innerHTML.includes("e")
  ) {
    // to ensure that the operator btn's can't be used on an empty input field
    if (userDisplay.innerText.length === 0) {
      return;
    }

    if (isFinished === true) {
      isFinished = false;
    }

    if (btnOper === undefined) {
      firstOper = parseFloat(userDisplay.innerHTML);
      btnOper = e.target.value;
      userDisplay.innerHTML = "";
    }

    if (
      (firstOper || firstOper === 0) &&
      btnOper &&
      userDisplay.innerHTML.length !== 0 &&
      isCombo === false
    ) {
      // keep in mind at this point that the firstOper and btnOper have value
      equalCalculate();
      btnOper = e.target.value;
      isCombo = true;
    }
  }

  //equal btn calculation
  if (e.target.id === "btn-equal") {
    //userDisplay.innerHTML = eval(userDisplay.innerHTML);
    if (
      (firstOper || firstOper === 0) &&
      btnOper &&
      userDisplay.innerHTML.length !== 0
    ) {
      equalCalculate();
      isFinished = true;
    }
  }

  //clears everything
  if (e.target.id === "btn-clear") {
    userDisplay.innerHTML = "";
    firstOper = undefined;
    btnOper = undefined;
    secondOper = undefined;
  }
});
