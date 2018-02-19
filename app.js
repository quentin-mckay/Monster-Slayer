let app = new Vue({
  el: '#app',
  data: {
    isGamePlaying: false,
    playerHealth: 100,
    monsterHealth: 100,
    eventLog: [
    //   "- Player ready -",
    //   "- Monster ready -"
        {
            player: '- Player ready -',
            monster: '- Monster ready -'
        }
    ]
  },
  
  methods: {
    startGame: function() {
      this.isGamePlaying = true
    },
    attack: function() {
      let playerAttackAmount = randomIntBetween(5, 20)
      let monsterAttackAmount = randomIntBetween(5, 20)

      this.playerHealth -= monsterAttackAmount
      this.monsterHealth -= playerAttackAmount

      let turn = {
        player: `Player hits monster for ${playerAttackAmount}`,
        monster: `Monster hits player for ${monsterAttackAmount}`
      }
      this.eventLog.unshift(turn)
    //   this.eventLog.push(`Player hits monster for ${playerAttackAmount}`)
    //   this.eventLog.push(`Monster hits player for ${monsterAttackAmount}`)

      
      this.checkWin()
    },
    heal: function() {
      let playerHealAmount = randomIntBetween(5, 20)
      this.playerHealth += playerHealAmount
      if (this.playerHealth > 100) { this.playerHealth = 100 }

      let turn = { player: `Player heals for ${playerHealAmount}` }
      this.eventLog.unshift(turn)
    },
    restart: function() {
      this.playerHealth = 100
      this.monsterHealth = 100
      this.eventLog = [ ],
      this.isGamePlaying = false
    },
    checkWin: function() {
      if (this.playerHealth <= 0) {
        if (confirm("Monster wins! New Game?")) {
          this.restart()
        }
      }
      else if (this.monsterHealth <= 0) {
        if (confirm("You win! New Game?")) {
          this.restart()
        }
      }
    }
  },

  computed: {
    playerHealthBarStyle: function() {
      return {
        width: this.playerHealth + '%'
      }
    },
    monsterHealthBarStyle: function() {
      return {
        width: this.monsterHealth + '%'
      }
    },
  }
})



// ==== Utility Functions ====

function randomIntBetween(low, high) {
  let range = high - low
  return Math.floor(Math.random() * range) + low
}