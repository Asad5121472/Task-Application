document.addEventListener('DOMContentLoaded', () => {
    if (document.body.contains(document.getElementById('tasks-container'))) {
        fetchTasks();
    }
    if (document.getElementById('contact-form')) {
        document.getElementById('contact-form').addEventListener('submit', handleContactForm);
    }
});

// Here, we are fetching data from API
function fetchTasks() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then(response => response.json())
        .then(data => {
            const tasksContainer = document.getElementById('tasks-container');
            tasksContainer.innerHTML = '';

            data.forEach(task => {
                tasksContainer.innerHTML += `
                    <div id="task-${task.id}" class="task ${task.completed ? 'completed' : ''}">
                        <h3 class="taskTitle">${task.title}</h3>
                        <p class="taskStatus"><span class="taskStatusHead">Status:</span> ${task.completed ? 'Completed' : 'Pending'}</p>
                        <button onclick="deleteTask(${task.id})">Delete</button>
                        <button onclick="editTask(${task.id}, '${task.title}', '${task.description || ''}')">Edit</button>
                        <button onclick="markComplete(${task.id})">Mark Complete</button>
                    </div>
                `;
            });
        }).catch((error) => { 
            console.error('Error fetching tasks:', error);
        });
}


// Here, we are adding up tasks manually
function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;

    if (!title || !description) {
        alert('Please fill in both fields Title and Description.');
        return;
    }

    const newTask = {
        title,
        description,
        completed: false
    };

    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(task => {
        const tasksContainer = document.getElementById('tasks-container');
        tasksContainer.innerHTML += `
            <div id="task-${task.id}" class="task ${task.completed ? 'completed' : ''}">
                <h3 class="taskTitle">${task.title}</h3>
                <p class="taskStatus"><span class="taskStatusHead">Status:</span> ${task.completed ? 'Completed' : 'Pending'}</p>
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="editTask(${task.id}, '${task.title}', '${task.description || ''}')">Edit</button>
                <button onclick="markComplete(${task.id})">Mark Complete</button>
            </div>
        `;
        
        document.getElementById('task-title').value = '';
        document.getElementById('task-desc').value = '';
    })
    .catch(error => console.error('Error adding task:', error));
}

function deleteTask(taskId) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(() => {
        document.getElementById(`task-${taskId}`).remove();
    })
    .catch((error) =>  {
        console.error('Error deleting task:', error);
    });
}


// Here, this is used to edit the tasks
function editTask(taskId, title, description) {
    document.getElementById('task-title').value = title;
    document.getElementById('task-desc').value = description;
    document.getElementById('taskSubmitBtn').style.display = 'none';
    document.getElementById('taskUpdateBtn').style.display = 'block';
    document.getElementById('taskUpdateBtn').setAttribute('data-id', taskId);
}


// This is used to confirm Updated Tasks
function confirmUpdateTask() {
    const taskId = document.getElementById('taskUpdateBtn').getAttribute('data-id');
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;

    if (!title || !description) {
        alert('Please fill in both fields Title and Description.');
        return;
    }

    const updatedTask = {
        title,
        description
    };

    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
    })
    .then(response => response.json())
    .then(updatedTask => {
        const taskElement = document.getElementById(`task-${taskId}`);
        taskElement.querySelector('.taskTitle').textContent = updatedTask.title;
        taskElement.querySelector('.taskStatus').innerHTML = `<span class="taskStatusHead">Status:</span> ${updatedTask.completed ? 'Completed' : 'Pending'}`;

        document.getElementById('taskSubmitBtn').style.display = 'block';
        document.getElementById('taskUpdateBtn').style.display = 'none';
        document.getElementById('task-title').value = '';
        document.getElementById('task-desc').value = '';
    })
    .catch(error => console.error('Error updating task:', error));
}

function markComplete(taskId) {
    const updatedTask = {
        completed: true
    };

    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
    })
    .then(() => {
        const taskElement = document.getElementById(`task-${taskId}`);
        taskElement.classList.add('completed');
        taskElement.querySelector('.taskStatus').innerHTML = '<span class="taskStatusHead">Status:</span> Completed';
    })
    .catch(error => console.error('Error marking task as complete:', error));
    
}

function handleContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    console.log('Contact form submitted:', { name, email, message });
    alert('Message sent!');
    document.getElementById('contact-form').reset();
}


// Adding more functionalities

let burgerBtn = document.querySelector('.burgerBtn')
let partTwo = document.querySelector('.partTwo')

let flag = 0


burgerBtn.addEventListener('click', () => {
    if (flag == 0) {
      partTwo.style.transform = "translateX(0)";
      partTwo.style.display = "flex";
      flag = 1
    } else {
      partTwo.style.transform = "translateX(100%)";
      partTwo.style.display = "none";
      flag = 0
    }
})



let searchBar = document.querySelector('#searchBarIn')
let searchResults = document.querySelector('.searchResults')

searchBar.addEventListener('focus', () => {
    searchResults.style.display = "block"
  searchResults.style.transform = "translateY(0)"

})

searchBar.addEventListener('blur', () => {
  searchResults.style.transform = "translateY(-100%)"
  searchResults.style.display = "none"  
})
