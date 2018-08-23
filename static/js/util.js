'use strict'
let util = {
  getExePath (extName) {
    var strPath = process.env['PATH']
    var nodePath = strPath.split(';').filter((str) => {
      if (str.toLowerCase(extName).indexOf(extName.toLowerCase()) > 0) {
        return true
      }
    }) || []

    return nodePath[0]
  }
}

export default util
