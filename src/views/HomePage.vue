<template>
  <div>
    <header class="header" :style="{backgroundImage: `url(${hero})`}">
      <div class="content">
        <h1 class="header__headline">Train, Bus, Flight, Carpooling</h1>
        <h3 class="header__subheadline">All the best deals and direct booking in one search engine</h3>
        <div class="hero">
          <div class="flex flex--space-between">
            <text-input
              class="flex__input"
              key="start-location" 
              v-model="start" 
              placeholder="City, Station or Airport" 
              label="Start" 
              icon="icon-location"
            />
            <text-input
              class="flex__input"
              key="destination-location" 
              v-model="destination" 
              placeholder="City, Station or Airport" 
              label="Arrival" 
              icon="icon-location"
            />
            
            <date-input
              class="flex__input"
              key="departure-date" 
              placeholder="Depart" 
              label="Depart"
              v-model="departureDate"
            />

            <date-input
              class="flex__input"
              key="return-date" 
              placeholder="Return" 
              label="Return (optional)"
              v-model="returnDate"
              icon="icon-calendar-return"
            />
          </div>
          <route-options/>
        </div>
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
    import RouteOptions from '@/components/RouteOptions'
    
    export default {
      name: 'HomePage',
      components: {
        TextInput,
        DateInput,
        RouteOptions
      },
      data() {
        return {
          start: '',
          destination: '',
          departureDate: '',
          returnDate: ''
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
  min-height: 450px
  background-size: cover
  background-repeat: no-repeat
  background-position: center center
  padding-bottom: 1rem

.header__headline
  margin-top: 0

.header__headline,
.header__subheadline
  color: white

.hero
  background: white
  padding: 1rem
  border-radius: 3px
  border: 1px solid $light-gray
  overflow-x: hidden

.flex
  display: flex

.flex--space-between
  justify-content: space-between

.flex__input
  margin-left: 0.5rem
  margin-right: 0.5rem
</style>