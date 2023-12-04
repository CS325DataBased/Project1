-- CS325-Fall-2023
-- Last Modified: 12/1/23

-- Group Name: DataBased

-- Members: 
-- Austin Wroblos
-- Garrett Willis
-- Matthew MacDevitt
-- Logan Bates
-- Chan Rain
-- Bridget Acosta

delete from shipment;
delete from one_time_order;
delete from subscription_shipment;
delete from subscription_order;
delete from address;
delete from account;
delete from credit_card_info;
delete from order_product;
delete from product;
delete from cust_order;
delete from customer;


-- Insert statements that will be used to populate tables.

--INSERT ONE

-- Insert statements for customer table
INSERT INTO customer (cust_id, cust_fname, cust_lname, email, cust_phone)
VALUES ('0001', 'J', 'Doe', 'john.doe@example.com', '1234567890');

-- Insert statements for cust_order table
INSERT INTO cust_order (order_id, cust_id, order_date, order_amount, sales_tax)
VALUES ('0001', '0001', '01-Jan-2022', 100, 0.1);

-- Insert statements for subscription_order table
INSERT INTO subscription_order (sub_order_id, sub_status, order_id)
VALUES ('0001', 1, '0001');

-- Insert statements for subscription_shipment table
INSERT INTO subscription_shipment (sub_ship_id, ship_status, sub_period, sub_date, ship_date)
VALUES ('0001', 'Shipped', 'Monthly', '01-Jan-2022', '01-Jan-2022');

-- Insert statements for credit_card_info table
INSERT INTO credit_card_info (cust_id, card_number, expiration_date, CVV)
VALUES ('0001', '1234567890123456', '01-Jan-2022', '123');

-- Insert statements for one_time_order table
INSERT INTO one_time_order (one_time_order_id)
VALUES ('0001');

-- Insert statements for product table
INSERT INTO product (prod_id, prod_name, prod_desc, prod_price, prod_quantity)
VALUES ('0001', 'P Key', 'The Key you P with', 10.99, 100);

-- Insert statements for order_product table
INSERT INTO order_product (order_id, prod_id, order_quantity)
VALUES ('0001', '0001', 2);

-- Insert statements for address table
INSERT INTO address (address_id, address_type, street_address, city, state, postal_code, cust_id)
VALUES ('0001', 'Billing', '123 Main St', 'City', 'CA', '12345', '0001');

-- Insert statements for account table
INSERT INTO account (user_account_id, username, password)
VALUES ('0001', 'johndoe', 'password');

-- Insert statements for shipment table
INSERT INTO shipment (ship_id, ship_status, one_time_order_id)
VALUES ('0001', 'Shipped', '0001');



--INSERT TWO

-- Insert statements for customer table
INSERT INTO customer (cust_id, cust_fname, cust_lname, email, cust_phone)
VALUES ('0002', 'Sammy', 'Carter', 'Sam.Cart@example.com', '418041841');

-- Insert statements for cust_order table
INSERT INTO cust_order (order_id, cust_id, order_date, order_amount, sales_tax)
VALUES ('0002', '0002', '08-Feb-2022', 490, 0.5);

-- Insert statements for subscription_order table
INSERT INTO subscription_order (sub_order_id, sub_status, order_id)
VALUES ('0002', 1, '0002');

-- Insert statements for subscription_shipment table
INSERT INTO subscription_shipment (sub_ship_id, ship_status, sub_period, sub_date, ship_date)
VALUES ('0002', 'Shipped', 'Monthly', '08-Feb-2022', '13-Feb-2022');

-- Insert statements for credit_card_info table
INSERT INTO credit_card_info (cust_id, card_number, expiration_date, CVV)
VALUES ('0002', '5467413115761230', '08-Mar-2022', '123');

-- Insert statements for one_time_order table
INSERT INTO one_time_order (one_time_order_id)
VALUES ('0002');

-- Insert statements for product table
INSERT INTO product (prod_id, prod_name, prod_desc, prod_price, prod_quantity)
VALUES ('0002', 'Ink', 'Goes on paper.', 42.99, 100);

-- Insert statements for order_product table
INSERT INTO order_product (order_id, prod_id, order_quantity)
VALUES ('0002', '0002', 2);

