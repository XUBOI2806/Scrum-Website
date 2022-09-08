
"use strict";

function createTeamMember() {
    // Take in user inputs
    let name = document.getElementById("memberName").value;
    let email = document.getElementById("memberEmail").value;

    // Create person
    let person = new Person(name, email);

    // Check that all inputs are valid
    if (validateInputs(name, email)) {
        // Add to local storage
        teamBacklog.addTask(person);
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


function deleteTeamMember(index){
    teamBacklog.deleteTask(index);
    updateLSData(TEAMBACKLOG_KEY, teamBacklog);
    displayTeamBacklog();
}

function displayTeamBacklog() {
    let output = "";
    console.log(teamBacklog);
    for (let i = 0; i < teamBacklog._taskArray.length; i++) {
        let item = `
                <li class="list-item mdl-list__item mdl-list__item--three-line">
                    <span class="mdl-list__item-primary-content" onclick="showTeamMember(${i})">
                        <span>${teamBacklog._taskArray[i]._name}</span>
                        <span class="mdl-list__item-text-body">${teamBacklog._taskArray[i]._email}</span>
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

function showTeamMember(index){
    let dialog = document.querySelector('dialog');
    if (!dialog.showModal()){
        dialogPolyfill.registerDialog(dialog);
    }

    let name = document.getElementById("memberName");
    name.parentElement.classList.add("is-dirty");
    name.disabled = true;
    name.value = teamBacklog._taskArray[index].name;

    let email = document.getElementById("memberEmail");
    email.parentElement.classList.add("is-dirty");
    email.disabled = true;
    email.value = teamBacklog._taskArray[index].email;

}

function add_team_member(){
    let dialog = document.querySelector('dialog');
    if (!dialog.showModal()){
        dialogPolyfill.registerDialog(dialog);
    }
}
function closeDialog(){
    let dialog = document.querySelector('dialog');
    dialog.close();
    // clear all fields
    document.getElementById("memberName").value = "";
    document.getElementById("memberEmail").value = "";
}


displayTeamBacklog();

