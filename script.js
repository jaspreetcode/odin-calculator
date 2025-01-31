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

// The operate() Function
function operate(a, op, b) {
    return op(a, b); // Callback function
}

// Populate the display with digits through buttons
const digitButtons = document.querySelectorAll('.buttons .digit');
const display = document.querySelector(".calculator .display");

function displayDigit(e) {
    display.textContent += e.target.textContent;
    digits = parseInt(display.textContent);
    console.log(digits)
}

digitButtons.forEach(button => {
    button.addEventListener("click", displayDigit);
});


