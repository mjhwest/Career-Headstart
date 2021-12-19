const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Application extends Model {}

Application.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    applicant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "jobseeker",
        key: "id",
      },
    },
    listing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "joblisting",
        key: "id",
      },
    },
    listed_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "employer",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "application",
  }
);

module.exports = Application;
