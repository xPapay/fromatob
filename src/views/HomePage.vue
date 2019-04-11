<template>
  <div>
    <header class="header" :style="{backgroundImage: `url(${hero})`}">
      <div class="content">
        <h1 class="header__headline">Train, Bus, Flight, Carpooling</h1>
        <h3>All the best deals and direct booking in one search engine</h3>
        <base-input
          key="start-location" 
          label="Start" 
          placeholder="City, Station or Airport" 
          icon="location"
          v-model="start"
        />
        <base-input
          key="destination-location" 
          label="Arrival" 
          placeholder="City, Station or Airport" 
          icon="location"
          v-model="destination"
        />
        <datepicker key="departure-date" placeholder="Depart"/>
        <datepicker key="return-date" placeholder="Return"/>
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
    import BaseInput from '@/components/BaseInput'
    import Datepicker from 'vuejs-datepicker'
    export default {
      name: 'HomePage',
      components: {
        BaseInput,
        Datepicker
      },
      data() {
        return {
          start: '',
          destination: ''
        }
      },
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