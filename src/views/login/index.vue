<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :ref="login_form"
          :rules="rules"
        >
          <h1>Hello</h1>
          <h2>欢迎来到智菜</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password="true"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              size="default"
              class="login_button"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { User, Lock, Loading } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '../../store/modules/user'
import router from '../../router'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
let loading = ref(false)
let useUserStore1 = useUserStore()
let $router = useRouter()
let loginForm = reactive({
  username: 'admin',
  password: '111111',
})
let login_form = ref()
const validatorUserName = (rule, value, callback) => {
  //rule:即为校验规则对象
  //value:即为表单元素文本内容
  //函数:如果符合条件callBack放行通过即为
  //如果不符合条件callBack方法,注入错误提示信息
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error('账号长度至少五位'));
  }
}

const validatorPassword = (rule, value, callback) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error('密码长度至少六位'));
  }
}

const rules = {
  //规则对象属性:
  //required,代表这个字段务必要校验的
  //min:文本长度至少多少位
  //max:文本长度最多多少位
  //message:错误的提示信息
  //trigger:触发校验表单的时机 change->文本发生变化触发校验,blur:失去焦点的时候触发校验规则
  username: [
    // { required: true, min: 6, max: 10, message: '账号长度至少六位', trigger: 'change' }
    { trigger: 'change', validator: validatorUserName },
  ],
  password: [
    // { required: true, min: 6, max: 15, message: '密码长度至少6位', trigger: 'change' }
    { trigger: 'change', validator: validatorPassword },
  ],
}
let hour = new Date().getHours()
function h(hour) {
  if (hour < 8) return '上午好'
  if (hour < 14) return '中午好'
  if (hour < 24) {
    return '晚上好'
  }
}
const login = async () => {
  loading.value = true
 // await loginForms.value.validate();
  try {
    await useUserStore1.userLogin(loginForm)
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: 'Hi ' + h(hour),
    })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: error.message,
    })
  }
  loading.value = false
}
</script>

<style scoped lang="scss" >
.login_container {
  width: 100%;
  height: 100vh;
  background: url(src/assets/images/background.jpg) no-repeat;
  background-size: cover;
}
.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url(src/assets/images/login_form.png) no-repeat;
  padding: 40px;
  h1 {
    color: white;
    font-size: 40px;
  }
  h2 {
    color: white;
    font-size: 40px;
    margin: 20px 0;
  }

  .login_button {
    width: 100%;
  }
}
</style>