"use strict";

function displayPage() {
    let temp = new Person("Temp Name", "temp@gmail.com");
    temp.addLoggedTime(['14/10/2022', 7])
    temp.addLoggedTime(['11/10/2022', 2])
    temp.addLoggedTime(['14/10/2022', 7])
    temp.addLoggedTime(['11/10/2022', 2])
    temp.addLoggedTime(['14/10/2022', 7])
    temp.addLoggedTime(['11/10/2022', 2])
    temp.addLoggedTime(['14/10/2022', 7])
    temp.addLoggedTime(['11/10/2022', 2])
    temp.addLoggedTime(['14/10/2022', 7])
    temp.addLoggedTime(['11/10/2022', 2])
    temp.addLoggedTime(['14/10/2022', 7])
    temp.addLoggedTime(['11/10/2022', 2])

    // Collecting all logged time in to html
    let logged_time = ``;
    let total_effort = 0;
    for (let i = 0; i < temp.loggedTime.length; i++) {
        logged_time += `
                        <li class="list-item mdl-list__item mdl-list__item--one-line">
                            <div id="persons-effort-item">
                                <div>
                                    <span class="mdl-list__item-primary-content">${temp.loggedTime[i][0]}</span>
                                </div>
                                <div id="right">
                                    <span id="right" class="persons-logged-time mdl-list__item-secondary-content">${temp.loggedTime[i][1].toString()} Story Points</span>
                                </div>
                            </div>
                        </li>`
        total_effort += temp.loggedTime[i][1]
    }


    let page = `
                <div class="content-grid mdl-grid">
                    <div class="mdl-cell mdl-cell--3-col"></div>
                    <div class="mdl-cell mdl-cell--6-col">
                        <h3 style="color:#666666">${temp.name}</h3>
                        <span style="text-align: center"><h3>Total Effort: ${total_effort.toString()} Story Points</h3></span>
                        <div class="persons-effort list-container">
                            <ul id="logged-time-list" class="mdl-list">${logged_time}
                            </ul>
                        </div>
                    </div>
                </div`;
    document.getElementById("persons-time-content").innerHTML = page;
}

displayPage()