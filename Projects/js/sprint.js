
/**
 * Open the add sprint dialog
 */
function add_sprint(){
    let dialog = document.querySelector("dialog");
    dialog.showModal();
    dialogPolyfill.registerDialog(dialog);
}
// IN ACTIVE SPRINT CODE
function displayBackLogTasks(){
    let output = "";

  // Iterate through saved tasks in the backlog
  for (let i = 0; i < productBacklog._taskArray.length; i++) {
    let temp = "";
    for (let i = 0; i < productBacklog._taskArray.length; i++) {
      for (let j = i + 1; j < productBacklog._taskArray.length; j++) {
        if (
          parseInt(productBacklog._taskArray[i]._timeTracking) <
            parseInt(productBacklog._taskArray[j]._timeTracking)
        ) {
          temp = productBacklog._taskArray[i];
          productBacklog._taskArray[i] = productBacklog._taskArray[j];
          productBacklog._taskArray[j] = temp;
        }
      }
    }

    console.log()

    let item = `
    <li class="list-item mdl-list__item" onclick="showManageSprint(0)">
                            <span class="mdl-list__item-primary-content" onclick="showTask()">
                                <span>${productBacklog._taskArray[i].title}</span>
                            </span>
                            <span class="mdl-list__item-secondary-content">
                                <!-- Add to Sprint Backlog button -->
                                <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" onclick="">
                                  <i class="material-icons">add</i>
                                </button>
                            </span>
                        </li>`
    output += item;
    }
    // Add to the UI list
    document.getElementById("backlog-list").innerHTML = output;
                        
}

displayBackLogTasks()



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