
"use strict";

function createTeamMember() {
    // take in user inputs
    let name = document.getElementById("memberName").value;
    let email = document.getElementById("memberEmail").value;

    let person = new Person(name, email);
    updateLSData(PERSON_KEY, person)
    teamBacklog.addTask(person);
    updateLSData(TEAMBACKLOG_KEY, teamBacklog)
    displayTeamBacklog();
    closeDialog();
}

function deleteTeamMember(index){
    teamBacklog.deleteTask(index);
    displayTeamBacklog();
}

function displayTeamBacklog() {
    let output = "";
    for (let i = 0; i < teamBacklog._array.length; i++) {
        let item = `<ul class="mdl-list">
                <li class="PBI mdl-list__item mdl-list__item--three-line">
                    <span class="mdl-list__item-primary-content">
                        <span>${productBacklog.tasks[i].assigned.name}</span>
                        <span class="mdl-list__item-text-body">${productBacklog._array[i]._description}</span>
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <!-- Colored icon button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
                            <i class="material-icons">edit</i>
                        </button>
                    </span>
                    <span class="mdl-list__item-secondary-content">
                        <!-- Colored icon button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="deleteTask(${i})">
                            <i class="material-icons">delete</i>
                        </button>
                    </span>
                </li>
            </ul>`;
        output += item;
    }
    document.getElementById("content").innerHTML = output;
}

// Displays the list of vacations when the page loads
displayTeamBacklog();
