set search_path to management, public;

create table loyverse_items (
	lv_id SERIAL PRIMARY KEY,
	name TEXT,
	price Numeric(10,2),
	cost Numeric(10,2)
);