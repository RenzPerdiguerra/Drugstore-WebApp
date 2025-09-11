from sql_connector import get_connection




def get_products(conn):
    cur = conn.cursor()
    query = "SELECT * FROM products"
    cur.execute(query)
    
    response = []
    for (prod_id, category, g_name, b_name, d_arrived, d_exp, price, cost, stock, stock_status, created_at) in cur:
        response.append({
            'prod_id': prod_id,
            'category': category,
            'g_name': g_name,
            'b_name': b_name,
            'd_arrived': d_arrived,
            'd_exp': d_exp,
            'price': price,
            'cost': cost,
            'stocl': stock,
            'stock_status': stock_status,
            'created_at': created_at
        })

    cur.close()
    return response

if __name__ == '__main__':
    connection = get_connection()