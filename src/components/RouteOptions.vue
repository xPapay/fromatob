<template>
    <div class="tab">
        <div class="tab__heads">
            <div 
                v-for="tab in tabs" 
                class="tab__head" 
                :class="{'tab__head--active': expanded && tab === currentTabComponent}" 
                :key="tab" 
                @click="() => handleClick(tab)"
            >
                <base-icon name="icon-passenger-filled" class="tab__icon" height="2rem" width="2rem" />
                <div class="tab__description">{{ describe(tab) }}</div>
                <button>Change</button>
            </div>
            <div class="tab__head search">
                <button>Search</button>
            </div>
        </div>
        <component class="tab__body" v-show="expanded" :is="currentTabComponent"></component>
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

            describe(tab) {
                if (tab === 'TabPassenger') {
                    const passengerCount = this.passengers.length
                    const passenger = passengerCount < 2 ? 'Passenger' : 'Passengers'
                    const anyBahnCard = this.passengers.some(passenger => passenger.bahnCard != 'None') ? 'with' : 'without'
                    return `${passengerCount} ${passenger}, ${anyBahnCard} Bahncard`
                }
                if (tab === 'TabVehicle') {
                    return Object.values(this.vehicles).every(vehicle => vehicle)
                        ? 'All vehicles'
                        : `Only ${Object.keys(this.vehicles).filter(vehicle => this.vehicles[vehicle]).join(', ')}`
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
.tab__heads
    display: flex
    justify-content: space-between

.tab__head
    flex-basis: 33%
    display: flex
    justify-content: space-between
    align-items: center
    border: 1px solid #333

.tab__head--active,
.tab__body
    background: lightgray

.search
    justify-content: flex-end

</style>