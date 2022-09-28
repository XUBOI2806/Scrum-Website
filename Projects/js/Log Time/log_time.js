"use strict";

function addEffort(newEffort) {
    // Retrieve total effort from local storage
    // Add newEffort to total effort
    // Update local storage
}

function displayPage() {
    let tempTask = new Task("Temp name", "Temp description", "Temp status", "Priority", new Person("Temp Name", "temp@gmail.com"), 0, "Temp task type")
    let page = `
                <div class="content-grid mdl-grid">
                    <div class="mdl-cell mdl-cell--3-col"></div>
                    <div class="list-container mdl-cell mdl-cell--3-col">
                        <div class="task-info">
                            <h4>Name</h4>
                            <span>${tempTask.title}</span>
                            <h4>Description</h4>
                            <span>${tempTask.description}</span>
                            <h4>Persons Assigned</h4>
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
                                <label class="mdl-textfield__label" for="sample2">Hours</label>
                                <span class="mdl-textfield__error">Input is not a number</span>
                            </div>
                        </form>
                        <button class="mdl-button mdl-js-button mdl-button--raised" onClick="addEffort(${document.getElementById("loggedEffort")})">Add</button>
                        <h3>Total Time</h3>
                        <span>${tempTask.timeTracking} Story Points</span>
                    </div>
                </div>`;
    document.getElementById("log-time-content").innerHTML = page;
}

displayPage()