import unittest
from your_module import delete_order, get_orders, insert_order

class TestOrderFunctions(unittest.TestCase):
    def setUp(self):
        self.conn = get_sql_connection()

    def test_delete_order(self):
        insert_order(self.conn, {
            'category': 'Generic',
            'g_name': 'Felodipine',
            'b_name': 'Neophel',
            'uom': 'piece',
            'order_qty': 50,
            'cost': 13.75,
            'total_cost': 687.50,
            'd_exp': '2028/10/12'
        })
        orders_before = get_orders(self.conn)
        last_id = orders_before[-1]['order_id']
        delete_order(self.conn, last_id)
        orders_after = get_orders(self.conn)
        self.assertNotIn(last_id, [o['order_id'] for o in orders_after])

if __name__ == '__main__':
    