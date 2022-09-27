
/**
 * Open the add sprint dialog
 */


function add_sprint(){
    let dialog = document.querySelector("dialog");
    dialog.showModal();
    dialogPolyfill.registerDialog(dialog);
}

function createSprint(){
    // take in user inputs
    let sprintName = document.getElementById("sprintName").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    if(validateSprintInputs(sprintName, startDate, endDate)){
        let sprint = new Sprint(sprintName, startDate, endDate, "Not started", [])
        sprintBacklog.add(sprint);
        updateLSData(SPRINTBACKLOG_KEY, sprintBacklog)
        displaySprintBacklog();
        closeDialog();
    }
}

function validateSprintInputs(sprintName, startDateString, endDateString){
    let retVal = true;
    let todaysDate = new Date();
    startDate = new Date(startDateString);
    endDate = new Date(endDateString);

    if(sprintName === ""){
        document.getElementById("sprintName").parentElement.classList.add("is-invalid");
        retVal = false;
    }

    if((startDateString === "") || (startDate.getTime() < todaysDate.getTime())){
        document.getElementById("startDate").parentElement.classList.add("is-invalid");
        retVal = false;
    }

    if(endDateString === "" || (endDate.getTime() < startDate.getTime())){
        document.getElementById("endDate").parentElement.classList.add("is-invalid");
        retVal = false;
    }

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


function displaySprintBacklog() {
    let output = "";
  
    // Iterate through saved tasks in the backlog
    for (let i = 0; i < sprintBacklog._array.length; i++) {
  
      // Create html to display the task info
      let item = `
        <li class="list-item mdl-list__item" onclick="showManageSprint(0)">
            <span class="mdl-list__item-primary-content" onclick="manageSprint(${i})">
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
 * Delete a task
 */
function deleteSprint() {
    //using function to delete at index
    sprintBacklog.delete(TASK_KEY);
    //updating local storage
    updateLSData(SPRINTBACKLOG_KEY, sprintBacklog);
    //running the display function with changed PB
    window.location.href = 'sprints.html';
}

/**
 * Manages the sprint
 */
function manageSprint(index) {
    //update sprint key to the index of the sprint
    updateLSData(SPRINT_KEY,index);
    //open the manage sprint page
    window.location.href = 'manage_sprint_not_started.html';
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

function showManageSprint(index){
    // Check if it's status is not started, in progress, or completed
    // Open the corresponding page
}

// Displays the list of tasks when the page loads
displaySprintBacklog();