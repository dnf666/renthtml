<template>
  <div>
    <div class="inputbox">
      <!-- 个人信息 -->
      <div class="info st">个人信息</div>

      <el-input class="st" v-model="name" v-on:input="changeName" placeholder="姓名"></el-input>
      <span class="tip st">{{ nameTips }}</span>
      <div class="st">
      <el-radio v-model="sex" label="男">男</el-radio><el-radio v-model="sex" label="女">女</el-radio>
      </div>
      <div class="block">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="出生日期">
        </el-date-picker>
      </div>
      <el-input class="st" v-model="phone" v-on:input="changePhone" placeholder="你的电话"></el-input>
      <span class="tip st">{{ phoneTips }}</span>
      <el-input class="st" v-model="address" placeholder="你的住址"></el-input>

      <el-input class="st" v-model="password" type="password" v-on:input="changePassword" placeholder="你的密码(包含数字、字母至少6位，不超过20位)"></el-input>

      <span class="tip st">{{ passwordTips }}</span>
      <el-input class="st" v-model="repeatPassword" type="password" v-on:input="confirmPassword" placeholder="密码确认"></el-input>
      <span class="tip st">{{ repeatPasswordTips }}</span>

      <el-checkbox class="st gre" @change="changeGre" v-model="gre">阅读并同意
        <el-button type="text" @click="open" class="xy">《服务协议》</el-button>
      </el-checkbox>
      <el-button type="primary" class="st next" :disabled="isdisabledFn" v-on:click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
  const PREFIX = 'http://localhost:8085/rent/';
  //验证是否能下一步
  let isnext = (that) => {
    for (var i = 0; i < 4; i++) {
      if (that.isnext[i] == true) {
        return;
      }
    }
    if (that.gre == false) {
      that.isdisabledFn = true;
      return;
    } else {
      that.isdisabledFn = false;
    }

  };

  export default {
    name: 'Fristregister',

    data() {
      return {
        company: '',
        companyTips: '',
        hy: [],
        hyTips: '',
        companySizeTips: '',
        // 这里可以设置为接口，每次都在数据库里改

        //工作昵称
        name: '',
        date: '',
        sex: '',
        phone: '',
        address: '',
        password: '',
        repeatPassword: '',
        repeatPasswordTips: '',
        gre: false,
        nameTips: '',
        phoneTips: '',
        passwordTips: '',
        isnext: [true, true, true, true],
        isdisabledFn: true
      }
    },
    methods: {
      confirmPassword(e) {
        if (e == '') {
          this.repeatPasswordTips = "请确认密码";
          return
        }
        if (e == this.password) {
          this.isnext[3] = false;
          this.repeatPasswordTips = '';
          isnext(this);
        } else {
          this.repeatPasswordTips = '两次密码不一致';

        }
      },
      open() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${action}`
            });
          }
        });
      },
      //验证用户名
      changeName(e) {
        this.isdisabledFn = true;
        this.isnext[0] = true;

        function ckName(str) {
          var reg = /^[\u4E00-\u9FA5]+$/; //全都是汉字
          return reg.test(str);
        }

        if (this.name == '') {
          this.nameTips = ''
          return;
        }
        if (ckName(e)) {
          this.nameTips = ' ';
          this.isnext[0] = false;
          isnext(this);
        } else {
          this.nameTips = '您的输入有误,名字必须为中文';
        }
      },

      //验证电话
      changePhone(e) {
        this.isdisabledFn = true;
        this.isnext[1] = true;

        function ckMail(str) {
          var myreg = /^[0-9]+$/ ;
          return myreg.test(str);
        }

        if (this.phone == '') {
          this.phoneTips = '不能为空';
          return;
        }
        if (ckMail(e)) {
          this.isnext[1] = false;
          this.phoneTips = ' ';
          isnext(this);
        } else {
          this.phoneTips = '您输入的电话格式有误';
        }
      },

      //验证密码
      changePassword(e) {
        this.isdisabledFn = true;
        this.isnext[2] = true;

        function ckPwd(str) {
          var myreg = /^[0-9a-z]{6,20}$/;
          return myreg.test(str);
        }

        if (this.password == '') {
          this.passwordTips = '密码不能为空';
          return;
        }
        if (ckPwd(e)) {
          this.passwordTips = ' ';
          this.isnext[2] = false;
          isnext(this);
        } else {
          this.passwordTips = '您输入的密码格式有误'
        }
      },

      //是否同意协议
      changeGre(e) {
        isnext(this);
      },
      //下一步
      next(e) {
        let that = this;

        this.$axios.post(PREFIX + "/login/regist.do",
          {
            name: this.name,
            birthday: this.date,
            sex: this.sex,
            phone: this.phone,
            address: this.address,
            password: this.password,
          }).then((response) => {
          if (response.data.status == 1) {
            that.$store.commit('setCompanyId', that.phone);
            window.sessionStorage.setItem('companyId', that.phone);
            this.$router.push({
              path: '/register/Secondregister',
            },)
          } else {
            alert(response.data.message);
          }
        })

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .prog {
    display: flex;
    justify-content: space-between;
  }

  .prog span {
    display: flex;
    width: 100px;
    height: 50px;
    justify-content: center;
    color: #409EFF;
  }

  .inputbox {
    width: 400px;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    justify-content: flex-start;
  }

  .el-card__body {
    position: relative;
    margin: 0px auto;
  }

  .info {
    display: flex;
    justify-content: flex-start;
  }

  .st {
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
  }

  .tip {
    font-size: 12px;
    color: red;
  }

  .xy {
    margin: 0px;
    padding: 0px;
    font-size: 14px;
  }

  .gre {
    display: flex;
    align-items: center;
  }

  .next {
    display: flex;
    justify-content: center;
    height: 40px;
  }
</style>
