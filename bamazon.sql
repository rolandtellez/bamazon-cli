create database bamazonDB;

use bamazonDB;

create table products (
	item_id integer auto_increment not null,
    product_name varchar(50),
    department_name varchar(50),
    price decimal(5,2),
    stock_quantity integer not null,
    primary key (item_id)
);

select * from products;

insert into products (product_name, department_name, price, stock_quantity)
values ("T-shirt", "Clothing", 25.00, 40);

insert into products (product_name, department_name, price, stock_quantity)
values ("Shoes", "Clothing", 50.00, 30);

insert into products (product_name, department_name, price, stock_quantity)
values ("Hoodie", "Clothing", 40.00, 35);

insert into products (product_name, department_name, price, stock_quantity)
values ("Watch", "Accessories", 65.00, 25);

insert into products (product_name, department_name, price, stock_quantity)
values ("Backpack", "Accessories", 30.00, 15);

insert into products (product_name, department_name, price, stock_quantity)
values ("Hat", "Accessories", 20.00, 20);

insert into products (product_name, department_name, price, stock_quantity)
values ("iPhone", "Electronics", 800.00, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Bluetooth Speaker", "Electronics", 70.00, 15);

insert into products (product_name, department_name, price, stock_quantity)
values ("Wireless Earbuds", "Electronics", 60.00, 20);

insert into products (product_name, department_name, price, stock_quantity)
values ("55in TV", "Electronics", 400.00, 10);
