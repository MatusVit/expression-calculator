function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    let result = expr.replace(/\s/g, '');

    let regexMultiply = /\d+(\.\d+)?\*-?\d+(\.\d+)?/;
    let regexDivide = /\d+(\.\d+)?\/-?\d+(\.\d+)?/;
    
    
    if (result.includes('(') || result.includes(')')){
        if ((result.split('(').length - 1) !==  (result.split(')').length - 1)){
            throw Error ("ExpressionError: Brackets must be paired");
        } 
        
        let regexBrackets = /\(-?\d+[^\(\)]*\d\)/;
        while (regexBrackets.test(result)) {
            let match = result.match(regexBrackets);
            let str = match[0].slice(1, -1);
            result = result.replace(regexBrackets, expressionCalculator(str));
        }
    }


    while (regexDivide.test(result)) {
        let match = result.match(regexDivide);
        result = result.replace(regexDivide, divide(match[0]));
    }

    while (regexMultiply.test(result)) {
        let match = result.match(regexMultiply);
        result = result.replace(regexMultiply, multiply(match[0]));
    }

    if (result.includes('+') || result.includes('-')) {
        result = result.replace(/--/g, '+');
        result = result.replace(/-/g, '+-');
        result = result.replace(/^\+-/,  '-');
        let arr = result.split('+');
        result = arr.reduce((acc, item) => +acc + +item);
    }


    return +result;
}
    

function multiply(str) {
    let arr = str.split('*');
    return +arr[0] * +arr[1];
}

function divide(str) {
    let arr = str.split('/');
    if (+arr[1] === 0) throw Error("TypeError: Division by zero.");
    return (+arr[0] / +arr[1]).toFixed(16);
}

module.exports = {expressionCalculator}


