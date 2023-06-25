/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.mjs":
/*!***********************!*\
  !*** ./src/index.mjs ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _model_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.mjs */ \"./src/model.mjs\");\n/* harmony import */ var _view_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.mjs */ \"./src/view.mjs\");\n\n\n\nconst view = new _view_mjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nconst model = new _model_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\nconst storedTasks = JSON.parse(localStorage.getItem(\"tasks\"));\nconst addBtn = document.querySelectorAll(\".add-new\");\nconst form = document.querySelector(\".form-modal\");\nconst taskList = document.querySelector(\".task-list\");\n\nif (storedTasks) {\n  model.setTasks(storedTasks);\n  view.checkBoxHandler(model.getTasks());\n  view.renderTasks(model.getTasks());\n  view.taskFilterHandler(model.getTasks());\n} else {\n  view.renderTasks([]);\n}\n\nform.addEventListener(\"submit\", function (e) {\n  e.preventDefault();\n  model.addTask(view.getFormValues());\n  const tasks = model.getTasks(); // Retrieve the updated tasks from the model\n\n  localStorage.setItem(\"tasks\", JSON.stringify(tasks));\n\n  view.renderTasks(tasks); // Render the tasks on the website\n  view.clearForm();\n});\n\ntaskList.addEventListener(\"click\", (e) => {\n  if (e.target.closest(\".delete-task\")) {\n    const taskItem = e.target.closest(\".task-item\");\n    const taskId = taskItem.dataset.id;\n\n    model.deleteTask(taskId);\n    const tasks = model.getTasks(); // Retrieve the updated tasks from the model\n    localStorage.setItem(\"tasks\", JSON.stringify(tasks));\n\n    view.renderTasks(tasks);\n  }\n});\n\nview.btnHandler(addBtn);\nview.modalCloseBtnHandler();\n\n\n//# sourceURL=webpack://todoapp/./src/index.mjs?");

/***/ }),

/***/ "./src/model.mjs":
/*!***********************!*\
  !*** ./src/model.mjs ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Model)\n/* harmony export */ });\nclass Model {\n  constructor() {\n    this.tasks = [];\n    this.id = \"id\" + Math.random().toString(16).slice(2);\n  }\n\n  addTask(taskData) {\n    const { title, description, dueDate, dueDateCopy, priority, completed } =\n      taskData;\n    const task = new Task(\n      title,\n      description,\n      dueDate,\n      dueDateCopy,\n      priority,\n      completed,\n      this.id\n    );\n    this.dueDateCopy = this.dueDate;\n    this.tasks.push(task);\n    this.id = \"id\" + Math.random().toString(16).slice(2);\n  }\n\n  getTasks() {\n    return this.tasks;\n  }\n\n  setTasks(tasks) {\n    this.tasks = tasks;\n  }\n\n  deleteTask(id) {\n    const taskIndex = this.tasks.findIndex((task) => task.id === id);\n    if (taskIndex !== -1) {\n      this.tasks.splice(taskIndex, 1);\n    }\n  }\n}\n\nclass Task {\n  constructor(\n    title,\n    description,\n    dueDate,\n    dueDateCopy,\n    priority,\n    completed = \"no\",\n    id\n  ) {\n    this.title = title;\n    this.description = description;\n    this.dueDate = dueDate;\n    this.dueDateCopy = dueDateCopy;\n    this.priority = priority;\n    this.completed = completed;\n    this.id = id;\n  }\n}\n\n\n//# sourceURL=webpack://todoapp/./src/model.mjs?");

/***/ }),

