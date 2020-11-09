<template>
  <el-container class="home">
    <el-header>
      <div class="logo"></div>
      <div class="title">
        <h1>电商后台管理系统</h1>
      </div>
      <div class="logout">
        <span>来了，老弟</span>
        <a href="javascript:;" @click="logout">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!--
          el-menu：整个导航菜单
          default-active：默认激活的菜单 - 有不同的颜色
          open和close函数是打印对应的索引的
          background-color：整个导航菜单的背景色
          text-color：文字的颜色
          active-text-color：激活菜单的文字颜色
            el-submenu：子菜单
              template：指定了子菜单的图标和文本
              el-menu-item-group：菜单项分组
                el-menu-item：菜单项
          unique-opened：是否只打开一个菜单
          router：是否开启路由模式
        -->
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users" >
              <i class="el-icon-document"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles" >
              <i class="el-icon-document"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="/powers">
              <i class="el-icon-document"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        this.$router.push('/login')
      } catch (e) {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      }
    }
  }
}
</script>

<style scoped>
.home {
  height: 100%;
}
.el-header {
  background-color: #fff;
  display: flex;
}
.logo,
.logout {
  width: 180px;
}
.logo {
  /* ~@ 表示在css中使用定义好的@。通常在css中是不能使用定义好的@变量的，所以需要在前面加~ */
  background-image: url("~@/assets/logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
.title {
  flex: 1;
}
.title h1 {
  text-align: center;
  line-height: 60px;
  color: #0f0;
  font-size: 30px;
}
.logout {
  text-align: right;
  line-height: 60px;
  font-weight: 700;
}
.logout a {
  color: orange;
}
.el-aside {
  background-color: #545c64;
}
.el-submenu {
  width: 200px;
}
.el-main {
  background-color: #eaeef1;
}
</style>
