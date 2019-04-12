<template>
    <base-input
          :label="label" 
          :icon="icon"
    >
        <select class="input-box__input" :value="value" @change="$emit('input', $event)">
            <option v-for="option in options" :key="option" v-text="option" selected="option === value"></option>
        </select>
    </base-input>
</template>

<script>
    import BaseInput from '@/components/BaseInput'
    export default {
        components: {
            BaseInput
        },
        props: {
            options: {
                type: Array,
                required: true
            },
            label: {
                type: String,
                required: false
            },
            icon: {
                type: String,
                required: false
            },
            value: {
                type: [String],
                required: false
            }
        }
    }
</script>

<style lang="sass" scoped>
.input-box__input
    background: white

</style>