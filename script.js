let firstNumber = null;
let secondNumber = null;
let operator;
let operatorClicked = false;
let operatorClickCount = 0;

let digits;

// Better approach for modular programming - creating functions as objects
const functions = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b, 
    mod: (a, b) => a % b,
}

// The operate() Function
function operate(a, op, b) {
    return functions[op](a, b); // calling the functions is now easy
}

// Populate the display with digits through buttons
const digitButtons = document.querySelectorAll('.buttons .digit');
const operators = document.querySelectorAll(".buttons .operator");
const equalsOperator = document.querySelector(".buttons .equals");
const display = document.querySelector(".calculator .display");

function displayDigits(e) {
    if (operatorClicked) {
        display.textContent = "";
        operatorClicked = false;
    }
    display.textContent += e.target.textContent;
    digits = parseInt(display.textContent);
}

function getOperator(e) {
    operatorClickCount++;
    if (operatorClickCount >= 2) {
        performOperation();
        firstNumber = parseInt(display.textContent);
    } else if (digits) {
        firstNumber = digits;
    }
    operator = e.target.getAttribute("data-op");
    operatorClicked = true;
    console.log(firstNumber);
}

function performOperation() {
    if (digits) {
        secondNumber = digits;
    }

    display.textContent = "";

    // If first and second number are provided
    if (firstNumber && secondNumber) {
        const result = operate(firstNumber, operator, secondNumber);
        display.textContent = result;
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


