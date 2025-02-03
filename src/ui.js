export function initializeUI(projects) {
    
    const app = document.getElementById('app');
    app.innerHTML = ''; 
    
    const sideBar = document.createElement("div");
    sideBar.id = "side-bar";
    sideBar.className = "flex w-1/4 h-100vh bg-gray-200 justify-center";
    app.appendChild(sideBar);
    const taskWindow = document.createElement("div");
    taskWindow.id = "task-window";
    taskWindow.className = "flex w-3/4 h-100vh bg-gray-100 overflow-hidden justify-center"
    app.appendChild(taskWindow);

    const header = document.createElement('header');
    header.innerHTML = `<h1 class="text-4xl font-bold text-center my-4">Todo List</h1>`;
    taskWindow.appendChild(header);

    const projectHeader = document.createElement("header");
    projectHeader.innerHTML = `<h1 class="pt-48 text-2xl font-">Active Projects</h1>`
    sideBar.appendChild(projectHeader)

};