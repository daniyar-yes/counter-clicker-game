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

// Function declaration
function add100(inputNumber) {
    const NUMBER_TO_BE_ADDED = 100;
    console.log('input from the add100:', inputNumber)
    console.log('type of input number:', typeof inputNumber)

    const result = inputNumber + NUMBER_TO_BE_ADDED;
    // result variable inside the scope of a function is
    // isolated, or private, to that function scope - {}
    console.log('this log is called from inside the function add100', result)
    console.log('type of result:', typeof result)

    console.log('trying to apply numeric operation on result:', Math.pow(result, 2))

}


add100(999);


