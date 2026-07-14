let number = {
    leftSide: null,
    rightSide: null
}

number.leftSide = 5
number.rightSide = 5

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


const wrapper = document.querySelector('.main-wrapper')

wrapper.addEventListener('click', e =>{
    const target = e.target

    const operatorButton = target.closest('[data-operator]')

    if (operatorButton){
        const type = target.dataset.operator
        result = operate(type)
        console.log(result)


    }
})

