"use strict";

// let taskIndex = localStorage.getItem(TASK_KEY);
// let selectedTask = productBacklog.getTask(taskIndex);
//test comment
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
  let tag = document.querySelector('input[name="tag"]:checked');

  // Create task
  let persons = new Person(person, "asfda");
  let task = new Task(name, des, status, priority, person, effort, taskType);
  // Get the checked tag
  if(tag != null){
    switch (tag.value){
      case "UI":
        task.addTag(tag.value, "#AAC4FF");
        break;
      case "Development":
        task.addTag(tag.value, "#ACE7FF");
        break;
      case "Testing":
        task.addTag(tag.value, "#ECC5FB");
        break;
      default:
    }
  }

  // Check that all inputs are valid
  if (validateInputs(name, des, taskType, person, priority, status, effort, tag)) {
    // Add to local storage
    productBacklog.add(task);
    updateLSData(PRODUCTBACKLOG_KEY, productBacklog);
    // Update Task list
    displayProductBacklog();

    // close dialog
    document
      .getElementById("saveTask")
      .removeEventListener("click", createTask);
    closeDialog();
  }
}

/**
 * Delete a task
 */
function deleteTask(index) {
  //using function to delete at index
  productBacklog.delete(index);
  //updating local storage
  updateLSData(PRODUCTBACKLOG_KEY, productBacklog);
  //running the display function with changed PB
  displayProductBacklog();
}

/**
 * Show all Tasks in a list
 */
