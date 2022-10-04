"use strict";

function addEffort(name) {
    // get original data from ls
    let teamBacklog = new TeamBacklog();
    let data = retrieveLSData(TEAMBACKLOG_KEY);
    teamBacklog.fromData(data);
    let i = 0;
    let person = undefined;

    // find the correct person
    while (i < teamBacklog._array.length) {
        if (teamBacklog._array[i].name === name) {
            person = teamBacklog._array[i]
            break;
        }
        i++;
    }
    if (person === undefined){
        return
    }
    // **Update task total time**
    let loggedTime = (document.getElementById("logDate").value, document.getElementById("loggedEffort").value)
    person.addLoggedTime(loggedTime)
    updateLSData(TEAMBACKLOG_KEY, teamBacklog);
}

function displayPage() {
    let tempTask = new Task("Temp name", "Temp description", "Temp status", "Priority",
        new Person("bob", "temp@gmail.com"), 0, "Temp task type")
    let page = `
                <div class="content-grid mdl-grid">
                    <div class="mdl-cell mdl-cell--3-col"></div>
                    <div class="list-container mdl-cell mdl-cell--3-col">
                        <div class="task-info">
                            <h4>Name</h4>
                            <span>${tempTask.title}</span>
                            <h4>Description</h4>
                            <span>${tempTask.description}</span>
                            <h4>Person Assigned</h4>
                            <ul class="persons-list demo-list-two mdl-list">
                                <li class="mdl-list__item mdl-list__item--two-line">
                                    <span class="mdl-list__item-primary-content">
                                        <span>${tempTask.assigned.name}</span>
                                        <span class="mdl-list__item-sub-title">${tempTask.assigned.email}</span>
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
                        <button class="mdl-button mdl-js-button mdl-button--raised" onclick="addEffort('${tempTask.assigned.name}')">Add</button>
                        <h3>Total Time</h3>
                        <span id="totalHours">${tempTask.timeTracking} Hours</span>
                    </div>
                </div>`;
    document.getElementById("log-time-content").innerHTML = page;
}

displayPage()