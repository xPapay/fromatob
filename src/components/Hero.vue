<template>
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
</template>

<script>
import TextInput from '@/components/TextInput'
import DateInput from '@/components/DateInput'
import BaseIcon from '@/components/BaseIcon'
import { mapState, mapActions } from 'vuex'
export default {
    components: {
        TextInput,
        DateInput,
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

<style lang="sass" scoped>
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

</style>