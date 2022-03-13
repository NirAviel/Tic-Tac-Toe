<template>
  <main class="home-page">
    <h2>Welcome!!</h2>

    <div class="home-page-buttons">    
      <button class="btn-green" @click="playersModal = true">start your game</button>
    </div>

    <players-form v-model:state="playersModal" @submit="startGame"/>
  </main>
</template>

<script>
import PlayersForm from '@//components/PlayersFormModal.vue'

export default {
  name: 'Home',

  components: {
    PlayersForm
  },

  data () {
    return {
      playersModal: false
    }
  },

  methods: {
    startGame () {
      this.$router.push('game')
      this.playersModal = false
    }
  }
}
</script>

<style lang="scss">
  .home-page {
    text-align: center;
  }
</style>
