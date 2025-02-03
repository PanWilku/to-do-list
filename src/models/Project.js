import {Task} from "./Task";
import Swal from 'sweetalert2'
import { renderTasks } from "../ui";

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
                <input id="title" type="text" class="border-2 p-1" placeholder="task title" maxlength="25" required>
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
          
              // Add the new task to the currentProject
              currentProject.addTask(newTask);
          
              // Optionally, update the UI (e.g., re-render the task list)
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
        
    };
}