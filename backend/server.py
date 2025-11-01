from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from sql_connector import get_sql_connection

import products_dao
import orders_dao
import uom_dao

app = Flask(__name__)
CORS(app)
conn = get_sql_connection()


@app.route('/getProducts', methods=['GET'])
def getProducts():
    # gets product list requested
    payload = products_dao.get_products(conn)
    response = jsonify(payload)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertProduct', methods=['POST'])
def insertProduct():
    # adds product data 
    request_payload = request.get_json()
    prod_id = products_dao.insert_product(conn, request_payload)
    response = jsonify({
        'prod_id' : prod_id
    })
    return response

@app.route('/updateProduct', methods=['PUT'])
def updateProduct():
    # updates product list
    request_payload = request.get_json()    
    prod_id = products_dao.update_product(conn, request_payload)
    response = jsonify({
        'prod_id' : prod_id
    })
    return response

@app.route('/deleteProduct', methods=['POST'])
def deleteProduct():
    # deletes a single product data
    request_payload = request.get_json()
    scalar_payload = request_payload.get('product_id')
    prod_id = products_dao.delete_product(conn, scalar_payload)
    response = jsonify({
        'prod_id' : prod_id
    })
    return response

@app.route('/getOrders', methods=['GET'])
def getOrders():
    # gets order list requested
    payload = orders_dao.get_orders(conn)
    response = jsonify(payload)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertOrder', methods=['POST'])
def insertOrder():
    # adds order data
    request_payload = json.loads(request.form['data'])
    order_id = orders_dao.insert_order(conn, request_payload)
    response = jsonify({
        'order_id' : order_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteOrder', methods=['POST'])
def deleteOrder():
    # deletes order data
    order_id = orders_dao.delete_order(conn, request.form['order_id'])
    response = jsonify({
        'order_id' : order_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

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


if __name__ == '__main__':
    print("Starting Flask Server for Drugstore Point-of-Sale System")
    app.run(debug=True) # allows restart while changes are made
    
