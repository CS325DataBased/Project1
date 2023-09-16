//Imports.
import express from 'express';
import * as fs from 'fs';
import mysql from 'mysql';

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

app.post('/test', (req, res) => {
  const query = 'select * from test';
  con.query(query, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      console.log(results);
    }
  });
});

//Test Queries.
con.query('DROP TABLE IF EXISTS test', function (error, results, fields) {
  if (error) throw error;
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
});

con.query('CREATE TABLE test (first VARCHAR(255), last VARCHAR(255))', function (error, results, fields) {
  if (error) throw error;
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
});

con.query('insert into test SET first = ?, last = ?',['Austin','Wroblos'],function (error, results, fields) {
  if (error) throw error;
  //console.log(error)
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
});

// con.query('select * from test', function (error, results, fields) {
//   if (error) throw error;
//   console.log(results)
// });


const port = 80

fs.readFile ('../Front-End/index.html', function(error,html)  {
    if (error) throw error;
    app.get('/', (req, response) => {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
      })
      
    app.listen(port, () => {
        console.log(`Server Started. ${port}`)
      })
});