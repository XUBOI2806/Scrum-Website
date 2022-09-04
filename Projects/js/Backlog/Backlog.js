
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
  let task = new Task(name, des, status, priority, person, effort);
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

function editTask(index) {
  let name = document.getElementById("editName");
  name.value = productBacklog._taskArray[index]._name;
  let description = document.getElementById("editDescription");
  description.value = productBacklog._taskArray[index]._description;
  let status = document.getElementById("editStatus");
  status.value = productBacklog._taskArray[index]._status;
  let priority = document.getElementById("editPriority");
  priority.value = productBacklog._taskArray[index]._priority;
  let assigned = document.getElementById("editAssigned");
  assigned.value = productBacklog._taskArray[index]._assigned;
  let timeTracking = document.getElementById("editTimeTracking");
  timeTracking.value = productBacklog._taskArray[index]._timeTracking;
  let tags = document.getElementById("editTags");
  tags.value = productBacklog._taskArray[index]._tags;
}

function saveEditTask(index){
  let name = document.getElementById("editName").value;
  let description = document.getElementById("editDescription").value;
  let status = document.getElementById("editStatus").value;
  let priority = document.getElementById("editPriority").value;
  let assigned = document.getElementById("editAssigned").value;
  let tags = document.getElementById("editTags").value;
  let person = document.getElementById("editPerson").value;
  let effort = document.getElementById("editEffort").value;

  let task = new Task(name, description, status, priority, person, effort);
  // Overwrite the old values by replacing it with the new values
  productBacklog._taskArray[index] = task
  updateLSData(PRODUCTBACKLOG_KEY, productBacklog)
  displayProductBacklog();
  closeDialog();
}



// Displays the list of vacations when the page loads
displayProductBacklog();
