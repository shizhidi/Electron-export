<template>
  <div class="IndexContent">
    <el-row>
      <el-col :span="24"><div class="title">IMPR数据导出导入工具</div></el-col>
    </el-row>
    <el-row :gutter="0" class="mL15">
      <el-col :span="5">
        <!-- <div class="block">
          <span class="demonstration">起始时间</span>
          <el-date-picker
            v-model="startTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div> -->

        <div class="block">
          <span class="demonstration">起始时间</span>
          <el-date-picker
            v-model="startTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="5"><div class="block">
        <span class="demonstration">结束时间</span>
        <el-date-picker
          v-model="endTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div></el-col>
    </el-row>

    <el-row :gutter="0" class="mL15">
        <el-col :span="5">
        <div class="block">
            <span class="demonstration">用户名</span>
            <el-input v-model="username" name="path" placeholder="root"></el-input>
        </div>
        </el-col>
        <el-col :span="5">
        <div class="block">
            <span class="demonstration">密码</span>
            <el-input v-model="password" name="path" placeholder="test"></el-input>
        </div>
        </el-col>
        <el-col :span="5">
        <div class="block">
          <span class="demonstration">ip</span>
          <el-input v-model="address" name="path" placeholder="192.168.1.10"></el-input>
        </div>
        </el-col>
        <el-col :span="5">
        <el-button type="primary" @click="testMysql">数据库连接</el-button>
        </el-col>
    </el-row>

    <el-row :gutter="0" class="mL15">
      <el-col :span="2">
        数据类型：
      </el-col>
      <el-col :span="10">
        <el-checkbox-group v-model="checkedVersions">
          <el-checkbox v-for="(version,key) in versions" :key="version.type" class="machineClass" :label="version.type">{{ version.type | moduleTypeToString }}</el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>

    <el-row :gutter="0" class="mL15">
      <el-col :span="11">
        路径：
        选择盘符：
        <el-select v-model="selectedDrive" @change="driveChange" filterable placeholder="请选择">
          <el-option
            v-for="(item,key) in drives"
            :key="item.label"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="savePath" name="path" placeholder=""></el-input>
      </el-col>
      <el-col :span="3">
        <div>
          <!-- <el-checkbox v-model="checked" label="创建表" border></el-checkbox> -->
          <el-button type="primary" @click="createTables">导出数据</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="block">
          <span class="demonstration">导入的组织树ID</span>
          <el-input v-model="exportTreeId" name="path" placeholder=""></el-input>
        </div>
        </el-col>
    </el-row>

    <el-row :gutter="0" class="mL15">
      <el-col :span="24">
        <el-button type="primary" @click="exportData">导出数据</el-button>
        <el-button type="primary" @click="importData">导入数据</el-button>
        <el-button type="primary" @click="exportConfigData">导出配置</el-button>
        <el-button type="primary" @click="importConfigData">导入配置</el-button>
        <el-button type="primary" @click="exportCircleData">导出刚度圆数据</el-button>
        <el-button type="primary" @click="importCircleData">导入刚度圆数据</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="0" class="mL15">
      <el-col :span="16">
        选择风场：
        <el-select v-model="selectedTissue" @change="tissueChange" filterable placeholder="请选择">
          <el-option
            v-for="(item,key) in tissues"
            :key="item.label"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">

      </el-col>
    </el-row>

    <el-row :gutter="0" class="mL15">
      <el-col :span="16">
        <el-button type="primary" @click="handleCheckAllChange">全选</el-button>
        <el-button type="primary" @click="handleUnCheckAllChange">全不选</el-button>
        <el-button type="primary" @click="AntiElectionChange">反选</el-button>
      </el-col>
      <el-col :span="8">

      </el-col>
    </el-row>

    <el-row :gutter="0">
      <el-col :span="24">
        <el-checkbox-group v-model="checkedMachines">
          <el-checkbox v-for="(machine,key) in machines" :key="machine.machineId" class="machineClass" :label="machine.machineId">{{machine.machineName}}</el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-progress class="mL15 percentage" :percentage="percentage.total" :stroke-width="8" :status="percentage.status" v-show="percentage.percentageShow"></el-progress>

  </div>
