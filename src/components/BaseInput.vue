<template>
    <div class="input-box-wrapper">
        <label class="label" for="input">{{ label }}</label>
        <div class="input-box">
            <base-icon class="input-box__icon" :name="icon" />
            <slot/>
        </div>
    </div>
</template>

<script>
    import BaseIcon from '@/components/BaseIcon'
    export default {
        components: {
            BaseIcon
        },
        props: {
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
.label
    display: block
    text-transform: uppercase
    font-size: 0.75rem
    margin-bottom: 0.25rem

.input-box
    position: relative
    width: 100%

.input-box__icon
    position: absolute
    top: 0
    left: 5px
    width: 2rem
    height: 100%
    z-index: 10

::v-deep .input-box__input
    padding-left: 2.25rem
    height: 3rem
    width: 100%
    border: 1px solid $dark-gray
    border-radius: 3px

    &:focus
        border: 1px solid #42829B
        outline: none
</style>