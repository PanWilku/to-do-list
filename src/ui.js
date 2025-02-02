export function initializeUI(projects) {
    
    const app = document.getElementById('app');
    app.innerHTML = ''; 
  
    const header = document.createElement('header');
    header.innerHTML = `<h1 class="text-3xl font-bold text-center my-4">Todo App</h1>`;
    app.appendChild(header);
};