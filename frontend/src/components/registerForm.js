import callApi, {authApi} from '../api/api.js'
import { registerFormToJson } from '../services/formService.js';
import {showModal, hideModal}from '../utils/utility.js'

// select tag
// Creates a blank form requiring details of the new product
$('.register').on('click', function() {
    const formHtml = `
        <form id="registrationForm">
            <div id="registrationForm-title" class="d-flex justify-content-center">Registration</div>
            <div class="form-row m-1">
                <label>Name: </label>
                <input type="text" name="name">
            </div>

            <div class="form-row m-1">
                <label>Branch: </label>
                <input type="text" name="branch" required>
            </div>

            <div class="form-row m-1">
                <label for="shift">Shift: </label>
                <select id="shift" name="shift">
                    <option value="default">Select...</option>
                    <option value="morning">Morning Shift</option>
                    <option value="mid">Mid Shift</option>
                    <option value="afternoon">Afternoon Shift</option>
                </select>
            </div>

            <div class="form-row m-1">
                <label>Age: </label>
                <input type="number" name="age">
            </div>

            <div class="form-row m-1">
                <label for="gender">Gender: </label>
                <select id="gender" name="gender">
                    <option value="default">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div class="form-row m-1">
                <label>Username: </label>
                <input type="text" name="username" required>
            </div>

            <div class="form-row m-1">
                <label>Password: </label>
                <input type="password" name="password" required>
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
    if (response && response.emp_id) {
        alert('Registration of account is successful!');
        location.reload();
    }
    });
    hideModal();
});

$('#modalOverlay').on('click', '.cancelRegister', function() {
    hideModal();
});

