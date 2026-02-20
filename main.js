let someOtherFunctionsOutputValue = 'two hundred';

// below is a programmed behavior, action, that adds 2 numbers
// one number is received as an input (created somewhere up the code)
// then it creates and assigns value (100) to a pre-configured variable in the valueToBeAdded
// then the action declares a constant variable result of a function of add 100
// and this action adds that 1 pre-configured number to the input number
// and then is stores (puts, assigns) that value into that constant variable
// then the resulting variable is logged in the console.


let inputValue = someOtherFunctionsOutputValue;
let valueToBeAdded = 100;

const resultOfAFunctionAdds100 = inputValue + valueToBeAdded;

// console.log({resultOfAFunctionAdds100})

// now we re-work the behavior (action) from above to use a JS function syntax
const result = 'result from outside the scope of the code'
//result variable ehre is public, global
let Math = {
    pow(a, b) { return a - b },
}

// Function declaration
function add100(inputNumber) {
    const NUMBER_TO_BE_ADDED = 100;
    // console.log('input from the add100:', inputNumber)
    // console.log('type of input number:', typeof inputNumber)

    const result = inputNumber + NUMBER_TO_BE_ADDED;

    // result variable inside the scope of a function is
    // isolated, or private, to that function scope - {}
    // console.log('this log is called from inside the function add100', result)
    // console.log('type of result:', typeof result)

    // console.log('trying to apply numeric operation on result:', Math.pow(result, 3))

}


add100(250);

// pattern for calling a function: some kind of a name followed by
// . and ()   - for example, console.log()
// 

// input from the add100: 999
// main.js:27 type of input number: number
// main.js:32 this log is called from inside the function add100 1099
// main.js:33 type of result: number
// main.js:35 trying to apply numeric operation on result: 1207801
// main.js:47 what is a console: console {debug: ƒ, error: ƒ, info: ƒ, log: ƒ, warn: ƒ, …}

const exampleOfAnObject = {
    field1: 'some field',
    name: "Daniyar",
    lastName: 'hhihihi',
    dateofbirth: 1251231,
    // sayHi() { console.log('hi')},
}

let alert = 'sayhi'

// console.log(alert);

// I want a function that will take 2 inputs (params) - number
// Then I want it to compare if one is greater than another
// and then I want it to return true or false as a result of running the func
let num1 = 101;
let num2 = 202;

function isFirstGreaterThanSecond(numero1, numero2) {
    if (numero1 > numero2) {
        return 'this statement is correct, true'
    } else {
        return 'no, not correct, wrong'
    }
}

let fruits = ['🍏', '🍌', '🍍', '🍎', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍎', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕', '🥕', '🍏', '🍌', '🍍', '🥕', '🍏', '🍌', '🍍', '🥕'];

let sumOfBananas = 0;

for (let n = 0; n < fruits.length; n++) {
    if (fruits[n] == '🍎') {
        console.log(n)
        sumOfBananas++;
    }
}

// console.log(sumOfBananas)







// fruits.forEach(i => console.log(i))



