<template>
  <div>
    <header class="header" :style="{backgroundImage: `url(${hero})`}">
      <div class="content">
        <h1 class="header__headline">Train, Bus, Flight, Carpooling</h1>
        <h3>All the best deals and direct booking in one search engine</h3>
        
        <text-input
          key="start-location" 
          v-model="start" 
          placeholder="City, Station or Airport" 
          label="Start" 
          icon="icon-location"
        />
        <text-input
          key="destination-location" 
          v-model="destination" 
          placeholder="City, Station or Airport" 
          label="Arrival" 
          icon="icon-location"
        />
        
        <date-input
          key="departure-date" 
          placeholder="Depart" 
          label="Depart"
          v-model="departureDate"
        />

        <date-input
          key="return-date" 
          placeholder="Return" 
          label="Return (optional)"
          v-model="departureDate"
        />
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
    import TextInput from '@/components/TextInput'
    import DateInput from '@/components/DateInput'
    
    export default {
      name: 'HomePage',
      components: {
        TextInput,
        DateInput
      },
      data() {
        return {
          start: '',
          destination: '',
          departureDate: ''
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