var express = require('express');
var router = express.Router();
var db = require('../database');


/* GET home page. */
router.get('/', function(req, res) {
	console.log("Console!");

	// db.getCartProductsForUser(1).then(data => {data.forEach(cartProduct => {
	// 	console.log("HEREName: " + cartProduct.productFk.name);
	// 	console.log("HEREQuantity: " + cartProduct.quantity);
	// 	console.log("HEREcart: " + cartProduct.cartFk.cart_id);
	// });
	// });
	//
	// db.getCartProducts(1).then(cartProducts => {
	// 	cartProducts.forEach(cartProduct => {
	// 		console.log("Name: " + cartProduct.productFk.name);
	// 		console.log("Quantity: " + cartProduct.quantity);
	// 	})
	// });

	db.getProductsByCategory(1).then( products => {
		products.forEach(product => {
			console.log(product.name);
			// console.log(product.description);
			// console.log(product.categoryFk.name);
		});
	});


	// db.getProductsByName("Nigh").then( products => {
	// 	products.forEach(product => {
	// 		console.log(product.name);
	// 		// console.log(product.description);
	// 		// console.log(product.categoryFk.name);
	// 	});
	// });
	// console.log("Products for user:");
	// db.getCartProductsForUser(1).then(cartProducts => {
	// 	cartProducts.forEach(cartProduct => {
	// 		console.log(cartProduct.productFk.name);
	// 		// console.log(product.description);
	// 		console.log("Price: " + cartProduct.productFk.price);
	// 	});
	// });
	res.render('index', {title: 'CarRental'});
});

module.exports = router;
