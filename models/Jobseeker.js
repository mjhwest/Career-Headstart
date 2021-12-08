const { Model, DataTypes } = require('sequelize');
//why is DataTypes above, not being declared?
const sequelize = require('../config/connection');

// useful link
// https://sequelize.org/master/manual/model-basics.html#data-types


class Jobseeker extends Model {}

Jobseeker.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        license: DataTypes.BOOLEAN,
        allowNull: false,
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'project',
    },

);

module.exports = Jobseeker;