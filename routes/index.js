var db = require('../database');


module.exports = function (app, passport) {

	console.log("Passport: " + passport);

	/* GET login page. */
	app.get('/', function (req, res) {
		db.getCategories().then(categories => {
			db.getProducts().then(products => {
				res.render('index', {category: req.query.category, categories: categories, products: products})
			})
		});
	});

	app.get('/login', function (req, res, next) {
		res.render('login', {message: req.flash('loginMessage')});
	});

	app.get('/cart', isLoggedIn, function (req, res) {
		console.log("Logged as: " + req.user.email);
		const data = [{name: "lama", price: "1.00"}, {name: "kuna", price: "2.00"}, {name: "los", price: "13.00"}, {
			name: "jezozwierz",
			price: "5.00"
		}];
		res.render('cart', {items: data});
	});

	app.post('/checkout', function (req, res) {
		res.render('checkout', {orderID: "1232141421"});
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
};

function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}