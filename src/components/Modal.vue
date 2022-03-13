<template>
  <div class="modal" v-if="state" @click="$emit('update:state', false)">
    <div class="modal-content" @click.stop="">

      <div class="modal-content-header" v-if="$slots.header">
        <slot name="header"/>
      </div>

      <div class="modal-content-body" v-if="$slots.body">
        <slot name="body"/>
      </div>

      <div class="modal-content-footer" v-if="$slots.footer">
        <slot name="footer"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'Modal',

  props: {
    state: Boolean
  },

  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--vt-c-text-dark-2);


    &-content {
      display: flex;
      flex-direction: column;
      padding: 24px 36px 36px;
      border-radius: 6px;
      background-color: var(--color-background-mute);
      text-align: center;

      &-header {
        font-size: 1.5rem;
      }

      &-body {
        padding: 15px 0;
        font-size: 1.3rem;
      }
    }
  }
</style>