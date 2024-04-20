// var tasks = [
//     {
//         name: "Quet nha",
//         isFinish: false
//     },
//     {
//         name: "Giat do",
//         isFinish: false
//     },
//     {
//         name: "rua bat",
//         isFinish: true
//     }
// ];

let input_value = document.querySelector(".add-todo input");
let add_todo = document.querySelector(".add-todo button");
let todo_list = document.querySelector(".todoList .items");
let left_box_footer = document.querySelector(".footer .left p")
let right = document.querySelector(".footer button")


var reloadDOM = (tasks) => {
    if(start == 0) {
        var tasksJSON = localStorage.getItem('tasks');
        if(JSON.parse(tasksJSON)) {
            tasks = JSON.parse(tasksJSON);
        }
    }
    let html_todo = "";
    let number_todo_finish = 0;
    let tasks_length = tasks.length
    if(tasks_length == 0) {

    } else {
        tasks.forEach((todo, index) => {
            if(todo.isFinish == true) {
                number_todo_finish++;
            }
            html_todo += 
            `<div class="item">
                <div class="left">
                    <input ${todo.isFinish==true?"checked":""} class="input" type="checkbox">
                    <p class="${todo.isFinish==true?"done":""}">${todo.name}</p>
                </div>

                <div class="right">
                    <i class="done-icon fa-solid fa-check"></i>
                    <i class="edit fa-solid fa-pen"></i>
                    <i class="remove fa-solid fa-xmark"></i>
                </div>
            </div>`
        })
    }
    todo_list.innerHTML = html_todo;
    left_box_footer.innerHTML = `<strong>${number_todo_finish}</strong> of <strong>${tasks_length}</strong> tasks done`
    if(start == 1) {
        var tasksJSON = JSON.stringify(tasks);
        localStorage.setItem('tasks', tasksJSON);
    }
    start = 1;
}

let start = 0;
var tasks = []
reloadDOM();
let checkboxs = document.querySelectorAll(".todoList .items .input")
checkboxs.forEach((checkbox, index)=> {
    checkbox.onclick = ()=> {
        if(checkbox.checked) {
            tasks[index].isFinish = false;
        } else {
            tasks[index].isFinish = true;
        }
        reloadDOM(tasks);
    }
})

right.onclick = () => {
    tasks = tasks.filter((task) => !task.isFinish)
    reloadDOM(tasks)
}

add_todo.onclick = () => {
    if(input_value.value) {
        tasks.push(
            {
                name: input_value.value,
                isFinish: false
            }
        )
    }
    input_value.value = ""
    reloadDOM(tasks)
    // console.log(tasks)
}