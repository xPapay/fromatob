<template>
    <div class="switch-input">
        <label :for="label" v-if="icon" class="icon">
            <base-icon :name="icon"/>
        </label>
        <label class="switch">
            <input :id="label" type="checkbox" class="checkbox" :checked="checked" @change="$emit('change', $event.target.checked)">
            <div class="switch__round"></div>
        </label>
        <label class="label" v-if="label" :for="label">{{ label }}</label>
    </div>
</template>

<script>
    import BaseIcon from '@/components/BaseIcon'
    export default {
        components: {
            BaseIcon,
        },
        props: {
            checked: {
                type: Boolean,
                default: false
            },
            icon: {
                type: String
            },
            label: {
                type: String
            }
        }
    }
</script>

<style lang="sass" scoped>
.switch-input
    display: inline-flex
    align-items: center

.label
    text-transform: uppercase
    font-size: 0.8rem
    font-weight: lighter

.checkbox
  display: none
  
.switch
  display: block
  width: 60px
  height: 30px
  background-color: $secondary-color
  opacity: 0.7
  border-radius: 15px
  position: relative
  cursor: pointer
  margin: 0.5rem
  
.switch__round
  position: absolute
  left: 0
  top: 50%
  transform: translateY(-50%)
  width: 35px
  height: 35px
  background: white
  border-radius: 50%
  border: 1px solid $medium-gray
  box-shadow: 0 0 4px -2px rgba(100, 100, 100, 0.8)
  transition: all 0.2s
  
.checkbox:checked + .switch__round
  left: 100%
  transform: translate(-100%, -50%)

</style>