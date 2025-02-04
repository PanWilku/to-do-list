import {Task} from "./Task";
import Swal from 'sweetalert2'
import { renderTasks, renderProjects } from "../ui";
import { projects } from "../main";

export class Project {
    constructor(tasks, name) {
        // Ensure tasks is always an array:
        this.tasks = tasks;
        this.name = name;
    }

    static defaultProject() {
        return new Project([
          new Task("Make an account on Shopify", "", "2025/01/12", "high", true),
          new Task("Go with the dog", "", "2025/01/12", "high", false)
        ], "Dropshipping Project");
      };


      addTask(task) {
        this.tasks.push(task);
      }

      static handleAddTask(currentProject) {
        Swal.fire({
          title: "New Task",
          html: `
            <form id="taskForm" class="flex flex-col items-start gap-4">
              <!-- Title Field -->
              <label class="flex items-center gap-2">
                <span class="w-25 text-right">Title:</span>
                <input id="title" type="text" class="border-2 p-1" placeholder="task title" maxlength="50" required>
              </label>
      
              <!-- Description Field -->
              <label class="flex items-center gap-2">
                <span class="w-25 text-right">Description:</span>
                <input id="description" type="text" class="border-2 p-1" placeholder="description" maxlength="50" required>
              </label>
      
              <!-- Deadline Field -->
              <label class="flex items-center gap-2">
                <span class="w-25 text-right">Deadline:</span>
                <input id="deadline" type="date" class="border-2 p-1" required>
              </label>
      
              <!-- Priority Field -->
              <label class="flex items-center gap-2">
                <span class="w-25 text-right">Priority:</span>
                <select id="priority" class="border-2 p-1" name="priority" required>
                  <option value="" disabled selected>Select Priority</option>
                  <option value="low">Low</option>
                  <option value="middle">Middle</option>
                  <option value="high">High</option>
                </select>
              </label>
      
              <!-- Radio Buttons for Finished? -->
              <div class="flex items-center gap-4">
                <span class="w-25 text-right">Finished?</span>
                <label class="flex items-center gap-1">
                  <input type="radio" name="finished" value="yes" required>
                  <span>Yes</span>
                </label>
                <label class="flex items-center gap-1">
                  <input type="radio" name="finished" value="no">
                  <span>No</span>
                </label>
              </div>
            </form>
          `,
          showCancelButton: true,
          confirmButtonText: "Save",
          focusConfirm: false,
          preConfirm: () => {
            // Retrieve the input values from the Swal popup
            const title = Swal.getPopup().querySelector('#title').value;
            const description = Swal.getPopup().querySelector('#description').value;
            const deadline = Swal.getPopup().querySelector('#deadline').value;
            const priority = Swal.getPopup().querySelector('#priority').value;
            const finishedInput = Swal.getPopup().querySelector('input[name="finished"]:checked');
            const finished = finishedInput ? finishedInput.value : null;
      
            // Validate all fields are filled
            if (!title || !description || !deadline || !priority || !finished) {
              Swal.showValidationMessage(`Please fill out all fields`);
            }
            return { title, description, deadline, priority, finished };
          }
        }).then((result) => {
            if (result.isConfirmed) {
              const formData = result.value;
              console.log("Form Data:", formData);
          
              // Create a new Task instance using formData
              const newTask = new Task(
                formData.title,
                formData.description,
                formData.deadline,
                formData.priority,
                formData.finished === 'yes' // convert to boolean
              );
          
              currentProject.addTask(newTask);
          
              renderTasks(currentProject);
          
              Swal.fire("Saved!", "", "success");
            }
          });
        };
      

    static handleDeleteTask(index, currentDisplayedProject) {
        currentDisplayedProject.tasks.splice(index, 1);
        renderTasks(currentDisplayedProject);
    };