-- Insert statements for address table
INSERT INTO address (address_id, address_type, street_address, city, state, postal_code, cust_id)
VALUES ('0002', 'Billing', '465 Second St', 'City', 'CA', '11321', '0002');

-- Insert statements for account table
INSERT INTO account (user_account_id, username, password)
VALUES ('0002', 'SamCart', 'wordpass');

-- Insert statements for shipment table
INSERT INTO shipment (ship_id, ship_status, one_time_order_id)
VALUES ('0002', 'Shipped', '0002');


--INSERT THREE

INSERT INTO customer (cust_id, cust_fname, cust_lname, email, cust_phone)
VALUES ('0003', 'Thomas', 'Hanks', 'tom.hanks@gmail.com', '3105559797');

-- Insert statements for cust_order table
INSERT INTO cust_order (order_id, cust_id, order_date, order_amount, sales_tax)
VALUES ('0003', '0003', '21-Jan-2023', 4, 7.25);

-- Insert statements for subscription_order table
INSERT INTO subscription_order (sub_order_id, sub_status, order_id)
VALUES ('0003', 1, '0003');

-- Insert statements for subscription_shipment table
INSERT INTO subscription_shipment (sub_ship_id, ship_status, sub_period, sub_date, ship_date)
VALUES ('0003', 'Shipped', 'Monthly', '01-Feb-2023', '02-Feb-2023');

-- Insert statements for credit_card_info table
INSERT INTO credit_card_info (cust_id, card_number, expiration_date, CVV)
VALUES ('0003', '1234577890123499', '01-Jan-2025', '489');

-- Insert statements for one_time_order table
INSERT INTO one_time_order (one_time_order_id)
VALUES ('0003');

-- Insert statements for product table
INSERT INTO product (prod_id, prod_name, prod_desc, prod_price, prod_quantity)
VALUES ('1745', 'Purple Ribbon', 'Deep Purple Ribbon (Ink) for any standard sized typewriter', 24.99, 97);

-- Insert statements for order_product table
INSERT INTO order_product (order_id, prod_id, order_quantity)
VALUES ('0003', '1745', 2);

-- Insert statements for address table
INSERT INTO address (address_id, address_type, street_address, city, state, postal_code, cust_id)
VALUES ('0003', 'Billing', '741 Hollywood Blvd.', 'Hollywood', 'CA', '90210', '0003');

-- Insert statements for account table
INSERT INTO account (user_account_id, username, password)
VALUES ('0003', 'tomhanks', 'givemeribbons');

-- Insert statements for shipment table
INSERT INTO shipment (ship_id, ship_status, one_time_order_id)
VALUES ('1799', 'Shipped', '0003');



--INSERT FOUR

INSERT INTO customer (cust_id, cust_fname, cust_lname, email, cust_phone)
VALUES ('0004', 'Stephen', 'King', 's.king@yahoo.com', '2075559797');

-- Insert statements for cust_order table
INSERT INTO cust_order (order_id, cust_id, order_date, order_amount, sales_tax)
VALUES ('0004', '0004', '11-March-2023', 666, 7.25);

-- Insert statements for subscription_order table
INSERT INTO subscription_order (sub_order_id, sub_status, order_id)
VALUES ('0004', 1, '0004');

-- Insert statements for subscription_shipment table
INSERT INTO subscription_shipment (sub_ship_id, ship_status, sub_period, sub_date, ship_date)
VALUES ('0004', 'Shipped', 'Monthly', '01-April-2023', '19-April-2023');

-- Insert statements for credit_card_info table
INSERT INTO credit_card_info (cust_id, card_number, expiration_date, CVV)
VALUES ('0004', '1234567990123456', '01-Jan-2027', '454');

-- Insert statements for one_time_order table
INSERT INTO one_time_order (one_time_order_id)
VALUES ('0004');

-- Insert statements for product table
INSERT INTO product (prod_id, prod_name, prod_desc, prod_price, prod_quantity)
VALUES ('0004', 'Good ol Fashioned Type Writer', 'Built to last', 149.99, 666);

-- Insert statements for order_product table
INSERT INTO order_product (order_id, prod_id, order_quantity)
VALUES ('0004', '0004', 1);

-- Insert statements for address table
INSERT INTO address (address_id, address_type, street_address, city, state, postal_code, cust_id)
VALUES ('0004', 'Billing', '47 West Broadway', 'Bangor', 'ME', '04401', '0004');

