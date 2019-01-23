// Fetch data from local storage
const getSavedTodos = function () {
    const alreadyinJSON = localStorage.getItem('todos');
    if (alreadyinJSON != null) {
        return JSON.parse(alreadyinJSON)
    }
    else {
        return [];
    }
}

// Save data to local storage
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// remove a todo with the 'x' button
const removeTodo = function(todoid) {
    const todoIndex = todos.findIndex(function (todo){
        return (todoid == todo.id)
    })
    if (todoIndex > -1)
    {
        todos.splice(todoIndex, 1)
    }
}

const toggleTodo = function (todoid) {
    const todoIndex = todos.findIndex(function(todo){
        return (todoid == todo.id)
    })
    if (todoIndex > -1)
    {
        todos[todoIndex].completed = !(todos[todoIndex].completed)
    }
}

// generate todo DOM
const generateTodoDOM = function (todo) {
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
    checkTodo.addEventListener('change', function(){
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    remButton.addEventListener('click', function(){
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

}

// generate summary DOM
const generateSummaryDOM = function (icft) {
    const summary = document.createElement('h2');
    summary.textContent = `You have ${icft.length} todos left`;
    document.querySelector('#calcedData').appendChild(summary);
}

// render todos
const renderTodos = function (todos, filters) {

    document.querySelector('#todosWrapper').innerHTML = '';

    let filteredTodos = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#calcedData').innerHTML = '';

    const incompletedFilteredTodos = filteredTodos.filter(function (todo) {
        return !todo.completed;

    })

    if (filters.hideCompleted) {
        filteredTodos = incompletedFilteredTodos;
    }

    generateSummaryDOM(incompletedFilteredTodos);


    filteredTodos.forEach(function (todo) {
        generateTodoDOM(todo)
    });


}