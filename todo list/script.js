// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to create a new task element
const createTaskElement = (task) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;
    
    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions';
    
    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.innerHTML = task.completed ? '<i class="fas fa-undo"></i>' : '<i class="fas fa-check"></i>';
    completeBtn.onclick = () => toggleTask(task.id);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.onclick = () => deleteTask(task.id);
    
    taskActions.appendChild(completeBtn);
    taskActions.appendChild(deleteBtn);
    
    li.appendChild(taskText);
    li.appendChild(taskActions);
    
    return li;
};

// Function to render all tasks
const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        taskList.appendChild(createTaskElement(task));
    });
};

// Function to add a new task
const addTask = () => {
    const text = taskInput.value.trim();
    if (text) {
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
};

// Function to toggle task completion
const toggleTask = (taskId) => {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks();
    renderTasks();
};

// Function to delete a task
const deleteTask = (taskId) => {
    const taskElement = document.querySelector(`[data-id="${taskId}"]`);
    if (taskElement) {
        taskElement.classList.add('deleting');
        setTimeout(() => {
            tasks = tasks.filter(task => task.id !== taskId);
            saveTasks();
            renderTasks();
        }, 300); // Match this with the CSS animation duration
    }
};

// Event Listeners
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial render
renderTasks(); 