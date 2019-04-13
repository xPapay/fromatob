<template>
    <svg class="icon" :width="width" :height="height">
        <use :xlink:href="`#${name}`"/>
    </svg>
</template>

<script>
    function importAll (r) {
        return r.keys().forEach(r);
    }

    importAll(require.context('assets/images/sprites', false, /\.svg$/));
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