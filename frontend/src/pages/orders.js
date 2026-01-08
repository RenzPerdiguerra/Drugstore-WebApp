import {calculateTotal, collectCheckedItems, confirmOrdersSubmission, showSelectedOrdersSection} from '../services/orderService.js'
import getOrderList, { renderSubmitForm, renderCheckedItems } from '../components/ordersList.js'

// render orders list
getOrderList();

showSelectedOrdersSection();

// render row-level data to calculation table. Includes initial Orders Total
renderCheckedItems();

// Update Orders Total when quantity is changed
calculateTotal();

// Render Orders submission form to get employee name
renderSubmitForm();

// Extracts data from checked items once submitted
collectCheckedItems();

// Get employee name and create pending batches payload
confirmOrdersSubmission();
