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
const PERSON_KEY = "personIndex";
const TEAMBACKLOG_KEY = "teamBacklogData";


class Task {
    /**
     * @param {String} title
     * @param {String} description
     * @param {String} status
     * @param {String} priority
     * @param {Object} assigned
     * @param {} tags
     * @param {Number} timeTracking
     */
    constructor(
        title,
        description,
        status,
        priority,
        assigned,
        timeTracking = 0
    ) {
        this._title = title;
        this._description = description;
        this._status = status;
        this._priority = priority;
        this._assigned = assigned;
        this._tags = [];
        this._timeTracking = timeTracking;
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

    set assigned(value) {
        this._assigned = value;
    }

    get tags() {
        return this._tags;
    }

    set addTags(tag) {
        this._tags.push(tag);
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
    }

    fromData(data) {
        this._title = data._title;
        this._description = data._description;
        this._status = data._status;
        this._priority = data._priority;
        this._assigned = data._assigned;
        this._tags = data._tags;
        this._timeTracking = data._timeTracking;
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

    addTask(newTask) {
        this._array.push(newTask);
    }

    deleteTask(taskIndex) {
        throw new Error("Method deleteTask must be implemented");
    }

    fromData(data) {
    }
}

class SprintBacklog extends Backlog{
    constructor() {
        super();
    }

    addTask(newTask){
        this._array.push(newTask);
    }

    deleteTask(taskIndex){
        this._array.splice(taskIndex, 1)
    }

    // fromData(data) {
    //     this._array = [];
    //     for (let i = 0; i < data._array.length; i++) {
    //         let sprint = new Sprint();
    //         sprint.fromData(data._array[i]);
    //         this._array.push(sprint);
    //     }
    // }
}

class ProductBacklog extends Backlog{
    constructor() {
        super();
    }

    addTask(newTask){
        this._array.push(newTask);
    }

    deleteTask(taskIndex){
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

    addTask(newTask){
        this._array.push(newTask);
    }

    deleteTask(taskIndex){
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
let productBacklog = new ProductBacklog();
let sprintBacklog = new SprintBacklog();
let teamBacklog = new TeamBacklog();

// Check if data available in LS before continuing
if (checkLSData(PRODUCTBACKLOG_KEY)) {
    // If data exists, retrieve it
    let data = retrieveLSData(PRODUCTBACKLOG_KEY);
    // Restore data into vacationList
    productBacklog.fromData(data);
}

if (checkLSData(SPRINTBACKLOG_KEY)) {
    let data = retrieveLSData(SPRINTBACKLOG_KEY);
    // Restore data into vacationList
    sprintBacklog.fromData(data);
}

if (checkLSData(TEAMBACKLOG_KEY)) {
    let data = retrieveLSData(TEAMBACKLOG_KEY);
    // Restore data into vacationList
    teamBacklog.fromData(data);
}
