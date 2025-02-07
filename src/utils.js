// utils.js
import { Project } from "./models/Project.js";
import { Task } from "./models/Task.js";
import { differenceInDays } from "date-fns";

export function saveProjectsToLocalStorage(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadProjectsFromLocalStorage() {
  const storedData = localStorage.getItem("projects");
  if (!storedData) return null;

  const plainProjects = JSON.parse(storedData);
  const loadedProjects = plainProjects.map((plainProj) => {
    const taskInstances = plainProj.tasks.map(
      (t) =>
        new Task(t.title, t.description, t.dueDate, t.priority, t.completed)
    );
    return new Project(taskInstances, plainProj.name);
  });

  return loadedProjects;
}

export function handleRemainingTime(dueDate) {
  const [year, month, day] = dueDate.split("-").map(Number);
  const due = new Date(year, month - 1, day); // month - 1 to convert to zero-based index
  const now = new Date();

  let remainingDays = differenceInDays(due, now);
  remainingDays = Math.abs(remainingDays);
  console.log(remainingDays);
  const dayLabel = remainingDays === 1 ? "day" : "days";
  if (remainingDays < 1) {
    return `${remainingDays} ${dayLabel} over the deadline`;
  }
  return `${remainingDays} ${dayLabel} left`;
}
