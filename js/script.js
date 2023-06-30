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
  if (b === 0) return "ERR: Dividing by zero"
  return a / b;
}

function power(a, b) {
  return a ** b;
}

function modulo(a, b) {
  if (b === 0) return "ERR: Dividing by zero"
  return a % b;
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
    case "^":
      result = power(firstNumber, secondNumber);
      break;
    case "%":
      result = modulo(firstNumber, secondNumber);
      break;
    default:
      result = "ERR Invalid Operator";
      console.error(operator);
      break;
  }
  return isNaN(result) ? result : Math.round(result * 1_000_000) / 1_000_000;
}

let firstNumber;
let operator = "";

const screenDiv = document.querySelector(".screen");
const errorDiv = document.querySelector(".error");

const numberElements = document.querySelectorAll(".number");
numberElements.forEach(element => {
  element.addEventListener("click", () => {
    resetError();
    if (firstNumber && !operator) return;
    let number = element.textContent;
    screenDiv.textContent == "0" ? screenDiv.textContent = number : screenDiv.textContent += number;
  });
});

const operatorElements = document.querySelectorAll(".operator");
operatorElements.forEach(element => {
  element.addEventListener("click", () => {
    if (operator || screenDiv.textContent === "0") return;
    firstNumber = parseFloat(screenDiv.textContent);
    operator = element.textContent;
    screenDiv.textContent += ` ${operator} `;
  });
});

const resultElement = document.querySelector(".result");
resultElement.addEventListener("click", () => {
  resetError();
  const displaySplit = screenDiv.textContent.split(' ');
  if (displaySplit.length !== 3) return;
  const result = operate(firstNumber, parseFloat(displaySplit[2]), operator);
  if (isNaN(result)) {
    displayError(result);
    clear();
    return;
  }
  firstNumber = result;
  operator = "";
  screenDiv.textContent = result;
});

const clearElement = document.querySelector(".clear");
clearElement.addEventListener("click", () => {
  clear();
});

const displayError = (err) => {
  errorDiv.textContent = err;
  errorDiv.style.display = "block";
}


const resetError = () => {
  errorDiv.textContent = "";
  errorDiv.style.display = "none";
}

const clear = () => {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  screenDiv.textContent = "0";
}
