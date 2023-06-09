/**
 * File Name: backlog.js
 * Description: Contains the functionality for the product_backlog page.
 *  Includes adding, deleting, modifying and displaying tasks.
 * ID: Team 2
 * Last Modified: 29/09/22
 */

"use strict";

/**
 * Create a new task and add it to local storage
 */
function createTask() {
  // take in user inputs
  let name = document.getElementById("pbiName").value;
  let des = document.getElementById("pbiDesc").value;
  let taskType = document.getElementById("pbiType").value;
  let person_value = document.getElementById("person").value;
  let person = teamBacklog._array[person_value - 1]
  let priority = document.getElementById("priority").value;
  let status = document.getElementById("status").value;
  let effort = document.getElementById("pbiEffort").value;
  let tag = document.querySelector('input[name="tag"]:checked');

  // Create task
  let task = new Task(name, des, status, priority, person, effort, taskType);
  // Get the checked tag
  if(tag != null){
    task.addTag(tag.value);
    switch (tag.value){
      case "UI":
        task.addTag("#AAC4FF");
        break;
      case "Development":
        task.addTag("#ACE7FF");
        break;
      case "Testing":
        task.addTag("#ECC5FB");
        break;
      default:
    }
  }

  // Check that all inputs are valid
  if (validateInputs(name, des, taskType, person_value, priority, status, effort, tag)) {
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
  if(confirm(`Are you sure want to delete ${productBacklog._array[index].title}?\nDeleted data cannot be recovered.`)){
    //using function to delete at index
    productBacklog.delete(index);
    //updating local storage
    updateLSData(PRODUCTBACKLOG_KEY, productBacklog);
    //running the display function with changed PB
    displayProductBacklog();
  }
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
          parseInt(productBacklog._array[i]._effort) <
            parseInt(productBacklog._array[j]._effort)
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
                style="background-color: ${productBacklog._array[i].tag[1]}">
                    <span class="mdl-list__item-primary-content" onclick="showTask(${i})">
                        <span>${productBacklog._array[i].title}</span>
                        <span class="mdl-list__item-text-body">
                            <span style="padding-right: 15px">Priority: ${productBacklog._array[i].priority}</span>
                            <span>Story Points: ${productBacklog._array[i].effort}</span><br>
                            <span>Tag: ${productBacklog._array[i].tag[0]}</span>
                        </span>
                    </span>`
    if (productBacklog._array[i]._status === "Not Assigned"){
      item += `<span class="mdl-list__item-secondary-content">
                        <!-- Colored icon button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="edit_pbi(${i})">
                          <i class="material-icons" id="edit-pbi${i}">edit</i>
                          <div class="mdl-tooltip" data-mdl-for="edit-pbi${i}">Edit</div>
                        </button>
                    </span>`
    }
    item += `<span class="mdl-list__item-secondary-content">
                        <!-- Colored icon button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteTask(${i})">
                          <i class="material-icons" id="del-pbi${i}">delete</i>
                          <div class="mdl-tooltip" data-mdl-for="del-pbi${i}">Delete</div>
                        </button>
                    </span>
              </li>`;
    output += item;
  }
  if(output === ""){
    output = `<span class="mdl-layout-title" style="color: white">No Product Backlog Items.<br>Use + button below to start adding.</span>`;
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
  for (let i = 0; i < teamBacklog._array.length; i++) {
    if (JSON.stringify(teamBacklog._array[i] )=== JSON.stringify(productBacklog._array[index]._assigned)) {
      assigned.value = i+1
    }
  }

  let priority = document.getElementById("priority");
  priority.parentElement.classList.add("is-dirty");
  priority.value = productBacklog._array[index]._priority;

  let status = document.getElementById("status");
  status.parentElement.classList.add("is-dirty");
  status.disabled = true;
  status.value = productBacklog._array[index]._status;

  let effort = document.getElementById("pbiEffort");
  effort.parentElement.classList.add("is-dirty");
  effort.value = productBacklog._array[index]._effort;

  //getting user tag values and then only ticking the right ones present in LS
  let tag = document.querySelectorAll('input[name="tag"]');
  let storedTag = productBacklog._array[index]._tag;
  tag.forEach((checkBox) => {
    if (storedTag[0] === checkBox.value) {
      checkBox.parentElement.classList.add("is-checked");
      checkBox.checked = true
    }
  });

  //updating the index
  taskKey = index
  updateLSData(TASK_KEY, taskKey);
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
  let person_value = document.getElementById("person").value;
  let person = teamBacklog._array[person_value]
  let effort = document.getElementById("pbiEffort").value;
  let taskType = document.getElementById("pbiType").value;
  let tag = document.querySelector('input[name="tag"]:checked');

  // Creating a task with the information
  let task = new Task(name, description, status, priority, person, effort, taskType);
  //saving checkbox values
  if(tag != null){
    task.removeTag()
    task.addTag(tag.value);
    switch (tag.value){
      case "UI":
        task.addTag("#AAC4FF");
        break;
      case "Development":
        task.addTag("#ACE7FF");
        break;
      case "Testing":
        task.addTag("#ECC5FB");
        break;
      default:
    }
  }

  // Check that all inputs are valid
  if (validateInputs(name, description, taskType, person_value, priority, status, effort, tag)) {
    // Overwrite the old values by replacing it with the new values
    productBacklog._array[taskKey] = task;
    updateLSData(PRODUCTBACKLOG_KEY, productBacklog);
    console.log(productBacklog)
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
  dialog.showModal();
  dialogPolyfill.registerDialog(dialog);
  document.getElementById("saveTask");
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

  list_members();

  let assigned = document.getElementById("person");
  assigned.parentElement.classList.add("is-dirty");
  assigned.disabled = true;
  for (let i = 0; i < teamBacklog._array.length; i++) {
    if (JSON.stringify(teamBacklog._array[i] )=== JSON.stringify(productBacklog._array[index]._assigned)) {
      assigned.value = i+1
    }
  }

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
  effort.value = productBacklog._array[index]._effort;

  let tag = document.querySelectorAll('input[name="tag"]');
  let storedTag = productBacklog._array[index]._tag;
  tag.forEach((radio) => {
    if (storedTag[0] === radio.value) {
      radio.parentElement.classList.add("is-checked");
      radio.checked = true;
    }
    radio.disabled = true;
  });


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
  if (person === "0") {
    document
        .getElementById("person")
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
    output += `<option value="${i+1}">${teamBacklog._array[i]._name}</option>`
  }
  document.getElementById("person").innerHTML = output
}


// Displays the list of tasks when the page loads
displayProductBacklog();
