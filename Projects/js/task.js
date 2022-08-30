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
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.assigned = Person();
        this.tags = tags;
        this.deadline = deadline
        this.timeTracking = timeTracking
    }
   
    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get status() {
        return this._status;
    }

    get priority() {
        return this._priority;
    }
    
    get assigned() {
        return this._assigned;
    }

    get tags() {
        return this._tags;
    }

    get timeTracking() {
        return this._timeTracking;
    }
}