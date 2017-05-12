import 'pixi'
import 'p2'
import Phaser from 'phaser'

import PlayState from './states/play'

class Game extends Phaser.Game {
  constructor () {
    super(640, 480, Phaser.AUTO, 'game', null)

    this.state.add('play', PlayState, false)
    this.state.start('play');
  }
}

const game = new Game();