function displayProductBacklog() {
  let output = "";

  // Iterate through saved tasks in the backlog
  for (let i = 0; i < productBacklog._array.length; i++) {
    let temp = "";
    for (let i = 0; i < productBacklog._array.length; i++) {
      for (let j = i + 1; j < productBacklog._array.length; j++) {
        if (
          parseInt(productBacklog._array[i]._timeTracking) <
            parseInt(productBacklog._array[j]._timeTracking)
        ) {
          temp = productBacklog._array[i];
          productBacklog._array[i] = productBacklog._array[j];
          productBacklog._array[j] = temp;
        }
      }
    }

    // Create html to display the task info
    let item = `
                <li class="list-item mdl-list__item mdl-list__item--three-line" 
                style="background-color: ${productBacklog._array[i].tags[0][1]}">
                    <span class="mdl-list__item-primary-content" onclick="showTask(${i})">
                        <span>${productBacklog._array[i].title}</span>
                        <span class="mdl-list__item-text-body">
                            <span style="padding-right: 15px">Priority: ${productBacklog._array[i].priority}</span>
                            <span>Story Points: ${productBacklog._array[i].timeTracking}</span><br>
                            <span>Tag: ${productBacklog._array[i].tags[0][0]}</span>
                        </span>
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <!-- Colored icon button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="edit_pbi(${i})">
                          <i class="material-icons">edit</i>
                        </button>
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <!-- Colored icon button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteTask(${i})">
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
  //getting inputs from local storage and removing placeholders for every thing
  let name = document.getElementById("pbiName");
  name.parentElement.classList.add("is-dirty");
  name.value = productBacklog._array[index]._title;

  let des = document.getElementById("pbiDesc");
  des.parentElement.classList.add("is-dirty");
  des.value = productBacklog._array[index]._description;

  let taskType = document.getElementById("pbiType");
  taskType.parentElement.classList.add("is-dirty");
  taskType.value = productBacklog._array[index]._taskType;

  let assigned = document.getElementById("person");
  assigned.parentElement.classList.add("is-dirty");
  assigned.value = productBacklog._array[index]._assigned;

  let priority = document.getElementById("priority");
  priority.parentElement.classList.add("is-dirty");
  priority.value = productBacklog._array[index]._priority;

  let status = document.getElementById("status");
  status.parentElement.classList.add("is-dirty");
  status.value = productBacklog._array[index]._status;

  let effort = document.getElementById("pbiEffort");
  effort.parentElement.classList.add("is-dirty");
  effort.value = productBacklog._array[index]._timeTracking;

  //getting user tag values and then only ticking the right ones present in LS
  let tags = document.querySelectorAll('input[name="tag"]');
  let storedTags = productBacklog._array[index]._tags;
  for (let i = 0; i < storedTags.length; i++) {
    tags.forEach((checkBox) => {
      if (storedTags[i][0] === checkBox.value) {
        checkBox.parentElement.classList.add("is-checked");
        checkBox.checked = true
      }
    });
  }
  //updating the index
  updateLSData(TASK_KEY, index)
}

/**
 * Update the modified task
 */
function saveEditTask() {
  //getting all the elements from the inputs
  let name = document.getElementById("pbiName").value;
  let description = document.getElementById("pbiDesc").value;
  let status = document.getElementById("status").value;
  let priority = document.getElementById("priority").value;
  let person = document.getElementById("person").value;
  let effort = document.getElementById("pbiEffort").value;
  let taskType = document.getElementById("pbiType").value;
  let tag = document.querySelector('input[name="tag"]:checked');

  // Creating a task with the information
  let task = new Task(name, description, status, priority, person, effort, taskType);
  //saving checkbox values
  if(tag != null){
    switch (tag.value){
      case "UI":
        task.addTag(tag.value, "#AAC4FF");
        break;
      case "Development":
        task.addTag(tag.value, "#ACE7FF");
        break;
      case "Testing":
        task.addTag(tag.value, "#ECC5FB");
        break;
      default:
    }
  }

  // Check that all inputs are valid
  if (validateInputs(name, description, taskType, person, priority, status, effort, tag)) {
    // Overwrite the old values by replacing it with the new values
    productBacklog._array[TASK_KEY] = task;
    updateLSData(PRODUCTBACKLOG_KEY, productBacklog);
    displayProductBacklog();
    document
        .getElementById("saveTask")
        .removeEventListener("click", saveEditTask);
    closeDialog();
  }

}

/**
 * Show a task in the dialog container with uneditable inputs
 */
function showTask(index) {
  //displaying necessary modal
  let dialog = document.querySelector("dialog");
  if (!dialog.showModal()) {
    dialogPolyfill.registerDialog(dialog);
    document.getElementById("saveTask");
  }
  //getting inputs from LS and displaying them, they cannot be manipulated
  let name = document.getElementById("pbiName");
  name.parentElement.classList.add("is-dirty");
  name.disabled = true;
  name.value = productBacklog._array[index]._title;

  let des = document.getElementById("pbiDesc");
  des.parentElement.classList.add("is-dirty");
  des.disabled = true;
  des.value = productBacklog._array[index]._description;

  let taskType = document.getElementById("pbiType");
  taskType.parentElement.classList.add("is-dirty");
  taskType.disabled = true;
  taskType.value = productBacklog._array[index]._taskType;

  let assigned = document.getElementById("person");
  assigned.parentElement.classList.add("is-dirty");
  assigned.disabled = true;
  assigned.value = productBacklog._array[index]._assigned;

  let priority = document.getElementById("priority");
  priority.parentElement.classList.add("is-dirty");
  priority.disabled = true;
  priority.value = productBacklog._array[index]._priority;

  let status = document.getElementById("status");
  status.parentElement.classList.add("is-dirty");
  status.disabled = true;
  status.value = productBacklog._array[index]._status;

  let effort = document.getElementById("pbiEffort");
  effort.parentElement.classList.add("is-dirty");
  effort.disabled = true;
  effort.value = productBacklog._array[index]._timeTracking;

  let tags = document.querySelectorAll('input[name="tag"]');
  let storedTags = productBacklog._array[index]._tags;
  for (let i = 0; i < storedTags.length; i++) {
    tags.forEach((radio) => {
      if (storedTags[i][0] === radio.value) {
        radio.parentElement.classList.add("is-checked");
        radio.checked = true;
      }
      radio.disabled = true;
    });
  }


  document.getElementById("saveTask").disabled = true;
}

/**
 * Check that all inputs are valid, otherwise show error messages
 */
function validateInputs(name, desc, type, person, priority, status, effort, tag) {
  let retVal = true;

  if (name === "") {
    document
      .getElementById("pbiName")
      .parentElement.classList.add("is-invalid");
    retVal = false;
  }
  if (desc === "") {
    document
      .getElementById("pbiDesc")
      .parentElement.classList.add("is-invalid");
    retVal = false;
  }
  if (type === "0") {
    document
      .getElementById("pbiType")
      .parentElement.classList.add("is-invalid");
    retVal = false;
  }
  if (priority === "0") {
    document
      .getElementById("priority")
      .parentElement.classList.add("is-invalid");
    retVal = false;
  }
  if (effort === "") {
    document
      .getElementById("pbiEffort")
      .parentElement.classList.add("is-invalid");
    retVal = false;
  }

  if (tag === null) {
    document
        .getElementById("tag-test").parentElement.parentElement.classList.add("is-invalid");
    retVal = false;
  }

  return retVal;
}

/**
 * Open up the dialog so that a new task can be created
 */
function add_pbi() {
  let dialog = document.querySelector("dialog");
  dialog.showModal();
  dialogPolyfill.registerDialog(dialog);
  document.getElementById("saveTask").addEventListener("click", createTask);
  document.getElementById("status").value = "Not Assigned";
  document.getElementById("status").disabled = true;
  document.getElementById("status").parentElement.classList.add("is-dirty");
  list_members();
}

function clearInput(id){
  document.getElementById(id).value = '';
  document.getElementById(id).parentElement.classList.remove("is-dirty");
  document.getElementById(id).disabled = false;
  document.getElementById(id).parentElement.classList.remove("is-invalid");
}

/**
 * Close the dialog
 */
function closeDialog() {
  let dialog = document.querySelector("dialog");
  dialog.close();

  // clear all fields
  clearInput("pbiName");
  clearInput("pbiDesc");
  clearInput("pbiType");
  document.getElementById("person").value = "0";
  clearInput("pbiEffort");
  clearInput("person");
  document.getElementById("person").value = "0";
  clearInput("priority");
  document.getElementById("priority").value = "0";
  clearInput("status");
  document.getElementById("status").value = "Not Assigned";

  document.getElementById("tag-ui").parentElement.classList.remove("is-checked");
  document.getElementById("tag-dev").parentElement.classList.remove("is-checked");
  document.getElementById("tag-test").parentElement.classList.remove("is-checked");
  document.getElementById("tag-test").parentElement.parentElement.classList.remove("is-invalid");
  let radios = document.querySelectorAll('input[name="tag"]');
  radios.forEach((radio) => {
    radio.checked = false;
    radio.disabled = false;
  });
  document.getElementById("saveTask").disabled = false;
}

/**
 * Open the dialog so that a task can be edited
 */
function edit_pbi(index) {
  let dialog = document.querySelector("dialog");
  dialog.showModal();
  dialogPolyfill.registerDialog(dialog);
  document.getElementById("saveTask").addEventListener("click", saveEditTask);
  list_members();
  editTask(index);
}

/**
 * Creates a list
 */
function list_members() {
  let output = "<option value=\"0\" hidden></option>"
  for (let i = 0; i < teamBacklog._array.length; i++) {
    output += `<option value="${i + 1}">${teamBacklog._array[i]._name}</option>`
  }
  document.getElementById("person").innerHTML = output
}


// Displays the list of tasks when the page loads
displayProductBacklog();
