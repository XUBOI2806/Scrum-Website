
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
        let sprint = new Sprint(sprintName, new Date(startDate), new Date(endDate), "Not Started", [])
        sprintBacklog.add(sprint);
        updateLSData(SPRINTBACKLOG_KEY, sprintBacklog)
        displaySprintBacklog();
        closeDialog();
    }
}

function validateSprintInputs(sprintName, startDateString, endDateString){
    let retVal = true;
    let todaysDate = new Date();
    let startDate = new Date(startDateString);
    let endDate = new Date(endDateString);

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


function displaySprintBacklog() {
    let output = "";
    checkForCompletedSprints()
    // Iterate through saved tasks in the backlog
    for (let i = 0; i < sprintBacklog._array.length; i++) {
        // Check whether in-progress sprints have reached their end date and need to change to completed
        let sprint = sprintBacklog._array[i]
        let todaysDate = new Date();
        if((sprint.status === "In Progress") && (sprint.endDate < todaysDate.getDate())){
            sprint.status = "Completed";
        }

        // Create html to display the task info
        let item = `
        <li class="list-item mdl-list__item" onclick="showManageSprint(${i})">
            <span class="mdl-list__item-primary-content">
                <span>${sprintBacklog._array[i].title}</span>
            </span>
            <span class="mdl-list__item-secondary-content">
                <!-- Edit button -->
                <span>${sprintBacklog._array[i].status}</span>
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

function showManageSprint(index){
    // Check if it's status is not started, in progress, or completed
    // Open the corresponding page
    let sprint = sprintBacklog._array[index];
    if(sprint.status === "Not Started"){
        window.location = 'manage_sprint_not_started.html';
    } else if(sprint.status === 'In Progress'){
        window.location = 'manage_sprint_in_progress.html';
    }
}

// Displays the list of tasks when the page loads
displaySprintBacklog();