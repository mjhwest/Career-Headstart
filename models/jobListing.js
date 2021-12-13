const { Model, DataTypes } = require('sequelize');
//why is DataTypes above, not being declared?
const sequelize = require('../config/connection');
class JobListing extends Model {}
JobListing.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    listed_by: {
        type: DataTypes.INTEGER,
        references: {
            model: 'employer',
            key: 'id',
        },
    },
    jobDescript: {
        //text so the employer can write a big description for job.
        type: DataTypes.TEXT,
        allowNull: false,
    },
    jobWage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jobLocation: {
        type: DataTypes.TEXT,
        allowNull: false,

    },
    workLoad: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'joblisting',
}, );
module.exports = JobListing;