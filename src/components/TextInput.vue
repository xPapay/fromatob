<template>
    <base-input
          :label="label" 
          :icon="icon"
    >
          <input
            class="input-box__input" 
            id="input" 
            v-bind="$attrs"
            @input="$emit('input', $event)"
            :value="value"
          >
    </base-input>
</template>

<script>
    import BaseInput from '@/components/BaseInput'
    export default {
        inheritAttrs: false,
        components: {
            BaseInput
        },
        props: {
            label: {
                type: String,
                required: false
            },
            icon: {
                type: String,
                required: false
            },
            value: {
                type: [String, Number],
                required: false
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>