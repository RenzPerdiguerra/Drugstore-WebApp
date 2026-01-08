from backend.utils.sql_connector import get_sql_connection

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

def insert_order_item(conn, orders):
    cur = conn.cursor()
    data= (orders['category'], orders['g_name'], orders['b_name'],
           orders['uom'], orders['cost'])
    query = ("INSERT INTO management.orders "
            "(category, g_name, b_name, uom, cost"
            "VALUES(%s, %s, %s, %s, %s)"
            "RETURNING order_id")
    cur.execute(query, data)
    order_id = cur.fetchone()[0]
    
    conn.commit()
    cur.close()
    return order_id

def update_order_item(conn, orders):
    cur = conn.cursor()
    data = (orders['category'], orders['g_name'], orders['b_name'], orders['unit'], orders['cost'], )
    query = ("UPDATE management.orders"
            "SET category = %s, g_name = %s, b_name = %s, unit = %s, cost = %s"
            "WHERE order_id = %s RETURNING order_id")
    cur.execute(query, data)
    updated_id = cur.fetchone()
    
    conn.commit()
    cur.close()
    return updated_id[0] if updated_id else None

def delete_order_item(conn, order_id):
    cur = conn.cursor()
    query = "DELETE FROM management.orders WHERE order_id = %s RETURNING order_id"
    cur.execute(query, (order_id,))
    deleted_id = cur.fetchone()
    
    conn.commit()
    cur.close()
    return deleted_id[0] if deleted_id else None

def insert_pending_batch(conn, pending_batch):
    cur = conn.cursor()
    data = (pending_batch['b_name'], pending_batch['requester'], pending_batch['items_qty'],
            pending_batch['total_cost'])
    query = ("INSERT INTO management.pending_batches"
             "(b_name, requester, items_qty, total_cost)"
             "VALUES (%s, %s, %s, %s) RETURNING pb_id")
    cur.execute(query, data)
    pb_id = cur.fetchone()[0]
    
    conn.commit()
    cur.close()
    return pb_id

def insert_confirmed_batch(conn, confirmed_batch):
    cur = conn.cursor()
    data = (confirmed_batch['pb_id'], confirmed_batch['b_name'], confirmed_batch['requester'],
            confirmed_batch['items_qty'], confirmed_batch['total_cost'])
    query = ("INSERT INTO management.confirmed_batches"
             "(pb_id, b_name, requester, items_qty, total_cost)"
             "SELECT pb_id, b_name, requester, items_qty, total_cost"
             "FROM management.pending_batches RETURNING cb_id")
    cur.execute(query, data)
    cb_id = cur.fetchone()[0]
    
    conn.commit()
    cur.close()
    return cb_id


# UNIT TEST
if __name__ == '__main__':
    conn = get_sql_connection()    
    delete_order_item(conn, 6)
     
'''
    for x in get_orders(conn):
        print(x)
    
    insert_order(conn, {
    'category':'Generic',
    'g_name': 'Felodipine',
    'b_name':'Neophel', 
    'uom': 'piece',
    'cost':13.75,
    })

'''
    