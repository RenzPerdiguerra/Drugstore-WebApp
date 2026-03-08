def get_end_user(conn, info):
    cur = conn.cursor()
    data = (info['name'], info['branch'])
    query = ("SELECT name, branch FROM management.employees "
             "WHERE name=%s and branch=%s"
             "RETURNING emp_id")
    cur.execute(query, data)
    id = cur.fetchone()
        
    cur.close()
    return {'id': id}