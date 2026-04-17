import callApi, {authApi, BASE_URL} from "./api/api.js";
import { loginFormToJson } from "./services/formService.js";

async function apiGet(path) {
    const token = localStorage.getItem('token') || '';
    const res = await fetch(path, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const refreshed = res.headers.get('X-Refreshed-Token');
    if (refreshed) {
        localStorage.setItem('token', refreshed);
    }

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }
    return res.json();
}

async function loadMe() {
    try {
        const data = await apiGet('/me'); // GET user session info
        console.log('Me:', data);
    } catch (e) {
        console.error('Auth error: ', e);
        alert('Not authenticated');
    }
}

// returns validated input
function validateLoginInput() {
    $('.login').on('click', async function (e) {
        e.preventDefault()
        const loginData = loginFormToJson('#loginForm');
        const username = loginData['username'].trim();
        const password = loginData['password'].trim();
    
        if (!username || !password) {
            alert("Please supply the missing fields"); // redundnat
            return;
        }

        try {
            // Send credentials API
            const response = await callApi(
                "POST", authApi.login, JSON.stringify({ username, password })
                );
            const jwt = response['access_token'];
            localStorage.setItem('token', jwt);

            if (response) { // response.success
                window.location.href = `${BASE_URL}/frontend/public/main.html?v=1`;
            } else {
                alert("Login failed");
            }

        } catch (err) {
            errorDiv.textContent = "Login failed. Please check your credentials."; // replace with alert
            console.error("Full error:", err);
        };
    }); 
}

function provideToken() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const now = Math.floor(Date.now() / 1000);
            if (payload && payload.exp && payload.exp > now) {
                loadMe();
            } else {
                localStorage.removeItem('token');
            }
        }
    } catch (err) {
        console.error('Invalid token format:', err);
        localStorage.removeItem('token');
    }
}

$(document).ready(function() {
    validateLoginInput();
    provideToken();
});

