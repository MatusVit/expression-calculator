function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    let result = expr.replace(/\s/g, '');

    let regexSum = /(-?\d+(\.\d+)?)\+(-?\d+(\.\d+)?)/;
    let regexSubtract = /\d+(\.\d+)?-\d+(\.\d+)?/;
    let regexMultiply = /\d+(\.\d+)?\*\d+(\.\d+)?/;
    let regexDivide = /\d+(\.\d+)?\/\d+(\.\d+)?/;
    
    while (regexDivide.test(result)) {
        let match = result.match(regexDivide);
        result = result.replace(regexDivide, divide(match[0]));
    }

    while (regexMultiply.test(result)) {
        let match = result.match(regexMultiply);
        result = result.replace(regexMultiply, multiply(match[0]));
    }

    
    while (regexSubtract.test(result)) {
        let match = result.match(regexSubtract);
        //TODO change '-' to '+-' and sum
        result = result.replace(regexSubtract, subtract(match[0]));
    }
    
    while (regexSum.test(result)) {
        let match = result.match(regexSum);
        result = result.replace(regexSum, sum(match[0]));
    }
    
    let number = +result;
    return number;
}



function sum(str) {
    let arr = str.split('+');
    let sum = +arr[0] + +arr[1];
    return sum;
}

function subtract(str) {
    let arr = str.split('-');
    return +arr[0] - +arr[1];
}

function multiply(str) {
    let arr = str.split('*');
    return +arr[0] * +arr[1];
}

function divide(str) {
    let arr = str.split('/');
    if (+arr[1] === 0) throw Error("TypeError: Division by zero.");
    return +arr[0] / +arr[1];
}

module.exports = {
    expressionCalculator
}


// !test

// let ex = " 64 + 19 - 77 - 93 "
// console.log("Начало")
// console.log(expressionCalculator(ex));
