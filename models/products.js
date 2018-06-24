'use strict';


module.exports = (sequelize, DataTypes) => {
	return sequelize.define('products', {
		product_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		price: DataTypes.FLOAT,
		name: DataTypes.STRING,
		description: DataTypes.STRING,
		category: DataTypes.INTEGER,
		image_path: DataTypes.INTEGER
	}, {
		tableName: 'products',
		timestamps: false
	});
};
