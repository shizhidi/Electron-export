'use strict'
import mysqlPool from './mysql-util'

const MACHINE_DAU = {
  async findDgmIdByMachineStr (machinestr) {
    const Promise = await mysqlPool.ROW(mysqlPool.CONFIG, `SELECT dgm_id FROM c_machine_dau6000 WHERE machine_id in (${machinestr})`)
    return Promise
  }
}
export default MACHINE_DAU
