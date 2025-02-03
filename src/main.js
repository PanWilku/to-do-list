import "./style.css";
import { initializeUI, renderProjects, renderTasks } from "./ui.js";
import { Project } from "./models/Project.js"

const projects = [Project.defaultProject(), Project.defaultProject()];


function initApp() {



initializeUI();
renderProjects(projects);
renderTasks(projects[0]);

}

document.addEventListener("DOMContentLoaded", initApp);