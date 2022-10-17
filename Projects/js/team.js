/**
 * File Name: team.js
 * Description: Contains the functionality for the teams page.
 *  Includes adding, deleting and displaying team members.
 * ID: Team 2
 * Last Modified: 17/10/22
 */

"use strict";

/**
 * Adds a new team member to local storage and display it in the list
 */
function createTeamMember() {
    // Take in user inputs
    let name = document.getElementById("memberName").value;
    let email = document.getElementById("memberEmail").value;

    // Create person
    let person = new Person(name, email);

    // Check that all inputs are valid
    if (validateInputs(name, email)) {
        // Add to local storage
        teamBacklog.add(person);
        updateLSData(TEAMBACKLOG_KEY, teamBacklog);
        // Display the updated Team Backlog
        displayTeamBacklog();
        closeDialog();
    }
}

/**
 * Check that all inputs are valid, otherwise show error messages
 */
function validateInputs(name, email) {
    let retVal = true;

    if (name === "") {
        document
            .getElementById("memberName")
            .parentElement.classList.add("is-invalid");
        retVal = false;
    }
    if (email === "") {
        document
            .getElementById("memberEmail")
            .parentElement.classList.add("is-invalid");
        retVal = false;
    }
    return retVal;
}

/**
 * Delete a team member from local storage and remove it from the list
 */
function deleteTeamMember(index){
    if(confirm(`Are you sure want to delete ${teamBacklog._array[index].name}?\nDeleted data cannot be recovered.`)) {
        teamBacklog.delete(index);
        updateLSData(TEAMBACKLOG_KEY, teamBacklog);
        displayTeamBacklog();
    }
}

/**
 * Show each saved team member in the list
 */
function displayTeamBacklog() {
    let output = "";
    // Go through each team member and create a list item for it
    for (let i = 0; i < teamBacklog._array.length; i++) {
        let item = `
                <li class="list-item mdl-list__item mdl-list__item--three-line">
                    <span class="mdl-list__item-primary-content" onclick="showTeamMember(${i})">
                        <span>${teamBacklog._array[i]._name}</span>
                        <span class="mdl-list__item-text-body">${teamBacklog._array[i]._email}</span>
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="displayMemberHours(${i})">
                            <i class="material-icons" id="stats-mem${i}">bar_chart</i>
                            <div class="mdl-tooltip" data-mdl-for="stats-mem${i}">Show Hours</div>
                        </button>
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <!-- Colored icon button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteTeamMember(${i})">
                            <i class="material-icons" id="del-mem${i}">delete</i>
                            <div class="mdl-tooltip" data-mdl-for="del-mem${i}">Delete</div>
                        </button>
                    </span>
                </li>`;
        output += item;
    }
    if(output === ""){
        output = `<span class="mdl-layout-title" style="color: white">No Team Members.<br>Use + button below to start adding.</span>`;
    }
    document.getElementById("team-list").innerHTML = output;
}

/**
 * Display a member's information in the dialog modal
 */
function showTeamMember(index){
    // Open the dialog
    let dialog = document.querySelector('dialog');
    dialog.showModal()
    dialogPolyfill.registerDialog(dialog);

    // Disable the save button
    document.getElementById("saveMember").disabled = true;

    // Put the member's name in the input box and disable it
    let name = document.getElementById("memberName");
    name.parentElement.classList.add("is-dirty");
    name.disabled = true;
    name.value = teamBacklog._array[index].name;

    // Put the member's email in the input box and disable it
    let email = document.getElementById("memberEmail");
    email.parentElement.classList.add("is-dirty");
    email.disabled = true;
    email.value = teamBacklog._array[index].email;
}

/**
 * Open the dialog to add a new team member
 */
function add_team_member(){
    let dialog = document.querySelector('dialog');
    dialog.showModal()
    dialogPolyfill.registerDialog(dialog);
    // Add functionality to the Save button
    document.getElementById("saveMember").addEventListener('click', createTeamMember);
}

/**
 * Close the dialog
 */
function closeDialog(){
    // Close the dialog
    let dialog = document.querySelector('dialog');
    dialog.close();

    // Return the Save button to its initial state
    document.getElementById("saveMember").removeEventListener('click', createTeamMember);
    document.getElementById("saveMember").disabled = false;

    // Clear all fields and enable them
    document.getElementById("memberName").value = "";
    document.getElementById("memberName").disabled = false;
    document.getElementById("memberEmail").value = "";
    document.getElementById("memberEmail").disabled = false;
}

function get_current_sprint(){
    for (let i = 0; i < sprintBacklog._array.length; i++) {
        if(sprintBacklog._array[i]._status === "In Progress"){
            sprintKey = i;
            updateLSData(SPRINT_KEY, sprintKey)
        }
    }
}

function total_time_between_time(start_date, end_date){
    let total_array = []
    // runs through all team members
    for (let i = 0; i < teamBacklog._array.length; i++) {
        // sets the hours as 0
        let value = 0
        // runs through all tasks in sprint
        for (let j = 0; j < sprintBacklog._array[sprintKey]._tasks.length; j++) {
            // Checks if the task is equal to the member
            if (sprintBacklog._array[sprintKey]._tasks[j]._assigned === teamBacklog._array[i]) {
                // runs through all the time in the task logged
                for (let k = 0; k < this._loggedTime.length; k++) {
                    // checks if the logged time is in the start and end date wanted
                    if (start_date <= sprintBacklog._array[sprintKey]._tasks[j]._assigned._loggedTime[k][0] <= end_date) {
                        // adds the value of the time
                        value += sprintBacklog._array[sprintKey]._tasks[j]._assigned._loggedTime[k][1]
                    }
                }
            }
        }
        // adds the members name and hours
        total_array.push([teamBacklog._array[i]._name, value])
    }
    console.log(total_array)
    return total_array
}


function displayMemberHours(index){
    updateLSData(TEAM_KEY, index);
    window.location.href = 'persons_time.html';
}

function displayTeamHours(){
    window.location.href = 'team_time_overview.html';
}

displayTeamBacklog();


displayTeamBacklog();
get_current_sprint();
total_time_between_time();