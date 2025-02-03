


export function initializeUI(projects) {
    
    const app = document.getElementById('app');
    app.innerHTML = ''; 
    
    const sideBar = document.createElement("div");
    sideBar.id = "side-bar";
    sideBar.className = "flex w-1/4 h-100vh bg-gray-200 justify-start flex-col items-center gap-10";
    app.appendChild(sideBar);
    const taskWindow = document.createElement("div");
    taskWindow.id = "task-window";
    taskWindow.className = "flex flex-col justify-start w-3/4 h-100vh bg-gray-100 pt-20 justify-center bg-green-200 gap-15"
    app.appendChild(taskWindow);

    const header = document.createElement('header');
    header.innerHTML = `<h1 class="text-4xl font-bold text-center my-4">Todo List</h1>`;
    taskWindow.appendChild(header);

    const projectHeader = document.createElement("header");
    projectHeader.innerHTML = `<h1 class="pt-48 text-3xl font-">Active Projects</h1>`
    sideBar.appendChild(projectHeader)


};


export function renderProjects(projects) {

    const sideBar = document.getElementById("side-bar");

    const taskWindow = document.getElementById("task-window");

    const projectContainer = document.createElement("div");
    projectContainer.innerHTML = "";
    projectContainer.className = "flex flex-col w-full h-100px p-8 gap-12";

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

    const taskContainer = document.createElement("div");
    taskContainer.id = "task-container";
    taskContainer.className = "flex w-full h-100px bg-orange-200 p-10";
    taskWindow.appendChild(taskContainer);


    sideBar.appendChild(projectContainer);

    projects.forEach((project, index) => {

        const button = document.createElement("button");
        button.id = "button-" + index;
        button.className = "flex bg-red-200 rounded-full"
        button.textContent = project.name;
        button.addEventListener("click", () => {
            console.log(button.id);
            renderTasks(project);
        })
        projectContainer.appendChild(button);

    });

};

export function renderTasks(project) {
    console.log(project);
    
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = "";
    


    taskContainer.innerHTML += `
    <div class="flex w-full">
        <div class="flex w-3/5 flex-col bg-blue-600 gap-4">
            <p>${project.tasks.title}
            <p>Description: ${project.tasks.description}</p>
            <p>Due to: ${project.tasks.dueDate}, ${project.tasks.priority} priority</p>
        </div>
        <div class="flex w-2/5 items-center bg-amber-400">
            <label class=" items-center space-x-2 ml-2">
            <input type="checkbox" class="form-checkbox h-10 w-10 text-blue-600" id="myCheckbox">
            <button>Edit</button>
            <button>Delete</button>
        </div>
  </div>`;

};


