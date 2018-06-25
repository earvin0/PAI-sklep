var db = require('../database');


module.exports = function (app, passport) {

	console.log("Passport: " + passport);

	/* GET login page. */
	router.get('/', function (req, res, next) {
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

		app.get('/login', function (req, res, next) {
			res.render('login', {message: req.flash('loginMessage')});
		});

		// res.render('index', { category: req.query.category,categories: ["Laptopy","Laptopy2","Laptopy3"],products: [{name:"Laptop",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop2",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop3",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop2",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop3",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop2",description:"mozna sie nim wytrzec ale tani"},{name:"Laptop3",description:"mozna sie nim wytrzec ale tani"}] });
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

	router.get('/cart', function (req, res, next) {
		//get cart
		db.getCartProductsForUser(1).then(products => {
			res.render('cart', {items: products});
		});
		;


	});

	router.post('/checkout', function (req, res, next) {
		console.log(req.body.products);
		console.log(req.body.quantities);
		res.render('checkout', {orderID: "1232141421"});
	});


	router.post('/remove', function (req, res, next) {
		console.log(req.body.productID);

		//remove from users cart
		res.redirect("/cart")
	});
};

module.exports = router;

	function isLoggedIn(req, res, next) {

		// if user is authenticated in the session, carry on
		if (req.isAuthenticated())
			return next();

		// if they aren't redirect them to the home page
		res.redirect('/');
	}