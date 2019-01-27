'use strict'

// Fetch data from local storage
const getSavedTodos = () => {
    const alreadyinJSON = localStorage.getItem('todos');
    try {
    return alreadyinJSON ? JSON.parse(alreadyinJSON) : []
    }
    catch (e){
        return []
    }
}

// Save data to local storage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// remove a todo with the 'x' button
const removeTodo = (todoid) => {
    const todoIndex = todos.findIndex((todo) => (todoid == todo.id))
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

const toggleTodo = (todoid) => {
    const todoIndex = todos.findIndex((todo) => (todoid == todo.id))
    if (todoIndex > -1) {
        todos[todoIndex].completed = !(todos[todoIndex].completed)
    }
}

// generate todo DOM
const generateTodoDOM = (todo) => {
    // create container
    const todoElement = document.createElement('div');
    // Create the text of the todo
    const todoText = document.createElement('span')
    todoText.textContent = todo.text;
    // crteate the checkbox
    const checkTodo = document.createElement('input')
    checkTodo.setAttribute('type', 'checkbox')
    checkTodo.checked = todo.completed;
    // create the remove button
    const remButton = document.createElement('button')
    remButton.textContent = 'x'

    // setup order: div -> checkbox -> text ->button
    document.querySelector('#todosWrapper').appendChild(todoElement);
    todoElement.appendChild(checkTodo)
    todoElement.appendChild(todoText)
    todoElement.appendChild(remButton)
    checkTodo.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    remButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

}

// generate summary DOM
const generateSummaryDOM =  (icft) => {
    const summary = document.createElement('h2');
    summary.textContent = `You have ${icft.length} todos left`;
    document.querySelector('#calcedData').appendChild(summary);
}

// render todos
const renderTodos =  (todos, filters) => {

    document.querySelector('#todosWrapper').innerHTML = '';

    let filteredTodos = todos.filter( (todo) => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()))

    document.querySelector('#calcedData').innerHTML = '';

    const incompletedFilteredTodos = filteredTodos.filter( (todo) =>  !todo.completed)

    if (filters.hideCompleted) {
        filteredTodos = incompletedFilteredTodos;
    }

    generateSummaryDOM(incompletedFilteredTodos);


    filteredTodos.forEach( (todo) => {
        generateTodoDOM(todo)
    });


}