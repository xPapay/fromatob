<template>
    <nav class="navigation-bar">
        <div class="content navigation-bar__container">
            <router-link :to="{ name: 'home' }" class="navigation-bar__logo">
                <img :src="require('assets/images/logo.svg')"/>
            </router-link>
            <div class="navigation-bar__menu">
                <router-link key="train" to="#" class="navigation-bar__menu-item">Train</router-link>
                <router-link key="accomodation" to="#" class="navigation-bar__menu-item">Accomodation</router-link>
                <router-link key="sign-in" to="#" class="navigation-bar__menu-item">Sign in</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
    }
</script>

<style scoped lang="sass">
.navigation-bar
    background: $primary-color

.navigation-bar__container
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px 15px
    height: 3.25rem

.navigation-bar__logo
    height: 100%

    img
        height: 100%

.navigation-bar__menu-item
    color: white
    text-decoration: none
    margin-left: 1rem
    padding: 12px 0

</style>