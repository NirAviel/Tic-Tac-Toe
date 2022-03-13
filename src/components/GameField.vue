<template>
  <div @click.once="$emit('played', field.id)">
    <icon-x class="icon-x" v-if="field.sign === 'x'"/>
    <icon-o class="icon-o" v-if="field.sign === 'o'"/>
  </div>
</template>

<script>
import IconX from '@/components/icons/IconX.vue'
import IconO from '@/components/icons/IconO.vue'

export default {
  name: 'GameField',

  props: {
    field: Object
  },

  components: {
    IconX,
    IconO
  }
}
</script>

<style lang="scss" scoped>
</style>
