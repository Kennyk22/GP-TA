import { Model, Optional, DataTypes } from 'sequelize'
import { sequelize } from './index'

interface AssignmentAttributes {
    id: number;
    ownerId: number;
    text: string;
    response: string;
}

interface AssignmentCreationAttributes extends Optional<AssignmentAttributes, "id"> {}

export class Assignment
    extends Model<AssignmentAttributes, AssignmentCreationAttributes>
    implements AssignmentAttributes {
        public id!: number;
        public ownerId!: number;
        public text!: string;
        public response!: string;

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
                type: DataTypes.INTEGER,
                allowNull: false
            },
            text: {
                type: new DataTypes.STRING,
                allowNull: false
            },
            response: {
                type: new DataTypes.STRING,
                allowNull:false
            }
        },
        {
            tableName:"assignments",
            sequelize
        }
    )




