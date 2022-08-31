class Task {
  constructor(
    title,
    description,
    status,
    priority,
    assigned,
    tags = [],
    timeTracking = 0
  ) {
    this._title = title;
    this._description = description;
    this._status = status;
    this._priority = priority;
    this._assigned = assigned;
    this._tags = tags;
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

  set tags(value) {
    this._tags = value;
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
}

class Person {
  constructor(name, email) {
    this._name = name;
    this._email = email;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }
}

class Backlog {
  constructor() {
    this.taskArray = [];

    if (this.constructor === Backlog) {
      throw new Error("Abstract class cannot be instantiated");
    }
  }
  addTask(newTask) {
    this._taskArray.push(newTask);
  }

  deleteTask(taskIndex) {
    throw new Error("Method deleteTask must be implemented");
  }
}

export { Task, Person, Backlog };
