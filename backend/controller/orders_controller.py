from flask import Blueprint, request, jsonify, Response
import pandas as pd
import io
from backend.utils.file_exporter import build_filename
from backend.utils.sql_connector import get_sql_connection
import backend.dao.orders_dao as orders_dao

orders_bp = Blueprint('orders', __name__, url_prefix='/orders')

conn = get_sql_connection()

@orders_bp.route('/get-order-list', methods=['GET'])
def getOrdersList():
    # gets order list requested
    request_payload = orders_dao.get_orders(conn)
    response = jsonify(request_payload)
    return response, 200

@orders_bp.route('/insert-order-item', methods=['POST'])
def insertOrderItem():
    # adds order data
    request_payload = request.get_json()
    order_id = orders_dao.insert_order_item(conn, request_payload)
    response = jsonify({
        'order_id' : order_id
    })
    return response, 201

@orders_bp.route('/update-order-item', methods=['PUT'])
def update_order_item():
    # updates product list
    request_payload = request.get_json()    
    order_id = orders_dao.update_order_item(conn, request_payload)
    response = jsonify({
        'order_id' : order_id
    })
    return response, 201

@orders_bp.route('/delete-order-item', methods=['POST'])
def delete_order_item():
    # deletes order data
    request_payload = request.get_json()
    scalar_payload = request_payload.get('order_id')
    order_id = orders_dao.delete_order_item(conn, scalar_payload)
    response = jsonify({
        'order_id' : order_id
    })
    return response, 201

@orders_bp.route('create-order-batch', methods=['POST'])
def create_order_batch():
    request_payload = request.get_json()
    response = orders_dao.insert_order_batch(conn, request_payload)
    return jsonify({'message': 'Order Batch successfully created', 'ob_id': response}), 201

@orders_bp.route('/create-pending-batch', methods=['POST'])
def create_pending_batch():
    request_payload = request.get_json()
    response = orders_dao.insert_pending_batch(conn, request_payload)
    return jsonify({'message': 'Pending batch successfully created', 'pb_id': response}), 201

@orders_bp.route('/get-pending-batches-list', methods=['GET'])
def get_pending_batches_list():
    # gets pending batches list requested
    request_payload = orders_dao.get_pending_batches(conn)
    response = jsonify(request_payload)
    return response, 200

@orders_bp.route('/create-confirmed-batch', methods=['POST'])
def create_confirmed_batch():
    request_payload = request.get_json()
    response = orders_dao.insert_confirmed_batch(conn, request_payload)
    return jsonify({'message': 'Confirmed batch successfully created', 'cb_id': response}), 201

@orders_bp.route('/get-confirmed-batches-list', methods=['GET'])
def get_confirmed_batches_list():
    # gets confirmed batches list requested
    request_payload = orders_dao.get_confirmed_batches(conn)
    response = jsonify(request_payload)
    return response, 200

@orders_bp.route('/export', methods=['POST'])
def export_batch():
    try:
        request_payload = request.get_json()['cb_id']
        row, cb_id_value = orders_dao.get_single_batch(conn, request_payload)
        df = pd.DataFrame(row, index=[0])
        
        csv_buffer = io.StringIO()
        df.to_csv(csv_buffer, index=False)
        csv_buffer.seek(0)
        
        filename = build_filename(cb_id_value)
        
        return Response(
            csv_buffer.getvalue(), 
            mimetype="text/csv",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 400