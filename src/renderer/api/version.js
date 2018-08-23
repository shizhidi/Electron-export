'use strict'
import mysqlPool from './mysql-util'

const VERSION = {
  async getAllVersions () {
    const Promise = await mysqlPool.ROW(mysqlPool.CONFIG, `SELECT type FROM install_version`)
    return Promise
  }
}
export default VERSION
