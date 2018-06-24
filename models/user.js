'use strict';


module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user', {
		user_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		name: DataTypes.STRING,
		surname: DataTypes.STRING,
		email: DataTypes.STRING
	}, {
		tableName: 'user',
		timestamps: false
	});
};
