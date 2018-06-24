'use strict';


module.exports = (sequelize, DataTypes) => {
	return sequelize.define('cart_products', {
		cart: {type: DataTypes.INTEGER, primaryKey: true},
		product: {type: DataTypes.INTEGER, primaryKey: true},
		quantity: DataTypes.INTEGER
	}, {
		tableName: 'cart_products',
		timestamps: false
	});
};
