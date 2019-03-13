<template>
  <div>
    <div class="editorTop">
      <span>当前位置：</span>
      <el-breadcrumb class="breadcrumbEditor" separator=">">
        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/CostManagement' }">支出管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑支出</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="editorTitle">编辑支出</div>
    <el-tabs v-model="activeName" class="tabsEditor" type="card">
      <el-tab-pane label="基本信息" name="first">
        <el-form>
          <el-form-item label="支出ID*" :label-width="formLabelWidth">
            <el-input class="increaseInput" disabled="disabled" v-model="id" placeholder="编号"></el-input>
          </el-form-item>
          <el-form-item label="说明" :label-width="formLabelWidth">
            <el-input class="increaseInput" v-model="name" placeholder="说明"></el-input>
          </el-form-item>
          <el-form-item label="日期" :label-width="formLabelWidth">
            <el-date-picker
              v-model="date"
              type="date"
              placeholder="日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="费用" :label-width="formLabelWidth">
            <el-input class="increaseInput" v-model="price"></el-input>
          </el-form-item>
        </el-form>
        <div class="sure">
          <el-button @click = "returnMemberMangement">取 消</el-button>
          <el-button type="primary" @click="putEditorMemberInfo">保 存</el-button>
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

  const PREFIX = '/dinner/';
export default {
  data() {
    return {
      activeName: 'first',
      formLabelWidth: '70px',
      id: this.$route.query.memberOriginalInfo.id,
      name: this.$route.query.memberOriginalInfo.name,
      date: this.$route.query.memberOriginalInfo.date,
      price: this.$route.query.memberOriginalInfo.price,
    }
  },
  created: function() {
  },
  methods: {
    //编辑成员信息(success)
    returnMemberMangement(){
      this.$router.push({ name: 'CostManagement'});
    },
    putEditorMemberInfo() {

      let form = {
        id: this.id,
        name: this.name,
        date: this.date,
        price: this.price,
      };
      let obj = JSON.stringify(form);
      //提交请求
      this.$axios.put(PREFIX+'cost/cost.do',{
        id: this.id,
        name: this.name,
        date: this.date,
        price: this.price,
      }).then( (response) => {
        this.$router.push({ name: 'CostManagement', params: { changedInfo:obj } });
      })
      .catch( (error) => {
        console.log(error);
      });
    }
  }
}
</script>
