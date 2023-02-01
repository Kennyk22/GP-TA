import { Model, Optional, DataTypes } from 'sequelize'
import { sequelize } from './index'

interface AssignmentAttributes {
    id: number;
    ownerId: string;
    text: string;
    response: string;
    studentId: number;
    titleId:number
}

interface AssignmentCreationAttributes extends Optional<AssignmentAttributes, "id"> {}

export class Assignment
    extends Model<AssignmentAttributes, AssignmentCreationAttributes>
    implements AssignmentAttributes {
        public id!: number;
        public ownerId!: string;
        public text!: string;
        public response!: string;
        public studentId!: number;
        public titleId!: number;

        public readonly createdAt!: Date
}

    Assignment.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey:true
            },
            ownerId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            text: {
                type: new DataTypes.TEXT,
                allowNull: false
            },
            response: {
                type: new DataTypes.TEXT,
                allowNull:false
            },
            studentId : {
                type: new DataTypes.INTEGER,
                allowNull: false
            },
            titleId : {
                type: new DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName:"assignments",
            sequelize
        }
    )




