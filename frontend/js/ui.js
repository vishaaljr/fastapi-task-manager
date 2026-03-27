const ui = {
    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = document.createElement('i');
        icon.className = type === 'success' ? 'fa-solid fa-check-circle' : 'fa-solid fa-circle-exclamation';
        
        const text = document.createElement('span');
        text.textContent = message;
        
        toast.appendChild(icon);
        toast.appendChild(text);
        
        container.appendChild(toast);
        
        // Trigger reflow
        void toast.offsetWidth;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    switchView(viewName) {
        document.querySelectorAll('.view-container').forEach(v => v.classList.add('hidden'));
        document.getElementById(`${viewName}-view`).classList.remove('hidden');
    },

    toggleAuthPanels(showLogin) {
        if (showLogin) {
            document.getElementById('register-panel').classList.add('hidden');
            document.getElementById('login-panel').classList.remove('hidden');
        } else {
            document.getElementById('login-panel').classList.add('hidden');
            document.getElementById('register-panel').classList.remove('hidden');
        }
    }
};
