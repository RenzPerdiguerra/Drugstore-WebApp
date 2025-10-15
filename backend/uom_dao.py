from sql_connector import get_sql_connection

def get_uom(conn):
    cur = conn.cursor()
    query = "SELECT * FROM management.uom"
    cur.execute(query)
    
    response = []
    for (uom_id, unit) in cur:
        response.append({
            'uom': uom_id,
            'unit': unit
        })

    cur.close()
    return response
'''
def insert_uom(conn, uom):
    cur = conn.cursor()
    data= (uom['unit'])
    query = ("INSERT INTO management.uom "
            "(unit)"
            "VALUES(%s)"
            "RETURNING uom_id")
    cur.execute(query, data)
    uom_id = cur.fetchone()[0]
    
    conn.commit()
    cur.close()
    return uom_id
'''
def insert_uom(conn, unit):
    cur = conn.cursor()
    query = ("INSERT INTO management.uom "
            "(unit)"
            "VALUES(%s)"
            "RETURNING uom_id")
    cur.execute(query, (unit,))
    uom_id = cur.fetchone()[0]
    
    conn.commit()
    cur.close()
    return uom_id

def delete_uom(conn, uom_id):
    cur = conn.cursor()
    query = "DELETE FROM management.uom WHERE uom_id = %s RETURNING uom_id"
    cur.execute(query, (uom_id,))
    deleted_id = cur.fetchone()
    
    conn.commit()
    cur.close()
    return deleted_id[0] if deleted_id else None


# UNIT TEST
if __name__ == '__main__':
    conn = get_sql_connection()

'''
    for x in get_uom(conn):
    print(x)
    
    insert_uom(conn, 'box')
    
    delete_uom(conn, 5)

'''
