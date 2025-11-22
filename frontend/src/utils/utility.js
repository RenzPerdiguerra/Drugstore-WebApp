// Shows intended form
export function showModal(formHtml) {
    $('#modalContent').html(formHtml);
    $('#modalOverlay').removeClass('hidden');
};

// Hides intended form
export function hideModal() {
    $('#modalOverlay').addClass('hidden');
    $('#modalContent').empty();
};

// Provides alternative str for form inputs with blanks or special chars
export function escapeHtml(str) {
return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

// Formats date to 'YYYY-MM-DD'
export function formatDateISO(dateStr) {
    return new Date(dateStr).toISOString().slice(0, 10);
};

// Formats date to 'Month Day, YYYY'
export function formatDateLong(dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }).format(date);
};

// Formats date to UTC
export function formatToRFC1123(isoDateStr) {
    const date = new Date(isoDateStr);
    return date.toUTCString();
};