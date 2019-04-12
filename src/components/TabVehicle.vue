<template>
    <div>
        <h2>And here vehicles</h2>
        <switch-input 
            v-for="(status, vehicle) in vehicles" 
            :label="vehicle" 
            icon="icon-location" 
            :key="vehicle"
            :checked="status"
            @change="checked => changeVehiclePreferences({ vehicle, status: checked })"
        />
        <!-- <switch-input label="Bus" icon="icon-location"/>
        <switch-input label="Plane" icon="icon-location"/>
        <switch-input label="Carpool" icon="icon-location"/> -->

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
        methods: mapActions(['changeVehiclePreferences'])
    }
</script>

<style lang="scss" scoped>

</style>