</template>

<script>
export default {
  data () {
    return {
      tissues: [{label: '某风场', value: 123}],
      checkedMachines: [],
      machines: [{machineId: 1234, machineName: '10号机组'}],
      username: 'root',
      password: 'test',
      address: '127.0.0.1',
      checked: false,
      exportTreeId: 0,
      drives: [{
        label: 'C:/',
        value: 'C:/'
      }, {
        label: 'D:/',
        value: 'D:/'
      }, {
        label: 'E:/',
        value: 'E:/'
      }, {
        label: 'F:/',
        value: 'F:/'
      }],
      checkBoxes: [{type: '1', text: '转速波形'}, {type: '2', text: '时域波形'}, {type: '3', text: '包络波形'}],
      checkType: ['1', '2', '3'],
      startTime: new Date(new Date().toLocaleDateString()).getTime(),
      endTime: new Date(new Date().toLocaleDateString()).getTime(),
      startSpeed: 800,
      endSpeed: 1600,
      everyDay: 1,
      containNoSpeed: true,
      savePath: 'IMPR_TempData',
      selectedTissue: '',
      selectedDrive: 'D:/',
      percentage: {
        total: 0,
        status: '',
        percentageShow: false
      },
      title: 'MS6000波形',
      dataType: '转速',
      type: null,
      versions: [],
      checkedVersions: [1, 2],
      mysqls: [{id: 1, name: 'dau6000_1_2014'}, {id: 2, name: 'ms6000_config_2014'}],
      checkedMysqls: [1, 2]
    }
  },
  created () {
    var that = this
    // this.startTime = this.endTime = new Date(new Date().toLocaleDateString()).getTime()
  },
  mounted () {
    this.getTreeVersions();
  },
  computed() {
    this.handlestartTime = new Date(this.startTime).getTime()
    this.handleendTime = new Date(this.endTime).getTime() + 24 * 60 * 60 * 1000
    this.handlepath = this.selectedDrive + this.savePath
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    getTreeVersions () {
      let that = this
      that.tissues = [];
      this.machines = [];
      this.$mysql.Navigate.getAllNavigate().then(function (res) {
        res.forEach(function (item, index, array) {
          that.tissues.push({
            value: item.t_id,
            label: item.t_name
          })
        })
      }, function () {
        // 错误日志d
      })

      this.$mysql.Version.getAllVersions().then(function (res) {
        debugger
        if (that.$lodash.isArray(res)) {
          that.versions = res
        }
      }, function (errStr) {
        that.$message.error('数据获取错误:' + errStr)
      })
    },
    tissueClick () {

    },
    testMysql () {
      // 数据库重新连接刷新组织树
      this.$mysqlUtil.DAU = null;
      this.$mysqlUtil.CONFIG = null;
      this.$mysqlUtil.OPTIONS.host = this.address;
      this.$mysqlUtil.OPTIONS.user = this.username;
      this.$mysqlUtil.OPTIONS.password = this.password;
      this.$mysqlUtil.CREATEPOOL();
      this.$mysqlUtil.TESTMYSQL(this.address,this.username, this.password,(err) => {
        if (err){
          this.$message({
            message: '数据库连接失败!',
            type: 'error'
          })
        }else{
          this.$message({
            message: '数据库连接成功!',
            type: 'success'
          })
          this.getTreeVersions();
        }
      })
    },
    tissueChange (value) {
      this.machines = []
      this.checkedMachines = []
      var that = this
      this.$mysql.Machine.findMachineByTreeid(value).then(function (data) {
        if (data.length === 0) return
        data.forEach(function (item, index, array) {
          that.machines.push({
            machineId: item.machine_id,
            machineName: item.m_me
          })
        })
      }, function () {
        // 错误日志
      })
    },
    driveChange (value) {

    },
    validate () {
      // 验证上传路径

    },
    handleCheckAllChange (event) {
      var that = this
      this.checkedMachines = []
      this.machines.forEach(function (item, index, array) {
        that.checkedMachines.push(item.machineId)
      })
    },
    handleUnCheckAllChange () {
      this.checkedMachines = []
    },
    AntiElectionChange () {
      debugger
      var tempMachines = []
      this.machines.forEach(function (machine, index, array) {
        tempMachines.push(machine.machineId)
      })
      this.checkedMachines = _.difference(tempMachines, this.checkedMachines)
    },
    exportConfigData () {
      debugger
      var that = this
      this.$util.createDir(this.handlepath)
      if (!this.selectedTissue) {
        this.$message.error('没有选择风场!')
        return
      }

      const loading = this.$loading({
        lock: true,
        text: '数据导出中...',
        spinner: 'el-icon-loading',
        background: 'rgba(144,144,144, 0.6)'
      })

      that.$mysql.Export.exportConfigDbData(this.username, this.password, this.address, this.selectedTissue, this.handlepath).then(function(datas){
        that.$message({
          message: '配置导出成功!',
          type: 'success',
          showClose: true,
          duration: 0
        })
        loading.close()
        that.exportTreeId = that.selectedTissue
        that.$store.commit('setSelectedTissue',that.selectedTissue)
      }).catch(function(err){
        debugger
        // that.$util.toGBK(err.message)
        that.$message({
          message: '配置导出失败!',
          type: 'error',
          showClose: true,
          duration: 0
        })
        loading.close()
      })
    },
    importConfigData () {
      debugger
      var that = this
      this.$util.createDir(this.handlepath)
      if (this.exportTreeId == 0) {
        this.$message.error('没有填写要导入的组织树ID!')
        return
      }

      const loading = this.$loading({
        lock: true,
        text: '数据导出中...',
        spinner: 'el-icon-loading',
        background: 'rgba(144,144,144, 0.6)'
      })

      //检查该路径下是否有配置文件
      this.fliterFiles(this.handlepath,1).then(function(files){
        if (files.length === 5) {
          that.$mysql.Export.ImportConfigDbData(that.username, that.password, that.address,that.handlepath).then(function (values) {
            that.$message({
              message: '配置导入成功!',
              type: 'success',
              showClose: true,
              duration: 0
            })
            loading.close()
            debugger
            //导入成功修改组织树的父级
            let selectedTissue = !that.selectedTissue ? 0 : that.selectedTissue;
            that.$mysql.Navigate.updateNavigateParentId(that.exportTreeId,selectedTissue).then(function(){

            }).catch(function (err) {
              that.$message({
                message: '填写的组织树ID不存在数据库中!',
                type: 'error',
                showClose: true,
                duration: 0
              })
            })
          }).catch(function () {
            that.$message({
              message: '配置导入失败!',
              type: 'error',
              showClose: true,
              duration: 0
            })
            loading.close()
          })
        }else{
          that.$message({
            message: '配置sql文件缺失!',
            type: 'error',
            showClose: true,
            duration: 0
          })
          loading.close()
        }
      }).catch(function(err){
        throw new Error(err)
      })
    },
    stopData () {
      let result = false
      HistoryDataManager.getcounts({
        callback (data) {
          result = data.evenCount
          console.log(data.evenCount)
        },
        async: false
      })
      if (result) {
        HistoryDataManager.getming()
      } else {
        this.$message.warning('没有数据正在导出!')
      }
    },
    checkMysql(){
      const mysqlPath = this.$util.getExePath('mysql')
      if (!mysqlPath) {
        this.$message.error('mysql-bin目录未添加到环境变量中!')
        return false
      }else{
        return true
      }
    },
    fliterFiles (path,type) {
      debugger
      const configTables = ['c_machine.sql','c_machine_position.sql','c_machine_dau6000.sql','c_dau6000.sql','c_navigate_tree.sql']
      const dau8000 = ['inclin.sql']
      const dauCircle = ['circle.sql']
      return new Promise((resolve, reject) => {
        this.$fs.readdir(path, function (err, files) {
          if (err) {
            reject(err)
          }
          let tempFiles = files.filter(function (file) {
            if (type == 1) {
              if(configTables.indexOf(file) != -1) {
                return true
              }else{
                return false
              }
            }
            if (type == 2) {
              if(configTables.indexOf(file) != -1) {
                return false
              }else{
                return true
              }
            }
            if (type == 3) {
              if (dauCircle.indexOf(file) != -1) {
                return true
              }else{
                return false
              }
            }
          })
          resolve(tempFiles)
        })
      })
    },
    exportData () {
      debugger
      let that = this, calcNum = 0, result = false
      this.$util.createDir(this.handlepath)
      const bool = this.checkMysql();
      if (!bool) return;

      let stTime = new Date(this.startTime).getTime(), edTime = new Date(this.endTime).getTime()
      if (stTime > edTime) {
        this.$message.error('开始时间不能大于结束时间!')
        return
      }

      if (this.checkedMachines.length == 0) {
        this.$message.error('未选取机组!')
        return
      }

      const loading = this.loadingMsg()

      console.log(this.checkedMachines)
      // TODO 把配置传送到后台

      if (this.checkedVersions.length === 2) {
        let data6000 = new Promise((resolve, reject) => {
          this.$mysql.Export.exportDataOne6000Tool(this.username, this.password, this.address, this.checkedMachines, this.handlepath, this.handlestartTime, this.handleendTime).then(function (values) {
            resolve(values)
          }).catch(function () {
            reject(false)
          })
        })

        let data8000 = new Promise((resolve, reject) => {
          this.$mysql.Export.exportDataOne8000Tool(this.username, this.password, this.address, this.checkedMachines, this.handlepath, startTime, endTime).then(function (values) {
            resolve(values)
          }).catch(function () {
            reject(false)
          })
        })

        Promise.all([data6000, data8000]).then((result) => {
          if (result[0] && result[1]) {
            that.$message({
              message: '数据导出成功!',
              type: 'success',
              showClose: true,
              duration: 0
            })
            loading.close()
          }
        }).catch((error) => {
          that.$message({
            message: '数据导出失败!',
            type: 'error',
            showClose: true,
            duration: 0
          })
          loading.close()
        })

      }

      if (this.checkedVersions.length === 1 && this.checkedVersions[0] == 1) {
        this.$mysql.Export.exportDataOne6000Tool(this.username, this.password, this.address, this.checkedMachines, this.handlepath, startTime, endTime).then(function (values) {
          that.$message({
            message: '数据导出成功!',
            type: 'success',
            showClose: true,
            duration: 0
          })
          loading.close()
        }).catch(function () {
          that.$message({
            message: '数据导出失败!',
            type: 'error',
            showClose: true,
            duration: 0
          })
          loading.close()
        })
      }

      if (this.checkedVersions.length === 1 && this.checkedVersions[0] == 2) {
        this.$mysql.Export.exportDataOne8000Tool(this.username, this.password, this.address, this.checkedMachines, this.handlepath, startTime, endTime).then(function (values) {
          that.$message({
            message: '数据导出成功!',
            type: 'success',
            showClose: true,
            duration: 0
          })
          loading.close()
        }).catch(function () {
          that.$message({
            message: '数据导出失败!',
            type: 'error',
            showClose: true,
            duration: 0
          })
          loading.close()
        })
      }
      // this.getCurrentStatus('导出');
    },
    loadingMsg () {
      const loading = this.$loading({
        lock: true,
        text: '数据导出中...',
        spinner: 'el-icon-loading',
        background: 'rgba(144,144,144, 0.6)'
      })
      return loading
    },
    createTables() {
      if (this.checkedMachines.length != 0) {
        this.$mysql.Machine.createMachineDauTables(this.checkedMachines).then(function(res){
          that.$message({
            message: '数据表创建成功!',
            type: 'success',
            showClose: true,
            duration: 0
          })
        }).catch(function(err){
          that.$message({
            message: '数据表创建失败!',
            type: 'error',
            showClose: true,
            duration: 0
          })
        })
      }else{
        that.$message({
          message: '选择机组号!',
          type: 'error'
        })
      }
    },
    importData () {
      debugger
      var that = this
      this.$util.createDir(this.handlepath)
      const loading = this.loadingMsg()
      this.fliterFiles(this.handlepath,2).then(function(files){
        that.$mysql.Export.ImportAllData(that.username, that.password, that.address, that.checkedMachines, that.handlepath,files).then(function(res){
          that.$message({
            message: '数据导入成功!',
            type: 'success',
            showClose: true,
            duration: 0
          })
          loading.close()
        }).catch(function(err){
          that.$message({
            message: '数据导入失败!',
            type: 'error',
            showClose: true,
            duration: 0
          })
          loading.close()
        })
      }).catch(function(err){
        throw new Error(err)
        loading.close()
      })
      // this.getCurrentStatus('导入');
    },
    exportCircleData () {
      let that = this, calcNum = 0, result = false
      this.$util.createDir(this.handlepath)
      const bool = this.checkMysql();
      if (!bool) return;

      let stTime = new Date(this.startTime).getTime(), edTime = new Date(this.endTime).getTime()
      if (stTime > edTime) {
        this.$message.error('开始时间不能大于结束时间!')
        return
      }

      if (this.checkedMachines.length == 0) {
        this.$message.error('未选取机组!')
        return
      }

      const loading = this.loadingMsg()
      this.$mysql.Export.exportCircleData(this.username, this.password, this.address, this.checkedMachines, this.handlepath, startTime, endTime).then(function(){
          that.$message({
            message: '刚度圆配置导出成功!',
            type: 'success',
            showClose: true,
            duration: 0
          })
          loading.close()
      }).catch(function(err){
          that.$message({
            message: '刚度圆配置导出失败!',
            type: 'error',
            showClose: true,
            duration: 0
          })
          loading.close()
      })
    },
    importCircleData () {
      var that = this
      this.$util.createDir(this.handlepath)
      const loading = this.loadingMsg()
      this.fliterFiles(this.handlepath,3).then(function(files){
        that.$mysql.Export.importCircleData(that.username, that.password, that.address, that.checkedMachines, that.handlepath,files).then(function(res){
          that.$message({
            message: '刚度圆配置导入成功!',
            type: 'success',
            showClose: true,
            duration: 0
          })
          loading.close()
        }).catch(function(err){
          that.$message({
            message: '刚度圆配置导入失败!',
            type: 'error',
            showClose: true,
            duration: 0
          })
          loading.close()
        })
      }).catch(function(err){
        throw new Error(err)
        loading.close()
      })
    },
    getCurrentStatus (str) {
      let that = this
      this.percentage.total = 0
      this.percentage.percentageShow = true
      this.percentage.status = ''

      // 轮询获取
      let Interval = setInterval(() => {
        ImportData.getcount({
          callback (data) {
            console.log(data)
            that.percentage.total = data.count
            if (data.count >= 100) {
              clearInterval(Interval)
              that.percentage.total = 100
              that.percentage.status = 'success'
              that.$message({
                message: str + '成功!',
                type: 'success',
              })
              that.initData = false
            }
            if (data.count == -1) {
              clearInterval(Interval)
              that.$message({
                message: '取消成功!',
                type: 'success'
              })
              that.percentage.total = 0
              that.initData = false
            }
          },
          async: false
        })
      }, 1000)
    }
  }
}
</script>

<style>
.IndexContent {
  width: 1060px;
  height: 550px;
  border: 6px solid rgb(37, 72, 133);
  margin: 0 auto;
  position: relative;
  top: 60px;
  background-color: white;
}

.IndexContent .title {
  font-weight: bold;
  text-align: center;
  height: 60px;
  line-height: 60px;
}

.IndexContent .el-date-editor.el-input {
  width: 136px;
}

.IndexContent .el-input {
  width: 140px;
}

.IndexContent .speed-input.el-input  {
  width: 90px;
}

.IndexContent .machineClass:first-child {
  margin-left: 15px;
}

.IndexContent .el-row {
  padding: 5px 0;
}

.IndexContent .inputNum {
  position: relative;
  top: 10px;
}

.IndexContent .waveType {
  padding-bottom: 10px;
  margin-top: -10px;
}

.IndexContent .waveNumber {
  display: inline-block;
}

.IndexContent .percentage {
  margin-top: 40px
}
</style>
