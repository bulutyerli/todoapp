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
      const html = `<div class="task-item" data-id="${tasks.length}">
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
  }

  btnHandler(buttons) {
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.showForm();
      });
    });
  }

  formCloseBtnHandler() {
    const closeBtn = document.querySelector(".form-close");
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.modal.style.display = "none";
    });
  }

  showForm() {
    if (this.modal.style.display === "none") {
      this.modal.style.display = "flex";
    } else {
      this.modal.style.display = "none";
    }
  }
}
