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
        if(sprintBacklog._array[sprintKey]._tasks[i]._status === "Not Started"){
            let item = `
                    <li class="list-item mdl-list__item mdl-list__item">
                        <span class="mdl-list__item-primary-content">
                            <span>${sprintBacklog._array[sprintKey]._tasks[i]._title}</span>
                        </span>
                        <span class="mdl-list__item-secondary-content">
                            <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" id="move-ns${i}" onclick="moveTaskToInProgress(${i})">
                                <i class="material-icons">arrow_forward</i>
                            </button>
                            <div class="mdl-tooltip" data-mdl-for="move-ns${i}">Move to In Progress</div>
                        </span>
                    </li>`
            notStartedOutput += item;
        }
        else if(sprintBacklog._array[sprintKey]._tasks[i]._status === "In Progress"){
            let item = `
                <li class="list-item mdl-list__item mdl-list__item">
                    <span class="mdl-list__item-primary-content" onclick="toLogTime(${i})">
                        <span>${sprintBacklog._array[sprintKey]._tasks[i]._title}</span>
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" id="move-com${i}" onclick="moveTaskToDone(${i})">
                            <i class="material-icons">arrow_forward</i>
                        </button>
                        <div class="mdl-tooltip" data-mdl-for="move-com${i}">Move to Completed</div>
                    </span>
                </li>`
            inProgressOutput += item;
        }
        else{
            let item = `
                <li class="list-item mdl-list__item mdl-list__item">
                    <span class="mdl-list__item-primary-content">
                        <span>${sprintBacklog._array[sprintKey]._tasks[i]._title}</span>
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" id="move-com${i}">
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
    if(confirm(`Are you sure want to move ${sprintBacklog._array[sprintKey]._tasks[index]._title} to 'In Progress'?\nThis action cannot be undone.`)) {
        sprintBacklog._array[sprintKey]._tasks[index]._status = "In Progress"
        displayTasks()
    }
}

/**
 * Moves a task from 'In Progress' to 'Done'
 * @param index the index of the task in the sprint backlog
 */
function moveTaskToDone(index) {
    if(confirm(`Are you sure want to move ${sprintBacklog._array[sprintKey]._tasks[index]._title} to 'Done'?\nThis action cannot be undone.`)) {
        sprintBacklog._array[sprintKey]._tasks[index]._status = "Done"
        displayTasks()
    }
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
    sprintInProgress = false;
    updateLSData(PRODUCTBACKLOG_KEY, productBacklog);
    updateLSData(SPRINTBACKLOG_KEY, sprintBacklog);
    updateLSData(SPRINT_IN_PROGRESS, sprintInProgress)
    backToSprints()
}

/**
 * Saves a sprint
 */
function saveSprint(){
    // Mark sprint as completed and update LS
    updateLSData(PRODUCTBACKLOG_KEY, productBacklog);
    updateLSData(SPRINTBACKLOG_KEY, sprintBacklog);
    window.location.href = 'sprints.html';
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

/**
 * Goes to the Sprints page
 */
function displayBurndownChart(){
    window.location.href = 'burndown.html';
}


displayTasks();

