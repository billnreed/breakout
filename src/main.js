import 'pixi'
import 'p2'
import Phaser from 'phaser'

import LoadState from 'src/states/load';
import PlayState from 'src/states/play';
import WinState from 'src/states/win';
import LoseState from 'src/states/lose';

class Game extends Phaser.Game {
  constructor() {
    super(550, 400, Phaser.AUTO, 'game', null)

    this.state.add('load', LoadState, false)
    this.state.add('play', PlayState, false)
    this.state.add('win', WinState, false)
    this.state.add('lose', LoseState, false)
    this.state.start('load');
  }
}

const game = new Game();
