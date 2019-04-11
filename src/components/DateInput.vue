<template>
    <base-input
          :label="label" 
          :icon="icon"
    >
        <datepicker 
            v-bind="$attrs" 
            :bootstrap-styling="true" 
            wrapper-class="full-width" 
            input-class="input-box__input"
            :value="value"
            @input="$emit('input', $event)"
        />
    </base-input>
</template>

<script>
    import BaseInput from '@/components/BaseInput'
    import Datepicker from 'vuejs-datepicker'
    export default {
        inheritAttrs: false,
        components: {
            BaseInput,
            Datepicker
        },
        props: {
            label: {
                type: String,
                required: false
            },
            icon: {
                type: String,
                default: 'icon-calendar-going'
            },
            value: {
                type: [String, Date],
                required: false
            }
        }
    }
</script>

<style lang="sass">
.input-group, .full-width
    width: 100%
    height: 100%

</style>