let firstNumber = null;
let secondNumber = null;
let operator = null;
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

// Helper function to check if the display is overflowing
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
    // Reset the display to enter a new number after an operator button (including =) is clicked
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
    if (operatorClickCount >= 2) { // If operator is pressed more than once
        if (operator != "equals") performOperation(e); // If operator is "Equals", then getting
        firstNumber = +(display.textContent);
    } else if (digits) {
        firstNumber = digits;
        digits = null; // Reset the digits so that the firstNumber should not be picked as the secondNumber.
    }
    operator = e.target.getAttribute("data-op");
    operatorClicked = true;
    equalsOperator.disabled = false; // To allow "=" operator to work.
}

// Perform operation especially when "Equal to" button is clicked after receiving the second number
function performOperation(e) {
    if (digits) {
        secondNumber = digits;
    }

    display.textContent = "";
    operatorClicked = true;

    // If first and second number are provided
    if (firstNumber && secondNumber) {
        const result = operate(firstNumber, operator, secondNumber);
        const count = String(result).length;
        let finalResult;
        if (isDisplayOverflow(count)) { // If result is overflowing the display, then convert it to scientific notation
            finalResult = result.toExponential(2);
        } else { // Otherwise display the result as it is.
            finalResult = result;
        }
        display.textContent = finalResult;
        e.target.disabled = true; // To avoid multiple clicks of "="
    } else {
        display.textContent = "Err";
        operators.forEach(operator => {
            operator.disabled = true;
        });
        digitButtons.forEach(button => {
            button.disabled = true;
        });
        return;
    }

    if (e.target.textContent == "=") {
        operator = e.target.getAttribute("data-op"); // Update the operator to "Equals"
    }
}

digitButtons.forEach(button => {
    button.addEventListener("click", displayDigits);
});

operators.forEach(operator => {
    operator.addEventListener("click", getOperator);
});

equalsOperator.addEventListener("click", performOperation);


