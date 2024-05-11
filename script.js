document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const sortSelect = document.getElementById('sort');

    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', taskActions);
    sortSelect.addEventListener('change', sortTasks);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${taskText}</span>
                <div>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                    <button class="complete-btn">Completed</button>
                </div>
            `;
            taskList.appendChild(li);
            taskInput.value = '';
        }
    }

    function taskActions(e) {
        if (e.target.classList.contains('delete-btn')) {
            e.target.closest('li').remove();
        } else if (e.target.classList.contains('edit-btn')) {
            const span = e.target.closest('li').querySelector('span');
            const newText = prompt('Edit task:', span.textContent);
            if (newText !== null) {
                span.textContent = newText.trim();
            }
        } else if (e.target.classList.contains('complete-btn')) {
            const span = e.target.closest('li').querySelector('span');
            span.classList.toggle('completed');
        }
    }

    function sortTasks() {
        const sortBy = sortSelect.value;
        const tasks = Array.from(taskList.children);

        tasks.sort((a, b) => {
            let taskA, taskB;
            if (sortBy === 'priority') {
                // Implement priority sorting logic
            } else if (sortBy === 'dueDate') {
                // Implement due date sorting logic
            } else if (sortBy === 'completionStatus') {
                taskA = a.querySelector('span').classList.contains('completed') ? 1 : 0;
                taskB = b.querySelector('span').classList.contains('completed') ? 1 : 0;
            }
            return taskA - taskB;
        });

        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        tasks.forEach(task => {
            taskList.appendChild(task);
        });
    }
});
