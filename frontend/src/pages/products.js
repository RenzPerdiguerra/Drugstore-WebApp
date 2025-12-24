import {productApi} from '../api/api.js';
import { deleteRowData, saveEditData, saveInsertProduct } from '../services/formService.js';
import { renderEditForm, renderInsertProductForm } from '../components/productsForm.js';
import { hideModal, formatDateLong} from '../utils/utility.js';


// Iterates instantiation of products table per row with Edit and Delete buttons
$(function () {
    $.get(productApi.list, function (response) {
        if (response && Array.isArray(response)) { // conditional helps validating null/undefined/string data types
            var table = '';
            $.each(response, function (index, product) {
                table += '<tr data-id="' + product.prod_id +
                    '" data-category="' + product.category +
                    '" data-gname="' + product.g_name +
                    '" data-bname="' + product.b_name +
                    '" data-datearrived="' + product.d_arrived +
                    '" data-dateexpired="' + product.d_exp +
                    '" data-cost="' + product.cost +
                    '" data-price="' + product.price +
                    '" data-stock="' + product.stock +
                    '" data-stockstatus="' + product.stock_status +
                    '" data-createdat="' + product.created_at + '">' +
                    '<td>' + product.prod_id + '</td>' +
                    '<td>' + product.category + '</td>' +
                    '<td>' + product.g_name + '</td>' +
                    '<td>' + product.b_name + '</td>' +
                    '<td>' + formatDateLong(product.d_arrived) + '</td>' +
                    '<td>' + formatDateLong(product.d_exp) + '</td>' +
                    '<td>' + product.cost + '</td>' +
                    '<td>' + product.price + '</td>' +
                    '<td>' + product.stock + '</td>' +
                    '<td>' + product.stock_status + '</td>' +
                    '<td>' +
                         // mark each row with their id for edit btn row data navigation
                        '<button class="btn btn-primary btn-sm edit-btn" id="edit-btn" data-id="' + product.prod_id + '">Edit</button> '
                        + '<button class="btn btn-danger btn-sm" id="delete-btn">Delete</button>' +
                    '</td>' +
                '</tr>';
            });
            $("table").find('tbody').empty().html(table);
        }
    }).fail(function (xhr, status, error) {
        console.error("API request failed: ", status, error);
        $("table").find("tbody").html('<tr><td colspan="11">Failed to load products. Please contact Tech Support.</td></tr>');
    });
});

// Search bar
$(document).on('keyup', '#search-input', function (e) {
    const raw = $(this).val();
    const searchValue = String(raw || '').trim().toLowerCase();
    const suggestionsBox = $('#search-suggestions');
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
        $('#search-input').val(gname);
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

renderEditForm();

saveEditData();

deleteRowData();

renderInsertProductForm();

saveInsertProduct();

// Closes the #insertProduct form
$('#modalOverlay').on('click', '#closeModalBtn', function() {
    hideModal();
});
