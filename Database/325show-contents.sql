/*
DataBased
----------------
Garrett Willis
Matthew MacDevitt
Logan Bates
Austin Wroblos
Chan Mrotzek
Bridget Acosta

Last modified 12/1/23
*/
--start 325show-contents.sql
spool 325results-contents.txt

prompt table customer
prompt ====================
col cust_fname  format a20 truncate
col cust_lname  format a20 truncate
col email  format a20 truncate
select * 
from customer;

prompt table cust_order
prompt ====================
select * 
from cust_order;

col ship_status format a20 truncate
col sub_period format a20 truncate
prompt table subscription_order
prompt ====================
select * 
from subscription_order;

prompt table subscription_shipment
prompt ====================
col ship_status format a15 truncate
select *
from subscription_shipment;

prompt table credit_card_info
prompt ====================
select * 
from credit_card_info;

prompt table one_time_order
prompt ====================
select *
from one_time_order;

col prod_name format a20 truncate
col prod_desc format a20 truncate
prompt table product
prompt ====================
select *
from product;

prompt table order_product
prompt ====================
select * 
from order_product;

col street_address format a20 truncate
col city format a5 truncate
col address_type format a10 truncate
prompt table address
prompt ====================
select * 
from address;

prompt table account
prompt ====================
select * 
from account;

prompt table shipment
prompt ====================
select *
from shipment;


spool off