-- Insert statements for account table
INSERT INTO account (user_account_id, username, password)
VALUES ('0004', 'stevesy', 'theshining');

-- Insert statements for shipment table
INSERT INTO shipment (ship_id, ship_status, one_time_order_id)
VALUES ('0004', 'Shipped', '0004');


--INSERT FIVE

-- Insert statements for customer table
INSERT INTO customer (cust_id, cust_fname, cust_lname, email, cust_phone)
VALUES ('0005', 'Ernest', 'Hemingway', 'ernhem@example.com', '5551234567');

-- Insert statements for cust_order table
INSERT INTO cust_order (order_id, cust_id, order_date, order_amount, sales_tax)
VALUES ('0005', '0005', '28-Nov-2023', 150, 0.15);

-- Insert statements for subscription_order table
INSERT INTO subscription_order (sub_order_id, sub_status, order_id)
VALUES ('0005', 1, '0005');

-- Insert statements for subscription_shipment table
INSERT INTO subscription_shipment (sub_ship_id, ship_status, sub_period, sub_date, ship_date)
VALUES ('0005', 'Shipped', 'Monthly', '01-Dec-2023', '05-Dec-2023');

-- Insert statements for credit_card_info table
INSERT INTO credit_card_info (cust_id, card_number, expiration_date, CVV)
VALUES ('0005', '9876543210987654', '01-Dec-2027', '789');

-- Insert statements for one_time_order table
INSERT INTO one_time_order (one_time_order_id)
VALUES ('0005');

-- Insert statements for product table
INSERT INTO product (prod_id, prod_name, prod_desc, prod_price, prod_quantity)
VALUES ('0005', 'Typewriter Ribbon', 'High-quality ink ribbon', 19.99, 50);

-- Insert statements for order_product table
INSERT INTO order_product (order_id, prod_id, order_quantity)
VALUES ('0005', '0005', 2);

-- Insert statements for address table
INSERT INTO address (address_id, address_type, street_address, city, state, postal_code, cust_id)
VALUES ('0005', 'Shipping', '456 Oak Street', 'Oakland', 'CA', '94612', '0005');

-- Insert statements for account table
INSERT INTO account (user_account_id, username, password)
VALUES ('0005', 'ernesth', 'oldmanandthesea');

-- Insert statements for shipment table
INSERT INTO shipment (ship_id, ship_status, one_time_order_id)
VALUES ('0005', 'Shipped', '0005');


--INSERT SIX

-- Insert statements for customer table
INSERT INTO customer (cust_id, cust_fname, cust_lname, email, cust_phone)
VALUES ('0006', 'Agatha', 'Christie', 'aga.chr@hotmail.com', '9998765432');

-- Insert statements for cust_order table
INSERT INTO cust_order (order_id, cust_id, order_date, order_amount, sales_tax)
VALUES ('0006', '0006', '28-Nov-2023', 120, 0.12);

-- Insert statements for subscription_order table
INSERT INTO subscription_order (sub_order_id, sub_status, order_id)
VALUES ('0006', 1, '0006');

-- Insert statements for subscription_shipment table
INSERT INTO subscription_shipment (sub_ship_id, ship_status, sub_period, sub_date, ship_date)
VALUES ('0006', 'Shipped', 'Monthly', '01-Dec-2023', '05-Dec-2023');

-- Insert statements for credit_card_info table
INSERT INTO credit_card_info (cust_id, card_number, expiration_date, CVV)
VALUES ('0006', '1111222233334444', '01-Dec-2027', '222');

-- Insert statements for one_time_order table
INSERT INTO one_time_order (one_time_order_id)
VALUES ('0006');

-- Insert statements for product table
INSERT INTO product (prod_id, prod_name, prod_desc, prod_price, prod_quantity)
VALUES ('0006', 'Typewriter Key Kit', 'Replacement keys for typewriters', 29.99, 30);

-- Insert statements for order_product table
INSERT INTO order_product (order_id, prod_id, order_quantity)
VALUES ('0006', '0006', 1);

-- Insert statements for address table
INSERT INTO address (address_id, address_type, street_address, city, state, postal_code, cust_id)
VALUES ('0006', 'Shipping', '789 Pine Avenue', 'Pineville', 'LA', '71360', '0006');

-- Insert statements for account table
INSERT INTO account (user_account_id, username, password)
VALUES ('0006', 'agathac', 'murderontheorientexp');

