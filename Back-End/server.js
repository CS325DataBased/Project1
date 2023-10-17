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
  database: "mysql"
});

//Checking that SQL connect was a success.
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//Defining Add Customer Post Request.
app.post('/addNewCustomerToDB', (req, res) => {
  // console.log(req.body.first);
  con.query('insert into customer SET customer_id = ?, first_name = ?, last_name = ?,email = ?, phone = ?',[req.body.id,req.body.first,req.body.last,req.body.email,req.body.phone],function (error, results, fields) {
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
  con.query('delete from customer where customer_id = ?',[req.body.id],function (error, results, fields) {
    if (error) {
      console.log(error);
    };
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
  });
});

//Defining Test Post Request.
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
//Test Queries.
con.query('CREATE TABLE IF NOT EXISTS `customer` (	`customer_id` INT(11) NOT NULL,	`first_name` VARCHAR(40) NULL DEFAULT NULL COLLATE \'utf8mb4_general_ci\',	`last_name` VARCHAR(40) NULL DEFAULT NULL COLLATE \'utf8mb4_general_ci\',	`email` VARCHAR(20) NULL DEFAULT NULL COLLATE \'utf8mb4_general_ci\',	`phone` VARCHAR(10) NULL DEFAULT NULL COLLATE \'utf8mb4_general_ci\',	PRIMARY KEY (`customer_id`) USING BTREE) COLLATE=\'utf8mb4_general_ci\' ENGINE=InnoDB;', function (error, results, fields) {
  if (error) throw error;
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
});
con.query('CREATE TABLE IF NOT EXISTS product (product_id int,product_name varchar(50),product_description varchar(100),price decimal(6,2),quantity int,PRIMARY KEY (product_id));', function (error, results, fields) {
  if (error) throw error;
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
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