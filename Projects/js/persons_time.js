"use strict";

function displayPage() {
    // Person needs to be get from local storage here
    let temp = new Person("Temp Name", "temp@gmail.com");

    // Collecting all logged time in to html
    let logged_time = ``;
    let total_effort = 0;
    for (let i = 0; i < temp.loggedTime.length; i++) {
        logged_time += `
                        <li class="list-item mdl-list__item mdl-list__item--one-line">
                            <span class="mdl-list__item-primary-content">
                                <span>${temp.loggedTime[i][0]}</span>
                                <span style="float: right">${temp.loggedTime[i][1].toString()} Story Points</span>
                            </span>
                        </li>`
        total_effort += temp.loggedTime[i][1]
    }


    let page = `
                <div class="content-grid mdl-grid">
                    <div class="mdl-cell mdl-cell--3-col"></div>
                    <div class="mdl-cell mdl-cell--6-col">
                        <h4>${temp.name}</h4>
                        <ul class="mdl-list">${logged_time}
                        </ul>
                        <span><h3>Total Effort: ${total_effort.toString()} Story Points</h3></span>
                    </div>
                </div`;
    document.getElementById("persons-time-content").innerHTML = page;
}

displayPage()