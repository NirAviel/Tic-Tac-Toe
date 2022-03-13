<template>
  <div class="games-page">
    <h2>Games History</h2>

    <div class="games-page-list">
      <div>
        <span>Players</span>
        <span>Winner</span>
      </div>
      <game-row v-for="game in games" :game="game"/>
    </div>
  </div>
</template>

<script>
import LocalStorage from '@/services/LocalStorageService.js'
import GameRow from '@/components/GameRow.vue'

export default {

  name: 'Games',

  components: {
    GameRow
  },

  data () {
    return {
      games: LocalStorage.get('games').reverse()
    }
  }
}
</script>

<style lang="scss" scoped>
  .games-page {

    &-list {

      > div {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 1fr 1fr;
        padding: 10px 0;
        justify-items: center;
        font-size: 1.2rem;
        border-bottom: 1px solid;
      }
    }
  }
</style>