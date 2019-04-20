<template>
  <el-container>
    <el-aside width="400px"></el-aside>
    <el-container>
      <el-container>
        <el-header style="height: 70px">
          <div class="top">
            <div class="top1">
              <div class="main_title1">HOUSE</div>
            </div>
          </div>
        </el-header>

        <el-main>
          <div class="contentB">
            <hr>
            <el-dialog title="订单详情" :visible.sync="dialogFormVisible" :append-to-body='true' top='100px' width="400px" center>
              <el-table
                id='out-table1'
                class="bookData"
                ref="multipleTable"
                :data="orderData"
                tooltip-effect="dark"
                :highlight-current-row="true"
                style="width: 100%"
              >
                <el-table-column
                  prop="location"
                  align="center"
                  label="位置"
                  width="100"
                  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                  prop="roomOwner"
                  align="center"
                  label="联系人"
                  width="100"
                  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="电话"
                  align="center"
                  width="100"
                  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                  prop="others"
                  label="规格"
                  align="center"
                  width="100"
                  :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="月租"
                  align="center"
                  width="100"
                  :show-overflow-tooltip="true">
                </el-table-column>
              </el-table>

              <div slot="footer" class="dialog-footer">
                <el-button @click="buy">支付{{totalPrice}}元</el-button>
              </div>
            </el-dialog>

            <el-table
              id='out-table'
              class="bookData"
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              :highlight-current-row="true"
              style="width: 100%"
            >
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="联系人">
                      <span>{{scope.row.roomOwner}}</span>
                    </el-form-item>
                    <el-form-item label="联系方式">
                      <span>{{ scope.row.phone}}</span>
                    </el-form-item>
                  </el-form>
                  <el-button type="success" round @click="submit(scope.row)">预约</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="url"
                label="图片"
                width="300"
                align="center"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <img :src="scope.row.url" alt="" style="width: 150px;height: 150px">
                </template>
              </el-table-column>
              <el-table-column
                id="location"
                prop="location"
                align="center"
                label="位置"
                width="300"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.location }}</el-tag>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="others"
                align="center"
                label="补充说明"
                width="150"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="price"
                label="月租"
                align="center"
                :show-overflow-tooltip="true">
              </el-table-column>
            </el-table>
          </div>
        </el-main>
        <el-footer>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  .main_title1 {
    font-size: 50px;
    font-weight: 500;
    margin: 0 10px 30px;
    text-align: center;
    color: #1e88c7
  }

  .top1 {
    font-size: 15px;
    line-height: 70px;
    padding-left: 30px;
  }

  .top {
    font-size: 19px;
    line-height: 60px;
    padding-left: 20px;
    background-color: #fafafa;
  }

  .contentB p {
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

  .bookInfo {
    position: relative;
    top: -50px;
  }

  .el-aside {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    background-image: url(/dinner/static/lala.jpg);
    background-repeat: initial;
  }

  .el-checkbox + .el-checkbox {
    margin-left: 5px;
  }
</style>
<script>
  var COMPANYID = window.sessionStorage.getItem('companyId')
  const PREFIX = 'http://localhost:8085/rent/';
  export default {
    name: 'OrderDinner',
    data () {
      return {
        input10: '',
        show3: false,
        dialogFormVisible: false,
        tableData: [
          {
            location: '',
            url: '',
            phone: '',
            others: '',
            name: '',
            price: '',
          }
        ],
      }
    },
    created: function () {
      this.$axios.get(PREFIX + '/cuisine/filter.do', {}).then((response) => {
        this.tableData = response.data.object.data
      })
    },
    methods: {
      submit (val) {
        let that = this
        this.$confirm('确定预约吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '再考虑下',
          type: 'warn',
        }).then(() => {
          let data = val;
          this.$axios.post(PREFIX + '/order/submit.do?phone=' + COMPANYID, data).then((response) => {
            if (response.data.status == 1) {
              this.$message({
                type: 'success',
                message: response.data.message
              })
            } else {
              this.$message({
                type: 'warning',
                message: response.data.message
              })
            }
          })
        })
      }
    }
  }
</script>
