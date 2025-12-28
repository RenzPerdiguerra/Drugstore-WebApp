export function showSelectedOrdersSection() {
    $('.orders-sections .nav-item').on('click', function (e) {
        e.preventDefault();

        $('.orders-sections .nav-link').removeClass('active');

        $(this).find('.nav-link').addClass('active');

        const sectionName = $(this).data('section');

        $('.body-orders-list, .body-pending-confirmation, .body-confirmed-orders').addClass('d-none');

        if (sectionName === 'order-here') {
            $('.body-orders-list').removeClass('d-none');
            $('.orders-body-checked').removeClass('d-none');
            $('.body-pending-confirmation').addClass('d-none');
            $('.body-confirmed-orders').addClass('d-none');
        }

        if (sectionName === 'pending-confirmation') {
            $('.body-orders-list').addClass('d-none');
            $('.orders-body-checked').addClass('d-none');
            $('.body-pending-confirmation').removeClass('d-none');
        }

        if (sectionName === 'confirmed-orders') {
            $('.body-orders-list').addClass('d-none');
            $('.orders-body-checked').addClass('d-none');
            $('.body-confirmed-orders').removeClass('d-none');
        }
    });
}

// provides products for each checked rows
export function calculateSubTotal($row) {
    const qty = parseInt($row.find('.qty-input').val()) || 1;
    const rowCost = parseFloat($row.data('cost')) || 0;
    return qty * rowCost;
}

// Get qty input value to provide total cost per item and iterated over rendered items for the sum
export function calculateTotal() {
    $(document).on('input', '.qty-input', function(){
        const $row = $(this).closest('.selected-item');
        const rowTotal = calculateSubTotal($row);

        $row.find('.total-cost').text(`₱${rowTotal.toFixed(2)}`);

        let grandTotal = 0;
        $('.total-cost').each(function(){
            const val = parseFloat($(this).text().replace(/[^\d.-]/g, '')) || 0;
            grandTotal += val;
        });

        $('#orders-sum').html(`₱${grandTotal.toFixed(2)}`);
    })
}

// Extracts data from checked-items
export function collectCheckedItems() {
    return new Promise((resolve) => {
        $(document).on('click', '.orders-final .submit', function() {
            let items = [];
            let grandTotal = 0;
            let counter = 0;

            $('.checked-items .selected-item').each(function(){
                const $row = $(this);
                const orderBatchesPayload = {
                    order_id: $row.data('order_id'),
                    category: $row.data('category'),
                    g_name: $row.find('.col-md-4').text().trim(),
                    b_name: $row.find('.col-md-3').first().text().trim(),
                    cost: parseFloat($row.data('cost') || 0),
                    qty: parseInt($row.find('.qty-input').val() || 1),
                    total_cost: calculateSubTotal($row)
                };
            
                items.push(orderBatchesPayload);
                grandTotal += orderBatchesPayload.total_cost;
                counter += 1;
            })
        })
        resolve({items, grandTotal, counter});
    });
}


// create row-level data for pending_batches
export async function createPendingBatchesPayload() {
    const { items, grandTotal, counter} = await collectCheckedItems();
    const empData = ; // from management.employees table
    
    const data = {
        // pb_id : serial primary key
        b_name: empData, 
        requester: empData,
        items_qty: counter,
        total_cost: grandTotal,
        // created_at : timestamp default current_timestamp
        // modified_at
    }

    return data
}

