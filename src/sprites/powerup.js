import Phaser from 'phaser';

export default class extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'powerup', 0);
  }
}
