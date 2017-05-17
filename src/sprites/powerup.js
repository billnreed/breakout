import Phaser from 'phaser';

export class Powerup extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'powerup');

    this.anchor.set(0.5, 0.5);
  }

  startMovement() {
    this.body.velocity.y = 75;
  }

  activate() {
    console.log('activate powerup');
  }
}
