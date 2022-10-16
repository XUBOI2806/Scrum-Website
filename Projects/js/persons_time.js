"use strict";

function displayPage() {
    // Getting person and the current sprint
    let currentSprint = null;
    for (let i = 0; i < sprintBacklog._array.length; i++) {
        if (sprintBacklog._array[i]._status == "In Progress") {
            currentSprint = sprintBacklog._array[i]
        }
    }

    // Collecting all logged time in to html
    let startDate = currentSprint._startDate;
    let today = new Date();

    // Variables to be input to the graph
    let xlabels = [];
    let barGraphData = [];
    let barGraphColours = [];
    let barGraphBorders = [];

    
    let total_effort = 0;
    let day = 1;
    // For each day the sprint has been ongoing, get the amount of effort spent
    teamBacklog._array[teamKey].addLoggedTime([new Date(2022,9,17),3])
    console.log(startDate)
    today.setDate(today.getDate() +2)
    console.log(today)
    for (let i = startDate; i <= today; i.setDate(i.getDate() + 1)) {
        let dayEffort = 0;
        xlabels.push('Day ' + day.toString());
        day += 1;
        console.log(i)
        for (let j = 0; j < teamBacklog._array[teamKey]._loggedTime.length; j++) {
            console.log(teamBacklog._array[teamKey]._loggedTime[j][0].getTime())
            console.log(i.getTime())
            if (teamBacklog._array[teamKey]._loggedTime[j][0].getTime() == i.getTime()) {         // if (date of logged time == day within sprint)
                dayEffort += teamBacklog._array[teamKey]._loggedTime[j][1] * 4;
                total_effort += teamBacklog._array[teamKey]._loggedTime[j][1] * 4;
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
                        <span style="text-align: center"><h3>Total Effort: ${total_effort.toString()} Story Points</h3></span>
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