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

spool 325report1-results.txt

clear columns;
clear breaks;
clear computes;

ttitle 'Customer Lifetime Value (CLV) Report';
btitle 'End of Customer Lifetime Value (CLV) Report';

set pagesize 20;
set linesize 75;

set feedback off;
break on report
compute avg of "Total Order Amount" on report
col "Customer Name" format a20 truncate
col "State" format a5 truncate
select c.cust_id "ID", c.cust_lname || ', ' || c.cust_fname "Customer Name",
    a.state "State",
    sum(co.order_amount) "Total Items Ordered"
from customer c
    join cust_order co on c.cust_id = co.cust_id
    join address a on c.cust_id = a.cust_id
group by c.cust_id, c.cust_fname, c.cust_lname, a.state
order by "Total Items Ordered" desc;


spool off

clear columns;
clear breaks;
clear computes;

set feedback on;

set pagesize 14;
set linesize 80;

ttitle off;
btitle off;
