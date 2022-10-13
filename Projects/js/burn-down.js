
let labelArrayIV = [];
let dataArrayIV = [];
idealV();
function idealV() {
  let totalSP = 0;
  let numDays = 0;

  for (let i = 0; i < sprintBacklog._array.length; i++) {
    if (sprintBacklog._array[i].status == "In Progress") {
      let sprintT = sprintBacklog._array[i].tasks;
      let numTime =
        new Date(sprintBacklog._array[i]._endDate).getTime() -
        new Date(sprintBacklog._array[i].startDate).getTime();
      numDays = numTime / (1000 * 3600 * 24);
      console.log(numDays);
      for (let j = 0; j < sprintT.length; j++) {
        console.log(sprintT[j]._effort);
        totalSP += parseInt(sprintT[j]._effort);
      }
    }
}
  for (let i = 0; i <= numDays; i++) {
    labelArrayIV.push(i + 1);
  }
  let totalHrs = totalSP * 4;
  let avgDay = totalHrs / numDays;
  dataArrayIV.push(totalHrs);
  while (dataArrayIV.length != numDays) {
    let val = totalHrs - avgDay;
    dataArrayIV.push(val);
    totalHrs = val;
  }
  dataArrayIV.push(0);
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
    ],
  },
  options: {
    title: {
      display: true,
      text: "Ideal Velocity For Sprint (in hours)",
    },
  },
});
