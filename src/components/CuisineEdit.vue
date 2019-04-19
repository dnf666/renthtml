<template>
  <div>
    <div class="editorTop">
      <span>当前位置：</span>
      <el-breadcrumb class="breadcrumbEditor" separator=">">
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/CuisineMangement' }">房源管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑房源</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="editorTitle">编辑房源</div>
    <el-tabs v-model="activeName" class="tabsEditor" type="card">
      <el-tab-pane label="基本信息" name="first">
        <el-form>
          <el-form-item label="位置*" :label-width="formLabelWidth">
            <el-input class="increaseInput" disabled="disabled" v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="联系人" :label-width="formLabelWidth">
            <el-input class="increaseInput" v-model="roomOwner"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input class="increaseInput" v-model="phone"></el-input>
          </el-form-item>
          <el-form-item label="补充说明" :label-width="formLabelWidth">
            <el-input class="increaseInput" v-model="others"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input-number v-model="price" :precision="2" :step="0.1" :max="100000"></el-input-number>
          </el-form-item>
          <el-form-item label="图片" :label-width="formLabelWidth">
            <img :src="url" class="avatar logo">
            <el-upload
              class="upload-demo"
              ref="upload"
              action=""
              :on-change="onChange"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div class="sure">
          <el-button type="primary" @click="returnManage">取 消</el-button>
          <el-button type="primary" @click="putEditorCuisineInfo">保 存</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style>
  .editorTop{
    margin: 20px 20px;
  }
  .breadcrumbEditor{
    display: inline-block;
  }
  #editorTitle{
    margin: 20px 20px;
  }
  .tabsEditor{
    margin: 20px 20px;
  }
  .increaseInput{
    width:260px;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .sure{
    margin-left: 90px;
    margin-top: 20px;
  }
</style>
<script>
  const PREFIX = 'http://localhost:8085/rent/';
export default {
   data() {
      return {
        name: this.$route.query.bookOriginalInfo.location,
        others: this.$route.query.bookOriginalInfo.others,
        phone: this.$route.query.bookOriginalInfo.phone,
        roomOwner: this.$route.query.bookOriginalInfo.roomOwner,
        url: this.$route.query.bookOriginalInfo.url,
        price: this.$route.query.bookOriginalInfo.price,
        activeName: 'first',
        formLabelWidth: '70px',
      }
    },
  created(){
  },

  methods: {
    returnManage(){
      this.$router.push({ name: 'CuisineManagement'});
    },
    onChange(file){
      this.file = file.raw;
      ;
    },
    putEditorCuisineInfo(){
      let formData = new FormData();
      formData.append("file",this.file);
      formData.append("location",this.name);
      formData.append("price",this.price);
      formData.append("roomOwner",this.roomOwner);
      formData.append("phone",this.phone);
      formData.append("others",this.others);

      this.$axios.post(PREFIX+"cuisine/updateCuisine.do",formData).then((response)=>{
        this.$message({
          type: 'info',
          message:response.data.message
        });
        this.$router.push({ name: 'CuisineManagement'});
      });
      }
  }
}
</script>
