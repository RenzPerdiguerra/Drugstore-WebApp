import callApi, { orderApi } from "./api/api"

// returns validated input
function validateLoginInput() {
    $('.submit').on('click', async function () {
    const $username = $(this).closest('#email').trim()
    const $password = $(this).closest('#password').trim()
    
        if (!$username || !$password) {
            prompt("Please supply the missing fields") // redundnat
            console.log('Username or password not filled')
            return False // prompt and False return???
        }

        try {
            // Send credentials to backend (FastAPI)
            const response = callApi(
                "GET", orderApi.list, JSON.stringify({ $username, $password })
                );

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();

            // Store JWT token (professional practice)
            localStorage.setItem("authToken", data.token);

            // Redirect or load user dashboard
            window.location.href = "/main.html";
        } catch (err) {
            errorDiv.textContent = "Login failed. Please check your credentials.";
            console.error(err);
        }
    })
}

const missingFields = "Please enter on required fields"
const errorMessage = "User input invalid"

// just sends prompt
function sendPrompt(missingFields, validateLoginInput, errorMessage) {
    //navigate
    if (userInput == null) {
        alert(missingFields);
    }
    // check if logic is valid
    if (validateLoginInput = False) {
        alert(errorMessage);
    }
}



