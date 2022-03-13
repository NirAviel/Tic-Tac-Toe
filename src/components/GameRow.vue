<template>
  <div class="game-row">
    <span>{{game.players.x}} (X) - vs - {{game.players.o}} (O)</span>
    <span>{{game.winner.player}}</span>
    <!-- <game-replay/> -->
  </div>
</template>

<script>
export default {

  name: 'GameRow',

  props: {
    game: Object
  },

  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>