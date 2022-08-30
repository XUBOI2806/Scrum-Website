class Backlog {
    constructor() {
        this.taskArray = []

        if (this.constructor === Backlog) {
            throw new Error("Abstract class cannot be instantiated")
        }
    }
    addTask(newTask){
        throw new Error("Method addTask must be implemented")
    }

    deleteTask(taskIndex){
        throw new Error("Method deleteTask must be implemented")
    }

}