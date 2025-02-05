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

display.textContent = 0;

// helper function to check if the display is overflowing
// length of digits cannot be more than 8.
function isDisplayOverflow(len) {
    if (len >= 8) { 
        return true;
    } else {
        return false
    }
}

// Function to display the digits on the screen
function displayDigits(e) {
    // Reset the display to enter a new number after an operator button is clicked
    if (operatorClicked) {
        display.textContent = "";
        operatorClicked = false;
    }
    if (display.textContent == 0) display.textContent = ""; // Remove 0 from the display
    // If display is not overflowing, then only concatenate more digits
    // Accepting a maximum of 8 digits
    if (!isDisplayOverflow(display.textContent.length)) {
        display.textContent += e.target.textContent;
        digits = +(display.textContent);
    }
}

// Function to receive the operator clicked and perform operation for consecutive clicks
// Also, receive the first number from the display
function getOperator(e) {
    operatorClickCount++;
    if (operatorClickCount >= 2) {
        performOperation(e);
        firstNumber = +(display.textContent);
    } else if (digits) {
        firstNumber = digits;
    }
    operator = e.target.getAttribute("data-op");
    operatorClicked = true;
    console.log(firstNumber);
}

// Perform operation especially when "Equal to" button is clicked after receiving the second number
function performOperation(e) {
    if (digits) {
        secondNumber = digits;
    }

    display.textContent = "";

    // If first and second number are provided
    if (firstNumber && secondNumber) {
        const result = operate(firstNumber, operator, secondNumber);
        const count = String(result).length;
        if (isDisplayOverflow(count)) { // If result is overflowing the display, then convert it to scientific notation
            display.textContent = result.toExponential(2);
        } else { // Otherwise display the result as it is.
            display.textContent = result;
        }
    }

    // Once the "equal to" button is pressed, disable all the other operators
    if (e.target.textContent == "=") {
        operators.forEach(operator => {
            operator.disabled = true;
        })
        e.target.disabled = true;
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


