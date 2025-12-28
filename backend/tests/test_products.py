import unittest
from backend.utils.sql_connector import get_sql_connection
from backend.dao.products_dao import delete_product, get_products, insert_product, update_product

class TestOrderFunctions(unittest.TestCase):
    def setUp(self):
        self.conn = get_sql_connection()

    def test_delete_product(self):
        new_id = insert_product(self.conn, {
            'category': 'Generic',
            'g_name': 'Felodipine',
            'b_name': 'Neophel',
            'd_arrived': '2025-01-05',
            'd_exp': '2028-01-04',
            'cost': 13.75,
            'price': 17,
            'stock': 60,
            'stock_status': 'Average'
        })
        
        update_product(self.conn, {
            'category': 'GENERIC',
            'g_name': 'FELODIPINE',
            'b_name': 'NEOPHEL',
            'd_arrived': '2025-01-05',
            'd_exp': '2028-01-04',
            'cost': 13.75,
            'price': 17,
            'stock': 60,
            'stock_status': 'Average',
            'prod_id': new_id
        })
        
        products_before = get_products(self.conn)
        
        last_id = products_before[-1]['prod_id']
        delete_product(self.conn, last_id)
        products_after = get_products(self.conn)
        self.assertNotIn(last_id, [o['prod_id'] for o in products_after])

if __name__ == '__main__':
    unittest.main()