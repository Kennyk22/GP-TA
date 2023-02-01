"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentTitle = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class AssignmentTitle extends sequelize_1.Model {
}
exports.AssignmentTitle = AssignmentTitle;
AssignmentTitle.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ownerId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'assignmenttitles',
    sequelize: index_1.sequelize
});
