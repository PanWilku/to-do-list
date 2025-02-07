export class Task {
  constructor(title, description, dueDate, priority, completed) {
    this.id = Date.now();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }

  static toggleCompleted(taskCheckbox, task) {
    task.completed = taskCheckbox.checked;
  }
}
