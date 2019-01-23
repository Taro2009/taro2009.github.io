let todos = getSavedTodos();

let filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters);



// Event listener a search inputboxra
document.querySelector('#filterInput').addEventListener('input', function (e) {
    filters.searchText = e.target.value;
    renderTodos(todos, filters)
})

document.querySelector('#todoForm').addEventListener('submit', function (e) {
    e.preventDefault();
    todos.push({ 
        id: uuidv4(),
        text: e.target.elements.addTodo.value, 
        completed: false 
    })
    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.addTodo.value = '';
})

document.querySelector('#hideComp').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
})