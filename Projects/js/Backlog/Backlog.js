
"use strict";

// let taskIndex = localStorage.getItem(TASK_KEY);
// let selectedTask = productBacklog.getTask(taskIndex);

/**
 * Create a new task and add it to local storage
 */
function createTask() {
  // take in user inputs
  let name = document.getElementById("pbiName").value;
  let des = document.getElementById("pbiDesc").value;
  let taskType = document.getElementById("pbiType").value;
  let person = document.getElementById("person").value;
  let priority = document.getElementById("priority").value;
  let status = document.getElementById("status").value;
  let effort = document.getElementById("pbiEffort").value;
  let tagCheckboxes = document.querySelectorAll('input[name="tag"]:checked');

  // Create task
  let persons = new Person(person, "asfda");
  let task = new Task(name, des, status, priority, person, effort);
  // Get the checked tags
  tagCheckboxes.forEach((checkbox) => {
    switch (checkbox.value){
      case "UI":
        task.addTag(checkbox.value, "#d966ff");
        break;
      case "Development":
        task.addTag(checkbox.value, "#1affc6");
        break;
      case "Testing":
        task.addTag(checkbox.value, "#ff6666");
        break;
      default:
        task.addTag(checkbox.value);
    }
  });

  // Check that all inputs are valid
  if(validateInputs(name, des, taskType, person, priority, status, effort)){
    // Add to local storage
    updateLSData(TASK_KEY, task)
    productBacklog.addTask(task);
    updateLSData(PRODUCTBACKLOG_KEY, productBacklog)
    // Update Task list
    displayProductBacklog();

    // close dialog
    document.getElementById("saveTask").removeEventListener("click", createTask);
    closeDialog();
  }
}

/**
 * Delete a task
 */
function deleteTask(index){
    productBacklog.delete(index)
    displayProductBacklog()
}

/**
 * Show all Tasks in a list
 */
function displayProductBacklog() {
  let output = "";

  // Iterate through saved tasks in the backlog
  for (let i = 0; i < productBacklog._taskArray.length; i++) {
    // Get tags of each task
    let tagsOutput = "";
    productBacklog._taskArray[i].tags.forEach((tag) => {
      tagsOutput += `
      <span class="mdl-chip" style="background-color: ${tag[1]}">
          <span class="mdl-chip__text">${tag[0]}</span>
      </span>
      `;
    })

    // Create html to display the task info
    let item = `
                <li class="PBI mdl-list__item mdl-list__item--three-line">
                    <span class="mdl-list__item-primary-content">
                        <span>${productBacklog._taskArray[i].title}</span>
                        <span class="mdl-list__item-text-body">
                            <span style="padding-right: 15px">Priority: ${productBacklog._taskArray[i].priority}</span>
                            <span>Story Points: ${productBacklog._taskArray[i].timeTracking}</span><br>
                            <span>Tags:
                              <span class="tag-chips">${tagsOutput}</span>
                            </span>
                        </span>
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <!-- Colored icon button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="edit_pbi()">
                          <i class="material-icons">edit</i>
                        </button>
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <!-- Colored icon button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteTask(0)">
                          <i class="material-icons">delete</i>
                        </button>
                    </span>
              </li>`;
    output += item;
  }
  // Add to the UI list
  document.getElementById("pbi-list").innerHTML = output;

}

/**
 * Put saved values of task into the dialog container
 */
function editTask(index) {
  let name = document.getElementById("pbiName");
  name.value = productBacklog._taskArray[index]._name;
  let description = document.getElementById("pbiDesc");
  description.value = productBacklog._taskArray[index]._description;
  let status = document.getElementById("status");
  status.value = productBacklog._taskArray[index]._status;
  let priority = document.getElementById("priority");
  priority.value = productBacklog._taskArray[index]._priority;
  let assigned = document.getElementById("person");
  assigned.value = productBacklog._taskArray[index]._assigned;
  let timeTracking = document.getElementById("pbiEffort");
  timeTracking.value = productBacklog._taskArray[index]._timeTracking;
}

/**
 * Update the modified task
 */
function saveEditTask(index){
  let name = document.getElementById("editName").value;
  let description = document.getElementById("editDescription").value;
  let status = document.getElementById("editStatus").value;
  let priority = document.getElementById("editPriority").value;
  let assigned = document.getElementById("editAssigned").value;
  let tags = document.getElementById("editTags").value;
  let person = document.getElementById("editPerson").value;
  let effort = document.getElementById("editEffort").value;

  document.getElementById("saveTask").removeEventListener("click", saveEditTask);
  closeDialog();
}

/**
 * Show a task in the dialog container with uneditable inputs
 */
function showTask(){
  let name = document.getElementById("pbiName");
  name.value = productBacklog._taskArray[index]._name;
  let description = document.getElementById("pbiDesc");
  description.value = productBacklog._taskArray[index]._description;
  let status = document.getElementById("status");
  status.value = productBacklog._taskArray[index]._status;
  let priority = document.getElementById("priority");
  priority.value = productBacklog._taskArray[index]._priority;
  let assigned = document.getElementById("person");
  assigned.value = productBacklog._taskArray[index]._assigned;
  let timeTracking = document.getElementById("pbiEffort");
  timeTracking.value = productBacklog._taskArray[index]._timeTracking;
}

/**
 * Check that all inputs are valid, otherwise show error messages
 */
function validateInputs(name, desc, type, person, priority, status, effort){
  let retVal = true;

  if(name === ''){
    document.getElementById("pbiName").parentElement.classList.add("is-invalid");
    retVal = false;
  }
  if(desc === ''){
    document.getElementById("pbiDesc").parentElement.classList.add("is-invalid");
    retVal = false;
  }
  if(type === ''){
    document.getElementById("pbiType").parentElement.classList.add("is-invalid");
    retVal = false;
  }
  if(person === ''){
    document.getElementById("person").parentElement.classList.add("is-invalid");
    retVal = false;
  }
  if(priority === ''){
    document.getElementById("priority").parentElement.classList.add("is-invalid");
    retVal = false;
  }
  if(status === ''){
    document.getElementById("status").parentElement.classList.add("is-invalid");
    retVal = false;
  }
  if(effort === ''){
    document.getElementById("pbiEffort").parentElement.classList.add("is-invalid");
    retVal = false;
  }

  return retVal;
}

/**
 * Open up the dialog so that a new task can be created
 */
function add_pbi(){
  let dialog = document.querySelector('dialog');
  if (!dialog.showModal()){
    dialogPolyfill.registerDialog(dialog);
    document.getElementById("saveTask").addEventListener("click", createTask);
  }
}

/**
 * Close the dialog
 */
function closeDialog(){
  let dialog = document.querySelector('dialog');
  dialog.close();

  // clear all fields
  document.getElementById("pbiName").value = "";
  document.getElementById("pbiDesc").value = "";
  document.getElementById("pbiType").value = "";
  document.getElementById("pbiEffort").value = "";
  document.getElementById("tag-ui").parentElement.classList.remove("is-checked");
  document.getElementById("tag-dev").parentElement.classList.remove("is-checked");
  document.getElementById("tag-test").parentElement.classList.remove("is-checked");
  let tagCheckboxes = document.querySelectorAll('input[name="tag"]:checked');
  tagCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}

/**
 * Open the dialog so that a task can be edited
 */
function edit_pbi(){
  let dialog = document.querySelector('dialog');
  if (!dialog.showModal()){
    dialogPolyfill.registerDialog(dialog);
    document.getElementById("saveTask").addEventListener("click", saveEditTask);
  }
  editTask(0);
}

// Displays the list of vacations when the page loads
displayProductBacklog();
