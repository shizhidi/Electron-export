'use strict'
import mysqlPool from './mysql-util'

const USER = {
  async login (username, password) {
    const Promise = await mysqlPool.FIRST(mysqlPool.CONFIG, `SELECT username,type FROM user WHERE username = '${username}' AND password = '${password}'`)
    return Promise
  }
}
export default USER
