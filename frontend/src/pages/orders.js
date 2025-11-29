import {calculateTotal, collectCheckedItems} from '../services/orderService.js'
import getOrderList, { renderCheckedItems } from '../components/orders-list.js'

// render orders list
getOrderList();

// render row-level data to calculation table. Includes initial Orders Total
renderCheckedItems();

// Updates Orders Total when quantity is changed
calculateTotal();

// Extracts data from checked items once submitted
collectCheckedItems().then({items, grandTotal, counter});





/*
$(document).on('click', '.submit', function (){

    const orderBatchesPayload = 

    const pendingBatchesPayload = 
    // transfer sum value from another DOM function
    // extract items from checked-items
    // extract sum from qty-input DOM
    // package into payload
    // send via ajax
    

})
*/
