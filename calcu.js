let calculatorState = {
    leftSide: '',
    rightSide: '',
    currentOperator: null
}

let DOM = {
    allButtons: document.querySelector('.calc-buttons'),
    wrapper: document.querySelector('.main-wrapper')
}

let operation = {
    add: function(leftSide, rightSide){
        return +leftSide + +rightSide
        },

    substract: function(leftSide, rightSide){
             return  +leftSide - +rightSide
               },

    divide: function(leftSide, rightSide){
           return +leftSide / +rightSide
           },
    
    multiply: function(leftSide, rightSide){
              return +leftSide * +rightSide
              }
}


function operate(type){
    return operation[type](calculatorState.leftSide, calculatorState.rightSide)
}

function getClickedNumbers(digit){
    const state = DOM['allButtons'].dataset.state
    calculatorState[state] += digit
}

function state(){
    const state = DOM['allButtons'].dataset.state

    if(state == 'leftSide'){

        DOM['allButtons'].dataset.state = 'rightSide'
    }
}

  let type

DOM.wrapper.addEventListener('click', e =>{
    const target = e.target

    const operatorButton = target.closest('[data-operator]')
  

    if (operatorButton){
        state()
       calculatorState.currentOperator = target.dataset.operator
    }

    const clickedNumber = target.closest('[data-number]')

    if (clickedNumber){
        const digit = target.dataset.number
        getClickedNumbers(digit)
        console.log(calculatorState.leftSide, calculatorState.rightSide)


    }

    const execute = target.closest('[data-execute]')

    if(execute){
        result = operate(calculatorState.currentOperator)
        console.log(result)
    }
})

