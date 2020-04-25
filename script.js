var displayValue = 0;
var tempValueDisp = '';
var tempValueCount = 0;
var multiInputValue = 0;
var multDivCount = 0;
var inputValue = '';
var operator = '';
var ans = 0;
var multDivOperator = '';

var functions = {
    add: function(a, b) {return a+b},
    subtract: function(a, b) {return a-b},
    multiply: function(a, b) {return a*b},
    divide: function(a, b) {return a/b}
}

function backspace() {
    inputValue = Array.from(inputValue).pop().toString()
    displayValue = inputValue;
    display.textContent = displayValue;
}

var commaClick = function () {
    inputValue += '.'
    displayValue = inputValue;
    display.textContent = displayValue;
    comma.removeEventListener('click', commaClick);
}

function numberButtonPress(e) {
    inputValue += this.dataset.input.toString();
    displayValue = inputValue;
    display.textContent = displayValue;
}

function addSubtractPress(e) {
    
    if (ans !== 0) {inputValue = ans}
    tempValueDisp = '';
    var r = 0
    if (multDivCount === 0) {
        r = inputValue
    } else {
        r = functions[multDivOperator](Number(multDivCount), Number(inputValue));
        multDivCount = 0;
    }

    if (tempValueCount !== 0) {
        tempValueCount = functions[operator](Number(tempValueCount), Number(r));
    } else if (tempValueCount === 0) {tempValueCount = r}
    console.log(tempValueCount);
    tempValueDisp = this.textContent;
    value.textContent = tempValueDisp;
    inputValue = '';
    display.textContent = inputValue;
    operator = this.dataset.input.toString();
    comma.addEventListener('click', commaClick);
}

function multDivPress(e) {
    
    if (multDivCount !== 0) {
        multDivCount = functions[multDivOperator](Number(multDivCount), Number(inputValue));
    } else if (multDivCount === 0) {multDivCount = inputValue;}

    multDivOperator = this.dataset.input.toString();
    tempValueDisp = this.textContent;
    value.textContent = tempValueDisp;
    inputValue = '';
    display.textContent = inputValue;
    comma.addEventListener('click', commaClick);
}

document.getElementById('equals').addEventListener('click', () => {
    if (multDivCount === 0 && tempValueCount !== 0) {
        tempValueCount = functions[operator](Number(tempValueCount), Number(inputValue));
    } else if (multDivCount !== 0 && tempValueCount === 0) {
        tempValueCount = functions[multDivOperator](Number(multDivCount), Number(inputValue));
    } else if (multDivCount !== 0 && tempValueCount !== 0) {
        tempValueCount = functions[operator](Number(tempValueCount),
            Number(functions[multDivOperator](Number(multDivCount), Number(inputValue))));
    } else {
        tempValueCount = inputValue;
    }
    
    tempValueCount = (Number(tempValueCount).toFixed(8) * 1).toString();
    value.textContent = ''
    display.textContent = tempValueCount;
    ans = tempValueCount
    displayValue = 0;
    tempValueDisp = '';
    tempValueCount = 0;
    multDivCount = 0;
    inputValue = '';
    operator = '';
    multDivOperator = '';
    comma.addEventListener('click', commaClick);
});

document.getElementById('clear').addEventListener('click', () => {
    displayValue = 0;
    tempValueDisp = '';
    tempValueCount = 0;
    multDivCount = 0;
    inputValue = '';
    operator = '';
    multDivOperator = '';
    display.textContent = displayValue;
    value.textContent = tempValueDisp;
    comma.addEventListener('click', commaClick);
});

const display = document.getElementById('display');
const value = document.getElementById('value');
display.textContent = displayValue;
value.textContent = tempValueDisp;

const numberButtons = document.querySelectorAll('.numbers');
numberButtons.forEach(button => button.addEventListener('click', numberButtonPress));

const comma = document.querySelector('.comma');
comma.addEventListener('click', commaClick);
    

const addSubtractButtons = document.querySelectorAll('.addsub');
addSubtractButtons.forEach(button => button.addEventListener('click', addSubtractPress));

const multDivButtons = document.querySelectorAll('.multdiv');
multDivButtons.forEach(button => button.addEventListener('click', multDivPress));



// var string = document.getElementById('add').dataset.input.toString()
    // console.log(functions[string](5, Number(this.dataset.input)));