<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <img src="@/assets/touxiang.jpg" alt="">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>

<script>
// 导入axios
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'change'},
          {min: 3, max: 6, message: '用户名在3~6位', trigger: 'change'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'change'},
          {min: 6, max: 12, message: '密码在6~12位之间', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios({
            url: 'http://localhost:8888/api/private/v1/login',
            method: 'post',
            data: this.form
          }).then(res => {
            if (res.data.meta.status === 200) {
              this.$message({
                message: res.data.meta.msg,
                type: 'success',
                duration: 1500
              })
              // 将token存储到本地存储
              localStorage.setItem('token', res.data.data.token)
              this.$router.push('/home')
            } else {
              this.$message({
                message: res.data.meta.msg,
                type: 'error',
                duration: 1500
              })
            }
          })
        } else {
          return false
        }
      })
    },
    reset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;
}
.el-form {
  width: 400px;
  background-color: #fff;
  margin: 200px auto;
  padding: 75px 40px 15px;
  position: relative;
}
.el-form img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -80px;
}
</style>
