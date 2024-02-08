import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "travels",
  modelName: "Travel",
})
class Travel extends Model<TravelAttributes> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
  })
  declare description: string;

  @Column({
    type: DataType.STRING,
  })
  declare slug: string;

  @Column({ type: DataType.BOOLEAN })
  declare is_public: Boolean;

  @Column({
    type: DataType.SMALLINT,
  })
  declare number_of_days: number;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  @BeforeCreate
  static async generateSlug(instance: Travel) {
    const count = await Travel.count({
      where: {
        name: instance.name,
      },
    });
    let suffix = "";
    if (count > 0) {
      suffix = `-${count + 1}`;
    }
    instance.slug = instance.name.toLowerCase().replace(" ", "-") + suffix;
  }
}

export default Travel;
