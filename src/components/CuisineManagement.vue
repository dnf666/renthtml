<template>
  <div>
    <router-view/>

    <div class="top">房源管理</div>
    <div class="contentB">
      <el-button split-button type="primary" class="moreMenu" @click="dialogFormVisible = true">
        添加房源
        <el-dialog title="添加房源" :visible.sync="dialogFormVisible" :append-to-body='true' top='100px' width="550px" center>
          <el-form>
            <el-form-item label="位置" :label-width="formLabelWidth">
              <el-input class="increaseInput" placeholder="正确填写位置" v-model="addName"></el-input>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth">
              <el-upload
                class="upload-demo"
                ref="upload"
                action=""
                :on-change="beforeAvatarUpload"
                :on-remove="handleRemove"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="联系人" :label-width="formLabelWidth">
              <el-input class="increaseInput" placeholder="联系人" v-model="addOwner"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" :label-width="formLabelWidth">
              <el-input class="increaseInput" placeholder="正确填写联系方式" v-model="addPhone"></el-input>
            </el-form-item>
            <el-form-item label="补充说明" :label-width="formLabelWidth">
              <el-input class="increaseInput" placeholder="几室几厅几卫" v-model="addOthers"></el-input>
            </el-form-item>
            <el-form-item label="月租" :label-width="formLabelWidth">
              <template>
                <el-input-number v-model="addPrice" :precision="2" :step="0.1" :max="100000"></el-input-number>
              </template>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addDataSave">保存</el-button>
          </div>
        </el-dialog>
      </el-button>
      <el-button
        class="filterDown"
        @click="show3 = !show3"
      >过滤
      </el-button>
      <div style="margin-top: 10px;">
        <el-collapse-transition>
          <div v-show="show3">
            <div class="transition-box">
              <span>位置：<el-input class="filter" v-model="filterName"></el-input></span>
              <el-button class="primary" type="primary" @click="filterCuisine">过滤</el-button>
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <hr>
      <el-table
        v-loading="loading"
        id='out-table'
        class="bookData"
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
                  <router-link :to="{ path:'/CuisineMangement/Editor',query: { bookOriginalInfo: scope.row} }">
                    编辑房源
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span
                    @click="deleteCuisine(scope.row.location)">
                  删除房源
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <!-- 成员信息 -->
        <el-table-column
          prop="url"
          label="图片"
          align="center"
          width="300"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <img  :src="scope.row.url" alt="" style="width: 150px;height: 150px">
          </template>
        </el-table-column>
        <el-table-column
          id="location"
          prop="location"
          label="位置"
          align="center"
          width="300"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">{{ scope.row.location }}</template>
        </el-table-column>
        <el-table-column
          prop="roomOwner"
          label="联系人"
          width="200"
          align="center"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式"
          align="center"
          width="200"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="price"
          label="月租(￥)"
          align="center"
          :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3,5]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="bookCount">
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

  .el-checkbox + .el-checkbox {
    margin-left: 5px;
  }
</style>
<script>
  const PREFIX = 'http://localhost:8085/rent/';
  export default {
    data() {
      return {
        bookCount:0,
        activeNames: ['1'],
        input10: '',
        show3: false,
        currentPage: 1,
        pagesize: 3,
        tableData: [
          {
            location: '',
            url: '',
            price: '',
            phone:'',
            others:'',
            roomOwner:''
          }
        ],
        isDisabled: false,
        dialogFormVisible: false,
        dialogVisible: false,
        formLabelWidth: '140px',
        //显示加载中样式
        loading: false,
        //搜索表单
        searchForm: {
          id: '',
          name: '',
          state: ''
        },
        //多选值
        //删除的弹出框
        deleteVisible: false,
        //编辑界面是否显示
        editFormVisible: false,
        addPrice:'',
        addName: '',
        addPhone:'',
        addOthers:'',
        addOwner:'',
        filterName: '',
        file:'',
        loading:''
      }
    },
    created: function () {
      this.loading = true;
      let params = new URLSearchParams();
      params.append('page', this.currentPage);
      params.append('size', this.pagesize);
      this.$axios.post(PREFIX + 'cuisine/filter.do?' + params.toString(), {
      }).then((res) => {
        this.tableData = res.data.object.data;
        this.bookCount = res.data.object.recordSize;
        this.loading = false;
      }).catch(function (error) {

      })
    },
    methods: {
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        let params = new URLSearchParams();
        params.append('page', this.currentPage);
        params.append('size', this.pagesize);
        this.$axios.post(PREFIX + '/cuisine/filter.do?' + params.toString(), {
        })
          .then((response) => {
            this.tableData = response.data.object.data;
            this.bookCount = response.data.object.recordSize;
          })
          .catch((error) => {
            alert(error);
          });
      },
      addDataSave() {
        this.dialogFormVisible = false;
        let formData = new FormData();
        formData.append("file",this.file);
        formData.append("location",this.addName);
        formData.append("price",this.addPrice);
        formData.append("others",this.addOthers);
        formData.append("phone",this.addPhone);
        formData.append("roomOwner",this.addOwner);
        this.$axios.post(PREFIX + 'cuisine/file.do', formData).then((res) => {
          console.log(res);
          if (res.data.status == 1) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          window.location.reload();
          } else {
            this.$message({
              type: 'warn',
              message: '添加失败!'
            });
          }
        }).catch(function (error) {
          alert(error);
        })
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
        let params = new URLSearchParams();
        params.append('page', this.currentPage);
        params.append('size', this.pagesize);
        this.$axios.post(PREFIX + '/cuisine/filter.do?' + params.toString(), {
        })
          .then((response) => {
            this.tableData = response.data.object.data;
            this.bookCount = response.data.object.recordSize;
          })
          .catch((error) => {
            alert(error);
          });
      },
      handleChange(val) {
        console.log(val)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      beforeAvatarUpload(file) {
        this.file = file.raw;
      },
      deleteCuisine(index) {
          let book = new Object;
          book.location = index;
          this.$axios.post(PREFIX + '/cuisine/delCuisine.do',book).then((response) => {
            if (response.data.status == 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData.forEach((v, i) => {
                  if (v.location === index) {
                    this.tableData.splice(i, 1);
                  }
                });
              }
            }
            })
        },
      filterCuisine() {
        let params = new URLSearchParams();
        params.append('page', this.currentPage);
        params.append('size', this.pagesize);
        let book = new Object;
        if (this.filterName != '') {
          book.location = this.filterName;
        }
        this.$axios.post(PREFIX + 'cuisine/filter.do?'+params.toString(),book)
          .then((response) => {
          this.tableData = response.data.object.data;
          this.bookCount = response.data.object.recordSize;
        })
      }
    }
  }
</script>
