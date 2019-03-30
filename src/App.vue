<template>
  <div ref="container">
    <the-navigation />
    <router-view />
    <div class="placeholder" style="height: 2000px;"></div>
  </div>
</template>

<script>
  import { throttle } from 'lodash'
  import Vue from 'vue'
  import TheNavigation from '@/components/TheNavigation'
    export default {
        name: 'app',
        components: {
          TheNavigation,
        },
        mounted() {
          const treshold = document.body.scrollHeight / 2
          const viewportHeight = window.innerHeight
          const throttled = throttle(() => {
            const scrollTop = document.documentElement.scrollTop
            const shouldLoad = scrollTop + viewportHeight >= treshold
            if (shouldLoad) {
              document.removeEventListener('scroll', throttled)
              console.log('loading...')
              import(/* webpackChunkName: "footer" */ '@/components/TheFooter')
              .then(({ default: footer }) => {
                const FooterClass = Vue.extend(footer)
                const FooterComponent = new FooterClass()
                FooterComponent.$mount()
                this.$refs.container.appendChild(FooterComponent.$el)
              })
            }
          }, 800)

          document.addEventListener('scroll', throttled)
        }
    }
</script>

<style scoped>

</style>