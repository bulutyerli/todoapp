export default class View {
  constructor() {
    this.modal = document.querySelector(".form-modal");
    this.taskList = document.querySelector(".task-list");
    this.descModal = document.querySelector(".desc-modal");
    this.editModal = document.querySelector(".edit-form-modal");
  }

  getFormValues() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    const priority = document.getElementById("priority").value;
    const date = new Date(dueDate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return {
      title,
      description,
      dueDate: this.checkDateStatus(formattedDate),
      priority,
    };
  }

  clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("due-date").value = "";
    document.getElementById("priority").value = "normal";
  }

  renderTasks(tasks) {
    this.taskList.textContent = ""; // Clear the task list before rendering

    tasks.forEach((task) => {
      const html = `<div class="task-item ${
        task.priority === "important" ? "important" : ""
      } ${task.completed === "yes" ? "completed" : ""}" data-id="${task.id}">
      <input type="checkbox" class="task-checkbox" ${
        task.completed === "yes" ? "checked" : ""
      } /><div class="task-title">
        ${task.title}</div>
        <div class="options">
          <div class="date">${
            task.dueDate === "Invalid Date" ? "No Due Date" : task.dueDate
          }</div>
          <div class="details-btn task-item-btn">
            <img src="/assets/images/details.svg" alt="" />
          </div>
          <div class="edit-task task-item-btn">
            <img src="/assets/images/edit.svg" alt="" />
          </div>
          <div class="delete-task task-item-btn">
            <img src="/assets/images/trash.svg" alt="" />
          </div>
          
        </div>
      </div>`;
      console.log(task.dueDate);

      this.taskList.insertAdjacentHTML("beforeend", html);
    });
    this.detailsBtnHandler(tasks);
    this.editBtnHandler(tasks);
    this.checkBoxHandler(tasks);
  }

  //edit tasks button handler

  // editBtnHandler(tasks) {
  //   const editBtn = document.querySelectorAll(".edit-task-btn");
  //   editBtn.forEach((edit) => {
  //     edit.addEventListener("click", (event) => {
  //       console.log("hi");

  //       event.preventDefault();
  //       const html = `<button type="button" class="form-close modal-close-btn">
  //       X
  //     </button>
  //     <label for="edit-title">Title:</label>
  //     <input
  //       type="text"
  //       id="edit-title"
  //       name="edit-title"
  //       maxlength="25"
  //       minlength="3"
  //       placeholder="min: 3, max: 25 characters"
  //     />
  //     <label for="edit-description">Description:</label>
  //     <textarea
  //       name="edit-description"
  //       id="edit-description"
  //       cols="30"
  //       rows="5"
  //     ></textarea>
  //     <label for="edit-due-date">Due Date:</label>
  //     <input type="date" id="edit-due-date" name="edit-due-date" />
  //     <label for="edit-priority">Priority:</label>
  //     <select name="edit-priority" id="edit-priority">
  //       <option value="normal">Normal</option>
  //       <option value="important">Important</option>
  //     </select>
  //     <button class="edit-task-btn">Save</button>`;
  //       this.editModal.style.display = "flex";
  //       this.editModal.insertAdjacentHTML("beforeend", html);
  //     });
  //   });
  // }

  //details modal button handler
  detailsBtnHandler(tasks) {
    const detailBtn = document.querySelectorAll(".details-btn");
    detailBtn.forEach((detail) => {
      detail.addEventListener("click", (event) => {
        event.preventDefault();
        const taskId = event.target.closest(".task-item").dataset.id;
        const task = tasks.find((item) => item.id === taskId);
        const html = `
        <button class="desc-close-btn modal-close-btn">X</button>
        <div><div class="details-title">Task Title:</div>${task.title}</div>
        <div>
          <div class="details-title">Description:</div>${task.description}
        </div>
        <div><div class="details-title">Due Date:</div>${task.dueDate}</div>
        <div><div class="details-title">Status:</div>${
          task.completed === "yes" ? "Completed" : "Awaiting"
        }</div>
      `;
        if (!this.descModal.classList.contains("desc-modal--active")) {
          this.descModal.insertAdjacentHTML("beforeend", html);
          this.descModal.classList.add("desc-modal--active");
          this.modalCloseBtnHandler();
        } else {
          this.descModal.classList.remove("desc-modal--active");
          this.descModal.textContent = "";
        }
      });
    });
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
        const task = tasks.find((item) => item.id === taskId);

        if (event.target.checked) {
          taskItem.classList.add("completed");
          task.completed = "yes";
        } else {
          taskItem.classList.remove("completed");
          task.completed = "no";
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));
      });
    });
  }

  //form close button handler

  modalCloseBtnHandler() {
    const closeBtn = document.querySelectorAll(".modal-close-btn");
    closeBtn.forEach((buttons) => {
      buttons.addEventListener("click", (e) => {
        if (e.target.classList.contains("desc-close-btn")) {
          this.descModal.classList.remove("desc-modal--active");
          this.descModal.textContent = "";
        }
        if (e.target.classList.contains("form-close")) {
          this.modal.classList.remove("form-modal--active");
        }
      });
    });
  }

  taskFilterHandler(tasks) {
    const filters = document.querySelectorAll(".item");

    filters.forEach((filter) => {
      filter.addEventListener("click", (e) => {
        const filterType = e.target.classList;
        let filteredTasks = [];

        if (filterType.contains("all")) {
          console.log("hi");
          filteredTasks = tasks;
        } else if (filterType.contains("today")) {
          filteredTasks = tasks;

          filteredTasks = tasks.filter(
            (task) => task.dueDate === "today" && task.completed === "no"
          );
        } else if (filterType.contains("week")) {
          filteredTasks = tasks;

          filteredTasks = tasks.filter(
            (task) => task.dueDate.includes("in") && task.completed === "no"
          );
        } else if (filterType.contains("important")) {
          filteredTasks = tasks;

          filteredTasks = tasks.filter(
            (task) => task.priority === "important" && task.completed === "no"
          );
        } else if (filterType.contains("completed-bar")) {
          filteredTasks = tasks;
          filteredTasks = tasks.filter((task) => task.completed === "yes");
        }

        // Render the filtered tasks
        this.renderTasks(filteredTasks);
      });
    });
  }

  //toggle add task form display
  showForm() {
    if (!this.modal.classList.contains("form-modal--active")) {
      this.modal.classList.add("form-modal--active");
    } else {
      this.modal.classList.remove("form-modal--active");
    }
  }
  // Check Date

  checkDateStatus(dateString) {
    const currentDate = new Date();
    const inputDate = new Date(dateString);

    // Check if the input date is today
    if (
      inputDate.getDate() === currentDate.getDate() &&
      inputDate.getMonth() === currentDate.getMonth() &&
      inputDate.getFullYear() === currentDate.getFullYear()
    ) {
      return "today";
    }

    // Check if the input date has passed
    if (inputDate < currentDate) {
      return "Passed Due Date!";
    }

    // Calculate the time difference in milliseconds
    const timeDiff = inputDate.getTime() - currentDate.getTime();

    // Calculate the number of days remaining
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysRemaining > 0 && daysRemaining <= 7) {
      return `in ${daysRemaining} day${daysRemaining > 1 ? "s" : ""}`;
    } else {
      return dateString;
    }
  }
}
