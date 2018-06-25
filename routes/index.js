var db = require('../database');


module.exports = function(app, passport){

	console.log("Passport: " + passport);

	/* GET login page. */
	app.get('/', function(req, res, next) {
		db.getCategories().then(categories => {
			db.getProducts().then(products => {
				res.render('index', {category: req.query.category, categories: categories, products: products})
			})
		});
	});

	app.get('/login', function(req, res, next) {
		res.render('login', { message: req.flash('loginMessage') });
	});

	app.get('/cart', function(req, res, next) {
		//get cart
		const data = [{name: "lama", price: "1.00"},{name: "kuna", price: "2.00"},{name: "los", price: "13.00"},{name: "jezozwierz", price: "5.00"}];
		res.render('cart',{items: data});
	});

	app.post('/checkout', function (req,res,next) {
		res.render('checkout', {orderID: "1232141421"});
	});

	/* Handle Login POST */
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : true
	}),  function(req, res) {
		console.log("hello");

		if (req.body.remember) {
			req.session.cookie.maxAge = 1000 * 60 * 3;
		} else {
			req.session.cookie.expires = false;
		}
		res.redirect('/');
	});

	/* GET Registration Page */
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('register.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));


	/* Handle Logout */
	app.get('/signout', function(req, res) {
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