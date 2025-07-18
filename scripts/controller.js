// // glue b/w view and models
// import todoOperations from "./service.js";
// import { validateName } from "./validation.js";
// import { init } from "./util.js";
// window.addEventListener('load',initialize);
// let autoId;
// function initialize(){
//     bindEvents();
//      autoId = init();
//     showId(); 
// }

// function bindEvents() {
//     document.getElementById('add').addEventListener('click', addTask);
//     document.getElementById('delete').addEventListener('click' , deleteForEver);  
//     document.querySelector('#clearAll').addEventListener('click', clearAllFields);  
//     // document.querySelector('.fa-pen').addEventListener('click', editTask);
// }


// function deleteForEver(){
//     const tbody = document.querySelector('#task-list');
//     tbody.innerHTML = '';
//     todoOperations.removeTask();
//     printAllTasks();
//     setDltClass();
// }

// function setDltClass(){
//     if(todoOperations.markCount() > 0){
//         document.querySelector('#delete').classList.remove('dlt-IsEnable');
//     }
//     else{
//         document.querySelector('#add').classList.add('dlt-IsEnable');
//     }
// }

// function clearAllFields(){
//     const FIELDS = ['name', 'desc', 'date', 'time', 'photo'];
//     for (let field of FIELDS){
//         document.getElementById(field).value = '';
//     }
// }

// function showId() {
//     document.getElementById('id').innerText = autoId();
// }

// function addTask(){
//     var task = readFields();
//     if(verifyFields(task)){
//         todoOperations.addTask(task);
//     };
//     printTask(task);
//     computeTotal();
//     showId();
// }

// function printAllTasks(){
//     todoOperations.tasks.forEach(printTask);
//     computeTotal();
// }

// function printTask(task){
//     const tbody = document.querySelector('#task-list');
//     const tr = tbody.insertRow();
//     let index = 0;
//     for(let key in task){
//         if(key === 'isMarked'){
//             continue;
//         }
//         tr.insertCell(index).innerText = task[key];
//         index++;
//     }
//     const td = tr.insertCell(index);
//     td.appendChild(createIcon(task.id, toggleMarking , 'fa-trash'));
//     td.appendChild(createIcon(task.id, editTask , 'fa-pen'));
// }

// function readFields() {
//     const FIELDS = ['id', 'name', 'desc', 'date', 'time', 'photo'];
//     var task = {};
//     for (let field of FIELDS){
//         if (field === 'id') {
//             task[field] = document.getElementById(field).innerText;
//         } else {
//             task[field] = document.getElementById(field).value;
//         }
//     }
//     console.log("task is",task);    
//     return task;
// }

// const editTask = (id) => {
//     alert('edit task');
//     const taskObj = todoOperations.tasks.find(task => task.id === id);
//     setFieldsToUpdate(taskObj);
// }

// function setFieldsToUpdate(task){
//     alert('setFieldsToUpdate');
//     // const FIELDS = ['id', 'name', 'desc', 'date', 'time', 'photo'];
//     // for (let field of FIELDS){        
//     //     if (field === 'id') {    
//     //         document.getElementById(field).innerText = task.field;
//     //     } else {
//     //         alert('Fields are set to update');
//             document.getElementById(field).value = task[field];
//     //     }
//     // }
    
// }

// function computeTotal(){
//     document.querySelector('#total').innerText = todoOperations.getTotal();
//     document.querySelector('#marked').innerText = todoOperations.markCount();
//     document.querySelector('#unmarked').innerText = todoOperations.unmarkCount();
// }

// function toggleMarking(){
//     const currentButton = this;
//     const id  = currentButton.getAttribute('task-id')
//     console.log('toggleMarking' , id);
//     todoOperations.toggleTask(id);
//     computeTotal();
//     setDltClass();
//     console.log(todoOperations.tasks);
//     currentButton.parentNode.parentNode.classList.toggle('red');
// }

// function createIcon(id , fn , className='fa-trash'){
//     const iTag = document.createElement('i');
//     iTag.addEventListener('click', fn);
//     iTag.className = `fa-solid ${className} hand`;
//     iTag.setAttribute('task-id', id);
//     return iTag;
// }

// function verifyFields(task) {
//     var errorMessage = "";
//     errorMessage = validateName(task.name);
//     if (errorMessage) {
//         document.getElementById('name-error').innerText = errorMessage;
//         return false;
//     }
//     return true;
// }


import todoOperations from "./service.js";
import { validateName } from "./validation.js";
import { init } from "./util.js";

window.addEventListener('load', initialize);
let autoId;

// function initialize() {
//     bindEvents();
//     autoId = init();
//     showId(); 
// }
function initialize() {
    bindEvents();
    todoOperations.loadFromStorage();         
    autoId = init(todoOperations.tasks.length);  
    refreshTable();                           
    showId(); 
    document.getElementById('update').disabled = true;
}


