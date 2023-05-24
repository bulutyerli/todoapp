export default class View {
  constructor() {
    this.modal = document.querySelector(".form-modal");
    this.taskList = document.querySelector(".task-list");
  }

  getFormValues() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    const priority = document.getElementById("priority").value;

    return { title, description, dueDate, priority };
  }

  clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("due-date").value = "";
    document.getElementById("priority").value = "";
  }

  renderTasks(tasks) {
    this.taskList.innerHTML = ""; // Clear the task list before rendering

    tasks.forEach((task) => {
      const html = `<div class="task-item ${
        task.priority === "important" ? "important" : ""
      } " data-id="${task.id}">
      <input type="checkbox" class="task-checkbox" />
        ${task.title}
        <div class="options">
          <div class="date">${task.dueDate}</div>
          <div class="task-item-btn">
            <img src="/assets/images/details.svg" alt="" />
          </div>
          <div class="delete-task task-item-btn">
            <img src="/assets/images/trash.svg" alt="" />
          </div>
        </div>
      </div>`;

      this.taskList.insertAdjacentHTML("beforeend", html);
    });
    this.checkBoxHandler(tasks);
  }

  // Button handlers for add new task buttons
  btnHandler(buttons) {
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.showForm();
      });
    });
  }

  // checkbox of tasks handler.

  checkBoxHandler(tasks) {
    const checkboxes = document.querySelectorAll(".task-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        const taskId = event.target.closest(".task-item").dataset.id;
        const taskItem = document.querySelector(`[data-id="${taskId}"]`);

        if (event.target.checked) {
          taskItem.classList.add("completed");
          tasks.find((task) => task.id === parseInt(taskId)).completed = "yes";
        } else {
          taskItem.classList.remove("completed");
          tasks.find((task) => task.id === parseInt(taskId)).completed = "no";
        }
      });
    });
  }

  //form close button handler
  formCloseBtnHandler() {
    const closeBtn = document.querySelector(".form-close");
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.modal.style.display = "none";
    });
  }

  //toggle add task form display
  showForm() {
    if (this.modal.style.display === "none") {
      this.modal.style.display = "flex";
    } else {
      this.modal.style.display = "none";
    }
  }
}
