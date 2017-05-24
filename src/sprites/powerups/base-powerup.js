import Phaser from 'phaser';

export class BasePowerup extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'powerup');

    this.anchor.set(0.5, 0.5);
    this.tint = 0x22CC33;

    const icon = this.makeIcon();
    this.addChild(icon);
  }

  startMovement() {
    this.body.velocity.y = 75;
  }

  makeIcon() {
    throw "Don't instantiate `Powerup` directly, always use a subclass.";
  }

  activate() {
    throw "Don't instantiate `Powerup` directly, always use a subclass.";
  }

  deactivate() {
    throw "Don't instantiate `Powerup` directly, always use a subclass.";
  }
}
