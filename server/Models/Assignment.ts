import { Sequelize, DataTypes } from 'sequelize'

exports.module = (sequelize:Sequelize) => sequelize.define('Assignment', {
    property1 : {
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    property2 : {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

