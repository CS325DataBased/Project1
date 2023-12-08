//Imports.
import express, { json } from 'express';
import * as fs from 'fs';
import mysql from 'mysql';

//Setting server static files.
const app = express();
app.use(express.static('../Front-End/'));
app.use(express.json())

//Making Connection to SQL server.
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});

//Checking that SQL connect was a success.
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//Defining Add Customer Post Request.
app.post('/addNewCustomerToDB', (req, res) => {
  console.log(req.body.id,req.body.first,req.body.last,req.body.email,req.body.phone);
  con.query('insert into customer SET cust_id = ?, cust_fname = ?, cust_lname = ?,email = ?, cust_phone = ?',[req.body.id,req.body.first,req.body.last,req.body.email,req.body.phone],function (error, results, fields) {
    if (error) {
      console.log(error);
    };
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
  });
});

//Defining Add Customer Post Request.
app.post('/deleteCustomerFromDB', (req, res) => {
  // console.log(req.body.first);
  con.query('delete from customer where cust_id = ?',[req.body.id],function (error, results, fields) {
    if (error) {
      console.log(error);
    };
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
  });
});

app.post('/GetPartID', (req, res) => {
  const query = 'select * from product where prod_name = '+ '\'' + req.body.name + '\'';
  con.query(query, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      // console.log(results);
      res.json(results);
    }
  });
});


app.post('/GetPartsForOrder', (req, res) => {
  const query = 'select * from order_product where order_id = '+ '\'' + req.body.orderid + '\'';
  con.query(query, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      // console.log(results);
      res.json(results);
    }
  });
});

app.post('/GetPartInfoForOrder', (req, res) => {
  const query = 'select * from product where prod_id = '+ '\'' + req.body.prodid + '\'';
  con.query(query, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      // console.log(results);
      res.json(results);
    }
  });
});

app.get('/GetCustomerData', (req, res) => {
  const query = 'select * from customer';
  con.query(query, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      // console.log(results);
      res.json(results);
    }
  });
});


app.get('/GetProductData', (req, res) => {
  const query = 'select * from product';
  con.query(query, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      // console.log(results);
      res.json(results);
    }
  });
});

app.get('/GetOneTimeOrderData', (req, res) => {

  var getOrders = 'select * from cust_order,credit_card_info,address,customer,one_time_order where cust_order.cc_id = credit_card_info.cc_id and cust_order.address_id = address.address_id and cust_order.cust_id = customer.cust_id and cust_order.order_id = one_time_order.one_time_order_id';
  con.query(getOrders, function (error, results) {
    console.log(results);
    if (error) {
      console.log(error);
    } else {
      let returnValue = [];
      console.log(results.length);
      for(let i = 0;i < results.length;i++) {
        let order = [];
        let getItems = 'select * from order_product,product where order_id = '+ '\'' + results[i].order_id + '\''+' and order_product.prod_id = product.prod_id';
        con.query(getItems, function (error, results2) {
          let items = [];
          for(let j = 0;j < results2.length;j++) {
            console.log(results2[j].prod_id,results2[j].prod_name,results2[j].prod_desc,results2[j].prod_price,results2[j].prod_quantity)
            items.push({id:results2[j].prod_id,name:results2[j].prod_name,quantity:results2[j].prod_quantity});
          }
          let orderInfo = {status:results[i].order_status,order_id:results[i].order_id,cust_id:results[i].cust_id,order_date:results[i].order_date,order_amount:results[i].order_amount,sales_tax:results[i].sales_tax,cc_id:results[i].cc_id,items:items};
          let card = {cc_id:results[i].cc_id,cc_number:results[i].card_number,cc_expiration:results[i].expiration_date,cc_cvv:results[i].CVV};
          let address = {address_id:results[i].address_id,addressType:results[i].address_type,street:results[i].street_address,city:results[i].city,state:results[i].state,zip:results[i].postal_code};
          let customer = {cust_id:results[i].cust_id,first_name:results[i].cust_fname,last_name:results[i].cust_lname,email:results[i].email,phone:results[i].cust_phone};
          order.push(items,orderInfo,card,address,customer);
          returnValue.push(order);
        });
      }
      setTimeout(function(){
        res.json(returnValue);
    }, 10);
    }
  });
});

//Defining Add Product Post Request.
app.post('/addNewProductToDB', (req, res) => {
  // console.log(req.body.first);
  con.query('insert into product SET prod_id = ?, prod_name = ?, prod_desc = ?,prod_price = ?, prod_quantity = ?',[req.body.id,req.body.name,req.body.desc,req.body.price,req.body.quantity],function (error, results, fields) {
    if (error) {
      console.log(error);
    };
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
  });
});

