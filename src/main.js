import DefaultLayout from '~/layouts/Default.vue'

//global stylesheet
import '~/assets/style/styles.scss'

export default function (Vue, { head }) {
  Vue.component('Layout', DefaultLayout)
  head.link.push({
    rel: 'stylesheet',
    href: encodeURI('https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Open+Sans:wght@300&display=swap')
  })
}
