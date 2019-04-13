<template>
  <div>
    <the-navigation />
    <router-view />
    <div class="placeholder" style="height: 800px;"></div>
    <the-footer v-if="loadFooter" />
  </div>
</template>

<script>
  import 'normalize.css'
  import { throttle } from 'lodash'
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
  color: #333

*, *:before, *:after
  box-sizing: border-box

.content
  max-width: 1170px
  margin: 0 auto
  padding: 0 1rem

.cta-button
  background: $secondary-color
  border: none
  border-radius: 5px
  color: white
  padding: 0.75rem 2rem
  text-transform: uppercase
  cursor: pointer

  &:hover
    background: $secondary-darker-color

@media screen and (max-width: 450px)
  html
    font-size: 14px
  
</style>