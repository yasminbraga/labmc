import { DateTime } from 'luxon'
import { BaseModel, column, computed, scope } from '@ioc:Adonis/Lucid/Orm'
import { translateMemberType } from 'App/utils/translate'

export default class Member extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public lattes: string

  @column()
  public course: string

  @column()
  public year: string

  @column()
  public institution: string

  @column()
  public description: string

  @column()
  public type: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static findByType = scope((query, type) => {
    if (type) query.where('type', type)
  })

  @computed()
  public get translatedType() {
    return translateMemberType(this.type)
  }
}
