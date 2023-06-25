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

function operate(firstNumber, secondNumber, operator){
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
}

let firstNumber;
let operator;
let secondNumber;
