import { create, deleteLastChild } from "./utils.js"

init()
function init() {
    const container = create('div', null, null, null, true)
    main(container)

}

function main(container) {

    const dice = [4, 6, 8, 10, 12, 20]
    const diceX = [4, 6, 8, 10, 12]
    const diceBox = create('div', container, 'diceBox', null, true)

    makeDice(dice, diceBox)

    customDice(diceBox)

    multiDice(diceX, diceBox)
}

function fetchNum(value, resContainer, count = 1) {
    fetch(`https://www.random.org/integers/?num=${count}&min=1&max=${value}&col=1&base=10&format=plain&rnd=new`
    ).then(res => res.text()
    ).then(function (data) {

        let num = formatData(data, count)
        printResult(resContainer, num)
    })
}

function printResult(resContainer, num) {
    let span = create('span', resContainer, 'res', null, true)
    span.textContent = ` ${num}`
    setTimeout(function () {
        setTimeout(function () {
            span.remove()
        }, 27000)
        span.style.color = 'lightgray'
    }, 13000)
}

function formatData(data, count) {
    if (count == 1) {
        return parseInt(data)
    } else {
        let arr = []
        arr = data.split('\n', count)
        console.log(arr);
        let num = 0
        arr.forEach(function (item) {
            num += parseInt(item)
        })
        return num
    }
}

function makeDice(dice, diceBox) {
    dice.forEach(function (die) {
        let dieContainer = create('div', diceBox, 'dieContainer')
        let newDie = create('button', dieContainer, 'die')
        newDie.textContent = `d${die}`
        newDie.value = die

        let resContainer = create('span', dieContainer)

        newDie.addEventListener('click', function () {
            fetchNum(newDie.value, resContainer)
            deleteLastChild(resContainer, 13)
        })
    })
}

function doubleDice() {
    
}

function customDice(diceBox) {
    let dieContainer = create('div', diceBox, 'dieContainer')
    let input = create('input', dieContainer)
    input.type = 'number'
    input.min = 2
    input.max = 1000
    input.value = 13

    let die = create('button', dieContainer, 'die')
    die.textContent = `d${input.value}`
    die.value = input.value

    input.addEventListener('change', function () {
        if (input.value < 2) {
            input.value = 2
        }
        else if (input.value > 1000) {
            input.value = 1000
        }

        die.textContent = `d${input.value}`
        die.value = input.value
    })

    let resContainer = create('span', dieContainer)

    die.addEventListener('click', function () {
        fetchNum(die.value, resContainer)
        deleteLastChild(resContainer, 13)
    })
}

function multiDice(dice, diceBox) {
    const counter = create('div', diceBox)
    const minus = create('button', counter)
    const count = create('span', counter)
    const plus = create('button', counter)

    plus.textContent = '+'
    minus.textContent = '-'
    count.textContent = 2
    count.style = `padding: 10px`

    minus.addEventListener('click', () => {
        let num = count.textContent
        if (num > 1) {
            num--
        }
        count.textContent = num
    })
    plus.addEventListener('click', () => {
        let num = count.textContent
        if (num < 99) {
            num++
        }
        count.textContent = num
    })

    dice.forEach(function (die) {
        let dieContainer = create('div', diceBox, 'dieContainer')
        let newDie = create('button', dieContainer, 'die')
        newDie.textContent = `d${die}`
        newDie.value = die

        let resContainer = create('span', dieContainer)

        newDie.addEventListener('click', function () {
            fetchNum(newDie.value, resContainer, count.textContent)
            deleteLastChild(resContainer, 13)
        })
    })
}


