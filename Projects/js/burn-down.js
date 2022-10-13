let labelArrayIV = [];
let dataArrayIV = [];
let dataER = [];
let dataArrayAV = [];
let currentSprint = null;
let totalHrs = 0

idealV();
function idealV() {
  let totalSP = 0;
  let numDays = 0;

  for (let i = 0; i < sprintBacklog._array.length; i++) {
    if (sprintBacklog._array[i].status == "In Progress") {
        currentSprint = sprintBacklog._array[i];
      let sprintT = sprintBacklog._array[i].tasks;
      let numTime =
        new Date(sprintBacklog._array[i]._endDate).getTime() -
        new Date(sprintBacklog._array[i].startDate).getTime();
      numDays = numTime / (1000 * 3600 * 24);
      for (let j = 0; j < sprintT.length; j++) {
        console.log(sprintT[j]._effort);
        totalSP += parseInt(sprintT[j]._effort);
      }
    }
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
  while (dataArrayIV.length != numDays) {
    let val = hours - avgDay;
    dataArrayIV.push(val);
    hours = val;
  }
  dataArrayIV.push(0);
}

actualV()
function actualV() {
    for(let i = 0; i < currentSprint._tasks.length; i++){
        let currentTask = currentSprint._tasks[i]._timeTracking
        for(let j = 0; j < currentTask.length; j++){
            let date = new Date(currentTask[j][0]).getTime()
            let timeDate = date - new Date(currentSprint._startDate).getTime()
            let numDate = timeDate / (1000 * 3600 * 24);
            dataER[numDate] = parseInt(currentTask[j][1])
        }
    }
    let remainingE = totalHrs
    for(let i = 0; i < dataArrayAV.length; i++){
        dataArrayAV[i] = remainingE - dataER[i]
        remainingE = dataArrayAV[i]
    }
    console.log(dataArrayAV)
}
// timeTracking = (date, hr)

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
