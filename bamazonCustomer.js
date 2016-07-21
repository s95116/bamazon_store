//Set global require variable for mysql and console.table NPM packages
var mysql = require('mysql');
var table = require('console.table');

//Create new mySQL connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "Bamazon"
})

//Checks to see if the connection has worked
connection.connect(function(err){
  if (err) throw err;
  console.log("connected " + connection.threadId);
});

//Query that displays everything(*) from Products table
connection.query('SELECT * FROM Products', function(err, res){
  console.table(res);
});