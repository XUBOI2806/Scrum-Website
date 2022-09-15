function add_sprint(){
    let dialog = document.querySelector("dialog");
    dialog.showModal();
    dialogPolyfill.registerDialog(dialog);
}

/**
 * Close the dialog
 */
function closeDialog() {
    let dialog = document.querySelector("dialog");
    dialog.close();
}