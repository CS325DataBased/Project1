/*
Group: DataBased
----------------
Garrett Willis
Matthew MacDevitt
Logan Bates
Austin Wroblos
Chan Rain
Bridget Acosta

CS 325 - Fall 2023

Last modified: 12/8/23
*/
prompt Last Modified: 12/8/23
start 325populate.sql
spool 325queries-result.txt

set wrap off

prompt
prompt ==========================================================================
prompt #1 - Customers with Recurring Orders for Typewriter Ribbon in the Past 6 Months
prompt ==========================================================================
--This query retrieves customers who have subscribed to typewriter ribbon in the past 6 months.
--Answers business scenario question #1: Which customers and how many have subscribed to a recurring order for typewriter ribbon in the past 6 months?
col Name format a20
select c.cust_id "ID",  c.cust_fname || ' ' || c.cust_lname Name
from customer c
    join cust_order co on c.cust_id = co.cust_id
    join subscription_order so on co.order_id = so.order_id
    join subscription_shipment ss on so.sub_order_id = ss.sub_ship_id
    join product p on p.prod_id = (select op.prod_id from order_product op where op.order_id = so.order_id)
where p.prod_name = 'Typewriter Ribbon'
  and ss.sub_date >= sysdate - INTERVAL '6' month;

prompt
prompt ============================================================================
prompt #2 - Items Most Frequently Shipped from January to March of This Year
prompt ============================================================================
--This query identifies items most frequently shipped from January to March of this year.
--Answers business scenario question #2: What are the items that are most frequently shipped from January to March of this year?

col prod_name format a30
select p.prod_id, p.prod_name, sum(op.order_quantity) amount_shipped
from product p
    join order_product op on p.prod_id = op.prod_id
    join cust_order co on op.order_id = co.order_id
    join (
        select s.one_time_order_id order_id
        from shipment s
        where s.ship_status = 'Shipped'
        union
        select ss.sub_ship_id order_id
        from subscription_shipment ss
        where ss.ship_status = 'Shipped'
    ) ss on ss.order_id = co.order_id
where co.order_date between to_date('01-JAN-2023', 'DD-MON-YYYY') and to_date('31-MAR-2023', 'DD-MON-YYYY')
group by p.prod_id, p.prod_name
order by amount_shipped desc;

prompt
prompt ==============================================================================
prompt #3 - Items Sold the Most by State
prompt ==============================================================================
--This query shows the total quantity of items sold the most by state.
--Answers business scenario question #3: What items are sold the most by state?
select a.state, p.prod_id, p.prod_name, sum(op.order_quantity) total_sold
from address a
    join customer c on a.cust_id = c.cust_id
    join cust_order co on c.cust_id = co.cust_id
    join order_product op on co.order_id = op.order_id
    join product p on op.prod_id = p.prod_id
group by a.state, p.prod_id, p.prod_name
order by total_sold desc, a.state;


prompt
prompt ==============================================================================
prompt #4 - Order Status for Subscription Items that Have Been Purchased
prompt ==============================================================================
--This query retrieves information about subscription items that have been purchased, including order and shipment details.
--Answers business scenario question #4: Which is the order status for subscription items that have been purchased?
col Name format a20
select c.cust_id, c.cust_fname || ' ' || c.cust_lname Name,
  so.sub_status "Subscription Status",
  ss.ship_status "Shipment Status"
from customer c
    join cust_order co on c.cust_id = co.cust_id
    join subscription_order so on co.order_id = so.order_id
    join subscription_shipment ss on so.sub_order_id = ss.sub_ship_id
    join product p on p.prod_id = (select op.prod_id from order_product op WHERE op.order_id = so.order_id)
where p.prod_name = 'Typewriter Ribbon';
  

prompt
prompt ==============================================================================
prompt #5 - Number of Subscriptions and Their Details
prompt ==============================================================================
--This query provides details about all subscription products.
--Answers business scenario question #5: How many subscriptions do we have and what are they for?
col product format a25
select so.sub_order_id, p.prod_name product, 
    decode(so.sub_status, 1, 'Active', 0, 'Inactive', 'Unknown') sub_status, ss.sub_period
from customer c
    join cust_order co on co.cust_id = c.cust_id
    join subscription_order so on co.order_id = so.order_id
    join subscription_shipment ss on so.sub_order_id = ss.sub_ship_id
    join order_product op on co.order_id = op.order_id
    join product p on op.prod_id = p.prod_id;

prompt
prompt ==============================================================================
prompt #6 - Customer Lifetime Value (CLV)
prompt ==============================================================================
--Calculates the CLV for each customer based on their historical order amounts
col cust_fname format a20 truncate
col cust_lname format a20 truncate
select c.cust_id, c.cust_fname, c.cust_lname,
    sum(co.order_amount) total_order_amount
from customer c
    join cust_order co on c.cust_id = co.cust_id
group by c.cust_id, c.cust_fname, c.cust_lname
order by total_order_amount desc;

prompt
prompt ==============================================================================
prompt #7 - Product Replenishment Recommendation
prompt ==============================================================================
--This query identifies products with low quantities in stock and recommend replenishment.
select prod_id, prod_name, prod_quantity
from product
where prod_quantity < 50;

prompt
prompt ==============================================================================
prompt #8 - Top-Selling Products by Revenue
prompt ==============================================================================
--This query identifies the top-selling products based on total revenue.
select p.prod_id, p.prod_name,
    sum(op.order_quantity) total_sold_quantity,
    sum(op.order_quantity * p.prod_price) total_revenue
from product p
    join order_product op on p.prod_id = op.prod_id
group by p.prod_id, p.prod_name
order by total_revenue desc;

spool off
