let clacState = {
    leftNum: '',
    rightNum: '',
    currentOperator: null
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

function resetRightNum(){
    clacState.rightNum = ''
}

function state(){
    const side = DOM['allButtons'].dataset.state

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
        const digit = target.dataset.number
        getClickedNumbers(digit)
        console.log(clacState.leftNum, clacState.rightNum)


    }

    const execute = target.closest('[data-execute]')

    if(execute){
        result = operate(clacState.currentOperator)
        clacState.leftNum = result
        resetRightNum()
        console.log(result)
        console.log(clacState.leftNum)
    }
})

