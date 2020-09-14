import { SQLite } from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'
 
export default class Task extends BaseModel {
  constructor(obj) {
    super(obj)
  }
 
  static get database() {
    return async () => SQLite.openDatabase('db.db')
  }
 
  static get tableName() {
    return 'Tasks'
  }

  static myCustomMethod() {
    const sql = 'SELECT * FROM Tasks'
    const params = ['active']
    return this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows)
  }
 
  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true },
      title: { type: types.TEXT, not_null: true },
      description: { type: types.TEXT, not_null:true },
      date: { type: types.INTEGER, default: () => Date.now() },
      state: { type: types.TEXT, default: () => 'pendiente'},
    }
  }
}