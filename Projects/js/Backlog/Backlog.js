
"use strict";

// let taskIndex = localStorage.getItem(TASK_KEY);
// let selectedTask = productBacklog.getTask(taskIndex);

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
  let task = new Task(name, des, status, priority, persons, effort);
  // for (let i = 0; i < tags.length; i++){
  //   task.addTags(tags[i]);
  // }
  updateLSData(TASK_KEY, task)
  productBacklog.addTask(task);
  updateLSData(PRODUCTBACKLOG_KEY, productBacklog)
  displayProductBacklog();
  closeDialog();
}

function deleteTask(index){
    productBacklog.deleteTask(index)
    displayProductBacklog()
}

function displayProductBacklog() {
  let output = "";
  for (let i = 0; i < productBacklog._taskArray.length; i++) {
    let item = `<ul class="mdl-list">
                <li class="PBI mdl-list__item mdl-list__item--three-line">
                    <span class="mdl-list__item-primary-content">
                        <span>${productBacklog._taskArray[i]._title}</span>
                        <span class="mdl-list__item-text-body">${productBacklog._taskArray[i]._description}</span>
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

// Displays the list of vacations when the page loads
displayProductBacklog();
