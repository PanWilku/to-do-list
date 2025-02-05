// utils.js
import { Project } from "./models/Project.js";
import { Task } from "./models/Task.js";

export function saveProjectsToLocalStorage(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadProjectsFromLocalStorage() {
  const storedData = localStorage.getItem("projects");
  if (!storedData) return null;

  const plainProjects = JSON.parse(storedData);
  const loadedProjects = plainProjects.map((plainProj) => {
    const taskInstances = plainProj.tasks.map(
      (t) => new Task(t.title, t.description, t.dueDate, t.priority, t.completed)
    );
    return new Project(taskInstances, plainProj.name);
  });

  return loadedProjects;
};
