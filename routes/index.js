var db = require('../database');


module.exports = function (app, passport) {

	/* GET login page. */
	app.get('/', function (req, res) {
		db.getCategories().then(categories => {

			if (req.query.category !== undefined) {
				if (req.query.searchQuery !== undefined) {
					db.getProductsByCategoryAndName(req.query.category, req.query.searchQuery).then(products => {
						res.render('index', {category: req.query.category, categories: categories, products: products})
					});
				} else {
					db.getProductsByCategory(req.query.category).then(products => {
						res.render('index', {category: req.query.category, categories: categories, products: products})
					});
				}
			} else {
				if (req.query.searchQuery !== undefined) {
					db.getProductsByName(req.query.searchQuery).then(products => {
						res.render('index', {category: req.query.category, categories: categories, products: products})
					});
				} else {
					db.getProducts().then(products => {
						res.render('index', {category: req.query.category, categories: categories, products: products})
					});
				}
			}
		});

	});

	app.get('/login', function (req, res) {
		res.render('login', {message: req.flash('loginMessage')});
	});

	/* Handle Login POST */
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}), function (req, res) {
		console.log("hello");

		if (req.body.remember) {
			req.session.cookie.maxAge = 1000 * 60 * 3;
		} else {
			req.session.cookie.expires = false;
		}
		res.redirect('/');
	});

	/* GET Registration Page */
	app.get('/signup', function (req, res) {
		res.render('register.ejs', {message: req.flash('signupMessage')});
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));


	/* Handle Logout */
	app.get('/signout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/cart', isLoggedIn, function (req, res) {
		//get cart
		db.getCartProductsForUser(req.user.user_id).then(products => {
			console.log("Getting cartProducts");
			res.render('cart', {items: products});
		});

	});

	app.post('/checkout', function (req, res, next) {
		console.log(req.body.products);
		console.log(req.body.quantities);
		res.render('checkout', {orderID: "1232141421"});
	});


	app.post('/remove', function (req, res, next) {
		console.log(req.body.productID);

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