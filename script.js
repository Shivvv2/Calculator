
let firstNumber = '';
let operator = '';
let secondNumber = '';
let isSecondNumber = false;
let justCalculated = false;

function add(a, b) {
    return a + b;
};
function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    if (b === 0) return "Nice Try!";
    return a / b;

};


function operate(operator, firstNumber, secondNumber) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    if (operator === '+') {
        return (add(firstNumber, secondNumber));
    }
    else if (operator === '-') {
        return (subtract(firstNumber, secondNumber));
    }
    else if (operator === '*') {
        return (multiply(firstNumber, secondNumber));
    }
    else if (operator === '/') {
        return (divide(firstNumber, secondNumber));
    }
    else {
        return null;
    }

}

const result_screen = document.querySelector('#display');
const current_digit = document.querySelectorAll('.digits');
const operatorButton = document.querySelectorAll('[data-operator]');
const equalto = document.querySelector('.equalto');
const decimal = document.querySelector('.decimal');

function updateNumber(digit) {
    if (operator === '') {
        if(justCalculated){
            firstNumber ='';
            justCalculated = false;
        }
        firstNumber += digit;
        result_screen.textContent = firstNumber;
    }
    else {

        secondNumber += digit;
        result_screen.textContent = secondNumber;
    }
}

current_digit.forEach((digit) => {
    digit.addEventListener('click', () => {
        updateNumber(digit.textContent);
    })
})



operatorButton.forEach((button) => {
    button.addEventListener('click', () => {
        if (firstNumber === '') return;
        if (secondNumber !== '' && operator !== '') {
            const result = updateResult();
            if (typeof (result) === 'number') {
                firstNumber = result;
            }
            result_screen.textContent = firstNumber;
            operator = button.dataset.operator;
            secondNumber = '';
            isSecondNumber = false

        }
        else {
            operator = button.dataset.operator;

            isSecondNumber = true;
        }

    })
})


equalto.addEventListener('click', () => {
    if (operator !== '' && secondNumber !== '') {
        const result = updateResult();
        if (typeof (result) === 'number') {
            firstNumber = result;
        }

        result_screen.textContent = result;
        
        operator = '';
        secondNumber = '';

        isSecondNumber = false;
        justCalculated = true

    }

})

const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    isSecondNumber = false;
    justCalculated = false;
    result_screen.textContent = '';
})

function updateResult() {
    const result = operate(operator, firstNumber, secondNumber);
    if(typeof(result)==='number'){
        return Math.round(result*100)/100;
    }
    else{
        return result;
    }
}