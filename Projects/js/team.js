
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
    teamBacklog.delete(index);
    updateLSData(TEAMBACKLOG_KEY, teamBacklog);
    displayTeamBacklog();
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
                        <!-- Colored icon button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteTeamMember(${i})">
                            <i class="material-icons">delete</i>
                        </button>
                    </span>
                </li>`;
        output += item;
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

displayTeamBacklog();