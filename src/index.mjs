import Model from "./model.mjs";
import View from "./view.mjs";

const view = new View();
const model = new Model();

const storedTasks = JSON.parse(localStorage.getItem("tasks"));
const addBtn = document.querySelectorAll(".add-new");
const form = document.querySelector(".form-modal");
const taskList = document.querySelector(".task-list");

if (storedTasks) {
  model.setTasks(storedTasks);
  view.checkBoxHandler(model.getTasks());
  view.renderTasks(model.getTasks());
  view.taskFilterHandler(model.getTasks());
} else {
  view.renderTasks([]);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  model.addTask(view.getFormValues());
  const tasks = model.getTasks(); // Retrieve the updated tasks from the model

  localStorage.setItem("tasks", JSON.stringify(tasks));

  view.renderTasks(tasks); // Render the tasks on the website
  view.clearForm();
});

taskList.addEventListener("click", (e) => {
  if (e.target.closest(".delete-task")) {
    const taskItem = e.target.closest(".task-item");
    const taskId = taskItem.dataset.id;

    model.deleteTask(taskId);
    const tasks = model.getTasks(); // Retrieve the updated tasks from the model
    localStorage.setItem("tasks", JSON.stringify(tasks));

    view.renderTasks(tasks);
  }
});

view.btnHandler(addBtn);
view.modalCloseBtnHandler();
