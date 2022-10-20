
// SELECTORS

let addNewTask = document.querySelector('.main form .new-task');
let taskBar = document.querySelector('.main form .input-bar');
let chooseTask = document.querySelector('.main form .choose-task');
let selectTask = document.querySelector('.main form select');
const inputTodo = document.querySelector('.main form .input-bar .todo-input');
const todoButton = document.querySelector('.main form .input-bar .btn');
const filterTodo = document.querySelector('.main form select')
const todos = document.querySelector('.main .todos');

// EVENTS

todoButton.addEventListener('click', addTodo );
todos.addEventListener('click', checkTodo);
filterTodo.addEventListener('click', selectTodo);
document.addEventListener('DOMContentLoaded', startTodo);

addNewTask.addEventListener('click', ()=> {
    taskBar.classList.toggle('active');
    todos.classList.toggle('active');
})

chooseTask.addEventListener('click', ()=>{
    selectTask.classList.toggle('active');
})

// FUNCTIONS

function addTodo (event) {
    event.preventDefault();
    if (!inputTodo.value.trim()) return;

    const div = document.createElement('div');
    div.classList.add('todo');

    const span1 = document.createElement('span');
    span1.innerText = inputTodo.value;
    div.appendChild(span1);

    const span2 = document.createElement('span');
    span2.innerHTML = '<i class="fas fa-check"></i> ';
    span2.innerHTML += '<i class="fas fa-times"></i>';
    div.appendChild(span2);

    todos.appendChild(div);
    saveInLocalStorage(inputTodo.value)
    inputTodo.value = '';
}

function checkTodo (event) {
    const item = event.target;
    const todo = item.parentElement.parentElement;
    if(item.classList[1] == 'fa-times') {
        todo.classList.add('fall');
        removeFromLocalStorage(todo.children[0].innerText);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }

    if (item.classList[1] == 'fa-check') {
        todo.classList.toggle('completed');
    }
}

function selectTodo (event) {
    const todos = document.querySelectorAll('.todo');
    todos.forEach((todo) => {
        switch (event.target.value) {
            case 'all' : todo.style.display = 'flex'; break;
            case 'completed' : 
                if(todo.classList.contains('completed')) todo.style.display = 'flex';
                else todo.style.display = 'none';
                break;
            case 'uncompleted' :
                if(!todo.classList.contains('completed')) todo.style.display = 'flex';
                else todo.style.display = 'none';
                break;

        }
    })
}

function saveInLocalStorage(text) {
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(text);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeFromLocalStorage (text) {
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const index = todos.indexOf(text);
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function startTodo () {
    let todosArr;
    if (localStorage.getItem('todos') == null) {
        todosArr = [];
    }else{
        todosArr = JSON.parse(localStorage.getItem('todos'));
    }

    todosArr.forEach(function (todo) {
        console.log(todo);
        const div = document.createElement('div');
        div.classList.add('todo');

        const span1 = document.createElement('span');
        span1.innerText = todo;
        div.appendChild(span1);

        const span2 = document.createElement('span');
        span2.innerHTML = '<i class="fas fa-check"></i> ';
        span2.innerHTML += '<i class="fas fa-times"></i>';
        div.appendChild(span2);

        todos.appendChild(div);
    })
}