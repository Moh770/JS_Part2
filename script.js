let firstNumber = 0
let secondNumber = 0
let operator = null
let operatorActive = false
let percentageActive = false

const operators = ['/','*','-','+']
const inputDisplay = document.getElementById('display');
const equalBtn = document.getElementById('=')
const acBtn = document.getElementById('ac')
const decimalBtn = document.getElementById('decimal')

function setDisplay(value){
    inputDisplay.innerHTML = value
}

function operate (num1,num2,operator) {
    switch (operator) {
        case ('+'): {
            return num1 + num2
        }
        case ('-'): {
            return num1 - num2
        }
        case ('*'): {
            return num1 * num2
        }
        case ('/'): {
            return num1 / num2
        }
        default: {
            return 0
        }
    }
}

function typeNumber (value) {
    if (!operatorActive && !percentageActive) {
        if (inputDisplay.innerHTML === '0') {
            setDisplay(value)
        } else {
            setDisplay(inputDisplay.innerHTML + value)
        }
    } else {
        setDisplay(value)
        operatorActive = false
        percentageActive = false
    }
}

function calculate(num1,num2,operand) {
    const result = operate(num1,num2,operand)
    setDisplay(result)
    firstNumber = result
    result.toFixed(4)
    operatorActive = true
    operator = null
}

function typeOperator(op) {
    const displayValue = parseFloat(inputDisplay.innerHTML)
    if (operator && !operatorActive) {
        calculate(firstNumber, displayValue, operator)
    } else {
        firstNumber = displayValue.toFixed(4)
    }
    operator = op
    operatorActive = true
}

equalBtn.addEventListener('click',() => {
    if (!operatorActive && operator !== null) {
        secondNumber = parseFloat(inputDisplay.innerHTML)
        calculate(firstNumber,secondNumber,operator)
    }
})

acBtn.addEventListener('click',() => {
    firstNumber = 0
    secondNumber = null
    operator = null
    operatorActive= false
    setDisplay(0)
})

decimalBtn.addEventListener('click',() => {
    if (operatorActive) {
        setDisplay('0.')
        operatorActive= false
    } else if (inputDisplay.innerHTML.indexOf('.') === -1) {
        setDisplay(inputDisplay.innerHTML + '.')
    }
})

for (let i = 0; i < 10; i++) {
    const element = document.getElementById(`num${i}`)
    element.addEventListener('click', () => typeNumber(i))
}

operators.forEach((operator) => {
    const element = document.getElementById(operator)
    element.addEventListener('click', () => {
        typeOperator(operator)
    })
})