from sql_connector import get_sql_connection

def get_orders(conn):
    cur = conn.cursor()
    query = "SELECT * FROM management.orders"
    cur.execute(query)
    
    response = []
    for (order_id, category, g_name, b_name, uom, order_qty, cost, total_cost, d_exp, d_oforder) in cur:
        response.append({
            'order_id': order_id,
            'category': category,
            'g_name': g_name,
            'b_name': b_name,
            'uom': uom,
            'order_qty': order_qty,
            'cost': cost,
            'total_cost': total_cost,
            'd_exp': d_exp,
            'd_oforder': d_oforder
        })
        
    cur.close()
    return response

def insert_order(conn, orders):
    cur = conn.cursor()
    data= (orders['category'], orders['g_name'], orders['b_name'], orders['uom'],
           orders['order_qty'], orders['cost'], orders['total_cost'], orders['d_exp'])
    query = ("INSERT INTO management.orders "
            "(category, g_name, b_name, uom, order_qty, cost, total_cost, d_exp, d_oforder)"
            "VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"
            "RETURNING order_id")
    cur.execute(query, data)
    order_id = cur.fetchone()[0]
    
    conn.commit()
    cur.close()
    return order_id

def delete_order(conn, order_id):
    cur = conn.cursor()
    query = "DELETE FROM management.orders WHERE order_id = %s RETURNING order_id"
    cur.execute(query, (order_id,))
    deleted_id = cur.fetchone()
    
    conn.commit()
    cur.close()
    return deleted_id[0] if deleted_id else None


# UNIT TEST
if __name__ == '__main__':
    conn = get_sql_connection()
    for x in get_orders(conn):
        print(x)
    