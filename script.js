
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
const backSpace = document.querySelector('.backspace');

function updateNumber(digit) {
    if (!isSecondNumber && operator === '') {
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
                justCalculated = true;
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
    result_screen.textContent = '0';
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

decimal.addEventListener('click', ()=>{
    if(result_screen.textContent.includes('.')){
        return 
    }else{
        updateNumber(decimal.textContent);
    }
})

backSpace.addEventListener('click', ()=>{
   
})

backSpace.addEventListener('click', () => {
    if (isSecondNumber) {
        secondNumber = secondNumber.slice(0, -1);
        result_screen.textContent = secondNumber || '0';
    } else if (!justCalculated) {
        firstNumber = firstNumber.slice(0, -1);
        result_screen.textContent = firstNumber || '0';
    }
});
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Numbers 0-9
    if (key >= '0' && key <= '9') {
        updateNumber(key);
    }

    // Operators + - * /
    else if (['+', '-', '*', '/'].includes(key)) {
        document.querySelector(`[data-operator="${key}"]`)?.click();
    }

    // Equals: Enter or =
    else if (key === 'Enter' || key === '=') {
        equalto.click();
    }

    // Decimal point
    else if (key === '.') {
        decimal.click();
    }

    // Backspace
    else if (key === 'Backspace') {
        backSpace.click();
    }

    // Clear
    else if (key === 'Escape') {
        clear.click();
    }
});