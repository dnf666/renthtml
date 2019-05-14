<template>
  <div>
    <router-view/>
    <div class="top">成员管理</div>
    <div class="contentm">

      <el-button
        class="filterDown"
        @click="show3 = !show3"
      >过滤
      </el-button>

      <div style="margin-top: 10px;">
        <el-collapse-transition>
          <div v-show="show3">
            <div class="transition-box">
              <span>电话：<el-input class="filter" v-model="filterPhone"></el-input></span>
              <span>姓名：<el-input class="filter" v-model="filterName"></el-input></span>
              <br>
              <span>性别：
                <el-radio class='sex' v-model="filterSex" label="男">男</el-radio>
                <el-radio class='sex' v-model="filterSex" label="女">女</el-radio>
              </span>
              <span>地址：<el-input class="filter" v-model="filterAddress"></el-input></span>
              <el-button class="primary" type="primary" @click="getFilterMemberInfo">过滤</el-button>
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <hr>
      <!-- 成员展示 -->
      <el-table
        id='out-table'
        class="memberData"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          width="50">
          <template slot-scope="scope">
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="editor el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
<!--                <el-dropdown-item>-->
<!--                  <router-link :to="{ path:'/CuisineMangement/Editor',query: { bookOriginalInfo: scope.row} }">-->
<!--                    编辑房源-->
<!--                  </router-link>-->
<!--                </el-dropdown-item>-->
                <el-dropdown-item>
                  <span
                    @click="deleteMember(scope.row.phone)">
                  删除用户
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>

        <!-- 成员信息 -->
        <el-table-column
          class="memberInfo"
          id="phone"
          label="电话"
          width="200"
          align="center"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">{{ scope.row.phone}}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100"
          align="center"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="200"
          align="center"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期"
          width="200"
          align="center"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          align="center"
          width="300">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          align="center"
          :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :page-sizes="[5,7,10]"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="memberCount">
      </el-pagination>
    </div>
  </div>
</template>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  .top {
    font-size: 19px;
    line-height: 60px;
    padding-left: 20px;
    background-color: #fafafa;
  }

  .contentm p {
    font-size: 15px;
    line-height: 70px;
    padding-left: 30px;
  }

  .upFiles {
    margin: 10px 10px;
  }

  .upload {
    margin: 10px 10px;
  }

  .uploadMould {
    color: #409eff;
    cursor: pointer;
  }

  /* .content:nth-child(4){
    height:0px!important;
  } */
  .moreMenu {
    padding-left: 30px;
    display: inline-block;
  }

  .transition-box {
    height: 240px;
    padding-top: 30px;
    border-top: 1px solid #dcdfe4;
    border-bottom: 1px solid #dcdfe4;
    background-color: #f1f2f4;
    box-sizing: border-box;
  }

  .transition-box > span {
    margin-left: 80px;
    margin-top: 8px;
  }

  .filter {
    width: 190px;
    padding-top: 8px;
  }

  .sex {
    width: 70px;
    margin-left: 10px;
  }

  .increaseInput {
    width: 260px;
  }

  .primary {
    margin-left: 130px;
    margin-top: 8px;
  }

  .increaseMember {
    background-color: #409EFF;
    border: 0;
  }

  .memberInfo {
    position: relative;
    top: -50px;
  }

  .pagination {
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .editor {
    border: 1px solid #c7ccd3;
    cursor: pointer;
    color: #c7ccd3;
    margin-top: 15px;
    width: 15px;
    height: 15px;
    border-radius: 2px;
    border: 1px solid #c7ccd3;
  }

  .el-input__icon:after {
    display: none;
  }

  .el-icon-arrow-up:before {
    display: none;
  }

  .editor div input {
    width: 0px;
    height: 0px;
    border: 0px;
  }

  .el-form-item {
    margin-bottom: 10px;
  }

  .el-dialog__body {
    padding: 20px 20px;
  }

  #state {
    position: relative;
    float: right;
    margin-right: 15px;
  }

  .activeState {
    margin-left: 5px;
  }

  .el-checkbox + .el-checkbox {
    margin-left: 5px;
  }

  .uploadExcel {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    margin-left: 10px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }

  .uploadExcel input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }

  .uploadExcel:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
  }

  #showExcelName {
    margin-left: 15px;
    margin-top: 8px;
  }
