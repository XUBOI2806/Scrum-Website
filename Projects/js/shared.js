

"use strict";
// Predefined keys for LS
const TASK_KEY = "currentTaskIndex";
const SPRINT_KEY = "currentSprintIndex";
const TASKARRAY_KEY = "taskArrayData";



/**
 * checkLSData function
 * Used to check if any data in LS exists at a specific key
 * @param {string} key LS Key to be used
 * @returns true or false representing if data exists at key in LS
 */
function checkLSData(key) {
    if (localStorage.getItem(key) != null) {
        return true;
    }
    return false;
}
/**
 * retrieveLSData function
 * Used to retrieve data from LS at a specific key.
 * @param {string} key LS Key to be used
 * @returns data from LS in JS format
 */
function retrieveLSData(key) {
    let data = localStorage.getItem(key);
    try {
        data = JSON.parse(data);
    } catch (err) {
    } finally {
        return data;
    }
}
/**
 * updateLSData function
 * Used to store JS data in LS at a specific key
 * @param {String} key LS key to be used
 * @param {any} data data to be stored
 */
function updateLSData(key, data) {
    let json = JSON.stringify(data);
    localStorage.setItem(key, json);
}
// Global vacationList variable
let taskList = new Backlog();
// Check if data available in LS before continuing
if (checkLSData(VACATIONARRAY_KEY)) {
    // If data exists, retrieve it
    let data = retrieveLSData(VACATIONARRAY_KEY);
    // Restore data into vacationList
    vacationList.fromData(data);
}

