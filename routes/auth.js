var db = require('../database');


module.exports = function (app, passport) {

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

};