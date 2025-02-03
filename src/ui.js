


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
    
    taskContainer.innerHTML = `${project.tasks.title}, ${project.tasks.dueDate}, ${project.tasks.priority}`;

};


