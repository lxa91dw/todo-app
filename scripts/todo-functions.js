'use strict'
 
// our filters set
const filters = {
    searchText: '',
    showCompleted: false
}

// if no todos exist in local storage, use this list...
let initTodos = [{
    id: uuidv4(),
    text: 'Finish Chapter 7 of JavaScript course',
    completed: false
},
{
    id: uuidv4(),
    text: 'Go see Brian about the Trailer for sale',
    completed: false
},
{
    id: uuidv4(),
    text: 'Call roofers about leak in roof',
    completed: false
},
{
    id: uuidv4(),
    text: 'REACT website for pizza place, scheduler for marina/hair salon',
    completed: false
},
{
    id: uuidv4(),
    text: 'Visualize my goals as affirmations',
    completed: false
},
{
    id: uuidv4(),
    text: 'Paint the Wine Rack black',
    completed: true
},
{
    id: uuidv4(),
    text: 'Clean up phone photos on my phone',
    completed: false
}
]

// check for existing saved data, 
//  if none, use default above
const getSavedTodos = () => {

    const todosJSON = localStorage.getItem('todos')

    try {
        if (todosJSON != null) {
            todos = JSON.parse(todosJSON)
        } else {
            todos = initTodos
            saveTodos(todos)
        }
        return todos
    
    } catch (e) {
        return []
    }
}

const addTodo = (todo, todos) => {
    todos.push({id: uuidv4(), text: todo, completed: false})
    localStorage.setItem('todos', JSON.stringify(todos))
}

const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}


// Render the details of the page with list of todos filtered by our filter set above
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter( (todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = filters.showCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })
    
    document.querySelector("#todos").innerHTML = ''
    document.querySelector("#summary").innerHTML = ''

    document.querySelector('#summary').appendChild(generateSummaryDOM(filteredTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            document.querySelector("#todos").appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No To-Dos to show'
        document.querySelector("#todos").appendChild(messageEl)
    }
}

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const textEl = document.createElement('span')
    textEl.id = todo.id
    textEl.textContent = todo.text
    if (todo.completed) textEl.style.textDecoration = 'line-through'

    const todoChk = document.createElement('input')
    todoChk.setAttribute('type', 'checkbox')
    todoChk.checked = todo.completed
    todoChk.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    const todoBtn = document.createElement('button')
    todoBtn.textContent = 'remove'
    todoBtn.classList.add('button', 'button--text')

    todoBtn.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })


    containerEl.appendChild(todoChk)
    containerEl.appendChild(textEl)
    todoEl.appendChild(todoBtn)

    return todoEl
}

const generateSummaryDOM = (todos) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    summary.textContent = `You have ${todos.length} ${todos.length == 1 ? 'todo' : 'todos' } shown:`
    return summary
}

// Remove a note from the Notes list
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// complete or uncomplete a note from the Notes list
const toggleTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id )

    if (todoIndex > -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed
    }
}
