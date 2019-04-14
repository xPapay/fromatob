<template>
  <div>
    <header class="header">
      <div class="content">
        <div class="flex flex--column">
          <h1 class="header__headline">Train, Bus, Flight, Carpooling</h1>
          <h3 class="header__subheadline">All the best deals and direct booking in one search engine</h3>
          <div class="hero flex__hero">
            <div class="flex flex--wrap flex--space-between flex--vertical-middle">
              <text-input
                class="flex__input flex__start-location"
                key="start-location"
                :value="startLocation"
                @input="event => setStartLocation(event.target.value)" 
                placeholder="City, Station or Airport" 
                label="Start" 
                icon="icon-location"
              />
              <div @click="swapDestinations" class="icon-invert">
                <base-icon name="icon-invert"/>
              </div>
              <div class="flex__input flex__destination">
                <text-input
                  key="destination-location"
                  :value="destination"
                  @input="event => setDestination(event.target.value)" 
                  placeholder="City, Station or Airport" 
                  label="Arrival" 
                  icon="icon-location"
                />
                <div @click="swapDestinations" class="icon-invert icon-invert--inlined">
                  <base-icon name="icon-invert"/>
                </div>
              </div>
              <div class="flex flex--space-between flex--vertical-middle flex__dates">
                <date-input
                  class="flex__input"
                  key="departure-date" 
                  placeholder="Depart" 
                  label="Depart"
                  :value="departureDate"
                  :disabled-dates="disabledDepartureDates"
                  @input="date => setDepartureDate(date)"
                />

                <date-input
                  class="flex__input"
                  key="return-date" 
                  placeholder="Return" 
                  label="Return (optional)"
                  :value="returnDate"
                  :disabled-dates="disabledReturnDates"
                  @input="date => setReturnDate(date)"
                  icon="icon-calendar-return"
                />
              </div>
            </div>
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
      methods: mapActions([
        'setStartLocation', 
        'setDestination', 
        'setDepartureDate', 
        'setReturnDate',
        'swapDestinations'
      ]),
      computed: {
        hero() {
          return hero
        },
        yesterday() {
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() -1)
          return yesterday
        },
        disabledDepartureDates() {
          if (this.returnDate) {
            return { to: this.returnDate }
          }
          return { to: this.yesterday }
        },
        disabledReturnDates() {
          if (this.departureDate) {
            return { to: this.departureDate }
          }
          return { to: this.yesterday }
        },
        ...mapState(['startLocation', 'destination', 'departureDate', 'returnDate'])
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

.icon-invert
  margin-top: 1rem
  transform: rotateZ(90deg)
  opacity: 0.6
  cursor: pointer

  &:hover
    opacity: 1

.icon-invert--inlined
  position: absolute
  right: 1rem
  top: 50%
  transform: translateY(-10%)
  margin-top: 0
  display: none

.flex
  display: flex

.flex--wrap
  flex-wrap: wrap

.flex--space-between
  justify-content: space-between

.flex--vertical-middle
  align-items: center

.flex--column
  flex-direction: column

.flex__input
  margin-left: 0.5rem
  margin-right: 0.5rem
  flex-grow: 1
  flex-basis: 100%
  position: relative

.flex__start-location,
.flex__destination
  flex-basis: 30%,

.flex__dates
  flex-basis: 33%

@media screen and (max-width: 950px)
  .flex__dates,
  .flex__start-location,
  .flex__destination
    flex-basis: 100%
    margin-bottom: 1.25rem

  .icon-invert
    display: none
  
  .icon-invert--inlined
    display: block

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