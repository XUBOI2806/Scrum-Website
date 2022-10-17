/**
 * File Name: team_time_overview.js
 * Description: Contains the functionality for the team hours overview page
 *  Includes listing team members with the hours they've worked
 * ID: Team 2
 * Last Modified: 16/10/22
 */

"use strict";

/**
 * Displays list of team members with the hours they've worked
 */
function showList() {
    // display all team members
    for (let i = 0; i < teamBacklog._array.length; i++){
        let teamMember = document.createElement("li");
        teamMember.className = "mdl-list__item";
        teamMember.id = teamBacklog._array[i]._name;
        let textSpan = document.getElementById("member-list");
        textSpan.append(teamMember);

        document.getElementById(teamBacklog._array[i]._name).innerText = teamBacklog._array[i]._name;
    }
    // display all team member time
    for (let i = 0; i < teamBacklog._array.length; i++){
        let teamMemberTime = document.createElement("li")
        teamMemberTime.className = "mdl-list__item";
        teamMemberTime.id = teamBacklog._array[i]._name + " time";
        let textSpan = document.getElementById("time-list");
        textSpan.append(teamMemberTime);

        let totalTime = 0;
        let startDate = document.getElementById("startDate");
        let endDate = document.getElementById("endDate");
        if(startDate.value === "" || endDate.value === ""){
            for (let j = 0; j < teamBacklog._array[i]._loggedTime.length; j++){
                let loggedDate = teamBacklog._array[i]._loggedTime[j][0];
                totalTime += teamBacklog._array[i]._loggedTime[j][1];
            }
        } else {
            startDate = new Date(startDate.value);
            endDate = new Date(endDate.value);
            for (let j = 0; j < teamBacklog._array[i]._loggedTime.length; j++){
                let loggedDate = teamBacklog._array[i]._loggedTime[j][0];
                if (startDate >= loggedDate && loggedDate <= endDate){
                    totalTime += teamBacklog._array[i]._loggedTime[j][1];
                }
            }
        }
        document.getElementById(teamBacklog._array[i]._name + " time").innerText = totalTime.toString();
    }


}

/**
 * Displays the html of the page
 */
function displayPage() {
    let page = `<div class="team-dates">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder"
                     style="width: 35%">
                    <input class="mdl-textfield__input" type="date" id="startDate" placeholder="DD/MM/YYYY">
                    <label class="mdl-textfield__label" for="startDate">Start Date</label>
                    <span id="startDateError" class="mdl-textfield__error">Start Date today or after required</span>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder"
                     style="width: 35%">
                    <input class="mdl-textfield__input" type="date" id="endDate" placeholder="DD/MM/YYYY">
                    <label class="mdl-textfield__label" for="endDate">End Date</label>
                    <span id="endDateError" class="mdl-textfield__error">End Date must be after start date.</span>
                </div>
                <div class="btn-holder">
                    <button type="button" class="hover-grey mdl-button mdl-js-button mdl-button--raised" onclick="showList()">Set</button>
                </div>
            </div>
            <div style="margin: auto; text-align: center">
                <h3 id="team_total_time">Total Time: </h3>
            </div>
            <div class="content-grid mdl-grid" style="height: 80%;">
                <div class="mdl-cell mdl-cell--3-col mdl-cell--1-col-tablet" style="position: relative">
                    <div class="btn-holder">
                        <button type="button" class="hover-grey mdl-button mdl-js-button mdl-button--raised" style="position: absolute; bottom: 5px; right: 5px" onclick="backToTeam()">Back</button>
                    </div>
                </div>
                <!-- The time container (green rectangle) -->
                <div class="list-container mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet" id="content" style="">
                    <!-- Team member name column -->
                    <div class="team-column">
                        <h3 class="container-title">Name</h3>
                        <ul class="mdl-list" id="member-list">
                        </ul>
                    </div>
                    <!-- Team member time worked -->
                    <div class="team-column">
                        <h3 class="container-title">Time</h3>
                        <ul class="mdl-list" id="time-list">
                        </ul>
                    </div>
                </div>
            </div>`

    document.getElementById("time_overview").innerHTML = page;
}

/**
 * Takes user back to the My Team page
 */
function backToTeam(){
    window.location.href = 'team.html';
}

displayPage();
showList();