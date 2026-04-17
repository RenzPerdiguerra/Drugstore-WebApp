import { formatDateISO, showModal, escapeHtml } from "../utils/utility.js";

// Creates a pre-filled form via DOM manipulation
export function renderEditForm() {
    $(document).on("click", "#edit-btn", function () {
        var $tr = $(this).closest('tr');
        var row = {
            prod_id: $tr.data('id'),
            category: $tr.data('category'),
            g_name: $tr.data('gname'),
            b_name: $tr.data('bname'),
            cost: $tr.data('cost')
        };

        const formHtml = `
            <form id="productForm" data-prod-id="${row.prod_id}">
            <div id="productForm-title" class="h4 text-center">Edit Product ${row.prod_id}</div>

            <div class="form-row">
                <label>Category:</label>
                <input type="text" name="category" value="${escapeHtml(row.category || '')}">
            </div>

            <div class="form-row">
                <label>Generic Name:</label>
                <input type="text" name="g_name" required value="${escapeHtml(row.g_name || '')}">
            </div>

            <div class="form-row">
                <label>Brand Name:</label>
                <input type="text" name="b_name" value="${escapeHtml(row.b_name || '')}">
            </div>

            <div class="form-row">
                <label>Cost:</label>
                <input type="number" name="cost" step="0.01" value="${row.cost || ''}">
            </div>

            <div class="form-actions">
                <button type="button" class="save btn btn-success" id="saveEditBtn">Save Product</button>
                <button type="button" class="cancel btn btn-secondary" id="closeModalBtn">Cancel</button>
            </div>
            </form>
    `;
        showModal(formHtml);
        const prod_id = $(this).data('id');
        $('#saveEditBtn').data('id', prod_id);
    });
}

// Creates a blank form requiring details of the new product
export function renderInsertProductForm() {
    $('#insert-product-btn').on('click', function() {
        const formHtml = `
            <form id="newProductForm">
                <div id="newProductForm-title justify-content-center">Insert a Product</div>
                <div class="form-row m-1">
                    <label>Category:</label>
                    <input type="text" name="category">
                </div>

                <div class="form-row m-1">
                    <label>Generic Name:</label>
                    <input type="text" name="g_name" required>
                </div>

                <div class="form-row m-1">
                    <label>Brand Name:</label>
                    <input type="text" name="b_name">
                </div>

                <div class="form-row m-1">
                    <label>Cost:</label>
                    <input type="number" name="cost">
                </div>

                <div class="insert-product-btn m-1">
                    <button type="button" class="save btn btn-success" id="saveProductBtn">Save Product</button>
                    <button type="button" class="cancel btn btn-secondary" id="closeModalBtn">Cancel</button>
                </div>
            </form>
        `;
        showModal(formHtml);
    });
}