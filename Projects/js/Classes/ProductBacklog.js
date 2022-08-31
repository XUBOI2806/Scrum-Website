import { Backlog } from "./classes.js"

export default class productBacklog extends Backlog{
    constructor() {
        super();
    }

    addTask(newTask){
        this.taskArray.push(newTask);
    }

    deleteTask(taskIndex){
        this.taskArray.splice(taskIndex, 1)
    }
}