let clacState = {
    leftNum: '',
    rightNum: '',
    currentOperator: null,
    result: null
}

let DOM = {
    allButtons: document.querySelector('.calc-buttons'),
    wrapper: document.querySelector('.main-wrapper'),
    calcScreen: document.querySelector('input[type="text"]'),
    displayedOperator: ''
}

let operation = {
    add: function(leftNum, rightNum){
        return +leftNum + +rightNum
        },

    substract: function(leftNum, rightNum){
             return  +leftNum - +rightNum
               },

    divide: function(leftNum, rightNum){
           return +leftNum / +rightNum
           },
    
    multiply: function(leftNum, rightNum){
              return +leftNum * +rightNum
              }
}


function operate(type){
    return operation[type](clacState.leftNum, clacState.rightNum)
}

function getClickedNumbers(digit){
    const side = DOM['allButtons'].dataset.state
    clacState[side] += digit
}

function setStateForNextOperation(){
    clacState.rightNum = ''
    clacState.currentOperator = null
}

function resetState(){
    clacState.leftNum = ''
    clacState.rightNum = ''
    clacState.result = null
    clacState.currentOperator = null
}

function resetUi(){
    DOM.calcScreen.value = ''
}

function state(){
    const side = DOM['allButtons'].dataset.state

    if(clacState.leftNum === '') return

    if(side == 'leftNum'){

        DOM['allButtons'].dataset.state = 'rightNum'
    }
    
}



function populateScreen(){
    let symbol = {
        divide: '÷',
        multiply: 'X',
        substract: '-',
        add: '+'
    }

    DOM.calcScreen.value = `${clacState.leftNum}${symbol[clacState.currentOperator] ?? ''}${clacState.rightNum}`
}

function displayResult(){
    DOM.calcScreen.value = clacState.result
}

DOM.wrapper.addEventListener('click', e =>{
    const target = e.target

    const operatorButton = target.closest('[data-operator]')
  

    if (operatorButton){
        if (clacState.leftNum !== '' && clacState.rightNum !== '' && clacState.currentOperator !== null) {
            // Calculate the intermediate result
            clacState.result = operate(clacState.currentOperator);
            
            // Promote the result to be the new leftNum (converted to string so your decimal check still works)
            clacState.leftNum = clacState.result.toString(); 
            
            // Clear the right side to make room for the next number in the chain
            clacState.rightNum = ''; 
        }
        if(clacState.leftNum === '') return
        
        state()
       clacState.currentOperator = target.dataset.operator
       populateScreen()
    }

    const clickedNumber = target.closest('[data-number]')

    if (clickedNumber){
        // clear state when immedietly clicking a number after the last operation
        if(clacState.result !== null && clacState.currentOperator === null){
            resetState()
        }
        const digit = target.dataset.number
        const activeSide = DOM['allButtons'].dataset.state;
        if (digit === '.' && clacState[activeSide].includes('.')) return;
        getClickedNumbers(digit)
        populateScreen()


    }

    const clearButton = target.closest('[data-reset]')
    if(clearButton){
        resetState()
        resetUi()
        
    }

    const execute = target.closest('[data-execute]')

    if(execute){
        // stop execution if any side is missing
        if(clacState.leftNum === '' || clacState.rightNum === '' || clacState.currentOperator === null) return

        DOM['allButtons'].dataset.state = 'leftNum'
        clacState.result = parseFloat(operate(clacState.currentOperator).toFixed(4))
        clacState.leftNum = clacState.result
        setStateForNextOperation()
        displayResult()
    }
})

