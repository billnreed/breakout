import Phaser from 'phaser';

export class Powerup extends Phaser.Sprite {
  constructor(game, position) {
    super(game, position.x, position.y, 'powerup');

    this.anchor.set(0.5, 0.5);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.velocity.y = 75;
  }

  activate() {
    console.log('activate powerup');
  }
}
