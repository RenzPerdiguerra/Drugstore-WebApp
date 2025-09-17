

    $(function () {
        // get JSON data via API
        $.get(productsListApiUrl, function (response) {
            if(response) {
                var table = '';
                $.each(response, function(index, products) {
                    table += '<tr data-id="' + products.prod_id + '" data-name="' + products.category + '" data-gname="' +
                    prodcucts.g_name + '" data-bname="' + products.b_name + '" data-datearrived="' + products.d_arrived +
                    '" data-dateexpired="' + products.d_exp + '" data-price="' + products.price + '" date-cost="' + products.stock +
                    '" date-stockstatus="' + products.stock_status + '" date-createdat="' + products.created_at + '">' +
                    '<td>' + products.prod_id + '</td>' +
                    '<td>' + products.category + '</td>' +
                    '<td>' + products.g_name + '</td>' +
                    '<td>' + products.b_name + '</td>' + 
                    '<td>' + products.d_arrived + '</td>' + 
                    '<td>' + products.d_exp + '</td>' + 
                    '<td>' + products.price + '</td>' + 
                    '<td>' + products.stock + '</td>' + 
                    '<td>' + products.stock_status + '</td>' + 
                    '<td>' + products.created_at + '</td>'
                });
                $("table").find('tbody').empty().html(table);
            }
        });
    });