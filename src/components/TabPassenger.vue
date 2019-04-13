<template>
    <div>
        <div class="passengers">
            <div v-for="passenger in passengers" class="passenger">
                <text-input 
                    icon="icon-passenger" 
                    label="Age" 
                    type="number" 
                    class="input-age passenger__age"
                    :value="passenger.age"
                    @input="event => changeAge({ passenger, newAge: event.target.value })"
                />
                <select-input 
                    :options="bahnCardOptions" 
                    label="Bahncard"
                    icon="icon-bahncard"
                    :value="passenger.bahnCard"
                    @input="event => changeBahnCard({ passenger, newBahnCard: event.target.value })"
                />
            </div>
        </div>
        <button @click="addPassenger" class="btn-add-passenger">Add passengers</button>
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

.passengers
    display: flex
    flex-wrap: wrap
    justify-content: space-between

.passenger
    flex-basis: 40%
    flex-grow: 1
    display: flex
    align-items: flex-end
    margin-top: 0.75rem

.passenger__age
    margin-right: 1.5rem

.btn-add-passenger
    display: block
    margin: 1.5rem auto
    padding: 0.5rem 0.75rem
    background: lighten($primary-color, 10%)
    border: 1px solid $dark-gray
    border-radius: 5px
    color: white
    opacity: 0.5
    cursor: pointer
    font-size: 0.8rem
    font-weight: bolder

</style>