'use strict'
import mysqlPool from './mysql-util'

let NAVIGATE = {
  async getAllNavigate () {
    debugger
    let Promise = await mysqlPool.ROW(mysqlPool.CONFIG, `SELECT t_id,t_name FROM c_navigate_tree`)
    return Promise
  },
  async updateNavigateParentId (tid, tpid) {
    let Promise = await mysqlPool.ROW(mysqlPool.CONFIG, `UPDATE c_navigate_tree SET t_pid=${tpid} WHERE t_id=${tid}`)
    return Promise
  }
}
export default NAVIGATE
