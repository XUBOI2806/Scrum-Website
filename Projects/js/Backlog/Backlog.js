//import { Person, Task, Backlog } from "../shared.js";
//import productBacklog from "../Classes/ProductBacklog.js";
let backlog = null
function createTask() {
  // take in user inputs
  let name = document.getElementById("pbiName").value;
  let des = document.getElementById("pbiDesc").value;
  let taskType = document.getElementById("pbiType").value;
  let person = document.getElementById("person").value;
  let priority = document.getElementById("priority").value;
  let status = document.getElementById("status").value;
  let effort = document.getElementById("pbiEffort").value;
  let tags = [document.getElementById("pbiTags").value];

  let persons = new Person(person, "asfda");
  let task = new Task(name, des, status, priority, persons, tags, effort);
  productBacklog.addTask(task);
  backlogStatus(productBacklog._taskArray);
  closeDialog();
}



function deleteTask(index){
    productBacklog.deleteTask(index)
    backlogStatus(productBacklog._taskArray)
}

function backlogStatus(data) {
  let output = "";
  for (let i = 0; i < data.length; i++) {
    let item = `<ul class="mdl-list">
                <li class="PBI mdl-list__item mdl-list__item--three-line">
                    <span class="mdl-list__item-primary-content">
                        <span>${data[i]._title}</span>
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
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteTask(${i})">
                            <i class="material-icons">delete</i>
                        </button>
                    </span>
                </li>
            </ul>`;
    output += item;
  }
  document.getElementById("content").innerHTML = output;
}
