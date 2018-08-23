'use strict'
import mysqlPool from './mysql-util'

let NAVIGATE = {
  async getAllNavigate () {
    debugger
    let Promise = await mysqlPool.ROW(mysqlPool.CONFIG, `SELECT t_id,t_name FROM c_navigate_tree`)
    return Promise
  }
}
export default NAVIGATE
