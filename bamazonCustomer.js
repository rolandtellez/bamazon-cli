var mysql = require("mysql");

var inquirer = require("inquirer");

var Table = require("cli-table3");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazonDB"
});

 
function start() {
  
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);

    showProducts();
  
});

};

function showProducts() {

    connection.query("SELECT * FROM products", function(error, results){

        if (error){
            console.log(error);
            return;
        };

        var table = new Table({
            head: ['Item ID', 'Product', 'Department', 'Price', 'In Stock']
          , colWidths: [9, 20, 15, 8, 10]
        });
        
        for (i = 0; i < results.length; i++) {
            table.push([results[i].item_id, results[i].product_name, results[i].department_name, "$" + results[i].price, results[i].stock_quantity]);
        };
         
        console.log(table.toString());

        inquirer
        .prompt([
          {
            name: "choice",
            type: "input",
            message: "What is the Item ID of the product you would like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
          },
          {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
          }
        ])
        .then(function(answer) {
          
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].item_id === parseInt(answer.choice)) {
              chosenItem = results[i];
            };
          };
          
          if (parseInt(answer.quantity) > chosenItem.stock_quantity) {
            console.log("Isufficient Quantity on hand. Start over!");
            showProducts();
          } else {

            connection.query(
              "UPDATE products SET ? WHERE ?",
                  [
                      {
                          stock_quantity: (chosenItem.stock_quantity - parseInt(answer.quantity))
                      },
                      {
                          item_id: chosenItem.item_id
                      }
                  ],
              function (error, results){
                  if (error){
                      console.log(error);
                      return;
                  };
      
                  console.log("Your total is $" + chosenItem.price * parseInt(answer.quantity));
                  connection.end();

              }
              
          );

          }
  
        });
  
  


    });



};

start();