<template>
    <div>
        <button v-for="tab in tabs" @click="currentTab = tab">{{ tab }}</button>
        <component :is="currentTabComponent"></component>
    </div>
</template>

<script>
    import TabPassenger from '@/components/TabPassenger'
    import TabVehicle from '@/components/TabVehicle'
    export default {
        components: {
            TabPassenger,
            TabVehicle
        },
        props: {
            tabs: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                currentTab: 'Passenger'
            }
        },
        computed: {
            currentTabComponent() {
                return 'Tab' + this.currentTab
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>