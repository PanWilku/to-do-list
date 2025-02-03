import { Task } from "./models/Task";
import { Project } from "./models/Project";


export function initializeUI(projects) {
    
    const app = document.getElementById('app');
    app.innerHTML = ''; 
    
    const sideBar = document.createElement("div");
    sideBar.id = "side-bar";
    sideBar.className = "flex w-1/4 h-100vh bg-gray-200 justify-start align- flex-col items-center gap-10";
    app.appendChild(sideBar);
    const taskWindow = document.createElement("div");
    taskWindow.id = "task-window";
    taskWindow.className = "flex flex-col justify-start w-3/4 h-100vh bg-gray-100 pt-20 bg-green-200 gap-15"
    app.appendChild(taskWindow);

    const header = document.createElement('header');
    header.innerHTML = `<h1 class="flex text-4xl font-bold my-4 justify-center">Todo List</h1>`;
    taskWindow.appendChild(header);

    const projectHeader = document.createElement("header");
    projectHeader.className = "flex pt-48 justify-center";
    projectHeader.innerHTML = `<h1 class="text-3xl pl-5">Active Projects</h1>`
    sideBar.appendChild(projectHeader);

    const addTaskDiv = document.createElement("div");
    addTaskDiv.id = "add-task-div";
    addTaskDiv.innerHTML = `
    <div class="flex flex-col w-full items-end gap-2 pr-12">
        <button id="add-task-btn" class="flex items-center justify-center bg-emerald-500" aria-label="Add Task">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        </button>
        <p>Add a task</p>
    </div>
            `
    taskWindow.appendChild(addTaskDiv);
    const addTaskBtn = document.getElementById("add-task-btn");
    addTaskBtn.addEventListener("click", () => {
        Project.handleAddTask(currentDisplayedProject);
    });


};


export function renderProjects(projects) {

    const sideBar = document.getElementById("side-bar");
    const taskWindow = document.getElementById("task-window");

    const projectContainer = document.createElement("div");
    projectContainer.innerHTML = "";
    projectContainer.className = "flex flex-col w-full h-100px p-2 gap-12";



    const taskContainer = document.createElement("div");
    taskContainer.id = "task-container";
    taskContainer.className = "flex w-full flex-col p-6 gap-8";
    taskWindow.appendChild(taskContainer);


    sideBar.appendChild(projectContainer);



    projects.forEach((project, index) => {

        const button = document.createElement("button");
        button.id = "button-" + index;
        button.className = "flex bg-red-200 rounded-full p-6"
        button.textContent = project.name;
        button.addEventListener("click", () => {
            renderTasks(project);
        })
        projectContainer.appendChild(button);

    });

};

let currentDisplayedProject;

export function renderTasks(project) {

    currentDisplayedProject = project;

    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = "";

    project.tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.id = index;
        taskContainer.appendChild(taskDiv);

        taskDiv.innerHTML += `
        <div class="flex w-full">
            <div class="flex w-3/5 flex-col bg-blue-600 gap-4 p-2">
                <p class="text-2xl break-words">${task.title}
                <p>Description: ${task.description}</p>
                <p>Due to: ${task.dueDate}, ${task.priority} priority</p>
            </div>
            <div class="flex w-2/5 items-center bg-amber-400 gap-8 p-2 justify-center">
            <div class="flex flex-col gap-4">
                <button class="bg-lime-300 p-2 cursor-pointer" id="edit-btn-${index}">Edit</button>
                <button class="bg-red-500 p-2 cursor-pointer" id="delete-btn-${index}">Delete</button>
            </div>
                <input type="checkbox" class="form-checkbox h-10 w-10 text-blue-600 cursor-pointer" id="task-checkbox-${index}" ${task.completed ? 'checked' : ''}>
    
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



};


