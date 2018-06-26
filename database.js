'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://meetpin_user:meetpin123@77.55.222.254:3306/pai');

sequelize
	.authenticate()
	.then(() => {
		console.log('Database connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//Models/tables
db.cart_ids = require('./models/cart_ids')(sequelize, Sequelize);
db.cart_products = require('./models/cart_products')(sequelize, Sequelize);
db.category = require('./models/category')(sequelize, Sequelize);
db.products = require('./models/products')(sequelize, Sequelize);
db.user = require('./models/user')(sequelize, Sequelize);


//Relations
db.products.belongsTo(db.category, {as: "categoryFk", foreignKey: "category"});
db.cart_ids.hasOne(db.user, {as: "userFk", foreignKey: "user_id"});
db.cart_products.belongsTo(db.products, {as: "productFk", foreignKey: "product"});
db.cart_products.belongsTo(db.cart_ids, {as: "cartFk", foreignKey: "cart"});

db.getProducts = (function () {
	return db.products.findAll({
		include: [{model: db.category, as: "categoryFk"}]
	});
});

db.getCategories = (function () {
	return db.category.findAll();
});

db.getProductsByCategoryAndName = (function (category_id, name) {
	return db.products.findAll({
		where: {
			$and: [
				{category: category_id},
				{name: {$like: '%' + name + '%'}}
			]
		}
	});
});


db.getCartProducts = (function (cart_id) {
	return db.cart_products.findAll({
		include: [
			{model: db.products, as: "productFk"},
			{
				model: db.cart_ids, where: {cart_id: cart_id},
				as: "cartFk"
			}],
	});
});

db.getCartProduct = (function (cart_id, product_id) {
	return db.cart_products.findOne({
		where: {$and: [{cart: cart_id}, {product: product_id}]}
	});
});

db.getCartProductsForUser = (function (user_id) {
	return db.getCartForUser(user_id).then(cart => {
		return db.cart_products.findAll({
			include: [
				{model: db.products, as: "productFk"},
				{
					model: db.cart_ids, where: {cart_id: cart.cart_id},
					as: "cartFk"
				}]
		});
	});
});

db.getCartForUser = (function (user_id) {
	return db.cart_ids.max('cart_id', {
		where: {user_id: user_id}
	}).then(cart => {
		return cart
	}).then(max_id => {
		return db.cart_ids.findById(max_id);
	});
});

db.getProductsByName = (function (name) {
	return db.products.findAll({
		where: {name: {$like: '%' + name + '%'}}
	});
});

db.getProductsByCategory = (function (category) {
	return db.products.findAll({
		where: {category: category}
	});
});

db.getUserByEmail = (function (email) {
	return db.user.findOne({
		where: {email: email}
	});
});

db.addProduct = (function (user_id, product_id) {
	return db.getCartForUser(user_id).then(cart => {
		return cart;
	}).then(cart => {
		return db.getCartProduct(cart.cart_id, product_id)
	}).then(cartProduct => {
		cartProduct.update({quantity: cartProduct.quantity + 1})
	}).catch(err => {
		return db.getCartForUser(user_id);
	}).then(cart => {
		if(cart != null)
			db.cart_products.build({cart: cart.cart_id, product: product_id, quantity: 1}).save()
	})
});


module.exports = db;