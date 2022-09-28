/*
 * FILENAME :  shared.js
 *
 * DESCRIPTION : This JavaScript contains the classes, as well as keys and functionality for storing data
 * in local storage
 *
 */

"use strict";
// Predefined keys for LS
const TASK_KEY = "currentTaskIndex";
const SPRINT_KEY = "currentSprintIndex";
const PRODUCTBACKLOG_KEY = "productBacklogData";
const SPRINTBACKLOG_KEY = "sprintBacklogData";
const TEAMBACKLOG_KEY = "teamBacklogData";


class Task {
    /**
     * @param {String} title
     * @param {String} description
     * @param {String} status
     * @param {String} priority
     * @param {Object} assigned
     * @param {List} tags
     * @param {Number} timeTracking
     * @param {String} taskType
     */
    constructor(
        title,
        description,
        status,
        priority,
        assigned,
        timeTracking = 0,
        taskType
    ) {
        this._title = title;
        this._description = description;
        this._status = status;
        this._priority = priority;
        this._assigned = assigned;
        this._tags = [];
        this._timeTracking = timeTracking;
        this._taskType = taskType
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
    }

    get assigned() {
        return this._assigned;
    }

    get taskType() {
        return this._taskType;
    }

    set assigned(value) {
        this._assigned = value;
    }

    get tags() {
        return this._tags;
    }

    addTag(tagName, tagColour = "#dedede") {
        this._tags.push([tagName, tagColour]);
    }

    get timeTracking() {
        return this._timeTracking;
    }

    set timeTracking(value) {
        this._timeTracking = value;
    }

    editTask(title, description, status, priority, assigned, tags, timeTracking) {
        this._title = title;
        this._description = description;
        this._status = status;
        this._priority = priority;
        this._assigned = assigned;
        this._tags = tags;
        this._timeTracking = timeTracking;
        this._taskType = taskType;
    }

    fromData(data) {
        this._title = data._title;
        this._description = data._description;
        this._status = data._status;
        this._priority = data._priority;
        this._assigned = data._assigned;
        this._tags = data._tags;
        this._timeTracking = data._timeTracking;
        this._taskType = data._taskType
    }
}

class Sprint {
    /**
     * @param {String} title
     * @param {Date} startDate
     * @param {Date} endDate
     * @param {String} status
     * @param {List} tasks
     */
    constructor(
        title,
        startDate,
        endDate,
    ) {
        this._title = title;
        this._startDate = startDate;
        this._endDate = endDate;
        this._status = "Not Started";
        this._tasks = [];
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(value) {
        this._startDate = value;
    }

    get endDate() {
        return this._endDate;
    }

    set endDate(value) {
        this._endDate = value;
    }

    get tasks() {
        return this._tasks;
    }

    addTask(task) {
        this._tasks.push(task);
    }

    deleteTask(taskIndex) {
        this._tasks.splice(taskIndex, 1)
    }

    editTask(title, startDate, endDate, tasks) {
        this._title = title;
        this._startDate = startDate;
        this._endDate = endDate;
        this._tasks = tasks;
    }

    fromData(data) {
        this._title = data._title;
        this._startDate = data._startDate;
        this._endDate = data._endDate;
        this._tasks = data._tasks;
    }
}

class Person {
    /**
     * @param {String} name
     * @param {String} email
     */
    constructor(name, email) {
        this._name = name;
        this._email = email;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    fromData(data) {
        this._name = data._name;
        this._email = data._email;
    }
}

class Backlog {
    constructor() {
        this._array = [];
        if (this.constructor === Backlog) {
            throw new Error("Abstract class cannot be instantiated");
        }
    }

    add(newTask) {
        this._array.push(newTask);
    }

    delete(taskIndex) {
        throw new Error("Method deleteTask must be implemented");
    }

    fromData(data) {
    }
}

class SprintBacklog extends Backlog{
    constructor() {
        super();
    }

    add(newSprint){
        this._array.push(newSprint);
    }

    delete(sprintIndex){
        this._array.splice(sprintIndex, 1)
    }

    fromData(data) {
        this._taskArray = [];
        for (let i = 0; i < data._taskArray.length; i++) {
            let task = new Task();
            task.fromData(data._taskArray[i]);
            this._taskArray.push(task);
        }
    }

}

class ProductBacklog extends Backlog {
    constructor() {
        super();
    }

    add(newTask) {
        this._array.push(newTask);
    }

    delete(taskIndex) {
        this._array.splice(taskIndex, 1)
    }

    fromData(data) {
        this._array = [];
        for (let i = 0; i < data._array.length; i++) {
            let task = new Task();
            task.fromData(data._array[i]);
            this._array.push(task);
        }
    }
}

class TeamBacklog extends Backlog{
    constructor() {
        super();
    }

    add(newTask){
        this._array.push(newTask);
    }

    delete(taskIndex){
        this._array.splice(taskIndex, 1)
    }

    fromData(data) {
        this._array = [];
        for (let i = 0; i < data._array.length; i++) {
            let person = new Person();
            person.fromData(data._array[i]);
            this._array.push(person);
        }
    }
}


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

// Global productBacklog and sprintBacklog variable
let teamBacklog = new TeamBacklog();
let productBacklog = new ProductBacklog();
let sprintBacklog = new SprintBacklog();
let sprintKey = 0;
let taskKey = 0;

if (checkLSData(PRODUCTBACKLOG_KEY)) {
    let data = retrieveLSData(PRODUCTBACKLOG_KEY);
    // Restore data into vacationList
    productBacklog.fromData(data);
}

if (checkLSData(TEAMBACKLOG_KEY)) {
    let data = retrieveLSData(TEAMBACKLOG_KEY);
    // Restore data into vacationList
    teamBacklog.fromData(data);
}

if (checkLSData(SPRINTBACKLOG_KEY)) {
    let data = retrieveLSData(SPRINTBACKLOG_KEY);
    // Restore data into vacationList
    sprintBacklog.fromData(data);
}

if (checkLSData(SPRINT_KEY)) {
    let data = retrieveLSData(SPRINT_KEY);
    // Restore data into vacationList
    sprintKey = data;
}

if (checkLSData(TASK_KEY)) {
    let data = retrieveLSData(TASK_KEY);
    // Restore data into vacationList
    taskKey = data;
}