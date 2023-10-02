export function create(HTMLelement, parent, classes, id, first) {
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

export function deleteLastChild(parent, count) {
    if (parent.childElementCount >= count) {
        parent.lastChild.remove()
    }
}