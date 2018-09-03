'use strict'
import cmdPromise from 'cmd-promise'
import machine from './machine'
import machineDau from './machineDau'
const EXPORT = {
  async exportConfigDbData (username, password, address, selectedTissue, savePath) {
    debugger
    let machineIdStr = '1'
    let dgmIdStr = '1'
    let dau6000 = null
    const head = `mysqldump -u${username} -p${password} -h ${address}  --no-create-info --default-character-set=utf8 ms6000_config_2014`
    let exportMachine = `${head} c_machine --where="tree_id=${selectedTissue}" > ${savePath}\\c_machine.sql`
    let jizu = cmdPromise(exportMachine)
    let position
    let machinedau
    let tree

    return new Promise(function (resolve, reject) {
      machine.findMachineByTreeid(selectedTissue).then(function (machines) {
        machines.forEach(function (item) {
          machineIdStr = machineIdStr + ',' + item.machine_id
        })
      }).then(function () {
        debugger
        machineDau.findDgmIdByMachineStr(machineIdStr).then(function (daus) {
          daus.forEach(function (dau) {
            dgmIdStr = dgmIdStr + ',' + dau.dgm_id
          })

          exportMachine = `${head} c_dau6000 --where="dgm_id in (${dgmIdStr})" > ${savePath}\\c_dau6000.sql`
          dau6000 = cmdPromise(exportMachine)

          exportMachine = `${head} c_machine_position --where="machine_id in (${machineIdStr})" > ${savePath}\\c_machine_position.sql`
          position = cmdPromise(exportMachine)

          exportMachine = `${head} c_machine_dau6000 --where="machine_id in (${machineIdStr})" > ${savePath}\\c_machine_dau6000.sql`
          machinedau = cmdPromise(exportMachine)

          exportMachine = `${head} c_navigate_tree --where="t_id= ${selectedTissue}" > ${savePath}\\c_navigate_tree.sql`
          tree = cmdPromise(exportMachine)

          Promise.all([jizu, position, machinedau, dau6000, tree]).then(function (res) {
            resolve(res)
          }).catch(function (err) {
            reject(err)
          })
        }).catch(function (err) {
          reject(err)
        })
      }).catch(function (err) {
        reject(err)
      })
    })
  },
  async ImportConfigDbData (username, password, address, savePath) {
    const head = `mysql -u${username} -p${password} -h ${address} --default-character-set=utf8 ms6000_config_2014 < ${savePath}\\`
    let machineSql = `${head}c_machine.sql`
    let Machine = cmdPromise(machineSql)

    let MachinepositionSql = `${head}c_machine_position.sql`
    let Machineposition = cmdPromise(MachinepositionSql)

    let MachineDauSql = `${head}c_machine_dau6000.sql`
    let MachineDau = cmdPromise(MachineDauSql)

    let DauSql = `${head}c_dau6000.sql`
    let Dau = cmdPromise(DauSql)

    let TreeSql = `${head}c_navigate_tree.sql`
    let Tree = cmdPromise(TreeSql)

    return Promise.all([Machine, Machineposition, MachineDau, Dau, Tree])
  },
  async exportDataOne6000Tool (username, password, address, checkedMachines, path, startTime, endTime) {
    const TableName = [ 'digital', 'envelope', 'rock', 'speed', 'sta', 'vib' ]
    let arrs = []
    checkedMachines.forEach(function (machineid) {
      TableName.forEach(function (tableName, index) {
        let shellstr = `mysqldump -u${username} -p${password} -h ${address}  --no-create-info --default-character-set=utf8 dau6000_1_2014 d_${machineid}_${tableName} --where="saveTime_Com BETWEEN ${startTime} and ${endTime}" > ${path}\\${machineid}_${tableName}.sql`
        arrs.push(cmdPromise(shellstr))
      })
    })

    return Promise.all(arrs)
  },
  async exportDataOne8000Tool (username, password, address, checkedMachines, path, startTime, endTime) {
    const TableName = ['inclin']
    let arrs = []
    checkedMachines.forEach(function (machineid) {
      TableName.forEach(function (tableName, index) {
        let shellstr = `mysqldump -u${username} -p${password} -h ${address}  --no-create-info --default-character-set=utf8 dau6000_1_2014 d_${machineid}_${tableName} --where="saveTime_Com BETWEEN ${startTime} and ${endTime}" > ${path}\\${machineid}_${tableName}.sql`
        arrs.push(cmdPromise(shellstr))
      })
    })

    return Promise.all(arrs)
  },
  async exportCircleData (username, password, address, checkedMachines, path, startTime, endTime) {
    const TableName = ['circle']
    let arrs = []
    checkedMachines.forEach(function (machineid) {
      TableName.forEach(function (tableName, index) {
        let shellstr = `mysqldump -u${username} -p${password} -h ${address}  --no-create-info --default-character-set=utf8 dau6000_1_2014 d_${machineid}_${tableName} --where="saveTime_Com BETWEEN ${startTime} and ${endTime}" > ${path}\\${machineid}_${tableName}.sql`
        arrs.push(cmdPromise(shellstr))
      })
    })

    return Promise.all(arrs)
  },
  async importCircleData (username, password, address, checkedMachines, savePath, files) {
    let arrs = []
    const head = `mysql -u${username} -p${password} -h ${address} --default-character-set=utf8 dau6000_1_2014 < ${savePath}\\`
    files.forEach(function (file) {
      let Sql = `${head}${file}`
      arrs.push(cmdPromise(Sql))
    })
    return Promise.all(arrs)
  },
  async ImportAllData (username, password, address, checkedMachines, savePath, files) {
    debugger
    let arrs = []
    const head = `mysql -u${username} -p${password} -h ${address} --default-character-set=utf8 dau6000_1_2014 < ${savePath}\\`

    files.forEach(function (file) {
      let Sql = `${head}${file}`
      arrs.push(cmdPromise(Sql))
    })
    return Promise.all(arrs)
  }
}
export default EXPORT
