<template>
  <div>
    <router-view/>
    <div class="cost_top">备忘管理</div>
    <div class="contentm">
      <el-button split-button type="primary" class="moreMenu" @click="dialogFormVisible = true">
        添加备忘
        <el-dialog title="添加备忘" :visible.sync="dialogFormVisible" :append-to-body='true' top='10px' width="550px">
          <el-form class="memberData">
            <el-form-item label="说明" :label-width="formLabelWidth">
              <el-input class="increaseInput" v-model="newDescribe" placeholder="支出说明"></el-input>
            </el-form-item>
            <el-form-item label="日期" :label-width="formLabelWidth">
              <el-date-picker
                v-model="newDate"
                type="date"
                placeholder="日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="费用" :label-width="formLabelWidth">
              <el-input-number v-model="newCount" :min="0" :max="10000000"></el-input-number>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addMember">保存</el-button>
          </div>
        </el-dialog>
      </el-button>
      <el-button
        class="filterDown"
        type="primary" plain
        @click="getFilterCostInfo1"
      >本周
      </el-button>
      <el-button
        class="filterDown"
        type="success" plain
        @click="getFilterCostInfo2"
      >本月
      </el-button>
      <el-button
        class="filterDown"
        type="warning" plain
        @click="getFilterCostInfo3"
      >本年
      </el-button>


      <!-- 根据输入过滤信息 -->
      <div style="margin-top: 10px;">
        <el-collapse-transition>
          <div v-show="show3">
            <div class="transition-box">
              <span>说明：<el-input class="filter" v-model="filterDescribe"></el-input></span>
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
                <el-dropdown-item>
                  <router-link :to="{ path:'/MemberMangement/Editor',query: { memberOriginalInfo: scope.row} }">
                    编辑备忘
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span
                    @click="deleteMember(scope.row.id)">
                  删除备忘
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <!-- 成员信息 -->
        <el-table-column
          class="memberInfo"
          id="id"
          label="编号"
          width="300"
          align="center"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="说明"
          width="400"
          align="center"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="300"
          align="center"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="price"
          label="费用(￥)"
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
        layout=" sizes, prev, pager, next, jumper"
        >
      </el-pagination>
    </div>
  </div>
</template>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  .tip {
    font-size: 12px;
    color: red;
  }

  .cost_top {
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

  .st {
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
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
          id: '',
          name: '',
          date: '',
          price: '',
        }],
        value: '',
        dialogFormVisible: false,
        dialogVisible: false,
        formLabelWidth: '140px',
        checked: true,
        filterDescribe: '',
        newDescribe: '',
        newDate: '',
        newCount: '',
        sign:0
      }
    },
    //获取全部成员信息(success)
    created: function () {
      this.getFilterCostInfo();
          },
    methods: {
      getFilterCostInfo1(){
        this.sign = 1;
        this.getFilterCostInfo();
      },
      getFilterCostInfo2(){
        this.sign = 2;
        this.getFilterCostInfo();
      },
      getFilterCostInfo3(){
        this.sign = 3;
        this.getFilterCostInfo();
      },
      // 获取当前页数及当前页面数据
      handleCurrentChange (currentPage) {
        this.currentPage = currentPage
        this.getFilterCostInfo();
      },
      handleSizeChange: function (size) {
        this.pagesize = size
        this.getFilterCostInfo()
      },

      //获得选中的一行数据
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      //删除单个成员信息()
      deleteMember (num) {
        //todo 违反了rest原则。 但是现在又传不过去
        this.$axios.post(PREFIX + '/cost/delCost.do', {
          id: num
        }).then((response) => {
            if (response.data.status == 1) {
              for (let i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].id === num) {
                  this.tableData.splice(i, 1)
                }
              }
              this.memberCount--
            } else {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            }
          })
          .catch((error) => {
            alert(error)
          })
      },
      addMember () {
        this.dialogFormVisible = false
        this.$axios.post(PREFIX + '/cost/cost.do', {
          name: this.newDescribe,
          date: this.newDate,
          price: this.newCount,
        }).then((response) => {
          if (response.data.status == 1) {
            window.location.reload()
          }
        }).catch((error) => {
          alert(error)
        })
      },
      //根据条件查找成员信息(success)
      getFilterCostInfo () {
        let that =this;
        let params = new URLSearchParams()
        params.append('sign',this.sign);
        params.append('page', this.currentPage)
        params.append('size', this.pagesize)
        this.$axios.post(PREFIX + '/cost/filter.do?' + params.toString())
          .then((response) => {
            this.tableData = response.data.object.data;
            for (let i = 0 ;i<this.tableData.length;i++){
              that.tableData[i].date =  new Date(that.tableData[i].date).toLocaleDateString();
            }
            this.memberCount = response.data.object.total
          })
          .catch((error) => {
            alert(error)
          })
      },
    }
  }
</script>