-- Insert statements for shipment table
INSERT INTO shipment (ship_id, ship_status, one_time_order_id)
VALUES ('0006', 'Shipped', '0006');



-- INSERT SEVEN

-- Insert statements for customer table
INSERT INTO customer (cust_id, cust_fname, cust_lname, email, cust_phone)
VALUES ('0007', 'Jane', 'Smith', 'jane.smith@example.com', '9876543210');

-- Insert statements for cust_order table
INSERT INTO cust_order (order_id, cust_id, order_date, order_amount, sales_tax)
VALUES ('0007', '0007', '05-Jan-2022', 150, 0.15);

-- Insert statements for subscription_order table
INSERT INTO subscription_order (sub_order_id, sub_status, order_id)
VALUES ('0007', 1, '0007');

-- Insert statements for subscription_shipment table
INSERT INTO subscription_shipment (sub_ship_id, ship_status, sub_period, sub_date, ship_date)
VALUES ('0007', 'Shipped', 'Monthly', '16-Jan-2022', '16-Jan-2022');

-- Insert statements for credit_card_info table
INSERT INTO credit_card_info (cust_id, card_number, expiration_date, CVV)
VALUES ('0007', '9876543210987654', '13-Sep-2031', '321');

-- Insert statements for one_time_order table
INSERT INTO one_time_order (one_time_order_id)
VALUES ('0007');

-- Insert statements for product table
INSERT INTO product (prod_id, prod_name, prod_desc, prod_price, prod_quantity)
VALUES ('0007', 'F Key', 'It goes on a typewriter.', 15.99, 50);

-- Insert statements for order_product table
INSERT INTO order_product (order_id, prod_id, order_quantity)
VALUES ('0007', '0007', 3);

-- Insert statements for address table
INSERT INTO address (address_id, address_type, street_address, city, state, postal_code, cust_id)
VALUES ('0007', 'Billing', '456 Elm St', 'Augusta', 'MA', '54321', '0007');

-- Insert statements for account table
INSERT INTO account (user_account_id, username, password)
VALUES ('0007', 'janesmith', 'chanisreallycool1234');

-- Insert statements for shipment table
INSERT INTO shipment (ship_id, ship_status, one_time_order_id)
VALUES ('0007', 'Shipped', '0007');



-- INSERT EIGHT

-- Insert statements for customer table
INSERT INTO customer (cust_id, cust_fname, cust_lname, email, cust_phone)
VALUES ('0008', 'Michael', 'Berry', 'michael.berry@example.com', '4363876344');

-- Insert statements for cust_order table
INSERT INTO cust_order (order_id, cust_id, order_date, order_amount, sales_tax)
VALUES ('0008', '0008', '12-Jan-2022', 125, 0.15);

-- Insert statements for subscription_order table
INSERT INTO subscription_order (sub_order_id, sub_status, order_id)
VALUES ('0008', 1, '0008');

-- Insert statements for subscription_shipment table
INSERT INTO subscription_shipment (sub_ship_id, ship_status, sub_period, sub_date, ship_date)
VALUES ('0008', 'Shipped', 'Monthly', '18-Jan-2022', '18-Jan-2022');

-- Insert statements for credit_card_info table
INSERT INTO credit_card_info (cust_id, card_number, expiration_date, CVV)
VALUES ('0008', '4363876344987654', '17-Sep-2031', '325');

-- Insert statements for one_time_order table
INSERT INTO one_time_order (one_time_order_id)
VALUES ('0008');

-- Insert statements for product table
INSERT INTO product (prod_id, prod_name, prod_desc, prod_price, prod_quantity)
VALUES ('0008', 'Wrench', 'You can throw it at something, I think.', 12.49, 25);

-- Insert statements for order_product table
INSERT INTO order_product (order_id, prod_id, order_quantity)
VALUES ('0008', '0008', 7);

-- Insert statements for address table
INSERT INTO address (address_id, address_type, street_address, city, state, postal_code, cust_id)
VALUES ('0008', 'Billing', '678 7th St', 'Jonestown', 'ND', '44357', '0008');

-- Insert statements for account table
INSERT INTO account (user_account_id, username, password)
VALUES ('0008', 'michaelberry', 'reallysecurepassword');

