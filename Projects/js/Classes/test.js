import { Person, Task, Backlog } from "./classes.js";
import productBacklog from "./ProductBacklog.js"


let persons = new Person("jas", "asfda");
let task = new Task("Title", "THis is a test", "Progress", "High", persons, ["hi", "gat"], 10 )
let newBacklog = new productBacklog()
newBacklog.addTask(task)
console.log(newBacklog);
console.log(task._assigned.name)
