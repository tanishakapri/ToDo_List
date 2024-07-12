
    let form = document.getElementById("forml");
    let textIn = document.getElementById("textInput");
    let dateIn = document.getElementById("dateInput");
    let textAr = document.getElementById("textArea");
    let msg = document.getElementById("msg");
    let task = document.getElementById("task");
    let add = document.getElementById("add");

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        formValidation();
    });

    let formValidation = () => {
        
        if (textIn.value.trim() === "") {
            console.log("failure");
            msg.innerHTML = "Task cannot be blank";
        } else {
            console.log("success");
            msg.innerHTML = "";

            acceptData();

            add.setAttribute("data-bs-dismiss", "modal");
            add.click();

            (() => {
                add.setAttribute("data-bs-dismiss", "")
            })();
        }
    };

    let data = JSON.parse(localStorage.getItem("data")) || [];

    let acceptData = () => {
        data.push({
            text: textIn.value,
            date: dateIn.value,
            description: textAr.value,
        });

        localStorage.setItem("data", JSON.stringify(data));

        console.log(data);
        createTask();
    };

    let createTask = () => {
        task.innerHTML = "";
        data.forEach((x, y) => {
            task.innerHTML += `
            <div id="task-${y}">
                <span class="fw-bold">${x.text}</span>
                <span class="small text-secondary">${x.date}</span>
                <p>${x.description}</p>
                <span class="options">
                    <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#forml" class="fas fa-edit"></i>
                    <i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
                </span>
            </div>`;
        });

        resetForm();
    };

   
let deleteTask= (e) =>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id , 1);
    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
};


let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
  
    textIn.value = selectedTask.children[0].innerHTML;
    dateIn.value = selectedTask.children[1].innerHTML;
    textAr.value = selectedTask.children[2].innerHTML;
  
    deleteTask(e);
  };

    let resetForm = () => {
        textIn.value = "";
        dateIn.value = "";
        textAr.value = "";
    };
    createTask();


