'use strict';


module.exports = (sequelize, DataTypes) => {
	return sequelize.define('category', {
		category_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		name: DataTypes.STRING
	}, {
		tableName: 'category',
		timestamps: false
	});
};
