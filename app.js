var container = document.getElementById("task-container");
var tasks = getTodos();
var todoinput = document.getElementById("task");
var editIndex = null;
var modal = document.getElementById("modal");

function getTodos() {
    var todos = localStorage.getItem("tasks");
    return todos ? JSON.parse(todos) : [];
}
function setTodos() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function openModal() {
    modal.style = "visibility:visible ; opacity:100% ";
    setTimeout(() => {
        todoinput.focus();
    }, 100);
}
function closeModal() {
    modal.style = "opacity:0  ;  visibility:hidden ;"
    todoinput.value = "";
}

modal.addEventListener("keyup", (key) => {
    if (key.keyCode == "27") {
        closeModal();
    }
})


function render() {
    container.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        var element = tasks[i];
        container.innerHTML += `<div class="todo">
        <input type="checkbox" onclick="onCheck(${i})" ${element.check && "checked"}>
        <p class="${element.check ? "done" : "notdone"}">
        ${element.task}
       </p>
       <i class="fa fa-trash" onclick="onDelete(${i})"></i>
       <i class="fa fa-edit" onclick="onEdit(${i})"></i>
       </div>`
    }
}
render()
function addTask() {
    if (todoinput.value) {
        if (editIndex !== null) {
            tasks[editIndex] = ({ task: todoinput.value, check: false });
            editIndex = null;
        }
        else {
            tasks.push({ task: todoinput.value, check: false });
        }
        setTodos();
        closeModal();
        render();
    }else{
        alert("please put todo.")
    }
}
function onDelete(i) {
    tasks.splice(i, 1);
    setTodos();
    render();
}
function onEdit(i) {
    openModal();
    todoinput.value = tasks[i].task;
    editIndex = i;
}
function onCheck(i) {
    var element = tasks[i];
    element.check = !element.check;
    setTodos();
    render();
}