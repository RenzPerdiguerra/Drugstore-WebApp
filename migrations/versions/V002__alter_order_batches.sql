-- migrations/versions/V002__alter_order_batches.sql
ALTER TABLE management.order_batches
DROP COLUMN branch_name;
