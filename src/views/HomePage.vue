<template>
  <div>
    <header class="header" :style="{backgroundImage: `url(${hero})`}">
      <div class="content">
        <h1 class="header__headline">Train, Bus, Flight, Carpooling</h1>
        <h3 class="header__subheadline">All the best deals and direct booking in one search engine</h3>
        <div class="hero">
          <div class="flex flex--space-between flex-vertical-middle">
            <text-input
              class="flex__input"
              key="start-location"
              :value="startLocation"
              @input="event => setStartLocation(event.target.value)" 
              placeholder="City, Station or Airport" 
              label="Start" 
              icon="icon-location"
            />
            <base-icon name="icon-invert" class="icon-invert"/>
            <text-input
              class="flex__input"
              key="destination-location"
              :value="destination"
              @input="event => setDestination(event.target.value)" 
              placeholder="City, Station or Airport" 
              label="Arrival" 
              icon="icon-location"
            />
            
            <date-input
              class="flex__input"
              key="departure-date" 
              placeholder="Depart" 
              label="Depart"
              :value="departureDate"
              @input="date => setDepartureDate(date)"
            />

            <date-input
              class="flex__input"
              key="return-date" 
              placeholder="Return" 
              label="Return (optional)"
              :value="returnDate"
              @input="date => setReturnDate(date)"
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
    import BaseIcon from '@/components/BaseIcon'
    import { mapState, mapActions } from 'vuex'
    
    export default {
      name: 'HomePage',
      components: {
        TextInput,
        DateInput,
        RouteOptions,
        BaseIcon
      },
      methods: mapActions(['setStartLocation', 'setDestination', 'setDepartureDate', 'setReturnDate']),
      computed: {
        hero() {
          return hero
        },
        ...mapState(['startLocation', 'destination', 'departureDate', 'returnDate'])
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

.icon-invert
  margin-top: 1rem
  transform: rotateZ(90deg)
  opacity: 0.6
  cursor: pointer

  &:hover
    opacity: 1

.flex
  display: flex

.flex--space-between
  justify-content: space-between

.flex__input
  margin-left: 0.5rem
  margin-right: 0.5rem

.flex-vertical-middle
  align-items: center
</style>