function bindEvents() {
    document.getElementById('add').addEventListener('click', addTask);
    document.getElementById('delete').addEventListener('click', deleteForEver);
    document.getElementById('clearAll').addEventListener('click', clearAllFields);
    document.getElementById('update').addEventListener('click', updateTask);
    document.getElementById('search').addEventListener('click', searchTask);
    document.getElementById('sortName').addEventListener('click', toggleSortName);
    document.getElementById('sortDate').addEventListener('click', toggleSortDate);
    document.getElementById('save').addEventListener('click', () => {
    todoOperations.saveToStorage();
    alert("Tasks saved to localStorage!");
});

}

function readFields() {
    const FIELDS = ['id', 'name', 'desc', 'date', 'time', 'photo'];
    const task = {};
    for (let field of FIELDS) {
        task[field] = field === 'id'
            ? document.getElementById(field).innerText
            : document.getElementById(field).value;
    }
    return task;
}

function verifyFields(task) {
    const errorMessage = validateName(task.name);
    document.getElementById('name-error').innerText = errorMessage;
    return !errorMessage;
}

function showId() {
    document.getElementById('id').innerText = autoId();
}

function addTask() {
    const task = readFields();
    todoOperations.saveToStorage(); 

    if (verifyFields(task)) {
        todoOperations.addTask(task);
        printTask(task);
        computeTotal();
        showId();
        clearAllFields();
    }
}

function deleteForEver() {
    todoOperations.removeTask();
    todoOperations.saveToStorage();

    refreshTable();
    computeTotal();
    setDltClass();
}

function refreshTable() {
    document.querySelector('#task-list').innerHTML = '';
    printAllTasks();
}

function computeTotal() {
    document.querySelector('#total').innerText = todoOperations.getTotal();
    document.querySelector('#marked').innerText = todoOperations.markCount();
    document.querySelector('#unmarked').innerText = todoOperations.unmarkCount();
}

function printAllTasks() {
    todoOperations.tasks.forEach(printTask);
}

function printTask(task) {
    const tbody = document.querySelector('#task-list');
    const tr = tbody.insertRow();
    let index = 0;
    for (let key in task) {
        if (key === 'isMarked') continue;
        // tr.insertCell(index++).innerText = task[key];
        if (key === 'photo') {
    const img = document.createElement('img');
    img.src = task[key];
    img.alt = 'photo';
    img.width = 50;
    img.height = 50;
    tr.insertCell(index++).appendChild(img);
    
} else {
    tr.insertCell(index++).innerText = task[key];
}

    }
    const td = tr.insertCell(index);
    td.appendChild(createIcon(task.id, toggleMarking, 'fa-trash'));
    td.appendChild(createIcon(task.id, editTask, 'fa-pen'));
}

function createIcon(id, fn, className) {
    const i = document.createElement('i');
    i.className = `fa-solid ${className} hand`;
    i.setAttribute('task-id', id);
    i.addEventListener('click', fn);
    return i;
}

function toggleMarking() {
    const id = this.getAttribute('task-id');
    todoOperations.toggleTask(id);
    computeTotal();
    setDltClass();
    this.closest('tr').classList.toggle('red');
}

function setDltClass() {
    const dltBtn = document.querySelector('#delete');
    if (todoOperations.markCount() > 0) {
        dltBtn.classList.remove('dlt-IsEnable');
    } else {
        dltBtn.classList.add('dlt-IsEnable');
    }
}

function clearAllFields() {
    const FIELDS = ['name', 'desc', 'date', 'time', 'photo'];
    for (let field of FIELDS) {
        document.getElementById(field).value = '';
    }
    document.getElementById('name-error').innerText = '';
}

function editTask() {
    const id = this.getAttribute('task-id');
    document.getElementById('add').disabled = true;
    document.getElementById('update').disabled = false;
    const task = todoOperations.tasks.find(task => task.id == id);
    const FIELDS = ['name', 'desc', 'date', 'time', 'photo'];
    for (let field of FIELDS) {
        document.getElementById(field).value = task[field];
    }
    document.getElementById('id').innerText = task.id;
}

function updateTask() {
    const updatedTask = readFields();
    document.getElementById('update').disabled = true;
    document.getElementById('add').disabled = false;
    todoOperations.updateTask(updatedTask);
    todoOperations.saveToStorage(); 

    if (verifyFields(updatedTask)) {
        todoOperations.updateTask(updatedTask);
        refreshTable();
        computeTotal();
        clearAllFields();
        showId();
    }
}

function searchTask() {
    const keyword = document.getElementById('search-box').value;
    const results = todoOperations.searchTask(keyword);
    const tbody = document.querySelector('#task-list');
    tbody.innerHTML = '';
    results.forEach(printTask);
}
let isNameAsc = true;
let isDateAsc = true;

function toggleSortName() {
    todoOperations.sortTask('name', isNameAsc);
    isNameAsc = !isNameAsc;
    refreshTable();
}

function toggleSortDate() {
    todoOperations.sortTask('date', isDateAsc);
    isDateAsc = !isDateAsc;
    refreshTable();
}
