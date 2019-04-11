<template>
  <div>
    <the-navigation />
    <router-view />
    <div class="placeholder" style="height: 2000px;"></div>
    <the-footer v-if="loadFooter" />
  </div>
</template>

<script>
  import 'normalize.css'
  import { throttle } from 'lodash'
  // import TheNavigation from '@/components/TheNavigation'
    export default {
        name: 'app',
        components: {
          TheNavigation: () => import(/* webpackChunkName: "navigation" */ '@/components/TheNavigation'),
          TheFooter: () => import(/* webpackChunkName: "footer" */ '@/components/TheFooter')
        },
        data() {
          return {
            loadFooter: false
          }
        },
        mounted() {
          const treshold = document.body.scrollHeight / 2
          const viewportHeight = window.innerHeight
          const throttled = throttle(() => {
            const scrollTop = document.documentElement.scrollTop
            this.loadFooter = scrollTop + viewportHeight >= treshold
            if (this.loadFooter) {
              document.removeEventListener('scroll', throttled)
            }
          }, 800)

          document.addEventListener('scroll', throttled)
        },

    }
</script>

<style lang="sass">
html
  box-sizing: border-box
  font-size: 16px
  font-family: sans-serif

*, *:before, *:after
  box-sizing: border-box

.content
  max-width: 1170px
  margin: 0 auto
</style>