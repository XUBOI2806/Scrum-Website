class Task{
    constructor(
        title,
        description,
        status,
        priority,
        assigned, 
        tags = [],
        timeTracking = 0
    ){
        this.assigned = Person();
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
}