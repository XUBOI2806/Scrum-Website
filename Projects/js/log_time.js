/**
 * File Name: log_time.js
 * Description: Contains the functionality for logging
 *  the time a team member has worked.
 * ID: Team 2
 * Last Modified: 17/10/22
 */

"use strict";

/**
 * Adds time to a team member's list
 */
function addEffort() {
    // **Update task total time**
    let time = new Date(document.getElementById("logDate").value).setHours(0,0,0,0);
    let effort = document.getElementById("loggedEffort").value;
    if(validate(effort, time)){
        let loggedTime = [time, effort];
        sprintBacklog._array[sprintKey]._tasks[taskKey]._assigned.addLoggedTime(loggedTime);
        sprintBacklog._array[sprintKey]._tasks[taskKey].addTimeTracking(loggedTime);
        for(let i = 0; i < teamBacklog._array.length; i++){
            if(teamBacklog._array[i]._name === sprintBacklog._array[sprintKey]._tasks[taskKey]._assigned._name){
                teamBacklog._array[i].addLoggedTime(loggedTime);
            }
        }
        updateLSData(SPRINTBACKLOG_KEY, sprintBacklog);
        updateLSData(TEAMBACKLOG_KEY, teamBacklog);
        displayPage();
    }
}

/**
 * Checks that the inputs are valid
 * @param effort    the effort to be logged for the task
 * @param date      the date being logged
 * @returns {boolean}   true/false whether they are valid inputs
 */
function validate(effort, date){
    let retVal = true;
    let start = new Date(sprintBacklog._array[sprintKey]._startDate).setHours(0, 0, 0, 0);
    let end = new Date(sprintBacklog._array[sprintKey]._endDate).setHours(0, 0, 0, 0);
    // Check that start date is not empty and is after today
    if((isNaN(date)) || (start >= date) || (date >= end)){
        document.getElementById("logDate").parentElement.classList.add("is-invalid");
        retVal = false;
    }
    if(effort === ""){
        document.getElementById("loggedEffort").parentElement.classList.add("is-invalid");
        retVal = false;
    }
    return retVal;
}

/**
 * Gets all the hours a team member has worked
 */
function getHours() {
    let hours = 0;
    let loggedTime = sprintBacklog._array[sprintKey]._tasks[taskKey]._timeTracking
    for (let i = 0; i < loggedTime.length; i++) {
        hours += parseInt(loggedTime[i][1])
    }
    return hours
}

/**
 * Takes user back to My Team page
 */
function back(){
    window.location.href = "manage_sprint_started.html";
}

/**
 * Shows page content
 */
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
                        <button type="button" class="hover-grey mdl-button mdl-js-button mdl-button--raised" onclick="back()">Back</button>
                    </div>
                    <div class="task-time mdl-cell mdl-cell--3-col">
                        <h3>Log Time</h3>
                        <form action="#">
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="loggedEffort">
                                <label class="mdl-textfield__label" for="sample2">Story Points</label>
                                <span class="mdl-textfield__error">Integer effort required</span>
                            </div>
                        </form>
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder" style="width: 49%">
                            <input class="mdl-textfield__input" type="date" id="logDate" placeholder="DD/MM/YYYY">
                            <label class="mdl-textfield__label" for="logDate">Log Date</label>
                            <span id="dateError" class="mdl-textfield__error">Date must be during the current sprint</span>
                        </div>
                        <button class="mdl-button mdl-js-button mdl-button--raised" onclick="addEffort()">Add</button>
                        <h3>Total Time</h3>
                        <span id="totalHours">${getHours()} Hours</span>
                    </div>
                </div>`;
    document.getElementById("log-time-content").innerHTML = page;
}

displayPage()