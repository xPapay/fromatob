<template>
  <div>
    <header class="header">
      <div class="content">
        <div class="flex flex--column">
          <h1 class="header__headline">Demo: Train, Bus, Flight, Carpooling</h1>
          <h3 class="header__subheadline">This is just a demo page.</h3>
          <div class="hero flex__hero">
            <hero />
            <route-options/>
          </div><!-- .hero -->
        </div>
      </div>
    </header>
    <section class="section">
      <div class="content">
        <h1>This is just placeholder</h1>
      </div>
    </section>
  </div>
</template>

<script>
    import Hero from '@/components/Hero'
    
    export default {
      name: 'HomePage',
      components: {
        RouteOptions: () => import(/* webpackChunkName: "routeOptions" */ '@/components/RouteOptions'),
        Hero
      }
    }
</script>

<style scoped lang="sass">
.header
  min-height: 450px
  background-color: $primary-color
  padding-bottom: 1rem

.header__headline
  padding-top: 3.75rem
  margin-top: 0
  font-size: 2.75rem
  font-weight: normal

.header__headline,
.header__subheadline
  color: white

.header__subheadline
  margin-bottom: 5rem
  font-weight: bolder

.hero
  background: white
  padding: 1rem
  border-radius: 3px
  border: 1px solid $light-gray

@media screen and (max-width: 450px)
  .flex__hero
    order: -1
    margin-top: 1rem

  .header__headline
    font-size: 2rem
    padding-top: 1rem
    font-weight: bolder

  .header__subheadline
    display: none

@media screen and (min-width: 450px)
  .header
    background: url('../assets/images/hero.jpg') center / cover no-repeat

</style>