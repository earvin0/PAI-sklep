// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var db = require('../database');
var connection = db;

// expose this function to our app using module.exports
module.exports = function (passport) {


	passport.serializeUser(function (user, done) {
		console.log("Serialize: " + user);
		done(null, user.user_id);
	});

	// used to deserialize the user
	passport.deserializeUser(function (id, done) {
		console.log("---DESERIALIZATION---");
		db.user.findById(id).then(user => {
			done(null, user);
		});
	});


	passport.use(
		'local-signup',
		new LocalStrategy({
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true
			},
			function (req, username, password, done) {
				console.log("DAMN");
				db.getUserByEmail(username).then(user => {
					if (user != null)
						return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
					else {
						db.user.build({email: username, password: bcrypt.hashSync(password, null, null)}).save().then(newUser => {
							db.cart_ids.build({user_id: newUser.user_id}).save();
							return done(null, newUser);
						});
					}
				});
			})
	);


	passport.use(
		'local-login',
		new LocalStrategy({
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true
			},
			function (req, username, password, done) {
				db.getUserByEmail(username).then(user => {
					if (user == null) {
						console.log("No user");
						return done(null, false, req.flash('loginMessage', 'No user found.'));
					}
					if (!bcrypt.compareSync(password, user.password)) {
						console.log("PASSWORD INCORRECT");
						return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
					}
					else {
						console.log("PASSWORD CORRECT");
						return done(null, user);
					}
				}).catch(err => {
					console.log("ERR: " + err);

				});
			})
	);

};
