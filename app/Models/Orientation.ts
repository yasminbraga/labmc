import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed, scope } from '@ioc:Adonis/Lucid/Orm'
import Member from './Member'
import { translateOrientationType } from 'App/utils/translate'

export default class Orientation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public isCompleted: boolean

  @column()
  public period: string

  @column()
  public fomentation: string

  // IC, TCC, Tese, Dissertação
  @column()
  public type: string

  @column()
  public advisorId: number

  @belongsTo(() => Member, { foreignKey: 'advisorId' })
  public advisor: BelongsTo<typeof Member>

  @column()
  public secondaryAdvisorId: number

  @belongsTo(() => Member, { foreignKey: 'secondaryAdvisorId' })
  public secondaryAdvisor: BelongsTo<typeof Member>

  @column()
  public studentId: number

  @belongsTo(() => Member, { foreignKey: 'studentId' })
  public student: BelongsTo<typeof Member>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static findByType = scope((query, type) => {
    if (type) query.where('type', type)
  })

  @computed()
  public get translatedType() {
    return translateOrientationType(this.type)
  }
}
