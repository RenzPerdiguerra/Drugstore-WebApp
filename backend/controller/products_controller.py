from flask import Blueprint, request, jsonify
from backend.utils.sql_connector import get_sql_connection
import backend.dao.products_dao as products_dao

products_bp = Blueprint('products', __name__, url_prefix='/products')

conn = get_sql_connection()

@products_bp.route('/getProducts', methods=['GET'])
def getProducts():
    # gets product list requested
    payload = products_dao.get_products(conn)
    response = jsonify(payload)
    return response

@products_bp.route('/insertProduct', methods=['POST'])
def insertProduct():
    # adds product data 
    request_payload = request.get_json()
    prod_id = products_dao.insert_product(conn, request_payload)
    response = jsonify({
        'prod_id' : prod_id
    })
    return response

@products_bp.route('/updateProduct', methods=['PUT'])
def updateProduct():
    # updates product list
    request_payload = request.get_json()
    prod_id = products_dao.update_product(conn, request_payload)
    response = jsonify({
        'prod_id' : prod_id
    })
    return response

@products_bp.route('/deleteProduct', methods=['POST'])
def deleteProduct():
    # deletes a single product data
    request_payload = request.get_json()
    scalar_payload = request_payload.get('product_id')
    prod_id = products_dao.delete_product(conn, scalar_payload)
    response = jsonify({
        'prod_id' : prod_id
    })
    return response