<template>
  <el-container>
    <el-aside width="241px">
      <div>
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#f1f2f4"
          text-color="#878c87"
          active-text-color="#5686dc"
        >
          <!-- 修改头像 -->
          <div class="content">
              <img  src="/dinner/static/logo.png" class="avatar logo">
          </div>
          <!-- 列表 -->
          <el-tabs style="height: 200px;">
            <router-link to="/CostManagement">
              <el-menu-item index="/CostManagement">
                <i class="el-icon-bell"></i>
                <span slot="title">
                  支出管理
                </span>
              </el-menu-item>
            </router-link>
            <router-link to="/MemberMangement">
              <el-menu-item index="/MemberMangement">
                <i class="el-icon-edit"></i>
                <span slot="title">
                  成员管理
                </span>
              </el-menu-item>
            </router-link>
            <router-link to="/ProjectManagement">
              <el-menu-item index="/ProjectManagement">
                <i class="el-icon-menu"></i>
                <span slot="title">
                  订单管理
                </span>
              </el-menu-item>
            </router-link>
                <router-link to="/CuisineManagement">
                  <el-menu-item index="/CuisineManagement">
                    <template slot="title">
                      <i class="el-icon-goods"></i>
                      菜谱管理
                    </template>
                  </el-menu-item>
                </router-link>
            <el-menu-item index="" @click="exit">
              <i class="el-icon-warning"></i>
              <span slot="title">
                  注销
                </span>
            </el-menu-item>
          </el-tabs>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>© 2018 重庆邮电大学经济管理学院信管工作室</el-footer>
    </el-container>
  </el-container>
</template>
<style>
  *{
    margin: 0;
    padding: 0;
  }
  a{
    color: #878c87;
    text-decoration: none;
  }
  .el-footer {
    background-color: #fafafa;
    color: #878c87;
    padding-top: 20px;
  }
  .el-aside {
    background-color: #f1f2f4;
    color:#878c87;
  }

  .el-main {
    background-color: #ffffff;
    color: #878c87;
    margin: 0;
    padding: 0;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .avatar-uploader{
    display: inline-block;
    height:170px;
    width:170px;
  }
  .el-submenu [class^=el-icon-] {
    margin-top: 3px;
  }
  /* .el-submenu__title {
    padding-left: 40px;
  } */
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 800px;
  }
  .content{
    width: 180px;
    height: 200px;
  }
  .content img{
    border-radius: 5px;
    width: 130px;
    height: 130px;
    position:absolute;
    margin-left: 55px;
    margin-top: 20px;
    cursor: pointer;
  }
  .content p{
    padding-left: 78px;
    font-size: 16px;
    color: #999ca1;
    word-break: break-all;
  }
</style>

<script>
  export default {
    data() {
      return {
        menuDefault: 1,
        isCollapse: false,
        dialogFormVisible: false,
        formLabelWidth: '140px',
      }
    },
    // 得到公司头像
    created() {
    },
    methods: {
      // 判断上传头像的格式和大小
      exit(){
        let that = this;
        this.$confirm('是否退出？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warn',
        }).then(() => {
          that.$router.push({path: '/'});
        })
      }
    }
  }
</script>
