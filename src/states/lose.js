import Phaser from 'phaser';

export class LoseState extends Phaser.State {
  create() {
    const textStyle = {
      fill: '#fff',
      font: 'monospace',
      fontSize: '18px',
    };

    const youLostText = this.add.text(0, 0, 'You lost', textStyle);
    youLostText.alignIn(this.world.bounds, Phaser.CENTER);

    const playAgainText = this.add.text(0, 0, 'Click anywhere to play again.', textStyle);
    playAgainText.alignIn(this.world.bounds, Phaser.CENTER, 0, 30);

    this.game.input.onDown.addOnce(() => this.game.state.start('menu'));
  }
}
