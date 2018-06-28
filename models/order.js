'use strict';


module.exports = (sequelize, DataTypes) => {
	return sequelize.define('order', {
		order_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		cart_id: DataTypes.INTEGER,
		date: DataTypes.DATE,
		address: DataTypes.TEXT
	}, {
		tableName: 'order',
		timestamps: false
	});
};
