function create(HTMLelement, parent, classes, id, first) {
    let element = document.createElement(HTMLelement)
    if (parent) {
        if (first) parent.prepend(element)
        else parent.append(element)
    }
    else {
        parent = document.body
        if (first) parent.prepend(element)
        else parent.append(element)
    }
    if (classes) {
        element.className = classes
    }
    if (id) {
        element.id = id
    }
    return element
}

init()
function init() {
    const container = create('div', null, null, null, true)

    main(container)

}

function main(container) {

    const dice = [4, 6, 8, 12, 20, 100]
    const diceBox = create('div', container, 'diceBox', null, true)

    makeDice(dice, diceBox)

    customDie(diceBox)
}

function makeDice(dice, diceBox) {
    dice.forEach(function (die) {
        let dieContainer = create('div', diceBox, 'dieContainer')
        let newDie = create('button', dieContainer, 'die')
        newDie.textContent = `d${die}`
        newDie.value = die

        let resContainer = create('span', dieContainer)

        newDie.addEventListener('click', function (event) {
            fetchNum(newDie.value, resContainer)
        })
    })
}

function customDie(diceBox) {
    let dieContainer = create('div', diceBox, 'dieContainer')
    let input = create('input', dieContainer)
    input.type = 'number'
    input.min = 2
    input.value = 13

    let die = create('button', dieContainer, 'die')
    die.textContent = `d${input.value}`
    die.value = input.value

    input.addEventListener('change', function () {
        if (input.value < 2) {
            input.value = 2
        }

        die.textContent = `d${input.value}`
        die.value = input.value
    })

    let resContainer = create('span', dieContainer)

    die.addEventListener('click', function () {
        fetchNum(die.value, resContainer)
    })
}

function fetchNum(value, resContainer) {
    fetch(`https://www.random.org/integers/?num=1&min=1&max=${value}&col=1&base=10&format=plain&rnd=new`
    ).then(res => res.json()
    ).then(data => {
        let span = create('span', resContainer, 'res', null, true)
        span.textContent = ` ${data}`
        setTimeout(function () {
            setTimeout(function () {
                span.remove()
            }, 27000)
            span.style.color = 'lightgray'
        }, 13000)

        deleteLastChild(resContainer)
    })
}

function deleteLastChild(parent) {
    if (parent.childElementCount > 13) {
        parent.lastChild.remove()
    }
}
