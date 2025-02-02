export class Task {
    constructor(title, description, dueDate, priority, notes, checkList) {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checkList = checkList
        this.completed = false;
    };

    toggleCompleted() {
        this.completed = !this.completed;
    };


};
