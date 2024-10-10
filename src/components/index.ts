import SvgIcon from './svg.vue'
const allgloablComponent = { SvgIcon: SvgIcon }
export default {
  install(app: any) {
    Object.keys(allgloablComponent).forEach((key) => {
      app.component(key, allgloablComponent[key])
    })
  },
}