-- Insert statements for shipment table
INSERT INTO shipment (ship_id, ship_status, one_time_order_id)
VALUES ('0008', 'Shipped', '0008');



-- INSERT NINE

-- Insert statements for customer table
INSERT INTO customer (cust_id, cust_fname, cust_lname, email, cust_phone)
VALUES ('0009', 'Joey', 'Connors', 'joey.connors@example.com', '3439094578');

-- Insert statements for cust_order table
INSERT INTO cust_order (order_id, cust_id, order_date, order_amount, sales_tax)
VALUES ('0009', '0009', '10-Feb-2022', 160, 0.15);

-- Insert statements for subscription_order table
INSERT INTO subscription_order (sub_order_id, sub_status, order_id)
VALUES ('0009', 1, '0009');

-- Insert statements for subscription_shipment table
INSERT INTO subscription_shipment (sub_ship_id, ship_status, sub_period, sub_date, ship_date)
VALUES ('0009', 'Shipped', 'Monthly', '19-Mar-2022', '19-Mar-2022');

-- Insert statements for credit_card_info table
INSERT INTO credit_card_info (cust_id, card_number, expiration_date, CVV)
VALUES ('0009', '3439094578987654', '10-Aug-2031', '334');

-- Insert statements for one_time_order table
INSERT INTO one_time_order (one_time_order_id)
VALUES ('0009');

-- Insert statements for product table
INSERT INTO product (prod_id, prod_name, prod_desc, prod_price, prod_quantity)
VALUES ('0009', 'Screwdriver', 'This is a nifty tool', 11.99, 20);

-- Insert statements for order_product table
INSERT INTO order_product (order_id, prod_id, order_quantity)
VALUES ('0009', '0009', 5);

-- Insert statements for address table
INSERT INTO address (address_id, address_type, street_address, city, state, postal_code, cust_id)
VALUES ('0009', 'Billing', '555 B St', 'Lionstown', 'UT', '40010', '0009');

-- Insert statements for account table
INSERT INTO account (user_account_id, username, password)
VALUES ('0009', 'joeyconnors', 'dontguessmypassword');

-- Insert statements for shipment table
INSERT INTO shipment (ship_id, ship_status, one_time_order_id)
VALUES ('0009', 'Shipped', '0009');



-- INSERT TEN

-- Insert statements for customer table
INSERT INTO customer (cust_id, cust_fname, cust_lname, email, cust_phone)
VALUES ('0010', 'William', 'Afton', 'william.afton@ffpizza.com', '0349283098');

-- Insert statements for cust_order table
INSERT INTO cust_order (order_id, cust_id, order_date, order_amount, sales_tax)
VALUES ('0010', '0010', '18-Jul-1987', 145, 0.15);

-- Insert statements for subscription_order table
INSERT INTO subscription_order (sub_order_id, sub_status, order_id)
VALUES ('0010', 1, '0010');

-- Insert statements for subscription_shipment table
INSERT INTO subscription_shipment (sub_ship_id, ship_status, sub_period, sub_date, ship_date)
VALUES ('0010', 'Shipped', 'Monthly', '14-Nov-1983', '14-Nov-1983');

-- Insert statements for credit_card_info table
INSERT INTO credit_card_info (cust_id, card_number, expiration_date, CVV)
VALUES ('0010', '0349283098987654', '27-Oct-2023', '549');

-- Insert statements for one_time_order table
INSERT INTO one_time_order (one_time_order_id)
VALUES ('0010');

-- Insert statements for product table
INSERT INTO product (prod_id, prod_name, prod_desc, prod_price, prod_quantity)
VALUES ('0010', 'Springs', 'Keep them dry.', 8.99, 30);

-- Insert statements for order_product table
INSERT INTO order_product (order_id, prod_id, order_quantity)
VALUES ('0010', '0010', 6);

-- Insert statements for address table
INSERT INTO address (address_id, address_type, street_address, city, state, postal_code, cust_id)
VALUES ('0010', 'Billing', '830 Sunset Blvd', 'Columbus', 'OH', '90210', '0010');

-- Insert statements for account table
INSERT INTO account (user_account_id, username, password)
VALUES ('0010', 'purpleguy', 'ialwayscomeback');

-- Insert statements for shipment table
INSERT INTO shipment (ship_id, ship_status, one_time_order_id)
VALUES ('0010', 'Shipped', '0010');
