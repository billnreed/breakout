import Phaser from 'phaser';

export class StartRound extends Phaser.Text {
  constructor(game) {
    super(game, 0, 0, 'Press <SPACE> to start', {
      fill: '#fff',
      font: 'monospace',
      fontSize: '18px'
    });
  }

  positionInWorld() {
    this.alignIn(this.game.world.bounds, Phaser.CENTER, 0, 80);
  }

  hide() {
    this.exists = false;
  }

  show() {
    this.exists = true;
  }
}
