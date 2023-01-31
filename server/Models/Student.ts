import { Model, Optional, DataTypes } from 'sequelize'
import { sequelize } from './index'


interface StudentAttributes {
  name: string;
  id: number;
  ownerId: number
}

interface StudentCreationAttributes extends Optional<StudentAttributes, "id"> {}

export class Student
  extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes {
  public name!: string;
  public id!: number;
  public ownerId!: number;
  public readonly createdAt!: Date

}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'students',
    sequelize
  }
)