// Creates request payload with form inputs and edit button data-id. Used parameters for accommodating product id as field extension
export function formToJson(formSelector, extraFields = {}) {
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
};