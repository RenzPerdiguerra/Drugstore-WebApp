CREATE SCHEMA IF NOT EXISTS management;

	-- for browser user connection
	set search_path to management, public;
	CREATE TABLE users (
		user_id SERIAL PRIMARY KEY,
		username varchar(50) NOT NULL,
		email varchar(50) NOT NULL
	);
		
	-- product orders to suppliers e.g. MeedPharma
		CREATE TABLE orders (
		order_id SERIAL PRIMARY KEY,
		category varchar(30),
        g_name varchar(50) NOT NULL,
		b_name varchar(50),
		uom varchar(50),
		cost DECIMAL(10,2)
    );

	-- serves as item lists and stock management
    CREATE TABLE products (
        prod_id SERIAL PRIMARY KEY,
		category varchar(30),
        g_name varchar(50) NOT NULL,
		b_name varchar(50),
		d_arrived DATE,
		d_exp DATE,
		price DECIMAL(10,2),
		cost DECIMAL(10,2),
		stock int,
		stock_status varchar(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

	-- employees profiling
	CREATE TABLE employees (
		emp_id SERIAL PRIMARY KEY,
		name varchar(50) NOT NULL,
		branch varchar(20) NOT NULL,
		shift varchar(30),
		age SMALLINT,
		gender char(1) check(gender in('M', 'F')),
		date_started date,
		date_contractEnded date
	);

	-- type of discounts management
	CREATE TABLE discounts (
		disc_name varchar(30),
		value Decimal (1,2),
		access_type varchar(14) check (access_type in('Restricted', 'Not Restricted'))
	);

/*
    CREATE VIEW products_OutOfStock AS
        SELECT * FROM products WHERE stock_status = 'None';
		
    CREATE VIEW products_WithStock AS
        SELECT * FROM products WHERE stock_status = '';
*/
