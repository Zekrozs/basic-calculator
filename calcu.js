let number = {
    leftSide: '',
    rightSide: ''
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
    return operation[type](number.leftSide, number.rightSide)
}

function getClickedNumbers(digit){
    const state = DOM['allButtons'].dataset.state
    number[state] += digit
}

function state(){
    const state = DOM['allButtons'].dataset.state

    if(state == 'leftSide'){

        DOM['allButtons'].dataset.state = 'rightSide'
    }
}

DOM.wrapper.addEventListener('click', e =>{
    const target = e.target

    const operatorButton = target.closest('[data-operator]')

    if (operatorButton){
        const type = target.dataset.operator
        result = operate(type)
        state()
    }

    const clickedNumber = target.closest('[data-number]')

    if (clickedNumber){
        const digit = target.dataset.number
        getClickedNumbers(digit)
        console.log(number.leftSide, number.rightSide)


    }
})

