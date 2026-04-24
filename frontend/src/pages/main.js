import callApi, { authApi, BASE_URL } from '../api/api.js'

export function getToken() {
    return localStorage.getItem('token');
}

export function clearAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
}

export async function initLogout() {
    $(document).on('click', '#logout-btn', function () {
        const confirmed = confirm('Are you sure you want to logout?');
        if (!confirmed) return;

        callApi('POST', authApi.logout, null, {
            'Authorization': `Bearer ${getToken()}`
        })
        .always(function () {
            clearAuth();
           window.location.href = "/";
        })
    });
}

initLogout();

