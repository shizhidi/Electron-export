'use strict'
import mysql from 'mysql'

let ops = {}

ops.OPTIONS = {
  connectionLimit: 50,
  host: 'localhost',
  user: 'root',
  password: 'test',
  database: 'dau6000_1_2014',
  multipleStatements: true // 是否允许执行多条sql语句
}
ops.DAU = null
ops.CONFIG = null
ops.CREATEPOOL = () => {
  ops.DAU = mysql.createPool(ops.OPTIONS)
  ops.OPTIONS.database = 'ms6000_config_2014'
  ops.CONFIG = mysql.createPool(ops.OPTIONS)
}
if (!ops.DAU && !ops.CONFIG) {
  ops.CREATEPOOL()
}

ops.TESTMYSQL = (host, user, pass, callback) => {
  debugger
  if (!host || !user || !pass) return false

  let connection = mysql.createConnection({
    host: host,
    user: user,
    password: pass
  })

  connection.connect(callback)

  connection.end()
}
// 将结果已对象数组返回
ops.ROW = (pool, sql, ...params) => {
  debugger
  if (!pool) {
    throw new Error('has no pool!')
  }
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }
      connection.query(sql, params, function (error, res) {
        connection.release()
        if (error) {
          reject(error)
          return
        }
        resolve(res)
      })
    })
  })
}
// 返回一个对象
ops.FIRST = (pool, sql, ...params) => {
  if (!pool) {
    throw new Error('has no pool!')
  }
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }
      connection.query(sql, params, function (error, res) {
        connection.release()
        if (error) {
          reject(error)
          return
        }
        resolve(res[0] || null)
      })
    })
  })
}
// 返回单个查询结果
ops.SINGLE = (pool, sql, ...params) => {
  if (!pool) {
    throw new Error('has no pool!')
  }
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }
      connection.query(sql, params, function (error, res) {
        connection.release()
        if (error) {
          reject(error)
          return
        }
        for (let i in res[0]) {
          resolve(res[0][i] || null)
          return
        }
        resolve(null)
      })
    })
  })
}
// 执行代码，返回执行结果
ops.EXECUTE = (pool, sql, ...params) => {
  debugger
  if (!pool) {
    throw new Error('has no pool!')
  }
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }
      connection.query(sql, params, function (error, res) {
        connection.release()
        if (error) {
          reject(error)
          return
        }
        resolve(res)
      })
    })
  })
}
// 模块导出
export default ops
