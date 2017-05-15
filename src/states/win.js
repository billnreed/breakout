import Phaser from 'phaser';

export default class extends Phaser.State {
  create() {
    const textStyle = {
      fill: '#fff',
      font: 'monospace',
      fontSize: '18px',
    };

    const youWonText = this.add.text(0, 0, 'You won', textStyle);
    youWonText.alignIn(this.world.bounds, Phaser.CENTER);

    const playAgainText = this.add.text(0, 0, 'Click anywhere to play again.', textStyle);
    playAgainText.alignIn(this.world.bounds, Phaser.CENTER, 0, 30);

    this.game.input.onDown.addOnce(() => this.game.state.start('play'));
  }
}
