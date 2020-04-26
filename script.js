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
    e.target.className += ' active';
    inputValue = -1 * inputValue
    displayValue = inputValue;
    display.textContent = displayValue;
}

function backspace() {
    e.target.className += ' active';
    inputValue = inputValue.slice(0,inputValue.length -1)
    displayValue = inputValue;
    display.textContent = displayValue;
}

var commaClick = function () {
    e.target.className += ' active';
    inputValue += '.'
    displayValue = inputValue;
    display.textContent = displayValue;
    comma.removeEventListener('click', commaClick);
}

function numberButtonPress(e) {
    e.target.className += ' active';
    inputValue += this.dataset.input.toString();
    displayValue = inputValue;
    display.textContent = displayValue;
}

//Add, subtract are separated from mult/div
//in order to facilitate correct order of operations with multiple inputs.
function addSubtractPress(e) {
    e.target.className += ' active';
    history.textContent += inputValue + ' ' + e.target.textContent + ' '
    if (ans !== '') {
        inputValue = ans;
        history.textContent = inputValue + ' ' + e.target.textContent + ' ';
    };
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

//Function for multiply divide operations after button press
function multDivPress(e) {
    e.target.className += ' active';
    history.textContent += inputValue + ' ' + e.target.textContent + ' '
    if (ans !== '') {
        inputValue = ans
        history.textContent = inputValue + ' ' + e.target.textContent + ' ';
    };
    if (multDivCount !== 0) {
        multDivCount = functions[multDivOperator](Number(multDivCount), Number(inputValue));
    } else if (multDivCount === 0) {multDivCount = inputValue;}

    multDivOperator = this.dataset.input.toString();
    inputValue = '';
    display.textContent = inputValue;
    comma.addEventListener('click', commaClick);
}

//Displays result, resets most of variables except ans,
//which will be used as input if next press is an operator.
document.getElementById('equals').addEventListener('click', (e) => {
    e.target.className += ' active';
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

//Resets all the variables to the start condition, effectively same as reload.
document.getElementById('clear').addEventListener('click', () => {
    e.target.className += ' active';
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

//Adding keyboard support
window.addEventListener("keydown", function(e) {
    // Makes Enter work
    if (e.keyCode === 13) {
      e.preventDefault();
      document.getElementById("equals").click();
    // Makes shift + minus key multiply input by -1
    } else if (e.keyCode === 173) {
        document.getElementById('plusMinus').click();
    // Makes backspace work
    } else if (e.keyCode === 8) {
        document.getElementById('backspace').click();
    // Makes lowercase c work as clear
    } else if (e.keyCode === 67) {
        document.getElementById('clear').click();
    } else {
        document.querySelectorAll('button').forEach(button => {
            if (e.key === button.textContent) {
                button.click();
            }
        });  
    }
});

//Adding and creating time limits for animations with keypresses.
function removeTransition(e) {
    if (e.propertyName !== 'scale') return;
    for (i = 0; i < 7; i++) {
        var className = Array.from(this.className);
        className.pop();
        e.target.className = className.join('');
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('transitionend', removeTransition));
  