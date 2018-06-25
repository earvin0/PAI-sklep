'use strict';


module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user', {
		user_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		name: DataTypes.TEXT,
		surname: DataTypes.TEXT,
		email: DataTypes.TEXT,
		password: DataTypes.TEXT
	}, {
		tableName: 'user',
		timestamps: false
	});
};
