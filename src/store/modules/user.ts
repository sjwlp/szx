import { defineStore } from 'pinia'
import { reqLogin } from '../../api/use'
import { loginFormData } from '../../api/use/type'
import axios from 'axios'
const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: '',
    }
  },
  actions: {
    async userLogin(data: loginFormData) {
      const result = await reqLogin(data)
      if (result.code == 200) {
        this.token = this.token
        localStorage.setItem('TOKEN', result.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})
export default useUserStore
