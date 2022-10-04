"use strict";

function addEffort() {

    // **Update task total time**
    let loggedTime = (document.getElementById("logDate").value, document.getElementById("loggedEffort").value)
    sprintBacklog._array[sprintKey]._tasks[taskKey]._assigned.addLoggedTime(loggedTime)
    updateLSData(TEAMBACKLOG_KEY, teamBacklog);
}

function displayPage() {
    let page = `
                <div class="content-grid mdl-grid">
                    <div class="mdl-cell mdl-cell--3-col"></div>
                    <div class="mdl-cell mdl-cell--3-col">
                        <div class="task-info">
                            <h4>Name</h4>
                            <span>${sprintBacklog._array[sprintKey]._tasks[taskKey]._title}</span>
                            <h4>Description</h4>
                            <span>${sprintBacklog._array[sprintKey]._tasks[taskKey]._description}</span>
                            <h4>Person Assigned</h4>
                            <ul class="persons-list demo-list-two mdl-list">
                                <li class="mdl-list__item mdl-list__item--two-line">
                                    <span class="mdl-list__item-primary-content">
                                        <span>${sprintBacklog._array[sprintKey]._tasks[taskKey]._assigned._name}</span>
                                        <span class="mdl-list__item-sub-title">${sprintBacklog._array[sprintKey]._tasks[taskKey]._assigned._email}</span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="task-time mdl-cell mdl-cell--3-col">
                        <h3>Log Time</h3>
                        <form action="#">
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="loggedEffort">
                                <label class="mdl-textfield__label" for="sample2">Story Points</label>
                                <span class="mdl-textfield__error">Input is not a number</span>
                            </div>
                        </form>
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder" style="width: 49%">
                            <input class="mdl-textfield__input" type="date" id="logDate" placeholder="DD/MM/YYYY">
                            <label class="mdl-textfield__label" for="logDate">Log Date</label>
                            <span id="startDateError" class="mdl-textfield__error">Start Date today or before required</span>
                        </div>
                        <button class="mdl-button mdl-js-button mdl-button--raised" onclick="addEffort()">Add</button>
                        <h3>Total Time</h3>
                        <span id="totalHours"> Hours</span>
                    </div>
                </div>`;
    document.getElementById("log-time-content").innerHTML = page;
}

displayPage()