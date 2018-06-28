var db = require('../database');


module.exports = function (app) {
	/* GET login page. */
	app.get('/', function (req, res) {
		db.getCategories().then(categories => {

			if (req.query.category !== undefined) {
				if (req.query.searchQuery !== undefined) {
					db.getProductsByCategoryAndName(req.query.category, req.query.searchQuery).then(products => {
						res.render('index', {
							category: req.query.category,
							categories: categories,
							products: products,
							logged: req.isAuthenticated(),
							message: req.flash("indexMessage")
						})
					});
				} else {
					db.getProductsByCategory(req.query.category).then(products => {
						res.render('index', {
							category: req.query.category,
							categories: categories,
							products: products,
							logged: req.isAuthenticated(),
							message: req.flash("indexMessage")
						})
					});
				}
			} else {
				if (req.query.searchQuery !== undefined) {
					db.getProductsByName(req.query.searchQuery).then(products => {
						res.render('index', {
							category: req.query.category,
							categories: categories,
							products: products,
							logged: req.isAuthenticated(),
							message: req.flash("indexMessage")
						})
					});
				} else {
					db.getProducts().then(products => {
						res.render('index', {
							category: req.query.category,
							categories: categories,
							products: products,
							logged: req.isAuthenticated(),
							message: req.flash("indexMessage")
						})
					});
				}
			}
		});

	});

	app.get('/cart', isLoggedIn, function (req, res) {
		//get cart
		db.getCartProductsForUser(req.user.user_id).then(products => {
			console.log("Getting cartProducts");
			res.render('cart', {items: products});
		});

	});

	app.post('/checkout', function (req, res) {
		console.log(req.body.quantities);
		db.checkout(req.user.user_id).then(order => {
			res.render('checkout', {orderID: order.order_id});
		});


	});

	app.post('/addToCart', isLoggedIn, function (req, res) {
		console.log("Product: " + req.body.productId);

		db.addProduct(req.user.user_id, req.body.productId)
			.then(req.flash("indexMessage", "Product added to cart..." ));

		res.redirect("/");
	});


	app.post('/remove', function (req, res) {
		console.log(req.body.productID);

		db.getCartProduct(req.body.cartId, req.body.productId).then(cartProduct => {
			cartProduct.destroy();
		});
		//remove from users cart
		res.redirect("/cart")
	});
};


function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();


	// if they aren't redirect them to the home page
	res.redirect('/login');
}