class Backlog {
    constructor() {
        this.taskArray = []

        if (this.constructor === Backlog) {
            throw new Error("Abstract class cannot be instantiated")
        }
    }
    addTask(newTask){
        this.taskArray.push(newTask);
    }

    deleteTask(taskIndex){
        this.taskArray.splice(taskIndex, 1)
    }

}