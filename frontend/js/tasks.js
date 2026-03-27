const tasksCore = {
    async loadTasks() {
        try {
            const tasks = await api.request('/tasks/');
            this.renderTasks(tasks);
        } catch (error) {
            ui.showToast('Failed to load tasks', 'error');
            if (error.message.includes('Not authenticated') || error.message.includes('Could not validate credentials')) {
                app.logout();
            }
        }
    },

    async createTask(title, description) {
        try {
            await api.request('/tasks/', 'POST', { title, description });
            ui.showToast('Task created!');
            this.loadTasks();
            return true;
        } catch (error) {
            ui.showToast(error.message, 'error');
            return false;
        }
    },

async updateTask(id, updatedData) {
    try {
        await api.request(`/tasks/${id}`, 'PATCH', updatedData);
        ui.showToast('Task updated!');
        this.loadTasks();
    } catch (error) {
        ui.showToast(error.message, 'error');
    }
},

    async deleteTask(id) {
        try {
            await api.request(`/tasks/${id}`, 'DELETE');
            ui.showToast('Task deleted');
            this.loadTasks();
        } catch (error) {
            ui.showToast(error.message, 'error');
        }
    },


    renderTasks(tasks) {
    const list = document.getElementById("task-list");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";

        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" ${task.completed ? "checked" : ""}
                    onchange="tasksCore.updateTask(${task.id}, { completed: this.checked })">

                <div class="task-text">
                    <p class="title">Title : ${task.title}</p>
                    <span class="desccription">Description : ${task.description || ""}</span>
                </div>
            </div>

            <div class="task-actions">
                <button onclick="tasksCore.enableEdit(${task.id}, '${task.title}', '${task.description || ""}')">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button onclick="tasksCore.deleteTask(${task.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        list.appendChild(li);
    });
},
enableEdit(id, title, description) {
    const listItems = document.querySelectorAll(".task-item");

    listItems.forEach(item => {
        if (item.innerHTML.includes(`updateTask(${id}`)) {

            item.innerHTML = `
                <div class="edit-mode">
                    <input type="text" id="edit-title-${id}" value="${title}">
                    <input type="text" id="edit-desc-${id}" value="${description}">

                    <button onclick="tasksCore.saveEdit(${id})">
                        <i class="fa-solid fa-check"></i>
                    </button>

                    <button onclick="tasksCore.loadTasks()">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            `;
        }
    });
},
async saveEdit(id) {
    const title = document.getElementById(`edit-title-${id}`).value;
    const description = document.getElementById(`edit-desc-${id}`).value;

    const updatedData = {};

    if (title) updatedData.title = title;
    if (description) updatedData.description = description;

    await this.updateTask(id, updatedData);
}
};
