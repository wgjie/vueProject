<template>
  <div class="powers">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/power' }">权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="powerList">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="权限名称" prop="authName"></el-table-column>
      <el-table-column label="路径" prop="path"></el-table-column>
      <el-table-column label="层级" prop="level">
        <template slot-scope="scope">
          <span v-if="+scope.row.level === 0">一级</span>
          <span v-else-if="+scope.row.level === 1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      powerList: []
    }
  },
  methods: {
    async getPowerList() {
      let res = await this.axios.get('/rights/list')
      let {meta: {status}, data} = res
      if (status === 200) {
        this.powerList = data
      }
    }
  },
  created() {
    this.getPowerList()
  }
}
</script>

<style>
.el-breadcrumb {
  height: 50px;
  padding-left: 10px;
  background-color: #eee;
  line-height: 50px;
}
</style>
