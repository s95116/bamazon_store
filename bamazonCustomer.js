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
  makeTable();
});

//Query that displays everything(*) from Products table
var makeTable = function(){
   connection.query('SELECT * FROM Products', function(err, res){
      if (err) throw err;
      console.table(res); 
      promptCustomer();

  });
}

//Updates the quantities in the database and performs the total price calculation
var quantityUpdate = function (res, totQty){
  var x = res[0].price;
  var y = parseInt(totQty);
  var z = x * y;
  var itemNum = res[0].itemID;
  
  console.log("Your total price for this item is: $" + z + "\n");

  //connection.query("UPDATE products set stockQuantity=6 WHERE itemID=106",
  connection.query("UPDATE products SET stockQuantity='"+(res[0].stockQuantity - totQty)+"' WHERE itemID='"+itemNum+"'",
    function(err, res2) {
      if(err) throw err;
      //console.log('update appears ok' + (typeof (res[0].itemID)));
      //console.log('update appears ok' + (typeof (totQty)));
  })
}

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
      connection.query("SELECT * FROM Products where itemID = '"+prompt_result.productId+"'", function(err, res){
          if (err) throw err;
          
          //checks to see if the ItemID entered exists
          if (res.length == 0) {
            console.log("ItemID not found. Please try again.");
            makeTable();//Cause ordering prompt to restart

          }else{
          
          //If the product entered is found, it displays the following console log's  
          console.log("\nThe product you've selected is : \n" );
          console.table(res);
          console.log("The quantity you've selected is: " + prompt_result.totalQuantity);

          //If there is enough quantity instock performs the total calculation
          //and updates the database
          if(res[0].stockQuantity >= parseInt(prompt_result.totalQuantity)){
            console.log("Your order has been submitted. \n");
            quantityUpdate(res, prompt_result.totalQuantity);
            makeTable(); //Cause ordering prompt to restart

          }else{

            //If there isn't enough quantity in stock, returns the use to the main
            //ordering screen
            console.log("Insufficient quantity in stock.\n");
            makeTable(); //Cause ordering prompt to restart
          }
          }
      })
  })//End of .then
}//End of function "prompcustomer"