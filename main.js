const taskInput = document.getElementById("taskInput");
        const addTaskBtn = document.getElementById("addTaskBtn");
        const taskList = document.getElementById("taskList");
        const completedTaskList = document.getElementById("completedTaskList");

        addTaskBtn.addEventListener("click", addTask);

        function addTask() {
            const taskText = taskInput.value.trim();

            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }

            const taskItem = document.createElement("li");
            taskItem.className = "task";
            taskItem.innerHTML = `
                <input type="checkbox">
                <span>${taskText}</span>
                <div class="actions">
                    <span class="editBtn" onclick="editTask(this)">Edit</span>
                    <span class="deleteBtn" onclick="deleteTask(this)">Delete</span>
                </div>
            `;

            taskList.appendChild(taskItem);
            taskInput.value = "";
        }

        function editTask(editBtn) {
            const taskItem = editBtn.parentElement.parentElement;
            const taskTextElement = taskItem.querySelector("span");
            const taskText = taskTextElement.textContent;
            const newText = prompt("Edit task:", taskText);

            if (newText !== null) {
                taskTextElement.textContent = newText;
            }
        }

        function deleteTask(deleteBtn) {
            const taskItem = deleteBtn.parentElement.parentElement;
            taskList.removeChild(taskItem);
        }

        // Move a task to the completed list when checked
        taskList.addEventListener("change", function (event) {
            if (event.target.type === "checkbox") {
                const taskItem = event.target.parentElement;
                taskList.removeChild(taskItem);
                event.target.removeAttribute("checked");
                taskItem.querySelector(".actions").innerHTML = `<span class="deleteBtn" onclick="deleteTask(this)">Delete</span>`;
                completedTaskList.appendChild(taskItem);
            }
        });