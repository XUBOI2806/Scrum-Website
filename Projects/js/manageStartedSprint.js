/**
 * File Name: manageStartedSprint.js
 * Description: Contains the functionality for the manage
 *  active sprint page. Includes moving tasks from
 *  'Not Started' to 'In Progress' and finally to the
 *  'Completed' status. Also allows user to complete sprints.
 * ID: Team 2
 * Last Modified: 30/09/22
 */

"use strict";

/**
 * Show all Tasks in a list
 */
function displayTasks() {
    let notStartedOutput = "";
    let inProgressOutput = "";
    let doneOutput = "";
    document.getElementById("sprintName").textContent = "Sprint: " + sprintBacklog._array[sprintKey]._title
    // Iterate through saved tasks in the backlog
    for (let i = 0; i < sprintBacklog._array[sprintKey]._tasks.length; i++) {
        // Create html to display the task info
        let item = `
                <li class="list-item mdl-list__item mdl-list__item">
                    <span class="mdl-list__item-primary-content" onclick="toLogTime(${i})">
                        <span>${sprintBacklog._array[sprintKey]._tasks[i]._title}</span>
                    </span>
                    <span class="mdl-list__item-secondary-content">`
        if (sprintBacklog._array[sprintKey]._tasks[i]._status === "Not Started"){
            item += `
                        <!-- Add to Sprint Backlog button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="moveTaskToInProgress(${i})">
                            <i class="material-icons">arrow_forward</i>
                        </button>
                    </span>
                </li>`
            notStartedOutput += item;
        }
        else if(sprintBacklog._array[sprintKey]._tasks[i]._status === "In Progress"){
            item += `
                        <!-- Add to Sprint Backlog button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="moveTaskToDone(${i})">
                            <i class="material-icons">arrow_forward</i>
                        </button>
                    </span>
                </li>`
            inProgressOutput += item;
        }
        else{
            item += `
                        <!-- Add to Sprint Backlog button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"">
                            <i class="material-icons">done</i>
                        </button>
                    </span>
                </li>`
            doneOutput += item;
        }
    }
    // Add to the UI list
    document.getElementById("not-started-list").innerHTML = notStartedOutput;
    document.getElementById("in-progress-list").innerHTML = inProgressOutput;
    document.getElementById("done-list").innerHTML = doneOutput;
}

/**
 * Moves a task from 'Not Started' to 'In Progress'
 * @param index the index of the task in the sprint backlog
 */
function moveTaskToInProgress(index) {
    sprintBacklog._array[sprintKey]._tasks[index]._status = "In Progress"
    displayTasks()
}

/**
 * Moves a task from 'In Progress' to 'Done'
 * @param index the index of the task in the sprint backlog
 */
function moveTaskToDone(index) {
    sprintBacklog._array[sprintKey]._tasks[index]._status = "Done"
    displayTasks()
}

/**
 * Finishes a sprint
 */
function completeSprint(){
    // Mark all tasks as completed
    for (let i = 0; i < sprintBacklog._array[sprintKey]._tasks.length; i++) {
        sprintBacklog._array[sprintKey]._tasks[i]._status = "Completed"
        productBacklog.add(sprintBacklog._array[sprintKey]._tasks[i])
    }
    // Mark sprint as completed and update LS
    sprintBacklog._array[sprintKey]._status = "Completed"
    updateLSData(PRODUCTBACKLOG_KEY, productBacklog);
    updateLSData(SPRINTBACKLOG_KEY, sprintBacklog);
    backToSprints()
}

/**
 * Saves a sprint
 */
function saveSprint(){
    // Mark sprint as completed and update LS
    updateLSData(PRODUCTBACKLOG_KEY, productBacklog);
    updateLSData(SPRINTBACKLOG_KEY, sprintBacklog);
}

/**
 * Goes to the Sprints page
 */
function backToSprints(){
    window.location.href = 'sprints.html';
}

/**
 * Goes to the Log time page
 */
function toLogTime(index){
    taskKey = index
    updateLSData(TASK_KEY, taskKey)
    saveSprint();
    window.location.href = 'log_time.html';
}

displayTasks()

