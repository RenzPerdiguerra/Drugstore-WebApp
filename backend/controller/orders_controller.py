from flask import Blueprint, request, jsonify
from backend.utils.sql_connector import get_sql_connection
import backend.dao.orders_dao as orders_dao

orders_bp = Blueprint('orders', __name__, url_prefix='/orders')

conn = get_sql_connection()

@orders_bp.route('/getOrderList', methods=['GET'])
def getOrdersList():
    # gets order list requested
    payload = orders_dao.get_orders(conn)
    response = jsonify(payload)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@orders_bp.route('/insertOrderItem', methods=['POST'])
def insertOrderItem():
    # adds order data
    request_payload = request.get_json()
    order_id = orders_dao.insert_order_item(conn, request_payload)
    response = jsonify({
        'order_id' : order_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@orders_bp.route('/updateOrderItem', methods=['PUT'])
def updateOrderItem():
    # updates product list
    request_payload = request.get_json()    
    order_id = orders_dao.update_order_item(conn, request_payload)
    response = jsonify({
        'order_id' : order_id
    })
    return response

@orders_bp.route('/deleteOrderItem', methods=['POST'])
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