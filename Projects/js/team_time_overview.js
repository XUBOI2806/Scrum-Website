
function showList() {
    // display all team members
    for (let i = 0; i < teamBacklog._array.length; i++){
        let teamMember = document.createElement("li");
        teamMember.id = teamBacklog._array[i]._name;
        teamMember.className = "mdl-list__item";
        let textSpan = document.getElementById("member-list");
        textSpan.append(teamMember);

        document.getElementById(teamBacklog._array[i]._name).innerText = teamBacklog._array[i]._name;
    }
    // display all team member time



}

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
                    <button type="button" class="hover-grey mdl-button mdl-js-button mdl-button--raised" onclick="">Set</button>
                </div>
            </div>
            <div style="margin: auto; text-align: center">
                <h3 id="team_total_time">Total Time: </h3>
            </div>
            <div class="content-grid mdl-grid" style="height: 80%;">
                <div class="mdl-cell mdl-cell--3-col mdl-cell--1-col-tablet" style="position: relative">
                    <div class="btn-holder">
                        <button type="button" class="hover-grey mdl-button mdl-js-button mdl-button--raised" style="position: absolute; bottom: 5px; right: 5px" onclick="">Back</button>
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
                        <ul class="mdl-list">
                        </ul>
                    </div>
                </div>
            </div>`

    document.getElementById("time_overview").innerHTML = page;
}

displayPage();
showList();