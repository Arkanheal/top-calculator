function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "ERR"
  return a / b;
}

function operate(firstNumber, secondNumber, operator) {
  let result = 0;
  switch (operator) {
    case "+":
      result = add(firstNumber, secondNumber);
      break;
    case "-":
      result = substract(firstNumber, secondNumber);
      break;
    case "*":
      result = multiply(firstNumber, secondNumber);
      break;
    case "/":
      result = divide(firstNumber, secondNumber);
      break;
    default:
      result = "ERR Invalid Operator";
      console.error(operator);
      break;
  }
  return result;
}

let firstNumber;
let operator = "";

const screenDiv = document.querySelector(".screen");
let screenDisplay = ""

const numberElements = document.querySelectorAll(".number");
numberElements.forEach(element => {
  element.addEventListener("click", () => {
    if (firstNumber && !operator) return;
    let number = element.textContent;
    screenDisplay == "0" ? screenDisplay = number : screenDisplay += number;
    screenDiv.textContent = screenDisplay;
  });
});

const operatorElements = document.querySelectorAll(".operator");
operatorElements.forEach(element => {
  element.addEventListener("click", () => {
    if (operator || screenDisplay === "") return;
    firstNumber = parseFloat(screenDisplay);
    operator = element.textContent;
    screenDisplay += ` ${operator} `;
    screenDiv.textContent = screenDisplay;
  });
});

const resultElement = document.querySelector(".result");
resultElement.addEventListener("click", () => {
  const displaySplit = screenDisplay.split(' ');
  if (displaySplit.length !== 3) return;
  const result = operate(firstNumber, parseFloat(displaySplit[2]), operator);
  screenDisplay = result;
  firstNumber = screenDisplay;
  operator = "";
  screenDiv.textContent = screenDisplay;
});
