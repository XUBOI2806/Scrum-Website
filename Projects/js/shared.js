
/**
 * File Name: shared.js
 * Description: Contains the classes, as well as keys and
 *  functionality for storing data in local storage.
 * ID: Team 2
 * Last Modified: 29/09/22
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
     * @param {Object} timeTracking
     * @param {String} taskType
     */
    constructor(
        title,
        description,
        status,
        priority,
        assigned,
        timeTracking = [],
        taskType
    ) {
        this._title = title;
        this._description = description;
        this._status = status;
        this._priority = priority;
        this._assigned = assigned;
        this._tag = [];
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

    get tag() {
        return this._tag;
    }

    removeTag(){
        this._tag = [];
    }

    addTag(value) {
        this._tag.push(value);
    }

    get timeTracking() {
        return this._timeTracking;
    }

    set timeTracking(value) {
        this._timeTracking = value;
    }

    editTask(title, description, status, priority, assigned, tag, timeTracking, taskType) {
        this._title = title;
        this._description = description;
        this._status = status;
        this._priority = priority;
        this._assigned = assigned;
        this._tag = tag;
        this._timeTracking = timeTracking;
        this._taskType = taskType;
    }

    fromData(data) {
        this._title = data._title;
        this._description = data._description;
        this._status = data._status;
        this._priority = data._priority;
        let person = new Person();
        person.fromData(data._assigned);
        this._assigned = person;
        this._tag = [];
        for (let i = 0; i < data._tag.length; i++) {
            this._tag.push(data._tag[i]);
        }
        this._timeTracking = data._timeTracking;
        this._taskType = data._taskType
    }
}
class Sprint {
    /**
     * @param {String} title
     * @param {Date} startDate
     * @param {Date} endDate
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

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
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

    editSprint(title, startDate, endDate, tasks) {
        this._title = title;
        this._startDate = startDate;
        this._endDate = endDate;
        this._tasks = tasks;
    }

    fromData(data) {
        this._title = data._title;
        this._startDate = new Date(data._startDate);
        this._endDate = new Date(data._endDate);
        this._status = data._status;
        this._tasks = [];
        for (let i = 0; i < data._tasks.length; i++) {
            let task = new Task();
            task.fromData(data._tasks[i]);
            this._tasks.push(task);
        }
    }
}

class Person {
    /**
     * @param {String} name
     * @param {String} email
     * @param {Number} loggedTime
     */
    constructor(name, email) {
        this._name = name;
        this._email = email;
        this._loggedTime = [];
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

    get loggedTime(){
        return this._loggedTime;
    }

    addLoggedTime(value){

        this._loggedTime.push(value);
    } 

    fromData(data) {
        this._name = data._name;
        this._email = data._email;
        this._loggedTime = [];
        for (let i = 0; i < data._loggedTime.length; i++) {
            this._loggedTime.push(data._loggedTime[i]);
        }
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
        this._array = [];
        for (let i = 0; i < data._array.length; i++) {
            let sprint = new Sprint();
            sprint.fromData(data._array[i]);
            this._array.push(sprint);
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
    return localStorage.getItem(key) != null;

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
    }
    return data;
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
    // Restore data into vacationList
    sprintKey = retrieveLSData(SPRINT_KEY);
}

if (checkLSData(TASK_KEY)) {
    // Restore data into vacationList
    taskKey = retrieveLSData(TASK_KEY);
}