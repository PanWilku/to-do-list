import {Task} from "./Task";

export class Project {
    constructor(tasks, name) {
        this.tasks = tasks;
        this.name = name;
    }

    static defaultProject() {
        return new Project(new Task("Make an account on Shopify", "", "2025/01/12", "high", "give an access to friends", true),
         "Dropshipping Project");
    };

    addTask(task) {

    };

    removeTask(task) {

    };

    updateTask(task) {

    };
}