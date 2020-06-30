'use strict'
 
todos = getSavedTodos()

renderTodos(todos, filters)

// someone changed the search text
document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})


document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault()
    if (e.target.elements.newTodo.value.trim().length) {
        addTodo(e.target.elements.newTodo.value, todos)
        e.target.elements.newTodo.value = ''
        renderTodos(todos, filters)
    }   
})

document.querySelector('#show-completed').addEventListener('change', (e) => {
    filters.showCompleted = e.target.checked
    renderTodos(todos, filters)
})