//Defining remove Product Post Request.
app.post('/deleteProductFromDB', (req, res) => {
  // console.log(req.body.first);
  con.query('delete from product where prod_id = ?',[req.body.id],function (error, results, fields) {
    if (error) {
      console.log(error);
    };
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
  });
});

//Defining Add Order Post Request.
app.post('/addNewOrderToDB', (req, res) => {
  console.log(req.body.orderid,req.body.custid,req.body.order_date,req.body.order_amount,req.body.sales_tax,req.body.cc_id,req.body.address_id);
  con.query('insert into cust_order SET order_id = ?,cust_id = ?, order_date = ?,order_amount = ?,sales_tax = ?,cc_id = ?,address_id = ?',[req.body.orderid,req.body.custid,req.body.order_date,req.body.order_amount,req.body.sales_tax,req.body.cc_id,req.body.address_id],function (error, results, fields) {
    if (error) {
      console.log(error);
    };
    if(req.body.type === 'one-time') {
      con.query('insert into one_time_order SET one_time_order_id = ?, order_status = ?',[req.body.orderid,req.body.status],function (error, results, fields) {
        if (error) {
          console.log(error);
        };
      });
    } else if(req.body.type === 'subscription') {
      con.query('insert into subscription_order SET subscription_order_id = ?',[req.body.orderid],function (error, results, fields) {
        if (error) {
          console.log(error);
        };
      });
    }
  });
});

//Defining remove Order Post Request.
app.post('/deleteOrderFromDB', (req, res) => {
  con.query('delete from order_product where order_id = ?',[req.body.orderid],function (error, results, fields) {
    if (error) {
      console.log(error);
    };
  });
  console.log(req.body.orderid);
  if(req.body.type === 'one-time') {
    con.query('delete from one_time_order where one_time_order_id = ?',[req.body.orderid],function (error, results, fields) {
      if (error) {
        console.log(error);
      };
      con.query('delete from cust_order where order_id = ?',[req.body.orderid],function (error, results, fields) {
        if (error) {
          console.log(error);
        };
      });
    });
  } else if(req.body.type === 'subscription') {
    con.query('delete from subscription_order where subscription_order_id = ?',[req.body.orderid],function (error, results, fields) {
      if (error) {
        console.log(error);
      };
      con.query('delete from cust_order where order_id = ?',[req.body.orderid],function (error, results, fields) {
        if (error) {
          console.log(error);
        };
      });
    });
  }
});

app.post('/addCardToDB', (req, res) => {
  console.log(req.body.cc_id,req.body.cc_number,req.body.cc_expiration,req.body.cc_cvv,req.body.cust_id);
  con.query('insert into credit_card_info SET cc_id = ?, card_number = ?, expiration_date = ?, CVV = ?, cust_id = ?',[req.body.cc_id,req.body.cc_number,req.body.cc_expiration,req.body.cc_cvv,req.body.cust_id],function (error, results, fields) {
    if (error) {
      console.log(error);
    };
  });
});

app.post('/addAddressToDB', (req, res) => {
  console.log(req.body.address_id,req.body.address_type,req.body.street,req.body.city,req.body.state,req.body.postal,req.body.cust_id);
  con.query('insert into address SET address_id = ?, address_type = ?, street_address = ?, city = ?, state = ?, postal_code = ?, cust_id = ?',[req.body.address_id,req.body.address_type,req.body.street,req.body.city,req.body.state,req.body.postal,req.body.cust_id],function (error, results, fields) {
    if (error) {
      console.log(error);
    };
  });
});

app.post('/addOrderPrductsToDB', (req, res) => {
  console.log(req.body.item_id,req.body.item_quantity,req.body.order_id);
  con.query('insert into order_product SET prod_id = ?, order_quantity = ?, order_id = ?',[req.body.item_id,req.body.item_quantity,req.body.order_id],function (error, results, fields) {
    if (error) {
      console.log(error);
    };
  });
});
//Test Queries.
// con.query('insert into customer SET customer_id = ?, first_name = ?, last_name = ?,email = ?, phone = ?',[1234,'Austin','Wroblos','acw128@humboldt.edu',123456789],function (error, results, fields) {
//   if (error) {
//     console.log(error);
//   };
//   //console.log(error)
//   // error will be an Error if one occurred during the query
//   // results will contain the results of the query
//   // fields will contain information about the returned results fields (if any)
// });

//Set server port.
const port = 80
//Write html file to web page.
fs.readFile ('../Front-End/index.html', function(error,html)  {
    if (error) throw error;
    app.get('/', (req, response) => {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
      })
    //Listener for request.  
    app.listen(port, () => {
        console.log(`Server Started. ${port}`)
      })
});