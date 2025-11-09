/* OBJECTS
- constraints, views, indexes, triggers, and stored procedures
*/

-- CONSTRAINTS
alter table uom
add constraint uom_unit_check
CHECK (
	unit in ('piece', 'tablet', 'capsule', 'box', 'ampule',
	'box 30''s', 'box 100''s', 'box 50''s', 'box 10''s',
	'box 20''s', 'box 80''s', 'bottle')
);


/* VIEWS
CREATE VIEW products_OutOfStock AS
	SELECT * FROM products WHERE stock_status = 'None';
	
CREATE VIEW products_WithStock AS
	SELECT * FROM products WHERE stock_status = '';
*/