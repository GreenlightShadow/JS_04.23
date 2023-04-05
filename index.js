//===========================================Homework 1===========================================
//=============================================Task 1=============================================
let inputNumber = Number(prompt('Enter the number'))

while ((inputNumber ^ 0) !== inputNumber || inputNumber < 1) {
    console.log('Incorrect input!')
    inputNumber = Number(prompt('Enter the number'))
}

let result = {
    Number: inputNumber,
    Factorial: getFactorial(inputNumber),
    Square: inputNumber ** 2,
    isPrime: getPrime(inputNumber),
    isEven: inputNumber % 2 === 0,
    Delimiters: getDelimiters(inputNumber)
}

console.table(result)


function getFactorial(num) {
    return num ? num * getFactorial(num - 1) : 1;
}

function getPrime(num) {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if(num % i === 0) {
            return false
        }
    }
    return num > 1;
}

function getDelimiters(num) {
    let result = String(num)
    while (num > 1) {
        num = Math.round(num / 2)
        result += `, ${num}`
    }

    return result
}

//=============================================Task 2===========================================

let inputString = prompt('Enter the string')
let trimmedString = inputString.trim()
let isSolidString = trimmedString.split(' ').length === 1

while (!isSolidString || trimmedString.length < 1 || trimmedString.length > 3) {
    console.log('Incorrect input!')
    inputString = prompt('Enter the string')
    trimmedString = inputString.trim()
    isSolidString = trimmedString.split(' ').length === 1
}

let inputNumber = Number(prompt('Enter the number'))

while ((inputNumber ^ 0) !== inputNumber || inputNumber <= 0 || inputNumber > 10) {
    console.log('Incorrect input!')
    inputNumber = Number(prompt('Enter the number'))
}

let row = ''

for (let i = 0; i < inputNumber; i++) {
    for (let j = 0; j < inputNumber; j++) {
        row += `${trimmedString} `
    }
    row += '\n'
}

console.log(row)