"use strict";

/**
 * Show all Tasks in a list
 */
function displayTasks() {
    let notStartedOutput = "";
    let inProgressOutput = "";
    let doneOutput = "";

    // Iterate through saved tasks in the backlog
    for (let i = 0; i < sprintBacklog._array[sprintKey]._tasks.length; i++) {
        // Create html to display the task info
        let item = `
                <li class="list-item mdl-list__item mdl-list__item">
                    <span class="mdl-list__item-primary-content">
                        <span>${sprintBacklog._array[sprintKey]._tasks[i]._title}</span>
                    </span>
                    <span class="mdl-list__item-secondary-content">`
        if (sprintBacklog._array[sprintKey]._tasks[i]._status == "Not Started"){
            item += `
                        <!-- Add to Sprint Backlog button -->
                        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="moveTaskToInProgress(${i})">
                            <i class="material-icons">arrow_forward</i>
                        </button>
                    </span>
                </li>`
            notStartedOutput += item;
        }
        else if(sprintBacklog._array[sprintKey]._tasks[i]._status == "In Progress"){
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

function moveTaskToInProgress(index) {
    sprintBacklog._array[sprintKey].addTask(productBacklog._array[index])
    productBacklog.delete(index)

}

function moveTaskToDone(index) {
    sprintBacklog._array[sprintKey].addTask(productBacklog._array[index])
    productBacklog.delete(index)
}

displayTasks()