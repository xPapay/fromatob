<template>
    <div class="input-box-wrapper">
        <label class="label" for="input">{{ label }}</label>
        <div class="input-box">
            <base-icon class="input-box__icon" name="icon-location" height="2rem" width="2rem"/>
            <input
                class="input-box__input" 
                type="text" 
                id="input" 
                v-bind="$attrs" 
                @input="$emit('input', $event.target.value)"
                :value="value"
            >
        </div>
    </div>
</template>

<script>
    import BaseIcon from '@/components/BaseIcon'
    export default {
        inheritAttrs: false,
        components: {
            BaseIcon
        },
        props: {
            value: {
                type: String,
                required: false
            },
            label: {
                type: String,
                required: false
            },
            icon: {
                type: String,
                required: false
            }
        }
    }
</script>

<style lang="sass" scoped>
.input-box-wrapper
    max-width: 320px

.label
    display: block
    text-transform: uppercase
    font-size: 0.75rem
    margin-bottom: 0.5rem

.input-box
    position: relative
    height: 3rem
    width: 100%

.input-box__icon
    position: absolute
    top: 0
    left: 5px
    width: 2rem
    height: 100%

.input-box__input
    padding-left: 2.25rem
    height: 100%
    width: 100%

    &:focus
        font-weight: bolder
        border: 1px solid #42829B
        outline: none
</style>