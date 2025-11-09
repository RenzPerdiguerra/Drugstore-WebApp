CREATE SCHEMA IF NOT EXISTS management;

	-- for browser user connection
	set search_path to management, public;
	DROP TABLE IF EXISTS
		users, products, orders, uom, branches, order_batches, pending_batches,
		 confirmed_batches, order_events, employees, discounts cascade;
	
	CREATE TABLE users (
		user_id SERIAL PRIMARY KEY,
		username varchar(50) NOT NULL,
		email varchar(50) NOT NULL
	);

	-- serves as item lists and stock management
    CREATE TABLE products (
        prod_id SERIAL PRIMARY KEY,
		category varchar(30),
        g_name varchar(50) NOT NULL,
		b_name varchar(50),
		d_arrived DATE,
		d_exp DATE,
		cost DECIMAL(10,2),
		price DECIMAL(10,2),
		stock int,
		stock_status varchar(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
		
	-- unit of measurement reference e.g. box (30's), piece, tablet, capsule
		CREATE TABLE uom (
		uom_id SERIAL PRIMARY KEY,
		uom varchar(30),
    );

	-- drugstore branches
	CREATE TABLE branches (
		b_id SeriAL PRIMARY KEY,
		b_name varchar(30) CHECK(b_name in('Palangoy', 'Darangan', 'San Juan', 'Libid', 'Floodway')),
		address TEXT NOT NULL,
		owner text,
		start_yr DATE
	);

	-- checked out orders
	CREATE TABLE order_batches (
		ob_id SERIAL PRIMARY KEY,
		category varchar(30) REFERENCES products(category),
		g_name varchar(50) NOT NULL,
		b_name varchar(50),
		unit varchar(50),
		cost INT not null,
		created_at TIMESTAMP DEFAULT NOW(),
	);

	-- batch of checked out orders
	CREATE TABLE pending_batches (
		pb_id SERIAL PRIMARY KEY,
		b_name text not null,
		requester TEXT not null, /* name col in employees */
		items_qty INT not null,
		total_cost INT not null,
		created_at TIMESTAMP DEFAULT NOW(),
		modified_at TIMESTAMP DEFAULT NOW() /* vary in backend */
	);

	-- verified batches from pending_batches
	CREATE TABLE confirmed_batches (
		cb_id SERIAL PRIMARY KEY,
		pb_id_id INT,
		b_name TEXT NOT NULL,
		requester TEXT NOT NULL,
		items_qty INT NOT NULL,
		total_cost INT NOT NULL,
		confirmed_at TIMESTAMP DEFAULT NOW()
	);

	-- audit logging/event sourcing from pending_batches
	CREATE TABLE order_events (
		oe_id SERIAL PRIMARY KEY,
		pb_id INT,
		b_name TEXT,
		requester TEXT,
		created_at TIMESTAMP, /* Make sure link values from order_batches*/
		action varchar(50)
	);

	-- employees profiling
	CREATE TABLE employees (
		emp_id SERIAL PRIMARY KEY,
		name TEXT NOT NULL,
		branch TEXT NOT NULL,
		shift TEXT,
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



