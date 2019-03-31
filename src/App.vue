<template>
  <div class="content" ref="container">
    <the-navigation />
    <router-view />
    <div class="placeholder" style="height: 2000px;"></div>
    <the-footer v-if="loadFooter" />
  </div>
</template>

<script>
  import { throttle } from 'lodash'
  import TheNavigation from '@/components/TheNavigation'
    export default {
        name: 'app',
        components: {
          TheNavigation,
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

<style scoped lang="sass">
.content
  max-width: 1170px
  margin: 0 auto
</style>