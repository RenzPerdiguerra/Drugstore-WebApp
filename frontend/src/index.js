import callApi, {authApi} from "./api/api.js";
import { loginFormToJson } from "./services/formService.js";

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
                window.location.href = "http://127.0.0.1:3000/frontend/public/main.html?serverWindowId=0581bc8c-ec32-4592-803d-eb396b45f4d9";
            }
        } catch (err) {
            errorDiv.textContent = "Login failed. Please check your credentials.";
            console.error("Full error:", err);
        }
    })
}

$(document).ready(function() {
    validateLoginInput();
});

