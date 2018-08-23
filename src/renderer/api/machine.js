'use strict'
import mysqlPool from './mysql-util'

const MACHINE = {
  async findMachineByTreeid (treeid) {
    const Promise = await mysqlPool.ROW(mysqlPool.CONFIG, `SELECT machine_id,m_me FROM c_machine WHERE tree_id = '${treeid}'`)
    return Promise
  }
}
export default MACHINE
