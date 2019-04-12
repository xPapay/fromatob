<template>
    <div>
        <h1>Here comes passenger options</h1>
        <template v-for="passenger in passengers">
            <text-input 
                icon="icon-passenger-filled" 
                label="Age" 
                type="number" 
                class="input-age"
                :value="passenger.age"
                @input="event => changeAge({ passenger, newAge: event.target.value })"
            />
            <select-input 
                :options="bahnCardOptions" 
                icon="icon-passenger-filled"
                :value="passenger.bahnCard"
                @input="event => changeBahnCard({ passenger, newBahnCard: event.target.value })"
            />
        </template>
        <button @click="addPassenger">Add Passengers</button>
    </div>
</template>

<script>
    import TextInput from '@/components/TextInput'
    import SelectInput from '@/components/SelectInput'
    import { mapState, mapActions } from 'vuex'
    
    export default {
        components: {
            TextInput,
            SelectInput
        },
        methods: mapActions(['changeAge', 'changeBahnCard', 'addPassenger']),
        computed: mapState(['passengers', 'bahnCardOptions'])
    }
</script>

<style lang="sass" scoped>
.input-age
    max-width: 80px

::v-deep .input-box__input
    height: 2rem

::v-deep .input-box__icon
    width: 1.5rem

</style>