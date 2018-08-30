<template>
    <div class="loginContent">
      <el-row>
        <el-col :span="24">
          <h1 class="header">IMPR数据导出导入工具</h1>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" class="headerContent">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="填写用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" auto-complete="off"  placeholder="填写密码"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="14">
                <el-form-item label="验证码" prop="VCode">
                  <el-input type="password" class="code" v-model="ruleForm.VCode" auto-complete="off"></el-input>

                </el-form-item>
              </el-col>
              <el-col :span="10">
                  <div id="vCode1"></div>
              </el-col>
            </el-row>
            <el-form-item >
              <div class="loginButton">
                <el-button type="primary" @click="loginForm('ruleForm')" >登陆</el-button>
                <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div class="loginBottom">
            <h6>Copyright(C)2015 Shanghai Improve Technology Co. Ltd.<br />
              上海应谱科技有限公司</h6>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default{
  name: 'login',
  data () {
    let that = this
    return {
      ruleForm: {
        name: '',
        pass: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        VCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: function (rule, value, callback) {
            debugger
            if (that.$vCode.verify(value)) {
              callback()
            } else {
              callback(new Error('验证码不正确!'))
            }
          },
          trigger: 'blur' }
        ]
      },
      type: 1
    }
  },
  created () {
    this.$util.createDir()
  },
  mounted () {
    this.$vCode.vCode(document.getElementById('vCode1'))
  },
  methods: {
    loginForm (formName) {
      debugger
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.$mysql.User.login(that.ruleForm.name, that.ruleForm.pass).then(function (res) {
            if (res) {
              that.$message({
                message: '登陆成功!',
                type: 'success'
              })
              sessionStorage.setItem('username', res.username)
              sessionStorage.setItem('type', that.type)
              that.$router.push({ path: 'home' })
            } else {
              that.$message.error('用户名或密码有错误!')
            }
          }, function () {
            // 记录错误日志
          })
        } else {
          that.$message.error('表单有错误!')
          return false
        }
      })
    },
    resetForm (formName) {
      // let shellstr = `mysqldump -uroot -ptest -h 127.0.0.1  --no-create-info --default-character-set=utf8 dau6000_1_2014 d_18021212595137919_digital --where="saveTime_Com BETWEEN 1525104000000 and 1527004800000" > D:/IMPR_TempData\\18021212595137919_digital.sql`
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
.loginContent {
  width: 360px;
  height: 500px;
  margin: 0 auto;
  padding-top: 70px;
  /*border: 1px solid red;*/
}

.loginContent .el-row {
  padding: 0;
}

.header {
  height: 80px;
  line-height: 80px;
  text-align: center;
  color: #FFFFFF;
  font-size: 30px;
  font-weight: 200;
  letter-spacing: -1px;
  text-decoration: inherit;
  text-transform: uppercase;
  background-color: #314464;
  margin: 0;
}

.loginContent .el-input {
 width: 220px;
}

.headerContent {
  padding-top: 30px;
  height: 420px;
  background-color: white;
}

.headerContent .code {
  width: 110px;
}

#vCode1 {
  display: inline-block;
  width:100px;
  height: 34px;
  margin-left: 8px;
  border: 1px solid #ccc;
}

.loginButton {
  margin: 60px 0 0 86px;
}

.loginBottom {
  text-align:center;
  margin:0 auto;
  padding-top:16px;
  color: white;
  font-size: 13px;
}
</style>
