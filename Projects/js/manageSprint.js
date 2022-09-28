"use strict";

/**
 * Show all Tasks in a list
 */
function displayTasksInSprint() {
    let output = "";
    console.log(sprintBacklog._array)
    // Iterate through saved tasks in the backlog
    for (let i = 0; i < sprintBacklog._array[sprintKey]._tasks.length; i++) {
        // Create html to display the task info
        let item = `
                <li class="list-item mdl-list__item mdl-list__item">
                    <span class="mdl-list__item-primary-content">
                        <span>${sprintBacklog._array[sprintKey]._tasks[i]._title}</span>
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <!-- Add to Sprint Backlog button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="removeTask(${i})">
                        <i class="material-icons">remove</i>
                        </button>                        
                    </span>
              </li>`;
        output += item;
    }
    // Add to the UI list
    document.getElementById("sprint-task-list").innerHTML = output;
}

/**
 * Show all Tasks in a list
 */
function displayProductBacklogInSprint() {
    let output = "";
    let indexArray = [];
    console.log(productBacklog._array)

    // Iterate through saved tasks in the backlog
    for (let i = 0; i < productBacklog._array.length; i++) {
        // Create html to display the task info
        let item = `
                <li class="list-item mdl-list__item mdl-list__item">
                    <span class="mdl-list__item-primary-content">
                        <span>${productBacklog._array[i]._title}</span>
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <!-- Add to Sprint Backlog button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="moveTaskToSB(${i})">
                        <i class="material-icons">add</i>
                        </button>                        
                    </span>
              </li>`;
        output += item;
        for (let j = 0; j < sprintBacklog._array.length; j++) {
            if (productBacklog._array[i]._status === "Not Started") {
              indexArray.push(i);
            }
          }
      
    }
    // Add to the UI list
    document.getElementById("backlog-list").innerHTML = output;
    for (let i = 0; i < indexArray.length; i++) {
        let node = document.getElementById("backlog-list");
        node.children[indexArray[i]].setAttribute("disabled", "true");
      }
    
}

/**
 * Delete a task
 */
function deleteSprint() {
    //using function to delete at index
    sprintBacklog.delete(sprintKey);
    updateLSData(SPRINTBACKLOG_KEY,sprintBacklog);
    window.location.href = 'sprints.html';
}

function moveTaskToSB(index) {
    productBacklog._array[index]._status = "Not Started"
    sprintBacklog._array[sprintKey].addTask(productBacklog._array[index])
    refreshBacklog()
}

function removeTask(index) {
    console.log(sprintBacklog._array[sprintKey]._tasks[index])
    for (let i = 0; i < productBacklog._array.length; i++) {
        console.log(i)
        console.log(productBacklog._array[i])
        if (sprintBacklog._array[sprintKey]._tasks[index] === productBacklog._array[i]){
            productBacklog._array[i]._status = "Not Assigned"
            sprintBacklog._array[sprintKey].deleteTask(index)
        }
    }
    refreshBacklog()
}

function refreshBacklog() {
    displayProductBacklogInSprint();
    displayTasksInSprint();
}

function saveInactiveSprint(){
    updateLSData(PRODUCTBACKLOG_KEY, productBacklog)
    updateLSData(SPRINTBACKLOG_KEY, sprintBacklog)
    window.location.href = 'sprints.html';
}

function startInactiveSprint(){
    sprintBacklog._array[sprintKey]._status = "Started"
    updateLSData(PRODUCTBACKLOG_KEY, productBacklog)
    updateLSData(SPRINTBACKLOG_KEY, sprintBacklog)
    window.location.href = 'sprints.html';
}

refreshBacklog()