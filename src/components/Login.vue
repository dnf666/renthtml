<template>
  <div class="box">
    <el-card class="box-card">
      <div class="main_title">欢迎来到DINNER</div>
      <el-input
        class="input"
        placeholder="请输入电话"
        prefix-icon="el-icon-info "
        v-model="email"
        type="email"
        v-on:input="changeEmail"
      >
      </el-input>
      <el-input
        class="input"
        placeholder="请输入密码"
        prefix-icon="el-icon-info"
        v-model="password"
        type="password"
        v-on:input="changePassword"
      >
      </el-input>
      <el-radio v-model="radio" label="2">会员</el-radio>
      <el-radio v-model="radio" label="1">管理员</el-radio>
      <el-button class="loginbutton" type="primary" @click="onSubmit">登录</el-button>
      <div class="footer">还没有账号？
        <router-link class="reg" to="/register">去注册</router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
  const PREFIX = 'http://localhost:8082/dinner'
  export default {
    name: 'Login',
    data () {
      return {
        email: '',
        password: '',
        radio: '2'
      }
    },
    methods: {
      onSubmit () {
        let that = this
        if (this.radio == 2) {
          //提交请求
          this.$axios.post(PREFIX + '/login/login.do', {
            phone: this.email,
            password: this.password
          })
            .then((response) => {
              if (response.data.status == 1) {
                that.$store.commit('setIsLogin', true)
                that.$store.commit('setCompanyId', response.data.object.phone)
                window.sessionStorage.setItem('isLogin', true)
                window.sessionStorage.setItem('companyId', response.data.object.phone)
                that.$router.push({path: '/OrderDinner'})
              } else {
                alert(response.data.message)
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }else if (this.radio == 1){
          this.$axios.post(PREFIX + '/admin/login.do', {
            id: this.email,
            password: this.password
          })
            .then((response) => {
              if (response.data.status == 1) {
                that.$store.commit('setIsLogin', true)
                that.$store.commit('setAdminId', response.data.object.id);
                window.sessionStorage.setItem('isLogin', true)
                window.sessionStorage.setItem('adminId', response.data.object.id)
                that.$router.push({path: '/CompanyInfo'})
              } else {
                alert(response.data.message)
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      },

      changeEmail (e) {

      },
      changePassword (e) {
      },
      // //验证密码
      // ckPwd(str) {
      //   var myreg = /^[0-9a-z]{6,20}$/;
      //   return myreg.test(str);
      // },
      // //验证邮箱
      // ckMail(str) {
      //   var myreg = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
      //   return myreg.test(str);
      // }
    }
  }
</script>

<style>
  .box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main_title {
    font-size: 30px;
    font-weight: 500;
    margin: 50px 0 10px 30px;
    text-align: left;
  }

  .text {
    font-size: 14px;
    width: 300px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .input {
    display: flex;
    width: 300px;
    margin-top: 30px;
  }

  .loginbutton {
    display: flex;
    margin-top: 30px;
    width: 300px;
    justify-content: center;
    height: 40px;
    font-size: 15px;
  }

  .footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 60px;
  }

  a {
    font-size: 16px;
  }

  a:link {
    color: blue;
    text-decoration: none;
  }

  a:active {
    color: red;
  }

  a:visited {
    color: blue;
    text-decoration: none;
  }

  a:hover {
    color: red;
    text-decoration: underline;
  }
</style>
