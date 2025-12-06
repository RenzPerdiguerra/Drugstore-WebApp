import sys

print("Python System Path:")
for path in sys.path:
    print(path)


'''
@app.route('/getUom', methods=['GET'])
def getUom():
    # gets uom list requested
    payload = uom_dao.get_uom(conn)
    response = jsonify(payload)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertUom', methods=['POST'])
def insertUom():
    # adds uom
    request_payload = json.loads(request.form['data'])
    uom_id = uom_dao.insert_uom(conn, request_payload)
    response = jsonify({
        'uom_id' : uom_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteUom', methods=['POST'])
def deleteUom():
    # deletes uom
    uom_id = uom_dao.delete_uom(conn, request.form['uom_id'])
    response = jsonify({
        'uom_id' : uom_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
'''