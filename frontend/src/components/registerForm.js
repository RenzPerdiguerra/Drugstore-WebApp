import callApi, {authApi} from '../api/api.js'
import { registerFormToJson } from '../services/formService.js'; // change formService function name
import {showModal, hideModal}from '../utils/utility.js'

// Creates a blank form requiring details of the new user
$('.register').on('click', function() {
    const formHtml = `
        <form id="registrationForm">
            <div id="registrationForm-title" class="d-flex justify-content-center">Registration</div>
            <div class="form-row m-1">
                <label>Username: </label>
                <input type="text" name="username" required>
            </div>

            <div class="form-row m-1">
                <label>Password: </label>
                <input type="password" name="password" required>
            </div>

            <div class="form-row m-1">
                <label>Role: </label>
                <input type="text" name="role" required>
            </div>
            
            <button type="button" class="saveRegister m-1">Save</button>
            <button type="button" class="cancelRegister m-1">Cancel</button>
        </form>
    `;
    showModal(formHtml);
});

$('#modalOverlay').on('click', '.saveRegister', function() {
    const requestPayload = registerFormToJson('#registrationForm');

    callApi('POST', authApi.register, JSON.stringify(requestPayload))
    .fail(function(xhr, status, error) {
    console.error("API request failed:", status, error);
    alert('Failed to register account. Please try again.');
    })
    .done(function(response) {
    if (response && response.user_id) {
        alert('Registration of account is successful!');
        location.reload();
    }
    });
    hideModal();
});

$('#modalOverlay').on('click', '.cancelRegister', function() {
    hideModal();
});