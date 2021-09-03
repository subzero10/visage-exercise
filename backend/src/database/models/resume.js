'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Resume extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }

    Resume.init({
        fileName: DataTypes.STRING,
        fileType: DataTypes.STRING,
        fileData: DataTypes.BLOB
    }, {
        sequelize,
        modelName: 'Resume',
    });
    return Resume;
};
