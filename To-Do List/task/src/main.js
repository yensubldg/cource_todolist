const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const ulList = $("#task-list");
let id = 0;
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

$("#add-task-button").onclick = function () {
    if ($("#input-task").value != "") {
        taskList.push({
            number : id++,
            status: false,
            taskname: $("#input-task").value
        })
        localStorage.setItem("tasks", JSON.stringify(taskList));
        add(taskList);
    }

}

function add(list = null){
    let strList = "";
    for (const i in list) {
        let checked = list[i].status? "checked" : "";
        strList += `
    <li data-id="${list[i].number}">
        <input type="checkbox" ${checked}>
        <span class="task">${list[i].taskname}</span>
        <button class="delete-btn" onclick="del(this)">X</button>
    </li>
    `
    }
    ulList.innerHTML = strList;
}

add(taskList);
function del(e){
    taskList = taskList.filter(function (arr,index){
        return arr.number != e.parentNode.getAttribute("data-id")
    })
    e.parentNode.remove();
    localStorage.setItem("tasks", JSON.stringify(taskList));
}
