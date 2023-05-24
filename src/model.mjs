export default class Model {
  constructor() {
    this.tasks = [];
    this.counter = 0;
  }

  addTask(taskData) {
    const { title, description, dueDate, priority, completed } = taskData;
    const task = new Task(
      title,
      description,
      dueDate,
      priority,
      completed,
      this.counter
    );
    this.tasks.push(task);
    this.counter++;
  }

  getTasks() {
    return this.tasks;
  }

  deleteTask(id) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      console.log(this.tasks);
    }
  }
}

class Task {
  constructor(title, description, dueDate, priority, completed = "no", id) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
    this.id = id;
  }
}
