

function add(a,b){
    return a + b;
};
function subtract(a,b){
    return a - b;
};

function multiply(a,b){
    return a * b;
};

function divide(a,b){
    if(b!==0){
    return a/b;
    }else{
        return "Fcuk you";
    }
};

let firstNumber = '';
let operator = '';
let secondNumber = '';
let isSecondNumber = false;
let isOperator = false;

function operate(operator,firstNumber,secondNumber){
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    if(operator=== '+'){
        return (add(firstNumber,secondNumber));
    }
    else if(operator==='-'){
        return (subtract(firstNumber,secondNumber));
    }
    else if(operator==='*'){
        return (multiply(firstNumber,secondNumber));
    }
    else if(operator==='/'){
        return (divide(firstNumber,secondNumber));
    }
    else{
        return null;
    }

}

const result_screen = document.querySelector('#display');
const current_digit = document.querySelectorAll('.digits');

function updateNumber(digit){
    if(!isSecondNumber){
        firstNumber += digit;
        result_screen.textContent = firstNumber;
    }
    else{
        secondNumber += digit;
       
        result_screen.textContent = `${firstNumber} ${operator} ${secondNumber}`;
    }
}

current_digit.forEach((digit)=>{
    digit.addEventListener('click',()=>
    {
        updateNumber(digit.textContent);
    })
})

const operatorButton = document.querySelectorAll('[data-operator]');

operatorButton.forEach((button)=>{
    button.addEventListener('click',()=>{

       if(isSecondNumber && operator!== ''){
        firstNumber = operate(operator,firstNumber,secondNumber);
        result_screen.textContent = firstNumber;
        operator = button.dataset.operator;
        secondNumber = '';
        isSecondNumber = false
        
       }
       else{
        operator = button.dataset.operator;
        result_screen.textContent = `${firstNumber} ${operator} ${secondNumber}`;
        isSecondNumber = true;
       }

    })
})

const equalto = document.querySelector('.equalto');
equalto.addEventListener('click',()=>{
    
   const result =   operate(operator,firstNumber,secondNumber);
   result_screen.textContent = result;
   isSecondNumber = false;
    
   
})

const clear = document.querySelector('.clear');
clear.addEventListener('click',()=>{
    firstNumber = '';
    secondNumber = '';
    operator = '';
    isSecondNumber = false;
   
    result_screen.textContent = '';
})