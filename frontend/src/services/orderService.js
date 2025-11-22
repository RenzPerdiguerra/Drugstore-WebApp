// provides products for each checked rows
export function calculateRowTotal($row) {
    const qty = parseInt($row.find('.qty-input').val()) || 1;
    const rowCost = parseFloat($row.data('cost')) || 0;
    return qty * rowCost;
}

// Extracts data from checked-items
export function collectCheckedItems(){
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
            cost: parseFloat($row.data('.cost') || 0),
            qty: parseInt($row.find('.qty-input').val() || 1),
            total_cost: calculateRowTotal($row)
        };
    
        items.push(orderBatchesPayload);
        grandTotal += orderBatchesPayload.total_cost;
        counter += 1;
    })

    return {items, grandTotal, counter};
}

// create row-level data for pending_batches
export function createPendingBatchesPayload() {
    const { items, grandTotal, counter} = collectCheckedItems();
    const empData = ; // from management.employees table
    
    const data = {
        branch_name: empData, 
        requester: empData,
        items_qty: counter,
        total_cost: grandTotal,
    }

    return data
}
