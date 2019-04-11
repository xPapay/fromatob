<template>
    <div>
        <button v-for="tab in tabs" @click="() => handleClick(tab)">{{ getLabel(tab) }}</button>
        <component v-show="expanded" :is="currentTabComponent"></component>
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
                currentTabComponent: 'TabPassenger',
                expanded: false
            }
        },

        methods: {
            getLabel(component) {
                return component.substring(3)
            },
            
            handleClick(clickedTab) {
                this.toggleTabs(clickedTab)
                this.currentTabComponent = clickedTab
            },

            toggleTabs(clickedTab) {
                if (this.currentTabComponent === clickedTab) {
                    return this.expanded = !this.expanded
                }
                this.expanded = true
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