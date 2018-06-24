'use strict'

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


db.getCartProducts = (function (cart_id) {
	return db.cart_products.findAll({
		include: [
			{model: db.products, as: "productFk"},
			{model: db.cart_ids, where: {cart_id: cart_id},
				as: "cartFk"}],
	});
});

db.getCartProductsForUser = (function (user_id) {
	return db.cart_ids.max('cart_id', {
		where: {user_id: user_id}
	}).then(cart => {
		return cart
	}).then(max_id => {
		return db.cart_products.findAll({
			include: [
				{model: db.products, as: "productFk"},
				{
					model: db.cart_ids, where: {cart_id: max_id},
					as: "cartFk"
				}]
		});
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

module.exports = db;