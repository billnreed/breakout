import Phaser from 'phaser';

export default class extends Phaser.Text {
  constructor(game) {
    super(game, 0, 0, 'Click anywhere to start', {
      fill: '#fff',
      font: 'monospace',
      fontSize: '18px'
    });
  }

  positionInWorld() {
    this.alignIn(this.game.world.bounds, Phaser.BOTTOM_CENTER);
  }

  hide() {
    this.exists = false;
  }

  show() {
    this.exists = true;
  }
}