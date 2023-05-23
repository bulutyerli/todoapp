export default class Model {
  constructor() {
    this.tasks = [];
  }

  addTask(taskData) {
    const { title, description, dueDate, priority, completed, id } = taskData;
    const task = new Task(title, description, dueDate, priority, completed, id);
    this.tasks.push(task);
  }

  getTasks() {
    return this.tasks;
  }

  deleteTask(id) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
    }
  }
}

class Task {
  constructor(
    title,
    description,
    dueDate,
    priority,
    completed = false,
    id = null
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
    this.id = id;
  }
}
