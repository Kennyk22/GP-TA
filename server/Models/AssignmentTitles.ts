import { Model, Optional, DataTypes } from 'sequelize'
import { sequelize } from './index'


interface AssignmentTitleAttributes {
  title: string;
  id: number;
  ownerId: string
}

interface AssignmentTitleCreationAttributes extends Optional<AssignmentTitleAttributes, "id"> {}

export class AssignmentTitle
  extends Model<AssignmentTitleAttributes, AssignmentTitleCreationAttributes>
  implements AssignmentTitleAttributes {
  public title!: string;
  public id!: number;
  public ownerId!: string;
  public readonly createdAt!: Date

}

AssignmentTitle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'assignmenttitles',
    sequelize
  }
)