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
    const content = screenDiv.textContent;
    const lastChar = content.charAt(content.length - 1);
    if (operator || content === "0" || lastChar === ".") return;
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

const backspaceElement = document.querySelector(".backspace");
backspaceElement.addEventListener("click", () => {
  const content = screenDiv.textContent;
  if (!content || content == "0") return;
  let lastChar = content.charAt(content.length - 1);
  let newDisplay = "";
  // Only way we have a space (without HTML manual editing) is to be after an
  // operator
  if (lastChar === " ") {
    // We need to remove the last 3 elements (two spaces and the operator)
    operator = "";
    newDisplay = screenDiv.textContent.slice(0, -3);
  } else {
    newDisplay = screenDiv.textContent.slice(0, -1);
  }
  screenDiv.textContent = newDisplay.length === 0 ? "0" : newDisplay;
});

const floatElement = document.querySelector(".float");
floatElement.addEventListener("click", () => {
  if (!operator && screenDiv.textContent.includes(".")) return;
  if (operator && screenDiv.textContent.split(" ")[2].includes(".")) return;
  screenDiv.textContent += ".";
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
