export default class Model {
  constructor() {
    this.tasks = [];
    this.id = "id" + Math.random().toString(16).slice(2);
  }

  addTask(taskData) {
    const { title, description, dueDate, dueDateCopy, priority, completed } =
      taskData;
    const task = new Task(
      title,
      description,
      dueDate,
      dueDateCopy,
      priority,
      completed,
      this.id
    );
    this.dueDateCopy = this.dueDate;
    this.tasks.push(task);
    this.id = "id" + Math.random().toString(16).slice(2);
  }

  getTasks() {
    return this.tasks;
  }

  setTasks(tasks) {
    this.tasks = tasks;
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
    dueDateCopy,
    priority,
    completed = "no",
    id
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.dueDateCopy = dueDateCopy;
    this.priority = priority;
    this.completed = completed;
    this.id = id;
  }
}
