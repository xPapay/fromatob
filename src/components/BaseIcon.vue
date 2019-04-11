<template>
    <svg class="icon" :width="width" :height="height">
        <use :xlink:href="`${sprite}#${name}`"/>
    </svg>
</template>

<script>
    import sprite from 'assets/images/sprite.svg'
    export default {
        props: {
            name: {
                type: String,
                required: true
            },
            width: {
                type: [Number, String],
                default: '24'
            },
            height: {
                type: [Number, String],
                default: '24'
            }
        },
        computed: {
            sprite() {
                return sprite
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>