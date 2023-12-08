--Last Modified: 12/8/23

DROP TABLE IF EXISTS shipment;
DROP TABLE IF EXISTS one_time_order;
DROP TABLE IF EXISTS subscription_shipment;
DROP TABLE IF EXISTS subscription_order;
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS order_product;
DROP TABLE IF EXISTS cust_order;
DROP TABLE IF EXISTS address;
DROP TABLE IF EXISTS credit_card_info;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS product;


CREATE TABLE customer (
  cust_id char(4),
  cust_fname varchar(50),
  cust_lname varchar(50),
  email varchar(50),
  cust_phone char(10),
  PRIMARY KEY (cust_id)
);

CREATE TABLE credit_card_info (
  cc_id char(4),
  cust_id char(4),
  card_number char(16),
  expiration_date date,
  CVV char(3),
  PRIMARY KEY (cc_id),
  FOREIGN KEY (cust_id) REFERENCES customer(cust_id)
);

CREATE TABLE address (
  address_id char(4),
  address_type varchar(40),
  street_address varchar(40),
  city varchar(40),
  state char(2),
  postal_code char(5),
  cust_id char(4),
  PRIMARY KEY (address_id),
  FOREIGN KEY (cust_id) REFERENCES customer(cust_id)
);

CREATE TABLE cust_order (
  order_id CHAR(4),
  cust_id CHAR(4),
  order_date DATE,
  order_amount INT,
  sales_tax DECIMAL,
  cc_id CHAR(4),
  address_id CHAR(4),
  PRIMARY KEY (order_id),
  FOREIGN KEY (cust_id) REFERENCES customer(cust_id),
  FOREIGN KEY (cc_id) REFERENCES credit_card_info(CC_id),
  FOREIGN KEY (address_id) REFERENCES address(address_id)
);

CREATE TABLE subscription_order (
  sub_order_id char(4),
  sub_status char(1),
  order_id char(4),
  PRIMARY KEY (sub_order_id),
  FOREIGN KEY (order_id) REFERENCES cust_order(order_id)
);

CREATE TABLE subscription_shipment (
  sub_ship_id char(4),
  ship_status varchar(100),
  sub_period varchar(50),
  sub_date date,
  ship_date date,
  address_id char(4),
  PRIMARY KEY (sub_ship_id),
  FOREIGN KEY (sub_ship_id) REFERENCES subscription_order(sub_order_id),
  FOREIGN KEY (address_id) REFERENCES address(address_id)
);

CREATE TABLE one_time_order (
  one_time_order_id char(4),
  order_status varchar(20),
  PRIMARY KEY (one_time_order_id),
  FOREIGN KEY (one_time_order_id) REFERENCES cust_order(order_id)
);

CREATE TABLE product (
  prod_id char(4),
  prod_name Varchar(50),
  prod_desc varchar(1000),
  prod_price decimal,
  prod_quantity int,
  PRIMARY KEY (prod_id)
);

CREATE TABLE order_product (
  order_id char(4),
  prod_id char(4),
  order_quantity int,
  PRIMARY KEY (order_id, prod_id),
  FOREIGN KEY (order_id) REFERENCES cust_order(order_id),
  FOREIGN KEY (prod_id) REFERENCES product(prod_id)
);

CREATE TABLE account (
  user_account_id char(4),
  username varchar(15),
  password varchar(20),
  PRIMARY KEY (user_account_id),
  FOREIGN KEY (user_account_id) REFERENCES customer(cust_id)
);

CREATE TABLE shipment (
  ship_id char(4),
  ship_status varchar(100),
  one_time_order_id char(4),
  address_id char(4),
  PRIMARY KEY (ship_id),
  FOREIGN KEY (one_time_order_id) REFERENCES one_time_order(one_time_order_id),
  FOREIGN KEY (address_id) REFERENCES address(address_id)
);


