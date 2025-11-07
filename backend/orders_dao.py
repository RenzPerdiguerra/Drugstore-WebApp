from sql_connector import get_sql_connection

def get_orders(conn):
    cur = conn.cursor()
    query = "SELECT * FROM management.orders"
    cur.execute(query)
    
    response = []
    for (order_id, category, g_name, b_name, uom, cost) in cur:
        response.append({
            'order_id': order_id,
            'category': category,
            'g_name': g_name,
            'b_name': b_name,
            'uom': uom,
            'cost': cost
        })
        
    cur.close()
    return response

def insert_order(conn, orders):
    cur = conn.cursor()
    data= (orders['category'], orders['g_name'], orders['b_name'], orders['uom'],
           orders['order_qty'], orders['cost'], orders['total_cost'], orders['d_exp'])
    query = ("INSERT INTO management.orders "
            "(category, g_name, b_name, uom, order_qty, cost, total_cost, d_exp)"
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
    delete_order(conn, 6)
     
'''
    for x in get_orders(conn):
        print(x)
    
    insert_order(conn, {
    'category':'Generic',
    'g_name': 'Felodipine',
    'b_name':'Neophel', 
    'uom': 'piece',
    'order_qty':50,
    'cost':13.75,
    'total_cost':68750,
    'd_exp':'2028/10/12' 
    })

'''
    