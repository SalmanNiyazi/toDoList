const form = document.getElementById("form")
const textInput = document.getElementById("textInput")
const dateInput = document.getElementById("dateInput")
const textArea = document.getElementById("textarea")
const message = document.getElementById("msg")
const tasks = document.getElementById("tasks")
const addTask = document.getElementById("add")
const moreBtn = document.getElementsByClassName("moreBtn")[0]


let taskList = [];

form.addEventListener("submit", function(e){
   
    formValidation();
    e.preventDefault();
})

let formValidation = () => {
    if(textInput.value === ""){
        message.innerHTML = "Input Field Required"
        console.log("error: blank field submission")
    }
    else{
        message.innerHTML = "";
        console.log("successful submission")
        addFormData();
    }
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    clearForm();
}

let addFormData = () => {
    taskList.push({
        title: textInput.value,
        date: dateInput.value,
        description: textArea.value,
    })
    localStorage.setItem("taskList", JSON.stringify(taskList));
    console.log("data added", taskList);
    createNewTask();
}

let createNewTask = () => {
    tasks.innerHTML = "";
    taskList.map((x, y) => {
        const description = x.description.length > 30 ?`${x.description.slice(0,10)}...<span class="moreBtn">more</span>`:x.description;
      return (tasks.innerHTML += `
      <div class="task-container" id=${y}>
            <span class="fw-bold">${x.title}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${description}</p>
    
            <span class="options">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });
    // toggleTextArea();
    clearForm();
}

moreBtn.addEventListener("onClick", function(){

    toggleText();
    })

let toggleText = () => {
    if(moreBtn.innerHTML === "more"){
        moreBtn.innerHTML = "less";
    }
    else{
        moreBtn.innerHTML = "more";
    }
};

let deleteTask = (e) => {
    if(confirm("Do you want to delete this task")){
        e.parentElement.parentElement.remove();
        data.splice(e.parentElement.parentElement.id, 1);
        localStorage.setItem("taskList", JSON.stringify(taskList));
    }
    else{
    console.log("denied");
    }
}

let editTask = () => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
}

let clearForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textArea.value = "";
}

