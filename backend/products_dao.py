from sql_connector import get_sql_connection

"""
Product DAO module:
Provides CRUD operations for the 'products' table:
- get: List all products
- insert: Add new product
- update: Modify existing product
- delete: Remove product by ID
"""


def get_products(conn):
    cur = conn.cursor()
    query = "SELECT * FROM management.products"
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
            'cost': cost,
            'price': price,
            'stock': stock,
            'stock_status': stock_status,
            'created_at': created_at
        })
        
    cur.close()
    return response

def insert_product(conn, products):
    cur = conn.cursor()
    data = (products['category'],products['g_name'], products['b_name'],
            products['d_arrived'], products['d_exp'], products['cost'], products['price'], 
            products['stock'], products['stock_status'])
    query = ("INSERT INTO management.products "
             "(category, g_name, b_name, d_arrived, d_exp, cost, price, stock, stock_status)"
             "VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)"
             "RETURNING prod_id")
    cur.execute(query, data)
    prod_id = cur.fetchone()[0]
    
    conn.commit()
    cur.close()
    return prod_id

def update_product(conn, products):
    cur = conn.cursor()
    data = (products['category'],products['g_name'], products['b_name'],
            products['d_arrived'], products['d_exp'], products['cost'], products['price'], 
            products['stock'], products['stock_status'], products['prod_id'])
    query = ("UPDATE management.products "
             "SET category = %s, g_name = %s, b_name = %s, d_arrived = %s, d_exp = %s,"
             "cost = %s, price = %s, stock = %s, stock_status = %s"
             "WHERE prod_id= %s RETURNING prod_id")
    cur.execute(query, data)
    updated_id = cur.fetchone()
    
    conn.commit()
    cur.close()
    return updated_id[0] if updated_id else None # returns updated id if successful

def delete_product(conn, prod_id):
    cur = conn.cursor()
    query = "DELETE FROM management.products WHERE prod_id = %s RETURNING prod_id"
    cur.execute(query, (prod_id,))
    deleted_id = cur.fetchone()
    
    conn.commit()
    cur.close()
    return deleted_id[0] if deleted_id else None # returns deleted id if successful


if __name__ == '__main__':
    conn = get_sql_connection()
    
'''
    MANUAL TEST SCRIPTS

    
    for x in get_products(conn):
        print(x)

    print(delete_product(conn, 1))
    
    print(insert_product(conn, {
            'category': 'Generic',
            'g_name': 'Para+Guia+PPA+Dextro+Chlor',
            'b_name': 'Mucotoss Forte Capsule',
            'd_arrived': '',
            'd_exp': '',
            'price': 10.00,
            'cost': 6.75,
            'stock': 100,
            'stock_status': '',
        }))
'''

