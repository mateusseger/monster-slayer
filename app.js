new Vue({
    el: '#app',
    data: {
        startGame: false,
        player: {
            life: 100,
            damage: 0,
            heal: 0
        },
        monster: {
            life: 100,
            damage: 0
        },
        logs: []
    },
    computed: {
        hasResult() {
            return (this.player.life <= 0 || this.monster.life <= 0)
        }
    },
    methods: {
        reset() {
            this.player.life = 100
            this.monster.life = 100,
            this.startGame = true,
            this.logs = []
        },
        logger(typ) {
            this.logs.unshift({
                whoAttacked: 'player',
                type: (typ == 'h' ? 'ganhou vida de' : 'atingiu o monstro com'),
                damage: (typ == 'h' ? this.player.heal : this.monster.damage),
                color: (typ == 'h' ? 'blue' : 'green')
            }, {
                whoAttacked: 'monstro',
                type: 'atingiu o player com',
                damage: this.player.damage,
                color: 'red'
            })
        },
        randomDamage(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        },
        attack(special) {
            if(special == false) {
                this.monster.damage = this.randomDamage(7, 12)
            }
            else {
                this.monster.damage = this.randomDamage(15, 20)
            }
            this.player.damage = this.randomDamage(10,15)
            this.player.life = this.player.life - this.player.damage
            this.monster.life = this.monster.life - this.monster.damage
            this.logger()
        },
        heal() {
            this.player.damage = this.randomDamage(10,15)
            this.player.heal = this.randomDamage(15,20)
            this.player.life = this.player.life - (this.player.damage - this.player.heal)
            this.logger('h')
            if (this.player.life > 100) {
                this.player.life = 100
            }
        },
        desist() {
            this.result('Você desistiu!')
        },
        endGame() {
            if (this.player.life <= 0 & this.monster.life <= 0) {
                this.player.life = 0
                this.monster.life = 0
                this.result('Os dois morreram!')
            }
            else if (this.player.life <= 0) {
                this.player.life = 0
                this.result('Você perdeu :(')
            }
            else if (this.monster.life <= 0) {
                this.monster.life = 0
                this.result('Você ganhou :)')
            }
        },
        result(result) {
            this.startGame = false
            alert(result)
        }
    },
    watch: {
        hasResult(result) {
            if (result){
                this.endGame()
            }
        }
    }
})