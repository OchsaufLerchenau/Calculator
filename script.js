var displayValue = 0;
var tempValueDisp = '';
var tempValueCount = 0;
var multiInputValue = 0;
var multDivCount = 0;
var inputValue = '';
var operator = '';
var multDivOperator = '';

var functions = {
    add: function(a, b) {return a+b},
    subtract: function(a, b) {return a-b},
    multiply: function(a, b) {return a*b},
    divide: function(a, b) {return a/b}
}

function numberButtonPress(e) {
    // if (/^[0-9]*\.[0-9]*$/.test(inputValue)) {
    //     console.log('chuja')
    //     document.getElementById('comma').className('buja')
    // } 

    inputValue += this.dataset.input.toString();

    displayValue = inputValue;
    display.textContent = displayValue;
}

function operatorButtonPress(e) {
    if (this.dataset.input === 'add' || this.dataset.input === 'subtract') {
        tempValueDisp = '';
        
        if (tempValueCount !== 0) {
            tempValueCount = functions[operator](Number(tempValueCount), Number(inputValue));
        } else if (tempValueCount === 0) {tempValueCount = inputValue}

        tempValueDisp = this.textContent;
        value.textContent = tempValueDisp;
        inputValue = '';
        display.textContent = inputValue;
        operator = this.dataset.input.toString();

    } else if (this.dataset.input === 'multiply' || this.dataset.input === 'divide') {
        if (multDivCount !== 0) {
            multDivCount = functions[multDivOperator](Number(multDivCount), Number(inputValue));
            console.log(multDivCount)
        } else if (multDivCount === 0) {multDivCount = inputValue; console.log(multDivCount)}

        multDivOperator = this.dataset.input.toString();
        tempValueDisp = this.textContent;
        value.textContent = tempValueDisp;
        inputValue = '';
        display.textContent = inputValue; 
    }
}

const display = document.getElementById('display');
const value = document.getElementById('value');
display.textContent = displayValue;
value.textContent = tempValueDisp;

const numberButtons = document.querySelectorAll('.numbers');
numberButtons.forEach(button => button.addEventListener('click', numberButtonPress));

const operatorButtons = document.querySelectorAll('.operators');
operatorButtons.forEach(button => button.addEventListener('click', operatorButtonPress));

document.getElementById('equals').addEventListener('click', () => {
    tempValueCount = functions[operator](Number(tempValueCount), Number(inputValue));
    value.textContent = ''
    display.textContent = tempValueCount;
    displayValue = 0;
    tempValueDisp = '';
    tempValueCount = 0;
    inputValue = '';
    operator = '';
});

document.getElementById('clear').addEventListener('click', () => {
    displayValue = 0;
    tempValueDisp = '';
    tempValueCount = 0;
    inputValue = '';
    operator = '';
    display.textContent = displayValue;
    value.textContent = tempValueDisp;
});


// var string = document.getElementById('add').dataset.input.toString()
    // console.log(functions[string](5, Number(this.dataset.input)));