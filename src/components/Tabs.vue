<template>
    <div>
        <button v-for="tab in tabs" @click="currentTabComponent = tab">{{ getLabel(tab) }}</button>
        <component :is="currentTabComponent"></component>
    </div>
</template>

<script>
    export default {
        components: {
            TabPassenger: () => import(/* webpackChunkName: "passengerTab", webpackPrefetch: true */ '@/components/TabPassenger'),
            TabVehicle: () => import(/* webpackChunkName: "vehicleTab", webpackPrefetch: true */ '@/components/TabVehicle')
        },

        data() {
            return {
                currentTabComponent: 'TabPassenger'
            }
        },

        methods: {
            getLabel(component) {
                return component.substring(3)
            }
        },

        computed: {
            tabs() {
                return Object.keys(this.$options.components)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>