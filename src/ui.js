import { Task } from "./models/Task";
import { Project } from "./models/Project";
import { handleRemainingTime } from "./utils";

export function initializeUI() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const sideBar = document.createElement("div");
  sideBar.id = "side-bar";
  sideBar.className =
    "flex sm:w-1/4 h-100vh justify-start flex-col items-center gap-10 max-sd:w-full";
  app.appendChild(sideBar);
  const taskWindow = document.createElement("div");
  taskWindow.id = "task-window";
  taskWindow.className =
    "flex flex-col justify-start sm:w-3/4 max-sm:w-full h-100vh pt-20 gap-10";
  app.appendChild(taskWindow);

  const header = document.createElement("header");
  header.innerHTML = `<h1 class="flex text-4xl font-bold justify-center">Todo List</h1>`;
  taskWindow.appendChild(header);

  const projectHeader = document.createElement("header");
  projectHeader.className = "flex pt-48 justify-center";
  projectHeader.innerHTML = `<h1 class="text-3xl pl-5">Active Projects</h1>`;
  sideBar.appendChild(projectHeader);

  const addTaskDiv = document.createElement("div");
  addTaskDiv.id = "add-task-div";
  addTaskDiv.innerHTML = `
    <div class="flex flex-col w-full sm:items-end max-sm:items-center gap-2 sm:pr-12">
        <button id="add-task-btn" class="flex items-center justify-center bg-green-400 transition ease-in-out duration-300 hover:scale-110 hover:bg-green-500" aria-label="Add Task">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        </button>
        <p>Add a task</p>
    </div>
            `;
  taskWindow.appendChild(addTaskDiv);
  const addTaskBtn = document.getElementById("add-task-btn");
  addTaskBtn.addEventListener("click", () => {
    Project.handleAddTask(currentDisplayedProject);
  });

  const addDeleteDiv = document.createElement("div");
  addDeleteDiv.className = "flex gap-4";
  sideBar.appendChild(addDeleteDiv);

  const addProjectDiv = document.createElement("div");
  addProjectDiv.id = "add-project-div";
  addProjectDiv.innerHTML = `
    <div class="flex flex-col w-full items-center gap-2">
        <button id="add-project-btn" class="flex items-center justify-center bg-green-400 transition ease-in-out duration-300 hover:scale-110 hover:bg-green-500" aria-label="Add Project">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        </button>
        <p>Add Project</p>
    </div>
            `;
  addDeleteDiv.appendChild(addProjectDiv);
  const addProjectBtn = document.getElementById("add-project-btn");
  addProjectBtn.addEventListener("click", () => {
    Project.handleAddProject();
  });

  const deleteProjectDiv = document.createElement("div");
  deleteProjectDiv.id = "add-project-div";
  deleteProjectDiv.innerHTML = `
        <div class="flex flex-col w-full items-center gap-2">
        <button id="delete-project-btn" class="flex items-center justify-center bg-red-300 transition ease-in-out duration-300 hover:scale-110" aria-label="Delete Project">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
        </button>
        <p>Delete Project</p>
        </div>
            `;
  addDeleteDiv.appendChild(deleteProjectDiv);
  const deleteProjectBtn = document.getElementById("delete-project-btn");
  deleteProjectBtn.addEventListener("click", () => {
    Project.handleDeleteProject();
  });
}

export function renderProjects(projects) {
  const element = document.getElementById("project-container");
  if (element) {
    element.remove(); //causes re-render of projects
    renderTasks(projects[0]); //causes re-render of tasks after deletion of project
  }

  const sideBar = document.getElementById("side-bar");
  const taskWindow = document.getElementById("task-window");

  const projectContainer = document.createElement("div");
  projectContainer.id = "project-container";
  projectContainer.innerHTML = "";
  projectContainer.className = "flex flex-col w-full h-100px p-2 gap-12";

  const taskContainer = document.createElement("div");
  taskContainer.id = "task-container";
  taskContainer.className =
    "flex w-full flex-col gap-8 sm:pl-8 sm:pt-8 sm:pb-8 max-sm: p-4";
  taskWindow.appendChild(taskContainer);

  sideBar.appendChild(projectContainer);

  projects.forEach((project, index) => {
    const button = document.createElement("button");
    button.id = "button-" + index;
    button.className =
      "flex rounded-xl p-6 bg-gray-400 transition ease-in-out duration-300 hover:scale-110";
    button.textContent = project.name;
    button.addEventListener("click", () => {
      renderTasks(project);
    });
    projectContainer.appendChild(button);
  });
}

let currentDisplayedProject;

export function renderTasks(project) {
  console.log(project);
  currentDisplayedProject = project;

  const taskContainer = document.getElementById("task-container");
  taskContainer.innerHTML = "";

  project.tasks.forEach((task, index) => {
    const reamingTime = handleRemainingTime(task.dueDate);
    const taskDiv = document.createElement("div");
    taskDiv.id = index;
    taskContainer.appendChild(taskDiv);

    taskDiv.innerHTML += `
        <div class="flex w-full border-2 rounded-lg hover:bg-gray-400">
            <div class="flex sm:w-3/5 max-sm:w-3/6 flex-col gap-4 p-2">
                <p class="text-2xl break-words flex-wrap">${task.title}
                <p class="break-words flex-wrap">Description: ${
                  task.description
                }</p>
                <p>Due to: ${task.dueDate}, ${task.priority} priority</p>
                <p>Reaming time: ${reamingTime}</p>
            </div>
            <div class="flex sm:w-2/5 max-sm:w-3/6 items-center sm:gap-8 max-sm: gap-4 p-2 justify-center">
            <div class="flex flex-col gap-4">
                <button class="bg-lime-200 hover:bg-lime-400 transition ease-in-out duration-300 hover:scale-110 p-2 cursor-pointer rounded-xl" id="edit-btn-${index}">Edit</button>
                <button class="bg-red-300 hover:bg-red-400 p-2 transition ease-in-out duration-300 hover:scale-110 cursor-pointer rounded-xl" id="delete-btn-${index}">Delete</button>
            </div>
                <input type="checkbox" class="form-checkbox h-10 w-10 text-blue-600 cursor-pointer" id="task-checkbox-${index}" ${
      task.completed ? "checked" : ""
    }>
            </div>
      </div>`;

    const editBtn = document.getElementById(`edit-btn-${index}`);
    editBtn.addEventListener("click", () => {
      Project.handleEditTask(index, currentDisplayedProject);
    });

    const deleteBtn = document.getElementById(`delete-btn-${index}`);
    deleteBtn.addEventListener("click", () => {
      Project.handleDeleteTask(index, currentDisplayedProject);
    });

    const taskCheckbox = document.getElementById(`task-checkbox-${index}`);
    taskCheckbox.addEventListener("click", () => {
      Task.toggleCompleted(taskCheckbox, task);
    });
  });
}
