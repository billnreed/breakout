import Phaser from 'phaser';

export default class extends Phaser.Text {
  constructor(game) {
    super(game, 10, 10, '', {
      fill: '#fff',
      font: 'monospace',
      fontSize: '18px'
    });
  }

  setLives(count) {
    this.setText(`Lives: ${count}`);
  }
}
