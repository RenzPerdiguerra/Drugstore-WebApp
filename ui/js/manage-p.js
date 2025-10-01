$(function () {
    // Define the API endpoint URL
    $.get(productsListApiUrl, function (response) {
        if (response && Array.isArray(response)) {
            var table = '';
            $.each(response, function (index, product) {
                table += '<tr data-id="' + product.prod_id +
                    '" data-category="' + product.category +
                    '" data-gname="' + product.g_name +
                    '" data-bname="' + product.b_name +
                    '" data-datearrived="' + product.d_arrived +
                    '" data-dateexpired="' + product.d_exp +
                    '" data-price="' + product.price +
                    '" data-cost="' + product.cost +
                    '" data-stock="' + product.stock +
                    '" data-stockstatus="' + product.stock_status +
                    '" data-createdat="' + product.created_at + '">' +
                    '<td>' + product.prod_id + '</td>' +
                    '<td>' + product.category + '</td>' +
                    '<td>' + product.g_name + '</td>' +
                    '<td>' + product.b_name + '</td>' +
                    '<td>' + product.price + '</td>' +
                    '<td>' + product.d_arrived + '</td>' +
                    '<td>' + product.d_exp + '</td>' +
                    '<td>' + product.cost + '</td>' +
                    '<td>' + product.stock + '</td>' +
                    '<td>' + product.stock_status + '</td>' +
                    '<td>' +
                        '<button class="btn btn-primary btn-sm">Edit</button> ' +
                        '<button class="btn btn-danger btn-sm">Delete</button>' +
                    '</td>' +
                '</tr>';
            });
            $("table").find('tbody').empty().html(table);
        }
    }).fail(function (xhr, status, error) {
        console.error("API request failed: ", status, error);
        $("table").find("tbody").html('<tr><td colspan="11">Failed to load products. Please try again later.</td></tr>');
    }); 
});

// I need a form to collect data from the user
// When the user clicks the save button, collect the data from the form and send it to the API endpoint
// After the API call is successful, reload the page to reflect the changes

$('#insertProductTrigger').on('click', function() {
    const formHtml = `
        <form id="productForm">
            <div id="productForm-title">Insert a Product</div>
            <div class="form-row">
                <label>Category:</label>
                <input type="text" name="category">
            </div>

            <div class="form-row">
                <label>Generic Name:</label>
                <input type="text" name="g_name" required>
            </div>

            <div class="form-row">
                <label>Brand Name:</label>
                <input type="text" name="b_name">
            </div>

            <div class="form-row">
                <label>Date Arrived:</label>
                <input type="date" name="d_arrived">
            </div>

            <div class="form-row">
                <label>Date Expired:</label>
                <input type="date" name="d_exp">
            </div>

            <div class="form-row">
                <label>Price:</label>
                <input type="number" name="price" step="0.01">
            </div>

            <div class="form-row">
                <label>Stock:</label>
                <input type="number" name="stock">
            </div>

            <button type="button" class="save" id="saveProductBtn">Save Product</button>
            <button type="button" class="cancel" id="closeModalBtn">Cancel</button>
        </form>
    `;
    $('#modalContent').html(formHtml);
    $('#modalOverlay').removeClass('hidden');
});

// Delegate save button logic
$('#modalOverlay').on('click', '#saveProductBtn', function() {
    var data = $('#productForm').serializeArray();
    var requestPayload = {
        category: null,
        g_name: null,
        b_name: null,
        d_arrived: null,
        d_exp: null,
        price: null,
        stock: null
    };
    
    $.each(data, function(index, field) {
        requestPayload[field.name] = field.value;
    });

    callApi('POST', productSaveApiUrl, {
        data: JSON.stringify(requestPayload)
    })
    .fail(function(xhr, status, error) {
        console.error("API request failed:", status, error);
        alert('Failed to save product. Please try again.');
    })
    .done(function(response) {
        if (response && response.success) {
            alert('Product saved successfully!');
            location.reload();
        }
    });

    $('#modalOverlay').addClass('hidden');
    $('#modalContent').empty();
});

// Close modal
$('#modalOverlay').on('click', '#closeModalBtn', function() {
    $('#modalOverlay').addClass('hidden');
    $('#modalContent').empty();
});
