<template>
    <div class="tabs">
        <div class="tab-bookmarks">
            <div 
                v-for="tab in tabs" 
                class="tab-bookmark" 
                :class="{'tab-bookmark--active': expanded && tab === currentTabComponent}" 
                :key="tab" 
                @click="() => handleClick(tab)"
            >
                <base-icon :name="getTabIcon(tab)" class="tab-bookmark__icon" height="2rem" width="2rem" />
                <div class="tab-bookmark__description">{{ describeTab(tab) }}</div>
                <button class="tab-bookmark__button">Change</button>
            </div>
            <div class="tab-bookmark tab-bookmark--cta">
                <button class="cta-button tab-bookmark__cta-button">Search</button>
            </div>
        </div>
        <component class="tab-body" v-show="expanded" :is="currentTabComponent"></component>
        <button class="cta-button tabs__cta-button">Search</button>
    </div>
</template>

<script>
    import BaseIcon from '@/components/BaseIcon'
    import { mapState } from 'vuex'
    export default {
        components: {
            TabPassenger: () => import(/* webpackChunkName: "passengerTab", webpackPrefetch: true */ '@/components/TabPassenger'),
            TabVehicle: () => import(/* webpackChunkName: "vehicleTab", webpackPrefetch: true */ '@/components/TabVehicle'),
            BaseIcon
        },

        data() {
            return {
                currentTabComponent: 'TabPassenger',
                expanded: false
            }
        },

        methods: {
            handleClick(clickedTab) {
                this.toggleTabs(clickedTab)
                this.currentTabComponent = clickedTab
            },

            toggleTabs(clickedTab) {
                if (this.currentTabComponent === clickedTab) {
                    return this.expanded = !this.expanded
                }
                this.expanded = true
            },

            getTabIcon(tab) {
                return tab === 'TabPassenger' ? 'icon-passenger-filled' : 'icon-vehicles'
            },

            describeTab(tab) {
                if (tab === 'TabPassenger') {
                    const passengerCount = this.passengers.length
                    const passenger = passengerCount < 2 ? 'Passenger' : 'Passengers'
                    const anyBahnCard = this.passengers.some(passenger => passenger.bahnCard != 'None') ? 'with' : 'without'
                    return `${passengerCount} ${passenger}, ${anyBahnCard} Bahncard`
                }
                if (tab === 'TabVehicle') {
                    if (Object.values(this.vehicles).every(vehicle => vehicle)) {
                        return 'All vehicles'
                    }

                    const selectedVehicles = Object.keys(this.vehicles).filter(vehicle => this.vehicles[vehicle])

                    if (selectedVehicles.length === 0) {
                        return 'No vehicles'
                    }

                    return `Only ${selectedVehicles.join(', ')}`
                }
                return ''
            }
        },

        computed: {
            tabs() {
                return Object.keys(this.$options.components).filter(component => component.match(/^Tab/))
            },
            ...mapState(['passengers', 'vehicles'])
        }
    }
</script>

<style lang="sass" scoped>
.tab-bookmarks
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    margin-top: 1rem

.tab-bookmarks,
.tab-body
    margin-left: calc(-1rem - 1px)
    margin-right: calc(-1rem - 1px)

.tab-body
    padding: 2rem 1rem

.tab-bookmark
    flex-basis: 33%
    flex: 1
    display: flex
    justify-content: space-between
    align-items: center
    border-right: 1px solid $medium-gray
    border-top: 1px solid $medium-gray
    border-bottom: 1px solid $medium-gray
    padding: 1rem

    &:not(.tab-bookmark--cta)
        cursor: pointer

    &:not(.tab-bookmark--cta):not(.tab-bookmark--active):hover
        background: darken(white, 2%)

.tab-bookmark__icon
    flex-shrink: 0
        
.tab-bookmark__description
    margin-right: auto
    margin-left: 0.5rem
    font-weight: bolder
    font-size: 0.8rem

.tab-bookmark__button
    background: none
    border: 1px solid $dark-gray
    border-radius: 5px
    padding: 0.5rem
    text-transform: uppercase
    color: $dark-gray
    font-size: 0.8rem
    font-weight: lighter
    cursor: pointer

.tab-bookmark__cta-button
    margin-left: auto

.tabs__cta-button
    width: 100%
    margin-top: 1rem
    display: none

.tab-bookmark--active,
.tab-body
    background: $light-gray

.search
    justify-content: flex-end

@media screen and (max-width: 950px)
    .tab-bookmark--cta
        display: none
    
    .tabs__cta-button
        display: block

@media screen and (max-width: 750px)
    .tab-bookmark
        flex-basis: 100%

</style>