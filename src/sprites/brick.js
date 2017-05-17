import Phaser from 'phaser';

export class Brick extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'brick');
  }

  init() {
    this.anchor.set(0.5, 0.5);
    this.tint = 0xBEEFED;

    this.exists = true;
    this.body.immovable = true;
  }
}
