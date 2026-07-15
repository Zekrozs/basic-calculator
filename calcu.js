let number = {
    leftSide: [],
    rightSide: []
}

// number.leftSide = 5
// number.rightSide = 5

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
    number['leftSide'].push(digit)
}

const wrapper = document.querySelector('.main-wrapper')

wrapper.addEventListener('click', e =>{
    const target = e.target

    const operatorButton = target.closest('[data-operator]')

    if (operatorButton){
        const type = target.dataset.operator
        result = operate(type)
    }

    const clickedNumber = target.closest('[data-number]')

    if (clickedNumber){
        const digit = target.dataset.number
        getClickedNumbers(digit)
        console.log(number.leftSide)
    }
})

