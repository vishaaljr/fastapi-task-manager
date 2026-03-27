const app = {
    init() {
        this.bindEvents();
        this.checkAuth();
    },

    bindEvents() {
        // Toggle Panels
        document.getElementById('show-register').addEventListener('click', (e) => {
            e.preventDefault();
            ui.toggleAuthPanels(false);
        });
        document.getElementById('show-login').addEventListener('click', (e) => {
            e.preventDefault();
            ui.toggleAuthPanels(true);
        });

        // Auth Forms
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const pass = document.getElementById('login-password').value;
            authCore.login(email, pass);
        });

        document.getElementById('register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('reg-email').value;
            const pass = document.getElementById('reg-password').value;
            if(pass.length < 4) {
               ui.showToast('Password must be at least 4 characters', 'error');
               return;
            }
            authCore.register(email, pass);
        });

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });

        // Task Form
        document.getElementById('create-task-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const titleInput = document.getElementById('new-task-title');
            const descInput = document.getElementById('new-task-desc');
            
            const success = await tasksCore.createTask(titleInput.value, descInput.value);
            if (success) {
                titleInput.value = '';
                descInput.value = '';
            }
        });
    },

    checkAuth() {
        const token = api.getToken();
        if (token) {
            ui.switchView('app');
            tasksCore.loadTasks();
            document.getElementById('user-display').textContent = 'Welcome back!';
        } else {
            ui.switchView('auth');
            ui.toggleAuthPanels(true);
        }
    },

    logout() {
        api.clearToken();
        ui.switchView('auth');
        ui.showToast('Logged out successfully');
        ui.toggleAuthPanels(true);
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
