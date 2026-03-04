import {calculateTotal, collectCheckedItems, confirmOrdersSubmission, confirmPendingBatch, exportOrderBatchCsv, showSelectedOrdersSection} from '../services/orderService.js'
import getOrderList, { getPendingBatches, getConfirmedBatches, renderSubmitForm, renderCheckedItems } from '../components/ordersList.js'

// render orders list
getOrderList();

// render pending batches
getPendingBatches();

// render confirmed batches
getConfirmedBatches();

// show selected navbar option
showSelectedOrdersSection();

// render row-level data to calculation table. Includes initial Orders Total
renderCheckedItems();

// Update Orders Total when quantity is changed
calculateTotal();

// Render Orders submission form to get employee name
renderSubmitForm();

// Extracts data from checked items once submitted and create order batch
collectCheckedItems();

// Get employee name and create pending batches payload
confirmOrdersSubmission();

// Get user role and create confirmed batches payload
confirmPendingBatch();

// Reads confirmed batch row and allows user to download csv file
exportOrderBatchCsv();


// Search bar
$(document).on('keyup', '#orders-search-input', function (e) {
    const raw = $(this).val();
    const searchValue = String(raw || '').trim().toLowerCase();
    const suggestionsBox = $('#orders-search-suggestions');
    suggestionsBox.empty();

    // Resets the table list when searchValue is empty
    if (!searchValue) {
        $('table tbody tr').show();
        return;
    }

    // Build matches by iterating each row (use $(this) correctly)
    const matches = [];
    $('table tbody tr').each(function() {
        const $tr = $(this);
        const gname = String($tr.data('gname') || '').toLowerCase();
        const bname = String($tr.data('bname') || '').toLowerCase();
        const id = String($tr.data('id') || '').toLowerCase();

        if (gname.indexOf(searchValue) > -1 || bname.indexOf(searchValue) > -1 || id.indexOf(searchValue) > -1) {
            matches.push({ id: $tr.data('id'), gname: $tr.data('gname'), bname: $tr.data('bname') });
        }
    });

    // Deduplicate matches by id and limit suggestions shown
    const seen = new Set();
    const unique = [];
    for (const m of matches) {
        if (!seen.has(m.id)) { seen.add(m.id); unique.push(m); }
    }

    unique.slice(0, 6).forEach(m => {
        const $li = $(`<li class="list-group-item suggestion-item" data-id="${m.id}" data-gname="${m.gname}" data-bname="${m.bname}">${m.id} ${m.gname} ${m.bname}</li>`);
        suggestionsBox.append($li);
    });

    // Attach click handler once (use delegated handler on suggestionsBox)
    suggestionsBox.off('click', '.suggestion-item').on('click', '.suggestion-item', function() {
        const gname = $(this).data('gname') || '';
        $('#orders-search-input').val(gname);
        filterTable(gname.toLowerCase());
        suggestionsBox.empty();
    });

    // On enter key, filter table by current search value
    if (e.key === 'Enter') {
        filterTable(searchValue);
        suggestionsBox.empty();        
    }

    // narrows down the list based on search value
    function filterTable(val) {
        $('table tbody tr').each(function() {
            const $tr = $(this);
            const gname = String($tr.data('gname') || '').toLowerCase();
            const bname = String($tr.data('bname') || '').toLowerCase();
            const id = String($tr.data('id') || '').toLowerCase();
            const keep = gname.indexOf(val) > -1 || bname.indexOf(val) > -1 || id.indexOf(val) > -1;
            $tr.toggle(keep);
        });
    }
});