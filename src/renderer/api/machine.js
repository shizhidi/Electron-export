'use strict'
import mysqlPool from './mysql-util'

const MACHINE = {
  async findMachineByTreeid (treeid) {
    const Promise = await mysqlPool.ROW(mysqlPool.CONFIG, `SELECT machine_id,m_me FROM c_machine WHERE tree_id = '${treeid}'`)
    return Promise
  },
  async createMachineDauTables (machines) {
    debugger
    let resMachines = []
    machines.forEach(function (machineid) {
      let Promise = mysqlPool.EXECUTE(mysqlPool.DAU, `call createtables(${machineid})`)
      resMachines.push(Promise)
    })
    return Promise.all(resMachines)
  }
}
export default MACHINE
