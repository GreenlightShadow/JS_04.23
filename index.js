let first = ''
let second = ''
let operator = ''
let isFinished = false
let continueCounting = true
let numberLength = 0
let afterDotLength = 0
const operatorList = ['+', '-', '*', '/']

const screen = document.getElementById('panel')
let prevData = screen.innerText

let buttons = document.getElementsByClassName('btn')

for (let button of buttons) {
    button.addEventListener('click', function () {
        let value = this.textContent
        main(value)
    })
}

window.addEventListener('keyup', function (event) {
    let key

    switch (true) {
        case (Number.isInteger(Number(event.key)) && event.key !== ' ')
        || event.key === '.'
        || event.key === '='
        || operatorList.includes(event.key):
            key = event.key
            break
        case event.key === 'Enter':
            key = '='
            break
        case event.key === 'Backspace':
            key = '<'
            break
        default:
            return;
    }
    
    main(key)
})

function main(value) {
    prevData = screen.innerText
    if (value === 'C') {
        first = ''
        second = ''
        operator = ''
        screen.innerText = '0'
        numberLength = 0
        afterDotLength = 0
        screen.style.fontSize = getScreenFontSize(screen) + 'rem'
        isFinished = false
        continueCounting = true
        return;
    }

    screen.innerText = ''

    //+ - * /
    if (operatorList.includes(value)) {
        //на случай если ввести оператор при первом числе с точкой на конце
        if (first.toString().slice(-1) === '.') {
            first = first.toString().slice(0, -1)
        }
        continueCounting = true

        //после первой операции, при клике на оператор калькулятор считает предыдущую операцию и выводит её результат
        if (operator === '') {
            first = counter(first, '+', 0)
        } else {
            first = counter(first, operator, second)
        }



        //при повторном клике на оператор когда second пустой
        if (first === undefined) {
            first = prevData
        }

        screen.innerText = first
        screen.style.fontSize = getScreenFontSize(screen) + 'rem'
        operator = value
        second = ''
        numberLength = 0
        afterDotLength = 0
        return;
    }


    //1 2 3 4 5 6 7 8 9 0 .
    if (Number.isInteger(Number(value)) || value === '.') {
        if (numberLength + value.length > 8
            && !prevData.includes('.')
            && value !== '.'
            && prevData !== 'Слишком большое число'
        ) {
            screen.innerText = prevData
            screen.style.fontSize = getScreenFontSize(screen) + 'rem'
            return;
        }

        if (prevData.includes('.')) {
            if (afterDotLength + value.length > 8) {
                screen.innerText = prevData
                screen.style.fontSize = getScreenFontSize(screen) + 'rem'
                return;
            }
        }

        //при попытке добавить число к результату полученым через =, статы обнуляются и запускается операция ввода с нуля
        if (!continueCounting) {
            first = ''
            second = ''
            operator = ''
            screen.innerText = '0'
            screen.style.fontSize = getScreenFontSize(screen) + 'rem'
        }

        continueCounting = true

        if (second === '' && operator === '') {
            if (value === '.') {
                if (first.toString().includes('.')) {
                    screen.innerText = prevData
                    screen.style.fontSize = getScreenFontSize(screen) + 'rem'
                    return;
                }

                if (first === '0' || first === '') {
                    first = '0.'
                } else {
                    first = first.toString() + '.'
                }

                screen.innerText = first
                screen.style.fontSize = getScreenFontSize(screen) + 'rem'
                return;
            }

            if (first === -0 || first === '0') {
                first = value
            } else {
                first += value
            }

            if (first === '00') {
                first = '0'
            }

            screen.innerText = first
            screen.style.fontSize = getScreenFontSize(screen) + 'rem'
        } else if (first !== '' && second !== '' && isFinished) {
            if (second === '0.') {
                //на случай когда пытаются после результата с равно вводится .число чтобы получить 0.число
                second += value
            } else {
                second = value
            }

            isFinished = false
            screen.innerText = second
            screen.style.fontSize = getScreenFontSize(screen) + 'rem'
        } else {
            if (value === '.') {
                if (second.toString().includes('.')) {
                    screen.innerText = prevData
                    screen.style.fontSize = getScreenFontSize(screen) + 'rem'
                    return;
                }
                if (second === '0' || second === '') {
                    second = '0.'
                } else {
                    second = second.toString() + '.'
                }

                screen.innerText = second
                screen.style.fontSize = getScreenFontSize(screen) + 'rem'
                return;
            }

            if (second !== '0' && second !== -0) {
                second += value
            } else {
                second = value
            }

            if (second === '00') {
                second = '0'
            }

            isFinished = false
            screen.innerText = second
            screen.style.fontSize = getScreenFontSize(screen) + 'rem'
        }


        numberLength = getDigitsLengthBeforeDot(screen.innerText)
        afterDotLength = getDigitsLengthAfterDot(screen.innerText)

        return;
    }

    //логика преобразование положительных и отрицательных чисел
    if (value === '-/+') {
        if (second === '') {
            first = -first

            if (first.toString() === '') {
                screen.innerText = '0'
            } else {
                screen.innerText = first.toString()
            }
        } else {
            second = -second

            if (second.toString() === '') {
                screen.innerText = '0'
            } else {
                screen.innerText = second.toString()
            }
        }
        screen.style.fontSize = getScreenFontSize(screen) + 'rem'
        return;
    }

    if (value === '<') {

        if (isFinished) {
            first = ''
            second = ''
            operator = ''
            isFinished = false
            screen.innerText = '0'
            numberLength = 0
            afterDotLength = 0
            return;
        }

        if (second === '') {
            first = first.toString()

            if (getDigitsLengthAfterDot(first) === 0) {
                numberLength--
            } else {
                afterDotLength--
            }

            first = first.slice(0, -1)

            if (first === '') {
                screen.innerText = '0'
            } else {
                screen.innerText = first
            }
        } else {
            second = second.toString()

            if (getDigitsLengthAfterDot(second) === 0) {
                numberLength--
            } else {
                afterDotLength--
            }

            second = second.slice(0, -1)

            if (second === '') {
                second = '0'
            }

            screen.innerText = second

        }
        screen.style.fontSize = getScreenFontSize(screen) + 'rem'
        return;
    }

    //логика равно
    if (value === '=') {
        //избегает повторного нажатия равно после получения ответа
        //также избегает случая когда второго числа не существует
        if (!continueCounting || second === '') {
            screen.innerText = prevData
            screen.style.fontSize = getScreenFontSize(screen) + 'rem'
            return;
        }
        first = counter(first, operator, second)
        if (first !== undefined) {
            screen.innerText = first
            screen.style.fontSize = getScreenFontSize(screen) + 'rem'
        }

        //обнулять все данные если пользователь поделил на 0 или получил слишком большое число
        if (first === 'Ошибка' || first === 'Слишком большое число') {
            first = ''
            second = ''
            operator = ''
            isFinished = false
        } else {
            operator = ''
            second = ''
            isFinished = true
        }
        continueCounting = false
    }
}

