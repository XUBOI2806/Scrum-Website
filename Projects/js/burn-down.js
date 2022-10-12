

// function idealV(){
    let totalSP = 0

    for(let i = 0; i< sprintBacklog._array.length; i++){
        if(sprintBacklog._array[i].status == "In Progress"){
            let sprintT = sprintBacklog._array[i].tasks
            for(let j = 0; j<sprintT.length; j++){
                console.log(sprintT[j].timeTracking)
                totalSP +=  parseInt(sprintT[j].timeTracking)
            }
        }
    }
    let totalHrs = totalSP * 4  
// }

new Chart(document.getElementById("bd-chart"), {
    type: 'line',
    data: {
        labels: [1,2,3,4,5,6,7,8,9,10],
        datasets: [{
            data: [totalHrs,0],
            label: "Africa",
            borderColor: "#3e95cd",
            fill: false,
            lineTension: 0,
        }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'World population per region (in millions)'
        }
    }
});