/***/ "./src/view.mjs":
/*!**********************!*\
  !*** ./src/view.mjs ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ View)\n/* harmony export */ });\nclass View {\n  constructor() {\n    this.modal = document.querySelector(\".form-modal\");\n    this.taskList = document.querySelector(\".task-list\");\n    this.descModal = document.querySelector(\".desc-modal\");\n    this.editModal = document.querySelector(\".edit-task-modal\");\n    this.overlay = document.querySelector(\".overlay\");\n    this.hamburger = document.querySelector(\".hamburger-menu\");\n\n    this.overlayClickHandler();\n    this.hamburgerMenuClickHandler();\n  }\n\n  getFormValues() {\n    const title = document.getElementById(\"title\").value;\n    const description = document.getElementById(\"description\").value;\n    const dueDate = document.getElementById(\"due-date\").value;\n    const dueDateCopy = dueDate;\n    const priority = document.getElementById(\"priority\").value;\n    const date = new Date(dueDate);\n    const options = { day: \"numeric\", month: \"long\", year: \"numeric\" };\n    const formattedDate = date.toLocaleDateString(\"en-US\", options);\n\n    return {\n      title,\n      description,\n      dueDate: this.checkDateStatus(formattedDate),\n      priority,\n      dueDateCopy,\n    };\n  }\n\n  clearForm() {\n    document.getElementById(\"title\").value = \"\";\n    document.getElementById(\"description\").value = \"\";\n    document.getElementById(\"due-date\").value = \"\";\n    document.getElementById(\"priority\").value = \"normal\";\n  }\n\n  hamburgerMenuClickHandler() {\n    this.hamburger.addEventListener(\"click\", () => {\n      const leftBar = document.querySelector(\".left-bar\");\n      const menu = document.querySelector(\".menu\");\n      leftBar.classList.toggle(\"left-bar-active\");\n      menu.classList.toggle(\"menu-active\");\n    });\n  }\n\n  overlayClickHandler() {\n    this.overlay.addEventListener(\"click\", () => {\n      this.modal.classList.remove(\"form-modal--active\");\n      this.descModal.classList.remove(\"desc-modal--active\");\n      this.editModal.classList.remove(\"edit-task-modal--active\");\n      this.overlay.classList.remove(\"overlay--active\");\n      this.descModal.textContent = \"\";\n      this.editModal.textContent = \"\";\n    });\n  }\n\n  renderTasks(tasks) {\n    if (tasks.length === 0) {\n      const message = \"You have no tasks to do\";\n      this.taskList.textContent = message;\n      return;\n    }\n    this.taskList.textContent = \"\"; // Clears  task list before rendering\n\n    tasks.forEach((task) => {\n      const html = `<div class=\"task-item ${\n        task.priority === \"important\" ? \"important\" : \"\"\n      } ${task.completed === \"yes\" ? \"completed\" : \"\"}\" data-id=\"${task.id}\">\n      <input type=\"checkbox\" class=\"task-checkbox\" ${\n        task.completed === \"yes\" ? \"checked\" : \"\"\n      } /><div class=\"task-title\">\n        ${task.title}</div>\n        <div class=\"options\">\n          <div class=\"date\">${\n            task.dueDate === \"Invalid Date\" ? \"No Due\" : task.dueDate\n          }</div>\n          <div class=\"details-btn task-item-btn\">\n            <img src=\"assets/images/details.svg\" alt=\"\" />\n          </div>\n          <div class=\"edit-task task-item-btn\">\n            <img src=\"assets/images/edit.svg\" alt=\"\" />\n          </div>\n          <div class=\"delete-task task-item-btn\">\n            <img src=\"assets/images/trash.svg\" alt=\"\" />\n          </div>\n          \n        </div>\n      </div>`;\n\n      this.taskList.insertAdjacentHTML(\"beforeend\", html);\n    });\n    this.detailsBtnHandler(tasks);\n    this.editBtnHandler(tasks);\n    this.checkBoxHandler(tasks);\n  }\n\n  updateTasks(updatedTasks) {\n    localStorage.setItem(\"tasks\", JSON.stringify(updatedTasks));\n    this.renderTasks(updatedTasks);\n  }\n\n  editBtnHandler(tasks) {\n    const editBtn = document.querySelectorAll(\".edit-task\");\n    editBtn.forEach((edit) => {\n      edit.addEventListener(\"click\", (event) => {\n        const taskId = event.target.closest(\".task-item\").dataset.id;\n        const task = tasks.find((item) => item.id === taskId);\n        const { title, description, dueDateCopy, priority, id } = task;\n\n        event.preventDefault();\n        const html = `<button type=\"button\" class=\"edit-close-btn modal-close-btn\">\n        X\n      </button>\n      <label for=\"edit-title\">Title:</label>\n      <input\n        type=\"text\"\n        id=\"edit-title\"\n        name=\"edit-title\"\n        maxlength=\"25\"\n        minlength=\"3\"\n        required\n        value=\"${title}\"\n      />\n      <label for=\"edit-description\">Description:</label>\n      <textarea\n        name=\"edit-description\"\n        id=\"edit-description\"\n        cols=\"30\"\n        rows=\"5\"\n      >${description}</textarea>\n      <label for=\"edit-due-date\">Due Date:</label>\n      <input type=\"date\" id=\"edit-due-date\" name=\"edit-due-date\"value=\"${dueDateCopy}\"  />\n      <label for=\"edit-priority\">Priority:</label>\n      <select name=\"edit-priority\" id=\"edit-priority\">\n        <option value=\"normal\">normal</option>\n        <option value=\"important\">important</option>\n      </select>\n      <button class=\"edit-task-btn\">Save</button>`;\n        if (!this.editModal.classList.contains(\"edit-task-modal--active\")) {\n          this.editModal.insertAdjacentHTML(\"beforeend\", html);\n          this.editModal.classList.add(\"edit-task-modal--active\");\n          this.modalCloseBtnHandler();\n          this.overlay.classList.add(\"overlay--active\");\n\n          const editTaskForm = document.querySelector(\".edit-task-modal\");\n          editTaskForm.addEventListener(\"submit\", (e) => {\n            e.preventDefault();\n            const updatedTitle = document.getElementById(\"edit-title\").value;\n            const updatedDesc =\n              document.getElementById(\"edit-description\").value;\n            const updatedDueDate =\n              document.getElementById(\"edit-due-date\").value;\n            const updatedPriority =\n              document.getElementById(\"edit-priority\").value;\n            const date = new Date(updatedDueDate);\n            const options = { day: \"numeric\", month: \"long\", year: \"numeric\" };\n            const formattedDate = date.toLocaleDateString(\"en-US\", options);\n            const updatedTask = {\n              ...task,\n              id: id,\n              title: updatedTitle,\n              description: updatedDesc,\n              dueDate: this.checkDateStatus(formattedDate),\n              priority: updatedPriority,\n            };\n            const updatedTasks = tasks.map((task) =>\n              task.id === id ? updatedTask : task\n            );\n            this.updateTasks(updatedTasks);\n            this.taskFilterHandler(updatedTasks);\n            console.log(updatedTitle);\n            this.editModal.classList.remove(\"edit-task-modal--active\");\n            this.editModal.textContent = \"\";\n            this.overlay.classList.remove(\"overlay--active\");\n          });\n        } else {\n          this.editModal.classList.remove(\"edit-task-modal--active\");\n          this.editModal.textContent = \"\";\n        }\n      });\n    });\n  }\n\n  //details modal button handler\n  detailsBtnHandler(tasks) {\n    const detailBtn = document.querySelectorAll(\".details-btn\");\n    detailBtn.forEach((detail) => {\n      detail.addEventListener(\"click\", (event) => {\n        event.preventDefault();\n        const taskId = event.target.closest(\".task-item\").dataset.id;\n        const task = tasks.find((item) => item.id === taskId);\n        const html = `\n        <button class=\"desc-close-btn modal-close-btn\">X</button>\n        <div><div class=\"details-title\">Task Title:</div>${task.title}</div>\n        <div>\n          <div class=\"details-title\">Description:</div>${task.description}\n        </div>\n        <div><div class=\"details-title\">Due Date:</div>${task.dueDate}</div>\n        <div><div class=\"details-title\">Status:</div>${\n          task.completed === \"yes\" ? \"Completed\" : \"Awaiting\"\n        }</div>\n      `;\n        if (!this.descModal.classList.contains(\"desc-modal--active\")) {\n          this.descModal.insertAdjacentHTML(\"beforeend\", html);\n          this.descModal.classList.add(\"desc-modal--active\");\n          this.modalCloseBtnHandler();\n          this.overlay.classList.add(\"overlay--active\");\n        } else {\n          this.descModal.classList.remove(\"desc-modal--active\");\n          this.descModal.textContent = \"\";\n        }\n      });\n    });\n  }\n\n  // Button handlers for add new task buttons\n  btnHandler(buttons) {\n    buttons.forEach((button) => {\n      button.addEventListener(\"click\", (e) => {\n        e.preventDefault();\n        this.showForm();\n        this.overlay.classList.add(\"overlay--active\");\n      });\n    });\n  }\n\n  // checkbox of tasks handler.\n\n  checkBoxHandler(tasks) {\n    const checkboxes = document.querySelectorAll(\".task-checkbox\");\n    checkboxes.forEach((checkbox) => {\n      checkbox.addEventListener(\"change\", (event) => {\n        const taskId = event.target.closest(\".task-item\").dataset.id;\n        const taskItem = document.querySelector(`[data-id=\"${taskId}\"]`);\n        const task = tasks.find((item) => item.id === taskId);\n\n        if (event.target.checked) {\n          taskItem.classList.add(\"completed\");\n          task.completed = \"yes\";\n        } else {\n          taskItem.classList.remove(\"completed\");\n          task.completed = \"no\";\n        }\n\n        localStorage.setItem(\"tasks\", JSON.stringify(tasks));\n      });\n    });\n  }\n\n  //form close button handler\n\n  modalCloseBtnHandler() {\n    const closeBtn = document.querySelectorAll(\".modal-close-btn\");\n    closeBtn.forEach((buttons) => {\n      buttons.addEventListener(\"click\", (e) => {\n        if (e.target.classList.contains(\"desc-close-btn\")) {\n          this.descModal.classList.remove(\"desc-modal--active\");\n          this.descModal.textContent = \"\";\n          this.overlay.classList.remove(\"overlay--active\");\n        }\n        if (e.target.classList.contains(\"form-close\")) {\n          this.modal.classList.remove(\"form-modal--active\");\n          this.overlay.classList.remove(\"overlay--active\");\n        }\n        if (e.target.classList.contains(\"edit-close-btn\")) {\n          this.editModal.classList.remove(\"edit-task-modal--active\");\n          this.editModal.textContent = \"\";\n          this.overlay.classList.remove(\"overlay--active\");\n        }\n      });\n    });\n  }\n\n  taskFilterHandler(tasks) {\n    const filters = document.querySelectorAll(\".item\");\n\n    filters.forEach((filter) => {\n      filter.addEventListener(\"click\", (e) => {\n        let filteredTasks = tasks;\n        const filterType = e.target.classList;\n        const className = filterType[1];\n        const selectedFilter = document.querySelector(`.${className}`);\n\n        filters.forEach((filter) => {\n          filter.classList.remove(\"item--active\");\n        });\n\n        if (filterType.contains(\"all\")) {\n          filteredTasks = tasks;\n        } else if (filterType.contains(\"today\")) {\n          filteredTasks = tasks;\n\n          filteredTasks = tasks.filter(\n            (task) => task.dueDate === \"today\" && task.completed === \"no\"\n          );\n        } else if (filterType.contains(\"week\")) {\n          filteredTasks = tasks;\n\n          filteredTasks = tasks.filter(\n            (task) =>\n              task.dueDate.includes(\"in\") ||\n              task.dueDate.includes(\"today\") ||\n              (task.dueDate.includes(\"tomorrow\") && task.completed === \"no\")\n          );\n        } else if (filterType.contains(\"important\")) {\n          filteredTasks = tasks;\n\n          filteredTasks = tasks.filter(\n            (task) => task.priority === \"important\" && task.completed === \"no\"\n          );\n        } else if (filterType.contains(\"completed-bar\")) {\n          filteredTasks = tasks;\n          filteredTasks = tasks.filter((task) => task.completed === \"yes\");\n        }\n\n        selectedFilter.classList.add(\"item--active\");\n\n        this.renderTasks(filteredTasks);\n        console.log(filteredTasks);\n      });\n    });\n  }\n\n  //toggle add task form display\n  showForm() {\n    if (!this.modal.classList.contains(\"form-modal--active\")) {\n      this.modal.classList.add(\"form-modal--active\");\n    } else {\n      this.modal.classList.remove(\"form-modal--active\");\n    }\n  }\n  // Check Date\n\n  checkDateStatus(dateString) {\n    const currentDate = new Date();\n    const inputDate = new Date(dateString);\n\n    // Check if the input date is today\n    if (\n      inputDate.getDate() === currentDate.getDate() &&\n      inputDate.getMonth() === currentDate.getMonth() &&\n      inputDate.getFullYear() === currentDate.getFullYear()\n    ) {\n      return \"today\";\n    }\n\n    // Check if the input date has passed\n    if (inputDate < currentDate) {\n      return \"Passed Due Date!\";\n    }\n\n    // Calculate the time difference in milliseconds\n    const timeDiff = inputDate.getTime() - currentDate.getTime();\n\n    // Calculate the number of days remaining\n    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));\n\n    if (daysRemaining > 1 && daysRemaining <= 7) {\n      return `in ${daysRemaining} days`;\n    } else if (daysRemaining === 1) {\n      return \"tomorrow\";\n    } else {\n      return dateString;\n    }\n  }\n}\n\n\n//# sourceURL=webpack://todoapp/./src/view.mjs?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.mjs");
/******/ 	
/******/ })()
;