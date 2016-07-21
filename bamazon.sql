CREATE DATABASE Bamazon;

USE Bamazon;

CREATE table `Products`(
`itemID` INT NOT NULL,
`productName` VARCHAR(40) NOT NULL,
`departmentName` VARCHAR(40) NOT NULL,
`price` NUMERIC(15,2) NOT NULL,
`stockQuantity` VARCHAR(2) NOT NULL
);

ALTER TABLE Products
ADD CONSTRAINT itemID PRIMARY KEY(itemID)

INSERT INTO `Products`(`itemID`,`productName`,`departmentName`,`price`,`stockQuantity`)
VALUES(0101,"Zimlex","Health & Medicine","14.55","25"),
	  (0102,"Viadex","Health & Medicine","12.99","15"),
      (0103,"Dentotex","Health & Medicine","149.00","5"),
      (0104,"Zumfax","Health & Medicine","12.99","10"),
      (0105,"Tristough","Health & Medicine","1487.00","50"),
      (0106,"Gravetex","Health & Medicine","129.50","35"),
      (0107,"Lexiair","Health & Medicine","12.50","14"),
	  (0108,"Suncof","Health & Medicine","29.50","57"),
      (0109,"Trippleapdex","Health & Medicine","199.50","35"),
      (0110,"Lamflex","Health & Medicine","129.50","35");


      