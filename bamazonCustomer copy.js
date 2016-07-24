//Set global require variable for mysql, console.table, and inquirer NPM packages
var mysql = require('mysql');
var table = require('console.table');
var inquirer = require('inquirer');

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
  if (err) throw err;
  console.table(res); 
  promptCustomer();
});

var promptCustomer = function() {
  inquirer.prompt([
    {
      type: "input",
      name: "productId",
      message: "Please enter the itemID for the product you wish to buy."
    },{
      type: "input",
      name: "totalQuantity",
      message: "Please enter your desired quantity"
    }
  ]).then(function(prompt_result){
      //console.log("You're desired quantity is "+ result.totalQuantity);

      connection.query("SELECT * FROM Products where itemID = '"+prompt_result.productId+"'", function(err, res){
          if (err) throw err;
          if (res.length == 0) {
            console.log("ItemID not found. Please try again.");
            promptCustomer();
          }else{

          console.log("\nThe product you've selected is : \n" );
          console.table(res);
          console.log("The quantity you've selected is " + prompt_result.totalQuantity);
          //console.log(res[0].stockQuantity);
          //console.log(prompt_result.totalQuantity);
          if(res[0].stockQuantity >= parseInt(prompt_result.totalQuantity)){
            console.log("Your order has been submitted.");
          }else{
            console.log("Insufficient quantity in stock.");
            //promptCustomer(); Cause ordering prompt to restart
          }
          }
      })


      


      // var correct = false;



  })//End of .then
}//End of function "start"