<template>
  <div>
    <router-view/>
    <el-dialog title="订单详情" :visible.sync="dialogFormVisible" :append-to-body='true' top='100px' width="400px" center>
      <el-table
        id='out-table'
        class="bookData"
        ref="multipleTable"
        :data="orderData"
        tooltip-effect="dark"
        :highlight-current-row="true"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          align="center"
          label="菜名"
          width="100"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="price"
          align="center"
          label="价格(￥)"
          width="100"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量"
          align="center"
          width="100"
          :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">退出</el-button>
      </div>
    </el-dialog>

    <div class="top">预约管理</div>
    <div class="contentP">
      <el-button
        class="filterDown"
        type="primary" plain
        @click="getFilterProjectInfo1"
      >本周
      </el-button>
      <el-button
        class="filterDown"
        type="success" plain
        @click="getFilterProjectInfo2"
      >本月
      </el-button>
      <el-button
        class="filterDown"
        type="warning" plain
        @click="getFilterProjectInfo3"
      >本年
      </el-button>
      <span id='state'>
        ({{projectCount}}元)
      </span>
      <div style="margin-top: 10px;">
      </div>
      <hr>
      <el-table
        class="projectData"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        >

        <el-table-column
          prop="location"
          label="位置"
          width="150"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="name"
          label="预约人"
          width="350"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="350"
          :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,7,10]"
        :page-size="pagesize"
        layout="sizes, prev, pager, next, jumper"
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

  .top {
    font-size: 19px;
    line-height: 60px;
    padding-left: 20px;
    background-color: #fafafa;
  }

  .contentP p {
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
    height: 210px;
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

  /* .moreMenu div :first-child{
    width: 60px;
    height: 30px;
  } */
  #deleteSelection {
    margin-left: 5px;
    margin-top: 16px;
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
    margin-right: 250px;
  }

  .el-checkbox + .el-checkbox {
    margin-left: 5px;
  }
</style>
<script>
  const PREFIX = 'http://localhost:8085/rent/';
  export default {
    data() {
      return {
        projectCount: 0,
        show3: false,
        currentPage: 1,
        pagesize: 10,
        tableData: [{
          id: '',
          name: '',
          date: '',
          location: '',
        }],
        orderData:[{
          price:'',
          num:'',
          name:''
        }],
        dialogInfoVisible: false,
        dialogFormVisible: false,
        dialogVisible: false,
        formLabelWidth: '140px',
        orderId: '',
        name: '',
        date: '',
        userId:'',
        price: '',
        sign:0,
        isDisabled: false,
        isIndeterminate: true
      }
    },
    created: function () {
      let that = this;
      let params = new URLSearchParams();
      params.append('page', this.currentPage);
      params.append('size', this.pagesize);
      params.append('sign', this.sign);
      this.$axios.post(PREFIX + '/finance/filter.do?' + params.toString(), {
      }).then((res) => {
        this.tableData = res.data.object.data;
        for (let i = 0 ;i<this.tableData.length;i++){
          that.tableData[i].date =  new Date(that.tableData[i].date).toLocaleDateString();
        }
        this.projectCount = res.data.object.recordSize;
      });
    },
    methods: {
      getFilterProjectInfo1(){
        this.sign = 1;
        this.getFilterProjectInfo();
      },
      getFilterProjectInfo2(){
        this.sign = 2;
        this.getFilterProjectInfo();
      },
      getFilterProjectInfo3(){
        this.sign = 3;
        this.getFilterProjectInfo();
      },
      getFilterProjectInfo() {
        let that =this;
        let params = new URLSearchParams();
        params.append('page', this.currentPage);
        params.append('size', this.pagesize);
        params.append('sign', this.sign);
        this.$axios.post(PREFIX + '/finance/filter.do?' + params.toString()).then((response) => {
          this.tableData = response.data.object.data;
          for (let i = 0 ;i<this.tableData.length;i++){
            that.tableData[i].date =  new Date(that.tableData[i].date).toLocaleDateString();
          }
          this.projectCount = response.data.object.recordSize;
        }).catch((error) => {
          alert(error);
        });
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
        this.getFilterProjectInfo();
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        let params = new URLSearchParams();
        params.append('page', this.currentPage);
        params.append('size', this.pagesize);
        params.append('sign',this.sign);
        this.$axios.post(PREFIX + '/finance/filter.do?' + params.toString(), {
        })
          .then((response) => {
            console.log('展示第' + this.currentPage + '页项目信息成功');
            this.tableData = response.data.object.data;
            this.projectCount = response.data.object.recordSize;
          })
          .catch((error) => {
            alert(error);
          });
      },
    }
  }
</script>
