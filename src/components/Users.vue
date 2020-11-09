<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/users' }">用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
     <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <!-- 添加用户按钮 -->
    <el-button type="success" @click="addDialogVisible = true" plain>添加用户</el-button>
    <!-- 表格 -->
    <el-table
      :data="userInfo"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            @change="changeUserState(scope.row)"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="showEditDialog(scope.row)" icon="el-icon-edit" size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="delUser(scope.row.id)" size="mini" plain></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain>分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 3, 4, 6]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加用户的弹窗 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px" status-icon>
        <el-form-item prop="username" label="用户名">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile" @keyup.enter.native="handleAddUser"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddUser">确认添加</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的表单 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px" status-icon>
        <el-form-item prop="username" label="用户名">
          <el-tag type="info">{{editForm.username}}</el-tag>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile" @keyup.enter.native="handleEditUser"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditUser">确认修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: [],
      query: '',
      currentPage: 1,
      pageSize: 2,
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'change'},
          {min: 3, max: 6, message: '用户名在3~6位', trigger: 'change'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'change'},
          {min: 6, max: 12, message: '密码在6~12位', trigger: 'change'}
        ],
        email: [
          {type: 'email', message: '邮箱不合法', trigger: 'blur'}
        ],
        mobile: [
          {pattern: /^1[3456789]\d{9}$/, message: '手机号不合法', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      let res = await this.axios({
        url: 'users',
        method: 'get',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }
      })
      if (res.meta.status === 200) {
        this.userInfo = res.data.users
        this.total = res.data.total
      }
    },
    // 改变每页的条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getUserList()
    },
    // 改变了当前页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUserList()
    },
    // 删除用户
    async delUser(id) {
      try {
        await this.$confirm('你确定要删除吗？', '温馨提示', {
          type: 'warning'
        })
        let res = await this.axios({
          url: `users/${id}`,
          method: 'delete'
        })
        if (res.meta.status === 200) {
          if (this.userInfo.length <= 1 && this.currentPage > 1) {
            this.currentPage--
          }
          this.getUserList()
          this.$message.success('删除成功')
        }
      } catch (e) {
        this.$message.info('取消删除了')
      }
    },
    // 搜索按钮
    search() {
      this.currentPage = 1
      this.getUserList()
    },
    // 状态修改
    async changeUserState(user) {
      let res = await this.axios({
        method: 'put',
        url: `users/${user.id}/state/${user.mg_state}`
      })
      if (res.meta.status === 200) {
        this.$message.success('修改成功')
      } else {
        this.$message.error('修改失败')
      }
    },
    // 处理添加
    handleAddUser() {
      this.$refs.addForm.validate(async valid => {
        if (!valid) return false
        // 发送请求
        let res = await this.axios({
          method: 'post',
          url: 'users',
          data: this.addForm
        })
        if (res.meta.status === 201) {
          // 重置样式
          this.$refs.addForm.resetFields()
          // 关闭模态框
          this.addDialogVisible = false
          this.$message.success('添加成功')
          // 重新渲染
          this.currentPage = Math.ceil((this.total + 1) / this.pageSize)
          this.getUserList()
        } else {
          this.$message.error(res.meta.msg)
        }
      })
    },
    // 显示修改对话框
    showEditDialog(user) {
      this.editDialogVisible = true
      this.editForm.username = user.username
      this.editForm.password = user.password
      this.editForm.email = user.email
      this.editForm.mobile = user.mobile
      this.editForm.id = user.id
    },
    // 处理修改
    handleEditUser() {
      this.$refs.editForm.validate(async valid => {
        if (!valid) return false
        let res = await this.axios({
          method: 'put',
          data: this.editForm,
          url: `users/${this.editForm.id}`
        })
        if (res.meta.status === 200) {
          this.$refs.editForm.resetFields()
          this.editDialogVisible = false
          this.$message.success('修改成功')
          this.getUserList()
        } else {
          this.$message.error('服务器异常')
        }
      })
    }
  },
  created() {
    this.getUserList()
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
.input-with-select {
  width: 300px;
}
.el-dialog {
  width: 460px;
}
.el-input {
  width: 300px;
}
.el-form {
  width: 400px;
  background-color: #fff;
  position: relative;
}
</style>
