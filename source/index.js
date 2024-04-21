let input_value = document.querySelector(".add-todo input");
let add_todo = document.querySelector(".add-todo button");
let todo_list = document.querySelector(".todoList .items");
let left_box_footer = document.querySelector(".footer .left p")
let finish_percent = document.querySelector(".footer .left")
let no_task_box = document.querySelector(".todoList h3")
let right = document.querySelector(".footer button")

var tasksContainer = { tasks: [] };


var reloadDOM = (tasks) => {
    if(start == 0) {
        var tasksJSON = localStorage.getItem('tasks');
        if(tasksJSON) {
            tasksContainer.tasks = JSON.parse(tasksJSON); 
        }
    }
    let html_todo = "";
    let number_todo_finish = 0;
    let tasks_length = tasksContainer.tasks.length
    if(tasks_length == 0) {
        no_task_box.style.display = "block";
    } else {
        no_task_box.style.display = "none";
        tasksContainer.tasks.forEach((todo, index) => {
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
    left_box_footer.innerHTML = `<strong>${number_todo_finish}</strong> of <strong>${tasks_length}</strong> tasks done`;
    let color_percent = (number_todo_finish/tasks_length)*100
    if(!color_percent) {
        finish_percent.style.background = `white`
    } else{
        finish_percent.style.background = `linear-gradient(to right, #FFF455 ${color_percent}%, #ffffff ${color_percent}%)`
    }
    if(start == 1) {
        var tasksJSON = JSON.stringify(tasksContainer.tasks);
        localStorage.setItem('tasks', tasksJSON);
    }
    start = 1;

    let checkboxs = document.querySelectorAll(".todoList .items .input")
    checkboxs.forEach((checkbox, index)=> {
        checkbox.addEventListener('change', ()=> {
            if(checkbox.checked) {
                tasksContainer.tasks[index].isFinish = true;
            } else {
                tasksContainer.tasks[index].isFinish = false;
            }
            reloadDOM(tasksContainer);
        })
    })

    let remove_todo = document.querySelectorAll(".todoList .items .right .remove");
    remove_todo.forEach((todo, index)=> {
        todo.addEventListener('click', ()=> {
            var Confirm =  confirm(`Are you sure you want to remove "${todo.name}" from the list?`)
            if(Confirm) {
                tasksContainer.tasks.splice(index, 1);
                reloadDOM(tasksContainer);
            }
        })
    })

}

let start = 0;
reloadDOM(tasksContainer);

right.onclick = () => {
    tasksContainer.tasks = tasksContainer.tasks.filter((task) => !task.isFinish)
    reloadDOM(tasksContainer)
}

add_todo.onclick = () => {
    if(input_value.value) {
        tasksContainer.tasks.push(
            {
                name: input_value.value,
                isFinish: false
            }
        )
    }
    input_value.value = ""
    reloadDOM(tasksContainer)
    // console.log(tasks)
}