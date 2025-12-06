from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS
from backend.utils.sql_connector import get_sql_connection

import json
import backend.dao.orders_dao as orders_dao


@app.route('/getOrderList', methods=['GET'])
def getOrdersList():
    # gets order list requested
    payload = orders_dao.get_orders(conn)
    response = jsonify(payload)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertOrderItem', methods=['POST'])
def insertOrderItem():
    # adds order data
    request_payload = request.get_json()
    order_id = orders_dao.insert_order_item(conn, request_payload)
    response = jsonify({
        'order_id' : order_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/updateOrderItem', methods=['PUT'])
def updateOrderItem():
    # updates product list
    request_payload = request.get_json()    
    order_id = orders_dao.update_order_item(conn, request_payload)
    response = jsonify({
        'order_id' : order_id
    })
    return response

@app.route('/deleteOrderItem', methods=['POST'])
def deleteOrderItem():
    # deletes order data
    request_payload = request.get_json()
    scalar_payload = request_payload.get('order_id')
    order_id = orders_dao.delete_order_item(conn, scalar_payload)
    response = jsonify({
        'order_id' : order_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response