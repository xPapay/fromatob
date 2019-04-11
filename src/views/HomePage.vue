<template>
  <div>
    <header class="header" :style="{backgroundImage: `url(${hero})`}">
      <div class="content">
        <h1 class="header__headline">Train, Bus, Flight, Carpooling</h1>
        <h3>All the best deals and direct booking in one search engine</h3>
      </div>
    </header>
    <section class="section">
      <div class="content">
        <h1>Hello from HomePage</h1>
      </div>
    </section>
  </div>
</template>

<script>
    import hero from 'assets/images/hero.jpg'
    export default {
      name: 'HomePage',
      computed: {
        hero() {
          return hero
        }
      }
    }
</script>

<style scoped lang="sass">
.header
  height: 450px
  background-size: cover
  background-repeat: no-repeat
  background-position: center center

.header__headline
  margin-top: 0
</style>