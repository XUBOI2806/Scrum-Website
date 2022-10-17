/**
 * File Name: burn-down.js
 * Description: Contains the functionality for creating the
 *  burndown chart of the current sprint
 * ID: Team 2
 * Last Modified: 17/10/22
 */

"use strict";

let labelArrayIV = [];
let dataArrayIV = [];
let dataER = [];
let dataArrayAV = [];
let totalHrs = 0

/**
 * Gets the ideal velocity of the sprint
 */
idealV();
function idealV() {
  let totalSP = 0;
  let numDays = 0;

  let sprintT = sprintBacklog._array[sprintKey].tasks;
  let numTime =
      new Date(sprintBacklog._array[sprintKey]._endDate).getTime() -
      new Date(sprintBacklog._array[sprintKey]._startDate).getTime();
  numDays = numTime / (1000 * 3600 * 24);
  for (let j = 0; j < sprintT.length; j++) {
      console.log(sprintT[j]._effort);
      totalSP += parseInt(sprintT[j]._effort);
  }

  for (let i = 0; i <= numDays; i++) {
    labelArrayIV.push(i + 1);
    dataER.push(0)
    dataArrayAV.push(0)
  }
  totalHrs = totalSP * 4;
  let avgDay = totalHrs / numDays;
  dataArrayIV.push(totalHrs);
  let hours = totalHrs
  while (dataArrayIV.length !== numDays) {
    let val = hours - avgDay;
    dataArrayIV.push(val);
    hours = val;
  }
  dataArrayIV.push(0);
}

/**
 * Calculates the actual velocity of the sprint
 */
actualV()
function actualV() {
    for(let i = 0; i < sprintBacklog._array[sprintKey]._tasks.length; i++){
        let currentTask = sprintBacklog._array[sprintKey]._tasks[i]._timeTracking
        for(let j = 0; j < currentTask.length; j++){
            let date = new Date(currentTask[j][0]).getTime()
            let timeDate = date - new Date(sprintBacklog._array[sprintKey]._startDate).getTime()
            let numDate = timeDate / (1000 * 3600 * 24);
            dataER[numDate] += parseInt(currentTask[j][1])
        }
    }
    let remainingE = totalHrs
    for(let i = 0; i < dataArrayAV.length; i++){
        dataArrayAV[i] = remainingE - dataER[i]
        remainingE = dataArrayAV[i]
    }
    for(let i = 1; i < dataER.length; i++){
      dataER[i] = dataER[i-1] + dataER[i]
    }
    console.log(dataArrayAV)
}
// timeTracking = (date, hr)

/**
 * Create the burndown chart
 */
new Chart(document.getElementById("bd-chart"), {
  type: "line",
  data: {
    labels: labelArrayIV,
    datasets: [
      {
        data: dataArrayIV,
        label: "Ideal Velocity",
        borderColor: "#3e95cd",
        fill: false,
        lineTension: 0,
      },
      {
        data: dataER,
        label: "Remaining Effort",
        borderColor: "#7cc25e",
        fill: false,
        lineTension: 0,
    },
    {
        data: dataArrayAV,
        label: "Actual Velocity",
        borderColor: "#8e5ea2",
        fill: false,
        lineTension: 0,
    }
    ],
  },
  options: {
    title: {
      display: true,
      text: "Ideal Velocity For Sprint (in hours)",
    },
  },
});
