<template>
    <footer class="footer">
        <h3>This footer was dynamically loaded as you scrolled down here</h3>
    </footer>
</template>

<script>
    export default {
        data() {
            return {
                myFooterData: 'bla bla'
            }
        }
        
    }
</script>

<style lang="sass" scoped>
.footer
    width: 100%
    background: $primary-color
    color: white
    text-align: center
    font-weight: normal
    padding-top: 10%
    padding-bottom: 10%

</style>