</style>
<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

  const PREFIX = 'http://localhost:8085/rent/';
  export default {
    data () {
      return {
        memberCount: 0,
        show3: false,
        currentPage: 1,
        pagesize: 10,
        tableData: [{
          phone: '',
          name: '',
          sex: '',
          password: '',
          address: '',
          birthday: ''
        }],
        value: '',
        dialogFormVisible: false,
        dialogVisible: false,
        isDisabled: false,
        formLabelWidth: '140px',
        radio: '0',
        checked: true,
        filterName: '',
        filterPhone: '',
        filterAddress: '',
        filterSex: '',
      }
    },
    //获取全部成员信息(success)
    created: function () {
      let that = this
      // 得到当前页面成员列表
      var params = new URLSearchParams()
      params.append('page', this.currentPage)
      params.append('size', this.pagesize)
      this.$axios.post(PREFIX + '/admin/filter.do?' + params.toString(), {})
        .then((response) => {
          this.tableData = response.data.object.data
          for (let i = 0; i < this.tableData.length; i++) {
            that.tableData[i].birthday = new Date(that.tableData[i].birthday).toLocaleDateString()
          }
          this.memberCount = response.data.object.recordSize
        })
        .catch((error) => {
          alert(error)
        })
    },
    methods: {
      // 获取当前页数及当前页面数据
      handleCurrentChange (currentPage) {
        let that = this;
        this.currentPage = currentPage
        let params = new URLSearchParams()
        params.append('page', this.currentPage)
        params.append('size', this.pagesize)
        this.$axios.post(PREFIX + '/admin/filter.do?' + params.toString(), {})
          .then((response) => {
            this.tableData = response.data.object.data
            for (let i = 0 ;i<this.tableData.length;i++){
              that.tableData[i].birthday =  new Date(that.tableData[i].birthday).toLocaleDateString();
            }
            this.memberCount = response.data.object.recordSize
          })
          .catch((error) => {
            alert(error)
          })
      },

      handleSizeChange: function (size) {
        let that = this;
        this.pagesize = size
        let params = new URLSearchParams()
        params.append('page', this.currentPage)
        params.append('size', this.pagesize)
        this.$axios.post(PREFIX + '/admin/filter.do?' + params.toString(), {})
          .then((response) => {
            this.tableData = response.data.object.data
            for (let i = 0 ;i<this.tableData.length;i++){
              that.tableData[i].birthday =  new Date(that.tableData[i].birthday).toLocaleDateString();
            }
            this.memberCount = response.data.object.recordSize
          })
          .catch((error) => {
            alert(error)
          })
      },
      deleteMember(index) {
        let book = new Object;
        book.phone = index;
        this.$axios.post(PREFIX + '/login/delMember.do',book).then((response) => {
          if (response.data.status == 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData.forEach((v, i) => {
                if (v.phone === index) {
                  this.tableData.splice(i, 1);
                }
              });
            }
          }
        })
      },

      //根据条件查找成员信息(success)
      getFilterMemberInfo () {
        let that =this;
        let data = new Object
        var params = new URLSearchParams()
        params.append('page', this.currentPage)
        params.append('size', this.pagesize)
        if (this.filterPhone != '') {
          data.phone = this.filterPhone
        }
        if (this.filterName != '') {
          data.name = this.filterName
        }
        if (this.filterSex != '') {
          data.sex = this.filterSex
        }
        if (this.filterPhone != '') {
          data.phone = this.filterPhone
        }
        if (this.filterAddress != '') {
          data.address = this.filterAddress
        }
        this.$axios.post(PREFIX + '/admin/filter.do?' + params.toString()
          ,data)
          .then((response) => {
            this.tableData = response.data.object.data
            for (let i = 0 ;i<this.tableData.length;i++){
              that.tableData[i].birthday =  new Date(that.tableData[i].birthday).toLocaleDateString();
            }
            this.memberCount = response.data.object.recordSize
          })
          .catch((error) => {
            alert(error)
          })
      }

    }
  }
</script>
