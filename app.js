'use strict'


const form =      document.getElementById("form")
const textInput = document.getElementById("textInput")
const dateInput = document.getElementById("dateInput")
const textArea =  document.getElementById("textarea")
const message =   document.getElementById("msg")
const tasks =     document.getElementById("tasks")
const addTask =   document.getElementById("add")



let taskList = JSON.parse(localStorage.getItem("taskList"))||[];

form.addEventListener("submit", function(e){
    
    e.preventDefault(); 
    formValidation();

});


//Form validation
let formValidation = () => {
    
    let today = new Date();
    let enteredDate = new Date(dateInput.value)
    
    let difference = today - enteredDate;

    if((textInput.value === "" || dateInput.value === "" || textArea.value === "") || difference > 0){
        message.innerHTML = "Input Field Required";
        alert("Please fill valid inputs")
    // Do it for all three inputs
        console.error("error: blank field submission")
    }
    else{
        
        message.innerHTML = "";
        console.log("successful submission")
        addFormData();
        
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
    }
    

    (() => {
        add.setAttribute("data-bs-dismiss", "");
      })();

    clearForm();
}

//Add new data to local Storage

let addFormData = () => {
    taskList.push({
        title: textInput.value,
        date: dateInput.value,
        description: textArea.value,
    })
    localStorage.setItem("taskList", JSON.stringify(taskList));
    createNewTask();
}

//Create a new task

function createNewTask () {

    tasks.innerHTML = "";

    taskList.length > 0 && taskList.map((x, y) => {
       
    const description = x.description.length > 40 ?`${x.description.slice(0,40)}...<span id="moreText">more</span>`: x.description;
   
    return  tasks.innerHTML +=   `
    <div class="task-container" id=${y}>
    <span class="fw-bold">${x.title}</span>
    <span class="small text-secondary">${x.date}</span>
    <p class="descText">${description}
    <span class="show-more"></span>
    </p>
   
    <span class="options">
      <i onClick= "editTask(this)"  id=${y} data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
      <i onClick ="deleteTask(${y}); createNewTask()" id=${y} class="fas fa-trash-alt"></i>
    </span>
    </div>
`

    });
    clearForm();

};


createNewTask();


//Delete a task
let deleteTask = (y) => {
   new swal({
        title: 'Are you sure?',
        text: "Do you want to delete this task!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            taskList.splice(taskList[y], 1);
            localStorage.setItem("taskList", JSON.stringify(taskList));
            createNewTask(taskList)
            new swal(
             'Deleted!',
            'Your file has been deleted.',
            'success'
            )
        } else return;
    });
}

function editTask(e) {
   
    textInput.value = taskList[e.id].title;
    dateInput.value = taskList[e.id].date; 
    textArea.value = taskList[e.id].description
    
    taskList.splice(taskList[e],1)

    addTask.addEventListener("onClick", function(e){
 
        taskList[e.id].date = dateInput.value;
        taskList[e.id].description = textArea.value
       // console.log(taskList[e.id])
        localStorage.setItem("taskList", JSON.stringify(taskList));

        // console.log(taskList[e.id])
    })

  //console.log(taskList[e.id])
}


function clearForm () {
    textInput.value = "";
    dateInput.value = "";
    textArea.value = "";
}


const moreText = document.getElementById("moreText")
moreText.addEventListener("click", e => {
    const current = e.target;

    const isReadMore = current.className.includes("moreText")

    if(!isReadMore) return;

   const currentText = e.target.parentNode.querySelector("show-more")

    currentText.classList.toggle('read-more')

    current.textContent = current.textContent.includes('read more')? "read less": "read more";
})


/*
use an id for every card 
use that id and do this in css:
#id{
    display:none;
}
Then change the btn.style.type to inline by using none as a condition
*/


//overflow
// desciption >30 : overflow hidden
//button more
//button description.style.overflow =
// no button
