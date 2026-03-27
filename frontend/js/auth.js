const authCore = {
    async login(email, password) {
        try {
            // FastAPI OAuth2PasswordRequestForm expects username
            const data = await api.request('/auth/login', 'POST', {
                username: email,
                password: password
            }, true);
            
            api.setToken(data.access_token);
            ui.showToast('Login successful!');
            app.checkAuth();
        } catch (error) {
            ui.showToast(error.message, 'error');
        }
    },

    async register(email, password) {
        try {
            await api.request('/auth/register', 'POST', {
                email,
                password
            });
            ui.showToast('Registration successful! Please login.');
            document.getElementById('login-email').value = email;
            ui.toggleAuthPanels(true); // Switch to login
        } catch (error) {
            ui.showToast(error.message, 'error');
        }
    }
};
