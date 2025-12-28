import { showModal, hideModal } from "../utils/utility.js";
import callApi, {productApi} from '../api/api.js';

// Creates request payload with form inputs and edit button data-id. Used parameters for accommodating product id as field extension
function productsFormToJson(formSelector, extraFields = {}) {
    // creates an object for insert and edit button form values
    const form = $(formSelector);
    const data = {
        category: form.find('[name="category"]').val(),
        g_name: form.find('[name="g_name"]').val(),
        b_name: form.find('[name="b_name"]').val(),
        d_arrived: form.find('[name="d_arrived"]').val(),
        d_exp: form.find('[name="d_exp"]').val(),
        cost: form.find('[name="cost"]').val(),
        price: form.find('[name="price"]').val(),
        stock: form.find('[name="stock"]').val(),
        stock_status: form.find('[name="stock_status"]').val()
  };

    return { ...data, ...extraFields }; // returns a merged object
}

// 
export function registerFormToJson(formSelector) {
    // creates an object for insert and edit button form values
    const form = $(formSelector);
    const data = {
        name: form.find('[name="name"]').val(),
        branch: form.find('[name="branch"]').val(),
        shift: form.find('[name="shift"]').val(),
        age: form.find('[name="age"]').val(),
        gender: form.find('[name="gender"]').val(),
        username: form.find('[name="username"]').val(),
        password: form.find('[name="password"]').val(),
  };

    return data;
}

export function loginFormToJson(formSelector) {
    const form = $(formSelector);
    const data = {
        username: form.find('[name="username"]').val(),
        password: form.find('[name="password"]').val()
    }
    return data;
}

//#region manage-product page
// Create and saves object/payload from Edit form inputs
export function saveEditData() {
    $('#modalOverlay').on('click', '#saveEditBtn', function(){
        var prod_id = $(this).data('id');
        const requestPayload = productsFormToJson('#productForm', {prod_id});
        
        callApi('PUT', productApi.update, JSON.stringify(requestPayload))
        .fail(function(xhr, status, error) {
            console.error("API request failed:", status, error);
            alert('Failed to save product. Please try again.');
        })
        .done(function(response) {
            if (response) {
                alert('Update saved successfully!');
                location.reload();
            }
        });
        hideModal();
    });
}

export function deleteRowData() {
    // Deletes nearest row data via data-id
    $(document).on("click", "#delete-btn", function (){
        var tr = $(this).closest('tr');
        var data = {
            product_id : tr.data('id')
        };
        var isDelete = confirm("Are you sure to delete Product #"+ tr.data('id') + "?"); // Prompts confimation of delete procedure
        if (isDelete) {
            callApi("POST", productApi.remove, JSON.stringify(data))
            .fail(function(xhr, status, error) {
                console.error("API request failed:", status, error);
                alert('Failed to delete product. Please try again.');
            })
            .done(function(response) {
                if (response) {
                    alert('Product deleted successfully!');
                    location.reload();
                }
            })
        };
    });
}

// Saves the inputs from #insertProduct form and reloads the page
export function saveInsertProduct() {
    $('#modalOverlay').on('click', '#saveProductBtn', function() {
        const requestPayload = productsFormToJson('#newProductForm');

        callApi('POST', productApi.save, JSON.stringify(requestPayload))
        .fail(function(xhr, status, error) {
        console.error("API request failed:", status, error);
        alert('Failed to save product. Please try again.');
        })
        .done(function(response) {
        if (response && response.prod_id) {
            alert('Product saved successfully!');
            location.reload();
        }
        });
        hideModal();
    });
}

//#endregion