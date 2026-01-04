import callApi, {authApi} from "./api/api.js";
import { loginFormToJson } from "./services/formService.js";

async function apiGet(path) {
    const token = localStorage.getItem('jwt') || '';
    const res = await fetch(path, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const refreshed = res.headers.get('X-Refreshed-Token');
    if (refreshed) {
        localStorage.setItem('jwt', refreshed);
    }

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
    }
    return res.json();
}

async function loadMe() {
    try {
        const data = await apiGet('/me');
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
        const loginData = loginFormToJson('#loginForm')
        const username = loginData['username'].trim()
        const password = loginData['password'].trim()
    
        if (!username || !password) {
            alert("Please supply the missing fields") // redundnat
            return
        }

        try {
            // Send credentials API
            const response = await callApi(
                "POST", authApi.login, JSON.stringify({ username, password })
                );
            if (response) { // response.success
                window.location.href = "http://127.0.0.1:3000/frontend/public/main.html";
            }
        } catch (err) {
            errorDiv.textContent = "Login failed. Please check your credentials.";
            console.error("Full error:", err);
        }
    }) 
}

$(document).ready(function() {
    validateLoginInput();

    if (localStorage.getItem('jwt')) {
        loadMe();
    }
});

