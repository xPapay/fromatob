<template>
  <div>
    <the-navigation />
    <router-view />
  </div>
</template>

<script>
  import TheNavigation from '@/components/TheNavigation'
    export default {
        components: {
          TheNavigation,
        }
    }
</script>

<style scoped>

</style>