set search_path to management;

DROP TABLE IF EXISTS branches, order_batches, confirmed_batches, order_events cascade;

CREATE TABLE branches (
	b_id SeriAL PRIMARY KEY,
	b_name TEXT NOT NULL,
	address TEXT NOT NULL,
	owner text,
	start_yr DATE
);

CREATE TABLE order_batches (
	ob_id SERIAL PRIMARY KEY,
	b_name text not null,
	requester TEXT not null, /* name col in employees */
	no_of_items INT not null,
	total_cost INT not null,
	created_at TIMESTAMP DEFAULT NOW(),
	modified_at TIMESTAMP DEFAULT NOW() /* vary in backend */
);

CREATE TABLE confirmed_batches (
	cb_id SERIAL PRIMARY KEY,
	ob_id INT,
	b_name TEXT NOT NULL,
	requester TEXT NOT NULL,
	no_of_items INT NOT NULL,
	total_cost INT NOT NULL,
	confirmed_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_events (
	oe_id SERIAL PRIMARY KEY,
	ob_id INT,
	b_name TEXT NOT NULL,
	requester TEXT NOT NULL,
	created_at TIMESTAMP, /* Make sure link values from order_batches*/
	action varchar(50)
);
