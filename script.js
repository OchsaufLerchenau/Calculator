var displayValue = 0;
var tempValueDisp = '';
var tempValueCount = 0;
var multiInputValue = 0;
var multDivCount = 0;
var inputValue = '';
var operator = '';
var ans = '';
var multDivOperator = '';

var functions = {
    add: function(a, b) {return a+b},
    subtract: function(a, b) {return a-b},
    multiply: function(a, b) {return a*b},
    divide: function(a, b) {return a/b}
}

function reverse() {
    inputValue = -1 * inputValue
    displayValue = inputValue;
    display.textContent = displayValue;
}

function backspace() {
    inputValue = inputValue.slice(0,inputValue.length -1)
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
    history.textContent += inputValue + ' ' + e.target.textContent + ' '
    if (ans !== '') {inputValue = ans}
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
    inputValue = '';
    display.textContent = inputValue;
    operator = this.dataset.input.toString();
    comma.addEventListener('click', commaClick);
}

function multDivPress(e) {
    history.textContent += inputValue + ' ' + e.target.textContent + ' '
    if (multDivCount !== 0) {
        multDivCount = functions[multDivOperator](Number(multDivCount), Number(inputValue));
    } else if (multDivCount === 0) {multDivCount = inputValue;}

    multDivOperator = this.dataset.input.toString();
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
    display.textContent = tempValueCount;
    ans = tempValueCount
    displayValue = 0;
    tempValueDisp = '';
    tempValueCount = 0;
    multDivCount = 0;
    inputValue = '';
    operator = '';
    multDivOperator = '';
    history.textContent = ''
    comma.addEventListener('click', commaClick);
});

document.getElementById('clear').addEventListener('click', () => {
    ans = '';
    displayValue = 0;
    tempValueDisp = '';
    tempValueCount = 0;
    multDivCount = 0;
    inputValue = '';
    operator = '';
    multDivOperator = '';
    history.textContent = ''
    display.textContent = displayValue;
    comma.addEventListener('click', commaClick);
});

const history = document.getElementById('history')
const display = document.getElementById('display');
const value = document.getElementById('value');
display.textContent = displayValue;

const numberButtons = document.querySelectorAll('.numbers');
numberButtons.forEach(button => button.addEventListener('click', numberButtonPress));

const comma = document.querySelector('.comma');
comma.addEventListener('click', commaClick);
    
const addSubtractButtons = document.querySelectorAll('.addsub');
addSubtractButtons.forEach(button => button.addEventListener('click', addSubtractPress));

const multDivButtons = document.querySelectorAll('.multdiv');
multDivButtons.forEach(button => button.addEventListener('click', multDivPress));

window.addEventListener("keydown", function(e) {
    if (e.keyCode === 13 || e.keyCode === 61) {
    
      e.preventDefault();

      document.getElementById("equals").click();
    }
  }); 