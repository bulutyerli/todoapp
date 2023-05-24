import Model from "./model.mjs";
import View from "./view.mjs";

const view = new View();
const model = new Model();

const addBtn = document.querySelectorAll(".add-new");
const form = document.querySelector(".form-modal");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  model.addTask(view.getFormValues());
  const tasks = model.getTasks(); // Retrieve the updated tasks from the model

  view.renderTasks(tasks); // Render the tasks on the website
  view.clearForm();
});

const taskList = document.querySelector(".task-list");
taskList.addEventListener("click", (e) => {
  if (e.target.closest(".delete-task")) {
    const taskItem = e.target.closest(".task-item");
    const taskId = taskItem.dataset.id;

    model.deleteTask(+taskId);
    console.log(typeof +taskId);
    const tasks = model.getTasks(); // Retrieve the updated tasks from the model
    view.renderTasks(tasks);
  }
});

view.btnHandler(addBtn);
view.formCloseBtnHandler();
view.checkBoxHandler(model.getTasks());
