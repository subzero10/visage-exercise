'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Candidate extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }

    Candidate.init({
        name: DataTypes.STRING,
        jobTitle: DataTypes.STRING,
        notes: DataTypes.STRING,
        resumeId: DataTypes.STRING,
        source: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Candidate',
    });
    return Candidate;
};
