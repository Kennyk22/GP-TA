"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
class Student extends sequelize_1.Model {
}
exports.Student = Student;
Student.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ownerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'students',
    sequelize: index_1.sequelize
});
