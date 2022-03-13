<template>
  <modal v-model:state="state" class="players-modal">

    <template v-slot:header>
      <h6>Add players</h6>
    </template>

    <template v-slot:body>
      <form @submit.prevent="submit" class="players-modal-form">

        <input type="text" v-model="xPlayer" placeholder="Player A"/>
        <input type="text" v-model="oPlayer" placeholder="Player B"/>

        <select v-model="boardSize">
          <option disabled>Select Board</option>
          <option value="9">3x3</option>
          <option value="16">4x4</option>
          <option value="25">5x5</option>
          <option value="36">6x6</option>
        </select>

        <button type="submit" class="btn-green">Start the Game</button>
      </form>
    </template>

  </modal>
</template>

<script>
import { store } from '@/store.js'

export default {

  name: 'PlayersFormModal',

  props: {
    state: Boolean
  },

  data () {
    return {
      store,
      xPlayer: '',
      oPlayer: '',
      boardSize: '9'
    }
  },

  watch: {
    state (val) {
      this.$emit('update:state', val)
    }
  },

  methods: {
    submit () {
      this.store.xPlayer = this.xPlayer
      this.store.oPlayer = this.oPlayer
      this.store.boardSize = this.boardSize
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss" scoped>

  .players-modal {

    &-form {
      display: grid;
      grid-direction: column;
      grid-row-gap: 15px;
    }
  }
</style>