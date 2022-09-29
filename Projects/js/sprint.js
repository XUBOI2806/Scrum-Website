/**
 * File Name: sprint.js
 * Description: Contains the functionality for the sprints page.
 *  Includes creating and listing sprints.
 * ID: Team 2
 * Last Modified: 29/09/22
 */

"use strict";

/**
 * Open the add sprint dialog
 */
function add_sprint(){
    let dialog = document.querySelector("dialog");
    dialog.showModal();
    dialogPolyfill.registerDialog(dialog);
}

/**
 * Takes in user inputs and saves data to local storage
 */
function createSprint(){
    // take in user inputs
    let sprintName = document.getElementById("sprintName").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    // If they are valid inputs, save sprint to LS
    if(validateSprintInputs(sprintName, startDate, endDate)){
        let sprint = new Sprint(sprintName, new Date(startDate), new Date(endDate), "Not Started", [])
        sprintBacklog.add(sprint);
        updateLSData(SPRINTBACKLOG_KEY, sprintBacklog)
        displaySprintBacklog();
        closeDialog();
    }
}

/**
 * Validates inputs for creating a sprint
 * @param sprintName        String. Name of the sprint.
 * @param startDateString   String. Start date of the sprint.
 * @param endDateString     String. End date of the sprint.
 * @returns {boolean}       True if all inputs are valid.
 */
function validateSprintInputs(sprintName, startDateString, endDateString){
    let retVal = true;
    // Convert string dates to Date objects
    let todaysDate = new Date();
    let startDate = new Date(startDateString);
    let endDate = new Date(endDateString);

    // Check that name is not empty
    if(sprintName === ""){
        document.getElementById("sprintName").parentElement.classList.add("is-invalid");
        retVal = false;
    }

    // Check that start date is not empty and is after today
    if((startDateString === "") || (startDate.getTime() < todaysDate.getTime())){
        document.getElementById("startDate").parentElement.classList.add("is-invalid");
        retVal = false;
    }

    // Check that end date is not empty and always after start date
    if(endDateString === "" || (endDate.getTime() < startDate.getTime())){
        document.getElementById("endDate").parentElement.classList.add("is-invalid");
        retVal = false;
    }

    // return whether they are all valid or not
    return retVal;
}

/**
 * Clear values and all extra attributes of an input
 * @param id the id of the input
 */
function clearInput(id){
    document.getElementById(id).value = '';
    document.getElementById(id).parentElement.classList.remove("is-dirty");
    document.getElementById(id).disabled = false;
    document.getElementById(id).parentElement.classList.remove("is-invalid");
}

/**
 * Check that all sprints that are past their end date are automatically marked as completed
 */
function checkForCompletedSprints(){
    // Check whether in-progress sprints have reached their end date and need to change to completed
    let todaysDate = new Date();
    for (let i = 0; i < sprintBacklog._array.length; i++) {
        if(sprintBacklog._array[i].endDate.getTime() < todaysDate.getTime()){
            sprintBacklog._array[i].status = "Completed";
        }
    }
    updateLSData(SPRINTBACKLOG_KEY, sprintBacklog)
}

/**
 * Lists all sprints saved
 */
function displaySprintBacklog() {
    let output = "";
    // First alter any sprints that are done
    checkForCompletedSprints()
    // Iterate through saved tasks in the backlog
    for (let i = 0; i < sprintBacklog._array.length; i++) {
        // Create html to display the task info
        let item = `
        <li class="list-item mdl-list__item" onclick="showManageSprint(${i})">
            <span class="mdl-list__item-primary-content">
                <span>${sprintBacklog._array[i]._title}</span>
            </span>
            <span class="mdl-list__item-secondary-content">
                <!-- Edit button -->
                <span>${sprintBacklog._array[i]._status}</span>
             </span>
        </li>`;
      output += item;
    }
    // Add to the UI list
    document.getElementById("sprint-list").innerHTML = output;
  }


/**
 * Close the dialog and clear all inputs
 */
function closeDialog() {
    let dialog = document.querySelector("dialog");
    dialog.close();

    clearInput("sprintName");
    clearInput("startDate");
    clearInput("endDate");
}

/**
 * Show the manage sprint page
 * @param index the index of the sprint to show
 */
function showManageSprint(index){
    updateLSData(sprintKey, index)
    let sprint = sprintBacklog._array[sprintKey];
    // Check if it's status is not started or in progress
    // Open their manage pages
    if(sprint._status === "Not Started"){
        window.location = 'manage_sprint_not_started.html';
    } else if(sprint._status === 'In Progress'){
        window.location = 'manage_sprint_in_progress.html';
    }
}

// Displays the list of tasks when the page loads
displaySprintBacklog();