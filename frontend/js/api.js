const API_BASE = 'http://localhost:8000';

const api = {
    getToken() {
        return localStorage.getItem('access_token');
    },
    
    setToken(token) {
        localStorage.setItem('access_token', token);
    },

    clearToken() {
        localStorage.removeItem('access_token');
    },

    async request(endpoint, method = 'GET', body = null, isFormData = false) {
        const headers = {};
        
        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }
        
        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config = {
            method,
            headers,
        };

        if (body) {
            if (isFormData) {
                const formData = new URLSearchParams();
                for (const key in body) {
                    formData.append(key, body[key]);
                }
                config.body = formData;
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            } else {
                config.body = JSON.stringify(body);
            }
        }

        try {
            const response = await fetch(`${API_BASE}${endpoint}`, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.detail || 'API Error');
            }
            
            return data;
        } catch (err) {
            console.error('API Request failed:', err);
            throw err;
        }
    }
};
