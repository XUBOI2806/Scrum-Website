
/**
 * Open the add sprint dialog
 */


function add_sprint(){
    let dialog = document.querySelector("dialog");
    dialog.showModal();
    dialogPolyfill.registerDialog(dialog);
}

function createSprint(){
        // take in user inputs
    let sprintName = document.getElementById("sprintName").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    sprintList.push(sprintName)
    displaySprint()
    closeDialog()
}


function displaySprint() {
    let output = "";
  
    // Iterate through saved tasks in the backlog
    for (let i = 0; i < sprintList.length; i++) {
  
      // Create html to display the task info
      let item = `
        <li class="list-item mdl-list__item" onclick="showManageSprint(0)">
            <span class="mdl-list__item-primary-content" onclick="showTask()">
                <span>${sprintList[i]}</span>
            </span>
            <span class="mdl-list__item-secondary-content">
                <!-- Edit button -->
                <span>Status</span>
             </span>
        </li>`;
      output += item;
    }
    // Add to the UI list
    document.getElementById("sprint-list").innerHTML = output;
  }
  

/**
 * Close the dialog
 */
function closeDialog() {
    let dialog = document.querySelector("dialog");
    dialog.close();
}

function showManageSprint(index){
    // Check if it's status is not started, in progress, or completed
    // Open the corresponding page
}