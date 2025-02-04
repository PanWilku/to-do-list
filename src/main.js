import "./style.css";
import { initializeUI, renderProjects, renderTasks } from "./ui.js";
import { Project } from "./models/Project.js";
import { Task } from "./models/Task.js";

export const projects = [Project.defaultProject(), new Project([new Task("Go to the concert", "TS concert", "2026/06/22", "medium", false),
  new Task("Go to the supermarket", "tomatoes, cucumber, olive oil", "2025/02/05", "high", false)],
  "Concert project")];

function initApp() {



initializeUI();
renderProjects(projects);
renderTasks(projects[0]);
}

document.addEventListener("DOMContentLoaded", initApp);