    static handleEditTask(index, currentDisplayedProject) {
        console.log(currentDisplayedProject.tasks[index]);
        const task = currentDisplayedProject.tasks[index];
        let originalDate = task.dueDate;
        let formattedDate = originalDate.replace(/\//g, '-');

        Swal.fire({
            title: "Edit Task",
            html: `
              <form id="taskForm" class="flex flex-col items-start gap-4">
                <!-- Title Field -->
                <label class="flex items-center gap-2">
                  <span class="w-25 text-right">Title:</span>
                  <input id="title" type="text" class="border-2 p-1" value="${task.title}" maxlength="50" required>
                </label>
        
                <!-- Description Field -->
                <label class="flex items-center gap-2">
                  <span class="w-25 text-right">Description:</span>
                  <input id="description" type="text" class="border-2 p-1" value="${task.description}" maxlength="50" required>
                </label>
        
                <!-- Deadline Field -->
                <label class="flex items-center gap-2">
                  <span class="w-25 text-right">Deadline:</span>
                  <input id="deadline" type="date" class="border-2 p-1" value="${formattedDate}" required>
                </label>
        
                <!-- Priority Field -->
                <label class="flex items-center gap-2">
                  <span class="w-25 text-right">Priority:</span>
                  <select id="priority" class="border-2 p-1" name="priority" required>
                    <option value="" disabled selected>Select Priority</option>
                    <option value="low">Low</option>
                    <option value="middle">Middle</option>
                    <option value="high">High</option>
                  </select>
                </label>
        
                <!-- Radio Buttons for Finished? -->
                <div class="flex items-center gap-4">
                  <span class="w-25 text-right">Finished?</span>
                  <label class="flex items-center gap-1">
                    <input type="radio" name="finished" value="yes" ${task.completed ? "checked" : ""} required>
                    <span>Yes</span>
                  </label>
                  <label class="flex items-center gap-1">
                    <input type="radio" name="finished" ${task.completed ? "" : "checked"} value="no">
                    <span>No</span>
                  </label>
                </div>
              </form>
            `,
            showCancelButton: true,
            confirmButtonText: "Save",
            focusConfirm: false,
            preConfirm: () => {
              // Retrieve the input values from the Swal popup
              const title = Swal.getPopup().querySelector('#title').value;
              const description = Swal.getPopup().querySelector('#description').value;
              const deadline = Swal.getPopup().querySelector('#deadline').value;
              const priority = Swal.getPopup().querySelector('#priority').value;
              const finishedInput = Swal.getPopup().querySelector('input[name="finished"]:checked');
              const finished = finishedInput ? finishedInput.value : null;
        
              // Validate all fields are filled
              if (!title || !description || !deadline || !priority || !finished) {
                Swal.showValidationMessage(`Please fill out all fields`);
              }
              return { title, description, deadline, priority, finished };
            }
          }).then((result) => {
              if (result.isConfirmed) {
                const formData = result.value;
                console.log("Form Data:", formData);
            
                task.title = formData.title;
                task.description = formData.description;
                task.dueDate = formData.deadline;
                task.priority = formData.priority;
                task.completed = formData.finished === "yes";
            
            

                renderTasks(currentDisplayedProject);
            
                Swal.fire("Saved!", "", "success");
              }
            });
    };


    static handleAddProject() {

      Swal.fire({
        title: "Add New Project",
        html: `
          <form id="projectForm" class="flex flex-col items-start gap-4">
            <!-- Project Name Field -->
            <label class="flex items-center gap-2">
              <span class="w-25 text-right">Project Name:</span>
              <input id="projectName" type="text" class="border-2 p-1" maxlength="50" required>
            </label>
          </form>
        `,
        showCancelButton: true,
        confirmButtonText: "Add Project",
        focusConfirm: false,
        preConfirm: () => {
          // Retrieve and trim the project name from the Swal popup
          const projectName = Swal.getPopup().querySelector('#projectName').value.trim();
          if (!projectName) {
            Swal.showValidationMessage("Please enter a project name");
          }
          return { projectName };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const formData = result.value;
          
          const newProject = new Project([], formData.projectName);
          
          projects.push(newProject);
          
          renderProjects(projects);
          
          Swal.fire("Added!", "New project added successfully.", "success");
        };
      });

    };



    static handleDeleteProject() {
      Swal.fire({
        title: "Delete Project",
        html: `
          <form id="deleteProjectForm" class="flex flex-col items-start gap-4">
            <label class="flex items-center gap-2">
              <span class="w-25 text-right">Select Project:</span>
              <select id="deleteProjectSelect" class="border-2 p-1 max-w-[300px]" required>
                <option value="" disabled selected>Select a project</option>
                ${projects.map((project, index) => `<option value="${index}">${project.name}</option>`).join('')}
              </select>
            </label>
          </form>
        `,
        showCancelButton: true,
        confirmButtonText: "Delete Project",
        focusConfirm: false,
        preConfirm: () => {
          // Retrieve the selected project's index from the Swal popup
          const selectEl = Swal.getPopup().querySelector('#deleteProjectSelect');
          const projectIndex = selectEl.value;
          
          if (projectIndex === "") {
            Swal.showValidationMessage("Please select a project to delete");
          }
          
          return { projectIndex };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const { projectIndex } = result.value;
          
          projects.splice(projectIndex, 1);

          renderProjects(projects);
          
          Swal.fire("Deleted!", "Project has been deleted.", "success");
        }
      });
    };
    
  };