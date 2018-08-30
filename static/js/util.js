'use strict'
const iconv = require('iconv-lite')
const fs = require('fs')
const encoding = 'cp936'
const binaryEncoding = 'binary'
let util = {
  getExePath (extName) {
    var strPath = process.env['PATH']
    var nodePath = strPath.split(';').filter((str) => {
      if (str.toLowerCase(extName).indexOf(extName.toLowerCase()) > 0) {
        return true
      }
    }) || []

    return nodePath[0]
  },
  toGBK (str) {
    return iconv.decode(Buffer.from(str, binaryEncoding), encoding)
  },
  createDir (path) {
    let dirPath = path || 'D:/IMPR_TempData'
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath)
    }
  }
}

export default util
