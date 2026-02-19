// // Number and String.

// let variableThatStoresANumber = 152;

// console.log('var for number',variableThatStoresANumber)

// let varThatStoresAString = "text with spaces, or Numbers 123, or antyhing172381238218321@$#$!";

// console.log('var for string:', varThatStoresAString)


// let varForBoolean = false;

// console.log('var for Boolean', varForBoolean)


// let varForArray = [];
// // {}, Set, Map

// console.log('var for array', varForArray)

// varForArray = [false,2,true,4,5];

// console.log('var for array after change 1', varForArray)


// varForArray.push('ten');

// console.log('var for array after change 2', varForArray)


let number1 = [100.5, 1, 1523];

let number2 = -0.000001;

let result;

result = Math.floor(number1);

let result2 = Math.ceil(number2)

let positive0 = 0;
let negative0 = -0;

let resultOfComparison = positive0 == negative0;



let posNum = 6.5;
let negNum = -6.5;

let resultRoundPosUp = Math.ceil(posNum);
let resultRoundPosDown = Math.floor(posNum);
let resultRoundNegUp = Math.ceil(negNum);
let resultRoundNegDown = Math.floor(negNum);

// console.log({resultRoundPosUp}, 
//             {resultRoundPosDown},
//             {resultRoundNegUp}, 
//             {resultRoundNegDown}
// )

let comparisonResult = posNum !== negNum;

// console.log({comparisonResult})

let anotherBooleanVar = true;

// console.log(!!anotherBooleanVar)
//          not not not not not not true


let resultFromBE = 'string from BE';

let isShowing = resultFromBE;

// console.log(isShowing);




let newStringVar = 'forty two ';

// console.log(newStringVar);

// concatenation, concat

let anotherStringVar = 25;

console.log((newStringVar + anotherStringVar))

let lenghtOfAString = newStringVar.length;
console.log({lenghtOfAString})

// the problem with fluid typing (or lack of strong typing in JS)
// you can put anything to outputValue variable, and JS will not shown an error
// there is a solution to weak types in JS - TypeScript, TS
let someOtherFunctionsOutputValue = 'two hundred';

let inputValue = someOtherFunctionsOutputValue;
let valueToBeAdded = 100;

const resultOfAFunctionAdds100 = inputValue - valueToBeAdded;

console.log({resultOfAFunctionAdds100})
