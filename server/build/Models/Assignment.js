"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assignment = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class Assignment extends sequelize_1.Model {
}
exports.Assignment = Assignment;
Assignment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ownerId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: new sequelize_1.DataTypes.STRING(1028),
        allowNull: false
    },
    response: {
        type: new sequelize_1.DataTypes.STRING(1028),
        allowNull: false
    }
}, {
    tableName: "assignments",
    sequelize: index_1.sequelize
});
