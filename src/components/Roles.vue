<template>
  <div class="roles">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/power' }">权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table
      :data="roleList"
      style="width: 100%">
      <el-table-column
        type="expand">
        <template slot-scope="{row}">
          <span v-if="row.children.length === 0">暂无权限</span>
          <!-- {{row}} -->
          <!-- 显示一级分类 -->
          <el-row v-for="level1 in row.children" :key="level1.id" class="level1">
            <el-col :span="3"><el-tag closable>{{level1.authName}}</el-tag>&nbsp;<i class="el-icon-arrow-right"></i></el-col>
            <el-col :span="21">
              <!-- 显示二级分类 -->
              <el-row v-for="level2 in level1.children" :key="level2.id" class="level2">
                <el-col :span="3"><el-tag closable type="success">{{level2.authName}}</el-tag>&nbsp;<i class="el-icon-arrow-right"></i></el-col>
                <!-- 显示三级分类 -->
                <el-col :span="21" class="level3">
                  <el-tag v-for="level3 in level2.children" :key="level3.id" closable type="warning">{{level3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        label="#"
        type="index">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="描述">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="{row}">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain>分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: []
    }
  },
  methods: {
    async getRoleList() {
      let res = await this.axios.get('/roles')
      let {meta: {status}, data} = res
      if (status === 200) {
        this.roleList = data
        console.log(this.roleList)
      }
    }
  },
  created() {
    this.getRoleList()
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
/* .level2 {
  margin-bottom: 10px;
} */
.level1 {
  margin: 10px 0;
  border-bottom: 1px dotted #ccc;
}
.level3 span{
  margin-right: 5px;
  margin-bottom: 10px;
}
</style>