function counter(first, operator, second) {
    //возвращает undefined в случае если не определён второй числитель
    if(second === '') {
        return;
    }

    let result

    switch (operator) {
        case '+':
            result = (Number(first) + Number(second)).toFixed(8)
            break
        case '-':
            result = (Number(first) - Number(second)).toFixed(8)
            break
        case '*':
            result = (Number(first) * Number(second)).toFixed(8)
            break
        case '/':
            if (second === '0') {
                return 'Ошибка'
            }
            result = (Number(first) / Number(second)).toFixed(8)
            break
        default:
            result = Number(first).toFixed(8)
            break

    }
    
    while (result.toString().charAt(result.length - 1) === '0') {
        result = result.slice(0, -1)
        if (result.toString().charAt(result.length - 1) === '.') {
            result = result.slice(0, -1)
            break
        }
    }

    if (result >= 100000000 || result <= -100000000) {
        return 'Слишком большое число';
    } else {
        return result
    }
}

function getScreenFontSize(screen) {
    switch (true) {
        case screen.innerText.length < 5:
            return 4
        case screen.innerText.length < 7:
            return 3
        case screen.innerText.length < 9:
            return 2.5
        case screen.innerText.length < 12:
            return 2
        case screen.innerText.length < 17:
            return 1.5
        case screen.innerText.length < 27:
            return 1
        default:
            return 0.5
    }
}

function getDigitsLengthAfterDot(number) {
    if (!number.toString().includes('.')) {
        return 0
    }

    return number.toString().split('.')[1].length
}

function getDigitsLengthBeforeDot(number) {
    if (!number.toString().includes('.')) {
        return number.toString().length
    }

    return number.toString().indexOf('.')
}