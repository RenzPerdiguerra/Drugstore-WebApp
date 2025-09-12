from flask import Flask, request, jsonify
import json
from sql_connector import get_sql_connection
import products_dao


app = Flask(__name__)
conn = get_sql_connection()


@app.route('/getProducts', methods=['GET'])
def getProducts():
    # gets product list requested
    payload = products_dao.get_products(conn)
    response = jsonify(payload)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/addProduct', methods=['POST'])
def insertProduct():
    # adds products
    request_payload = json.loads(request.form['data'])
    prod_id = products_dao.insert_product(conn, request_payload)
    response = jsonify({
        'prod_id' : prod_id
    })
    response.headers.add('Access-Allow-Origin', '*')
    return response

@app.route('/deleteProduct', methods=['POST'])
def deleteProduct():
    # deletes products
    prod_id = products_dao.delete_product(conn, request.form['prod_id'])
    response = jsonify({
        'prod_id' : prod_id
    })
    response.headers.add('Access-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    print("Starting Flask Server for Grocery Store Management System")
    app.run(debug=True) # allows restart while changes are made
    
    
    
