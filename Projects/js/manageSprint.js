/**
 * File Name: manageSprint.js
 * Description: Contains the functionality for the manage
 *  inactive sprint page. Includes adding tasks to the sprint
 *  backlog, removing them from the sprint backlog and starting
 *  a sprint.
 * ID: Team 2
 * Last Modified: 29/09/22
 */

"use strict";

/**
 * Show Sprint Tasks in the Sprint Backlog column
 */
function displayTasksInSprint() {
    let output = "";
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
 * Show all Product Backlog Tasks in the Product Backlog column
 */
function displayProductBacklogInSprint() {
    let output = "";
    let indexArray = [];

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
        if (productBacklog._array[i]._status === "Not Started"||productBacklog._array[i]._status ==="Completed") {
            indexArray.push(i);
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
 * Delete a sprint
 */
function deleteSprint() {
    for (let i = 0; i < productBacklog._array.length; i++) {
        for (let j = 0; j < sprintBacklog._array[sprintKey]._tasks.length; j++)
        if (JSON.stringify(sprintBacklog._array[sprintKey]._tasks[j])===JSON.stringify(productBacklog._array[i])){
            productBacklog._array[i]._status = "Not Assigned";
            break;
        }
    }
    updateLSData(PRODUCTBACKLOG_KEY, productBacklog);
    sprintBacklog.delete(sprintKey);
    updateLSData(SPRINTBACKLOG_KEY,sprintBacklog);
    backToSprints();
}

/**
 * Adds a Product Backlog Item to the Sprint Backlog
 * @param index the index of the task in the product backlog
 */
function moveTaskToSB(index) {
    productBacklog._array[index]._status = "Not Started";
    sprintBacklog._array[sprintKey].addTask(productBacklog._array[index]);
    refreshBacklog();
}

/**
 * Removes a Task from the Sprint Backlog
 * @param index the index of the task in the Sprint Backlog
 */
function removeTask(index) {
    for (let i = 0; i < productBacklog._array.length; i++) {
        if (JSON.stringify(sprintBacklog._array[sprintKey]._tasks[index])===JSON.stringify(productBacklog._array[i])){
            productBacklog._array[i]._status = "Not Assigned";
            sprintBacklog._array[sprintKey].deleteTask(index);
            break;
        }
    }
    refreshBacklog();
}

/**
 * Loads all Tasks in the Product and Sprint Backlogs into the UI
 */
function refreshBacklog() {
    displayProductBacklogInSprint();
    displayTasksInSprint();
}

/**
 * Saves the tasks added to an inactive sprint to local storage
 */
function saveInactiveSprint(){
    updateLSData(PRODUCTBACKLOG_KEY, productBacklog);
    updateLSData(SPRINTBACKLOG_KEY, sprintBacklog);
    backToSprints();
}

/**
 * Saves the tasks in the inactive sprint's backlog and starts it
 */
function startInactiveSprint(){
    for (let i = 0; i < sprintBacklog._array[sprintKey]._tasks.length; i++) {
        for (let j = 0; j < productBacklog._array.length; j++) {
            if (JSON.stringify(sprintBacklog._array[sprintKey]._tasks[i]) === JSON.stringify(productBacklog._array[j])) {
                productBacklog.delete(j)
                break;
            }
        }
    }
    sprintBacklog._array[sprintKey].status = "In Progress";
    updateLSData(PRODUCTBACKLOG_KEY, productBacklog);
    updateLSData(SPRINTBACKLOG_KEY, sprintBacklog);
    toManageStartedSprint();
}

/**
 * Goes to the Sprints page
 */
function backToSprints(){
    window.location.href = 'sprints.html';
}

/**
 * Goes to the Manage started Sprints page
 */
function toManageStartedSprint(){
    window.location.href = 'manage_sprint_started.html';
}

refreshBacklog()