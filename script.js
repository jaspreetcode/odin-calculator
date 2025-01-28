let firstNumber;
let secondNumber;
let operator;

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

