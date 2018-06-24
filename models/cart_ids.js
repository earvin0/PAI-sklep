'use strict';


module.exports = (sequelize, DataTypes) => {
	return sequelize.define('cart_ids', {
		cart_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		user_id: DataTypes.INTEGER
	}, {
		tableName: 'cart_ids',
		timestamps: false
	});
};
