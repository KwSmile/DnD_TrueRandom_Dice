import { create, deleteLastChild } from "./utils.js"

init()
function init() {
    const container = create('div', null, null, null, true)
    main(container)

}

function main(container) {

    const dice = [4, 6, 8, 10, 12, 20]
    const dice2 = [20]
    const diceX = [4, 6, 8, 10, 12]

    let diceBox = []
    for (let i = 0; i < 4; i++) {
        diceBox.push(create('div', container, 'diceBox', null))
    }

    makeDice(dice, diceBox[0])

    doubleDice(dice2, diceBox[1])

    customDice(diceBox[2])

    multiDice(diceX, diceBox[3])
}

function fetchNum(value, resContainer, count = 1, all = false, delay = 1) {
    fetch(`https://www.random.org/integers/?num=${count}&min=1&max=${value}&col=1&base=10&format=plain&rnd=new`
    ).then(res => res.text()
    ).then(function (data) {

        let num = formatData(data, count, all)
        printResult(resContainer, num, delay)
    })
}

function printResult(resContainer, num, delay) {
    let span = create('span', resContainer, 'res', null, true)
    span.textContent = ` ${num}`
    setTimeout(function () {
        setTimeout(function () {
            span.remove()
        }, 27000 * delay)
        span.style.color = '#c7a999'
    }, 13000 * delay)
}

function formatData(data, count, all) {
    if (!all) {
        if (count == 1) {
            return parseInt(data)
        }
        else {
            let arr = []
            arr = data.split('\n', count)
            let num = 0
            arr.forEach(function (item) {
                num += parseInt(item)
            })
            return num
        }
    }
    else {
        return `[${data.split('\n', count).join(', ')}]`
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

function doubleDice(dice, diceBox) {
    dice.forEach(function (die) {
        let dieContainer = create('div', diceBox, 'dieContainer')
        let newDie = create('button', dieContainer, 'die')
        newDie.textContent = `2d${die}`
        newDie.value = die

        let resContainer = create('span', dieContainer)

        newDie.addEventListener('click', function () {
            fetchNum(newDie.value, resContainer, 2, true)
            deleteLastChild(resContainer, 7)
        })
    })
}

function customDice(diceBox) {
    let dieContainer = create('div', diceBox, 'dieContainer')
    let input = create('input', dieContainer, 'die')
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
    const minus = create('button', counter, 'die count')
    const count = create('span', counter, 'res')
    const plus = create('button', counter, 'die count')

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


