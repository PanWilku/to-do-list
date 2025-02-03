export class Task {
    constructor(title, description, dueDate, priority, checkList) {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checkList = checkList
        this.completed = false;
    };

    toggleCompleted() {
        this.completed = !this.completed;
    };


};
