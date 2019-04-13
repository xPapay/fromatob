<template>
    <div class="vehicles">
        <switch-input
            class="vehicle" 
            v-for="(status, vehicle) in vehicles" 
            :label="vehicle" 
            :icon="getIcon(vehicle)" 
            :key="vehicle"
            :checked="status"
            @change="checked => changeVehiclePreferences({ vehicle, status: checked })"
        />
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    import SwitchInput from '@/components/SwitchInput'
    export default {
        components: {
            SwitchInput,
        },
        computed: mapState(['vehicles']),
        methods: {
            getIcon(vehicle) {
                return `icon-${vehicle}`
            },
            ...mapActions(['changeVehiclePreferences'])
        }
    }
</script>

<style lang="sass" scoped>
.vehicles
    display: flex
    flex-wrap: wrap
    justify-content: space-between

@media screen and (max-width: 950px)
    .vehicle
        flex-basis: 50%
        flex-grow: 1
</style>