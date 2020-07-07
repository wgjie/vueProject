<template>
  <div class="users">
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
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain>分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      userInfo: [],
      query: '',
      currentPage: 1,
      pageSize: 2
    }
  },
  created() {
    axios({
      url: 'http://localhost:8888/api/private/v1/users',
      method: 'get',
      params: {
        query: this.query,
        pagenum: this.currentPage,
        pagesize: this.pageSize
      },
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(res => {
      if (res.data.meta.status === 200) {
        this.userInfo = res.data.data.users
      }
    })
  }
}
</script>

<style>

</style>
