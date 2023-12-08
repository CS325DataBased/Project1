-- CS 325 - Fall 2023

-- Matthew MacDevitt
-- Logan Bates
-- Austin Wroblos
-- Chan Rain
-- Bridget Acosta

-- Last Modified: 12/8/2023

spool 325report2-results.txt;

-- This query identifies the top-selling products based on total revenue.

--ttitle 'Top-Selling Products by Revenue'
clear columns breaks computes
set pagesize 20
set linesize 75
set feedback off

ttitle "Top-Selling Products by Revenue (TSPR) Report"
btitle "End of Top-Selling Products by Revenue (TSPR) Report"
col cust_name heading 'Customer Name' format a20 truncate
col prod_name heading 'Product Name' format a30
col total_sold_quantity heading 'Quantity Sold' format 999
col total_revenue heading 'Revenue' format $9999.99
break ON report skip 1 ON report
compute sum of total_revenue ON report

drop view order_history;
create view order_history AS
    select 
        cust_lname || ', ' || cust_fname cust_name,
        prod_name,
        prod_price,
        order_quantity
    from customer c, product p, order_product op, cust_order o
    where c.cust_id = o.cust_id
        and o.order_id = op.order_id
        and p.prod_id = op.prod_id;

SELECT
    cust_name,
    prod_name,
    SUM(order_quantity) total_sold_quantity,
    SUM(order_quantity * prod_price) total_revenue    
FROM
    order_history
GROUP BY
    cust_name,
    prod_name
ORDER BY
    cust_name,
    prod_name, 
    total_revenue DESC;

spool off
clear columns breaks computes
set feedback on
set space 1
set feedback 6
set pagesize 14
set linesize 80
set newpage 1
set heading on
ttitle off
btitle off