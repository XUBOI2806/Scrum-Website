//import { Person, Task, Backlog } from "../shared.js";
//import productBacklog from "../Classes/ProductBacklog.js";

function createTask(){
    // take in user inputs
    let name  = document.getElementById("pbiName").value;
    let persons = new Person("hi", "asfda");
    let task = new Task("Title", name, "Progress", "High", persons, ["hi", "gat"], 10 )
    let newBacklog = productBacklog
    newBacklog.addTask(task)
    backlogStatus(newBacklog._taskArray)
    closeDialog();
};


function backlogStatus(data){
    let output = ""
    for (let i = 0; i<data.length; i++){
        let item =
            `<ul class="mdl-list">
                <li class="PBI mdl-list__item mdl-list__item--three-line">
                    <span class="mdl-list__item-primary-content">
                        <span>Product Backlog Item ${i} </span>
                        <span class="mdl-list__item-text-body">${data[i]._description}</span>
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <!-- Colored icon button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
                            <i class="material-icons">edit</i>
                        </button>
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <!-- Colored icon button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
                            <i class="material-icons">delete</i>
                        </button>
                    </span>
                </li>
            </ul>`
        output += item
    }
    document.getElementById("content").innerHTML = output;
}