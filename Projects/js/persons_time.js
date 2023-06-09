/**
 * File Name: persons_time.js
 * Description: Contains the functionality for generating
 *  a bar chart showing the work completed each day by the
 *  chosen team member
 * ID: Team 2
 * Last Modified: 17/10/22
 */

"use strict";

/**
 * Shows the page content
 */

function displayPage() {
    // Getting person and the current sprint
    let currentSprint = null;
    for (let i = 0; i < sprintBacklog._array.length; i++) {
        if (sprintBacklog._array[i]._status === "In Progress") {
            currentSprint = sprintBacklog._array[i]
        }
    }

    // Collecting all logged time in to html
    let startDate = currentSprint._startDate.setHours(0,0,0,0);
    let today = new Date().setHours(0,0,0,0);

    // Variables to be input to the graph
    let xlabels = [];
    let barGraphData = [];
    let barGraphColours = [];
    let barGraphBorders = [];

    
    let total_effort = 0;
    let day = 1;
    // For each day the sprint has been ongoing, get the amount of effort spent
    for (let i = startDate; i <= today; i+=(24*3600*1000)) {
        let dayEffort = 0;
        xlabels.push('Day ' + day.toString());
        day += 1;
        for (let j = 0; j < currentSprint._tasks.length; j++) {
            if (currentSprint._tasks[j]._assigned._email === teamBacklog._array[teamKey]._email){
                for (let k = 0; k < currentSprint._tasks[j]._timeTracking.length; k++) {
                    if(currentSprint._tasks[j]._assigned._loggedTime[k][0] === i) {         // if (date of logged time == day within sprint
                        dayEffort += currentSprint._tasks[j]._assigned._loggedTime[k][1] * 4;
                        total_effort += currentSprint._tasks[j]._assigned._loggedTime[k][1] * 4;
                    }
                }
            }
        }

        barGraphData.push(dayEffort);
        barGraphColours.push('rgba(255, 99, 132, 0.2)');
        barGraphBorders.push('rgba(255, 99, 132, 0.2)');
    }


    let page = `
                <div class="content-grid mdl-grid">
                    <div class="mdl-cell mdl-cell--3-col"></div>
                    <div class="mdl-cell mdl-cell--6-col">
                        <h3 style="color:#666666">${teamBacklog._array[teamKey].name}</h3>
                        <span style="text-align: center"><h3>Total Effort: ${total_effort.toString()} Hours</h3></span>
                        <div class="persons-effort">
                            <canvas id="persons-effort-chart" width="500" height="350"></canvas>
                        </div>
                    </div>
                </div`;
    document.getElementById("persons-time-content").innerHTML = page;

    let personsChart = new Chart(document.getElementById("persons-effort-chart").getContext('2d'), {
            type: 'bar',
            data: {
                labels: xlabels,
                datasets: [{
                    label: 'Hours Worked',
                    data: barGraphData,
                    backgroundColor: barGraphColours,
                    borderColor: barGraphBorders,
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
}

displayPage()