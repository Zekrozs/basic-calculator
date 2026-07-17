let clacState = {
    leftNum: '',
    rightNum: '',
    currentOperator: null,
    result: null
}

let DOM = {
    allButtons: document.querySelector('.calc-buttons'),
    wrapper: document.querySelector('.main-wrapper')
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

function restState(){
    clacState.leftNum = ''
    clacState.rightNum = ''
    clacState.result = null
    clacState.currentOperator = null
}

function state(){
    const side = DOM['allButtons'].dataset.state

    if(clacState.leftNum === '') return

    if(side == 'leftNum'){

        DOM['allButtons'].dataset.state = 'rightNum'
    }
    
}

DOM.wrapper.addEventListener('click', e =>{
    const target = e.target

    const operatorButton = target.closest('[data-operator]')
  

    if (operatorButton){
        state()
       clacState.currentOperator = target.dataset.operator
    }

    const clickedNumber = target.closest('[data-number]')

    if (clickedNumber){
        // in case no operator is inputted: clear state if a number is clicked after the last operation
        if(clacState.result && clacState.currentOperator === null){
            restState()
        }
        const digit = target.dataset.number
        getClickedNumbers(digit)
        console.log(clacState.leftNum, clacState.rightNum)


    }

    // stop execution if any side is missing
    if(clacState.leftNum === '' || clacState.rightNum === '' || clacState.currentOperator === null) return

    const execute = target.closest('[data-execute]')

    if(execute){
        DOM['allButtons'].dataset.state = 'leftNum'
        clacState.result = operate(clacState.currentOperator)
        clacState.leftNum = clacState.result
        setStateForNextOperation()
        console.log(clacState.result)
        console.log(clacState.leftNum)
    }
})

