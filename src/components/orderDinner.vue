<template>
<el-container>
  <el-header>
    <div class="top">
    <div class="top1"></div>
    </div>
  </el-header>
  <el-main>
    <router-view />
    <div class="top"></div>
    <div class="top1"></div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </el-main>
  <el-footer>Footer</el-footer>
</el-container>
</template>
<style>
  .top {
    font-size: 19px;
    line-height: 180px;
    padding-left: 20px;
    background-color: #fafafa;
  }
  .top1 {
    font-size: 15px;
    line-height: 70px;
    padding-left: 30px;
  }
</style>
