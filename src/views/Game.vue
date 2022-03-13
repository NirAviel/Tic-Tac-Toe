<template>
  <div class="game-page" :style="{'--sqrt': sqrt}">
    <div class="game-page-payers">
      {{store.xPlayer.toUpperCase()}} (X) vs {{store.oPlayer.toUpperCase()}} (O)
      <br>
      next player to act: <em>{{nextPlayerToAct}}</em>
    </div>
    <div class="game-page-grid">
      <game-field v-for="f in gameFields"
                :key="`${f.id}_${gameCounter}`"
                :field="f"
                @played="clicked"
                :class="['game-page-box',
                          borderClass(f.id),
                          { 'game-over': !!winner,
                            'winner-path': !!winner && winner.fields.includes(f) }]"/>      
    </div>

    <div class="game-page-footer">
      <button class="btn-green" @click="reset">Reset</button>
      <button class="btn-green" @click="newGame">New Game</button>
    </div>

    <modal v-model:state="showWinnerModal">
      <template v-slot:body>
        CONGRATULATION <em>{{winner.player.toUpperCase()}}</em>!!!
        <br>
        you won!!
      </template>
      <template v-slot:footer>
        <button class="btn-green" @click="showWinnerModal = false">Close</button>
      </template>
    </modal>

    <players-form v-model:state="playersModal" @submit="reset"/>
  </div>
</template>

<script>
import { store } from '@/store.js'
import { toRaw } from 'vue'
import GameField from '@/components/GameField.vue'
import PlayersForm from '@/components/PlayersFormModal.vue'
import LocalStorage from '@/services/LocalStorageService.js'

export default {

  name: 'Game',

  components: {
    GameField,
    PlayersForm
  },

  data () {
    return {
      gameFields: [],
      game: {},
      sqrt: null,
      nextPlayFlag: true,
      winner: null,
      winningOptions: [],
      gameCounter: 1,
      store,
      playersModal: false,
      showWinnerModal: false
    }
  },

  computed: {
    nextPlaySign () {
      return this.nextPlayFlag ? 'x' : 'o'
    },

    nextPlayerToAct () {
      return this.store[`${this.nextPlaySign}Player`]
    }
  },

  methods: {
    initFields () {
      const fields = []
      for (let i=1; i<=parseInt(this.store.boardSize); i++) {
        fields.push({ id: i, sign: null })
      }
      this.gameFields = fields
      this.sqrt = Math.sqrt(this.gameFields.length)
    },

    clicked (id) {
      if (!this.store.xPlayer || !this.store.oPlayer) return
      if (this.winner) return
      const field = this.gameFields.find((f) => f.id === id)
      field.sign = this.nextPlaySign
      this.game.moves.push(field)
      this.checkForAWin()
      // TODO: check for a draw
      this.nextPlayFlag = !this.nextPlayFlag
    },

    checkForAWin () {
      let match = null

      const values = this.gameFields.reduce((results, field) => {
        if (field.sign === 'x') {
          results.x.push(field.id)
        }
        if (field.sign === 'o') {
          results.o.push(field.id)
        }
        return results
      }, {x:[], o:[]})

      match = Object.keys(this.winningOptions).reduce((acc, key) => {
        if (!acc) {
          acc = this.searchMatchForWinningOption(key, values)
        }
        return acc
      }, null)

      if (match) {
        const fields = this.gameFields.filter((field) => match.includes(field.id))
        this.winner = {
          fields,
          player: this.store[`${fields[0].sign}Player`]
        }
        this.game.winner = this.winner
        this.showWinnerModal = true
        this.saveGame()
      }
    },

    borderClass (id) {
      let classes = ' '
      if (id > this.sqrt) {
        classes += 'border-top '
      }

      if (id%this.sqrt) {
        classes += 'border-right'
      }

      return classes
    },

    setWinningOptions () {
      const vertical = []
      const slant = [[],[]] // will always have only two options
      const sliced = []

      for (let i = 0; i < this.gameFields.length; i += this.sqrt) {
        vertical.push([])
        sliced.push(this.gameFields.slice(i, i + this.sqrt))
      }

      const horizontal = sliced.reduce((arr, fields) => {
        arr.push(fields.map((f) => f.id))
        return arr
      },[])

      for (let i = 1; i < this.gameFields.length + 1; i += (this.sqrt + 1)) {
        slant[0].push(i)
      }

      for (let i = this.sqrt; i < this.gameFields.length; i += (this.sqrt - 1)) {
        slant[1].push(i)
      }

      horizontal.forEach((fields, i) => {
        fields.forEach((field, n) => {
          vertical[n].push(field)
        })
      })

      this.winningOptions =  {
        horizontal,
        vertical,
        slant
      }
    },

    searchMatchForWinningOption(option, values) {
      let match = null

      this.winningOptions[option].forEach((opt, i) => {
        if (!!match) return
        if (opt.every((h,n) => values.x.includes(h))) {
          match = opt
          return false
        }
        if (opt.every((h,n) => values.o.includes(h))) {
          match = opt
          return false
        }
      })

      return match
    },

    newGame () {
      this.playersModal = true
    },

    reset () {
      this.gameFields.map((field) => field.sign = null)
      this.winner = null
      this.nextPlayFlag = true
      this.gameCounter++
      this.playersModal = false
      this.initFields()
      this.setWinningOptions()
      this.initGame()
    },

    initGame () {
      this.game =  {
        players: {
          x: this.store.xPlayer,
          o: this.store.oPlayer
        },
        winner: null,
        moves: []
      }
    },

    saveGame () {
      const games = LocalStorage.get('games') || []
      games.push(this.game)
      LocalStorage.set('games', games)
    }
  },

  created () {
    this.initFields()
    this.setWinningOptions()
    this.initGame()
  }
}
</script>

<style lang="scss" scoped>

  @keyframes pomp {
    0% {fill: var(--vt-c-text-green-1);filter: drop-shadow(0px 0px 3px var(--vt-c-text-green-1));transform: scale(1.02);}
    50% {fill: var(--vt-c-text-green-2);filter: drop-shadow(0px 0px 3px var(--vt-c-text-green-2));transform: scale(1);}
    100% {fill: var(--vt-c-text-green-1);filter: drop-shadow(0px 0px 3px var(--vt-c-text-green-1));transform: scale(1.02);}
  }

  .game-page {

    &-payers {
      padding: 25px;
      font-size: 1.5rem;
      text-align: center;
    }

    &-grid {
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(var(--sqrt), min(150px, calc((100vw/var(--sqrt)) - 1rem)))
    }

    &-box {
      width: min(150px, calc((100vw/var(--sqrt)) - 1rem));
      height: min(150px, calc((100vw/var(--sqrt)) - 1rem));
      padding: 12px;

      &:not(.game-over) {
        cursor: pointer;
      }

      &.border-right {
        border-right: 2px solid var(--vt-c-text-dark-2);
      }

      &.border-top {
        border-top: 2px solid var(--vt-c-text-dark-2);
      }

      &.winner-path {

        ::v-deep svg {
          animation-name: pomp;
          animation-duration: 1s;
          animation-iteration-count: infinite;
        }
      }

      ::v-deep svg {
        width: 100%;
        height: 100%;

        &.icon-x {
          fill: #f8fd78;
        }

        &.icon-o {
          fill: #5acaf1;
        }
      }
    }

    &-footer {
      display: grid;
      grid-auto-flow: column;
      grid-gap: 15px;
      margin-top: 55px;
      justify-content: center;
    }
  }
</style>
