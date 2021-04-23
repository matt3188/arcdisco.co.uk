import DefaultLayout from '~/layouts/Default.vue'

//global stylesheet
import '~/assets/style/styles.scss'

export default function (Vue, { head }) {
  Vue.component('Layout', DefaultLayout)
}
