let firstNumber;
let secondNumber;
let operator;

let digits;

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function mod(x, y) {
    return x % y;
}

// The operate() Function
function operate(a, op, b) {
    return op(a, b); // Callback function
}

// Populate the display with digits through buttons
const digitButtons = document.querySelectorAll('.buttons .digit');
const operators = document.querySelectorAll(".buttons .operator");
const equalsOperator = document.querySelector(".buttons .equals");
const display = document.querySelector(".calculator .display");

function displayDigits(e) {
    display.textContent += e.target.textContent;
    digits = parseInt(display.textContent);
}

function getOperator(e) {
    if (digits) {
        firstNumber = digits;
    }
    operator = e.target.getAttribute("data-op");
    display.textContent = "";
    digits = null;
    console.log(firstNumber);
    console.log(operator);
    console.log(digits);
}

function performOperation(e) {
    if (digits) {
        secondNumber = digits;
    }
    console.log(secondNumber);
}

digitButtons.forEach(button => {
    button.addEventListener("click", displayDigits);
});

operators.forEach(operator => {
    operator.addEventListener("click", getOperator);
});

equalsOperator.addEventListener("click", performOperation)


