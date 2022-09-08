"use strict";

// let taskIndex = localStorage.getItem(TASK_KEY);
// let selectedTask = productBacklog.getTask(taskIndex);
//test comment
/**
 * Create a new task and add it to local storage
 */
let indexs = 0;
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
  let task = new Task(name, des, status, priority, person, effort, taskType);
  // Get the checked tags
  tagCheckboxes.forEach((checkbox) => {
    switch (checkbox.value) {
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
  if (validateInputs(name, des, taskType, person, priority, status, effort)) {
    // Add to local storage
    updateLSData(TASK_KEY, task);
    productBacklog.addTask(task);
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
  productBacklog.deleteTask(index);
  updateLSData(PRODUCTBACKLOG_KEY, productBacklog);
  displayProductBacklog();
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
    });

    let temp = "";
    for (let i = 0; i < productBacklog._taskArray.length; i++) {
      for (let j = i + 1; j < productBacklog._taskArray.length; j++) {
        if (
          parseInt(productBacklog._taskArray[i]._timeTracking) <
            parseInt(productBacklog._taskArray[j]._timeTracking)
        ) {
          temp = productBacklog._taskArray[i];
          productBacklog._taskArray[i] = productBacklog._taskArray[j];
          productBacklog._taskArray[j] = temp;
        }
      }
    }

    // Create html to display the task info
    let item = `
                <li class="PBI mdl-list__item mdl-list__item--three-line" onclick="showTask(${i})">
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
  let name = document.getElementById("pbiName");
  parent = name.parentElement.classList.add("is-dirty");
  name.value = productBacklog._taskArray[index]._title;

  let des = document.getElementById("pbiDesc");
  parent = des.parentElement.classList.add("is-dirty");
  des.value = productBacklog._taskArray[index]._description;

  let taskType = document.getElementById("pbiType");
  parent = taskType.parentElement.classList.add("is-dirty");
  taskType.value = productBacklog._taskArray[index]._taskType;

  let assigned = document.getElementById("person");
  parent = assigned.parentElement.classList.add("is-dirty");
  assigned.value = productBacklog._taskArray[index]._assigned;

  let priority = document.getElementById("priority");
  parent = priority.parentElement.classList.add("is-dirty");
  priority.value = productBacklog._taskArray[index]._priority;

  let status = document.getElementById("status");
  parent = status.parentElement.classList.add("is-dirty");
  status.value = productBacklog._taskArray[index]._status;

  let effort = document.getElementById("pbiEffort");
  parent = effort.parentElement.classList.add("is-dirty");
  effort.value = productBacklog._taskArray[index]._timeTracking;

  let tags = document.querySelectorAll('input[name="tag"]');
  let storedTags = productBacklog._taskArray[index]._tags;
  for (let i = 0; i < storedTags.length; i++) {
    tags.forEach((checkBox) => {
      if (storedTags[i][0] == checkBox.value) {
        checkBox.parentElement.classList.add("is-checked");
        checkBox.checked = true
      }
    });
  }
  indexs = index;
}

/**
 * Update the modified task
 */
function saveEditTask() {
  let index = indexs;
  let name = document.getElementById("pbiName").value;
  let description = document.getElementById("pbiDesc").value;
  let status = document.getElementById("status").value;
  let priority = document.getElementById("priority").value;
  let person = document.getElementById("person").value;
  let effort = document.getElementById("pbiEffort").value;
  let taskType = document.getElementById("pbiType").value;
  let tagCheckboxes = document.querySelectorAll('input[name="tag"]:checked');

  let task = new Task(
    name,
    description,
    status,
    priority,
    person,
    effort,
    taskType
  );
  
  console.log(tagCheckboxes)
  tagCheckboxes.forEach((checkbox) => {
    switch (checkbox.value) {
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




  // Overwrite the old values by replacing it with the new values
  productBacklog._taskArray[index] = task;
  updateLSData(PRODUCTBACKLOG_KEY, productBacklog);
  displayProductBacklog();
  closeDialog();

  document
    .getElementById("saveTask")
    .removeEventListener("click", saveEditTask);
  closeDialog();
}

/**
 * Show a task in the dialog container with uneditable inputs
 */
function showTask(index) {
  let dialog = document.querySelector("dialog");
  if (!dialog.showModal()) {
    dialogPolyfill.registerDialog(dialog);
    document.getElementById("saveTask");
  }

  let name = document.getElementById("pbiName");
  name.parentElement.classList.add("is-dirty");
  name.disabled = true;
  name.value = productBacklog._taskArray[index]._title;

  let des = document.getElementById("pbiDesc");
  des.parentElement.classList.add("is-dirty");
  des.disabled = true;
  des.value = productBacklog._taskArray[index]._description;

  let taskType = document.getElementById("pbiType");
  taskType.parentElement.classList.add("is-dirty");
  taskType.disabled = true;
  taskType.value = productBacklog._taskArray[index]._taskType;

  let assigned = document.getElementById("person");
  assigned.parentElement.classList.add("is-dirty");
  assigned.disabled = true;
  assigned.value = productBacklog._taskArray[index]._assigned;

  let priority = document.getElementById("priority");
  priority.parentElement.classList.add("is-dirty");
  priority.disabled = true;
  priority.value = productBacklog._taskArray[index]._priority;

  let status = document.getElementById("status");
  status.parentElement.classList.add("is-dirty");
  status.disabled = true;
  status.value = productBacklog._taskArray[index]._status;

  let effort = document.getElementById("pbiEffort");
  effort.parentElement.classList.add("is-dirty");
  effort.disabled = true;
  effort.value = productBacklog._taskArray[index]._timeTracking;

  let tags = document.querySelectorAll('input[name="tag"]');
  let storedTags = productBacklog._taskArray[index]._tags;
  for (let i = 0; i < storedTags.length; i++) {
    tags.forEach((checkBox) => {
      if (storedTags[i][0] == checkBox.value) {
        checkBox.parentElement.classList.add("is-checked");
        checkBox.checked = true;
      }
      checkBox.disabled = true;
    });
  }
  indexs = index;
}

/**
 * Check that all inputs are valid, otherwise show error messages
 */
function validateInputs(name, desc, type, person, priority, status, effort) {
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
  if (type === "") {
    document
      .getElementById("pbiType")
      .parentElement.classList.add("is-invalid");
    retVal = false;
  }
  if (person === "") {
    document.getElementById("person").parentElement.classList.add("is-invalid");
    retVal = false;
  }
  if (priority === "") {
    document
      .getElementById("priority")
      .parentElement.classList.add("is-invalid");
    retVal = false;
  }
  if (status === "") {
    document.getElementById("status").parentElement.classList.add("is-invalid");
    retVal = false;
  }
  if (effort === "") {
    document
      .getElementById("pbiEffort")
      .parentElement.classList.add("is-invalid");
    retVal = false;
  }

  return retVal;
}

/**
 * Open up the dialog so that a new task can be created
 */
function add_pbi() {
  let dialog = document.querySelector("dialog");
  if (!dialog.showModal()) {
    dialogPolyfill.registerDialog(dialog);
    document.getElementById("saveTask").addEventListener("click", createTask);
  }
}

/**
 * Close the dialog
 */
function closeDialog() {
  let dialog = document.querySelector("dialog");
  dialog.close();

  // clear all fields
  document.getElementById("pbiName").value = "";
  document.getElementById("pbiDesc").value = "";
  document.getElementById("pbiType").value = "";
  document.getElementById("pbiEffort").value = "";
  document
    .getElementById("tag-ui")
    .parentElement.classList.remove("is-checked");
  document
    .getElementById("tag-dev")
    .parentElement.classList.remove("is-checked");
  document
    .getElementById("tag-test")
    .parentElement.classList.remove("is-checked");
  let tagCheckboxes = document.querySelectorAll('input[name="tag"]:checked');
  tagCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}

/**
 * Open the dialog so that a task can be edited
 */
function edit_pbi(index) {
  let dialog = document.querySelector("dialog");
  if (!dialog.showModal()) {
    dialogPolyfill.registerDialog(dialog);
    document.getElementById("saveTask").addEventListener("click", saveEditTask);
  }
  editTask(index);
}

// Displays the list of vacations when the page loads
displayProductBacklog();
