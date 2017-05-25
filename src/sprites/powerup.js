import Phaser from 'phaser';

export class Powerup extends Phaser.Sprite {
  constructor(game, x, y, iconKey, effect) {
    super(game, x, y, 'powerup');

    this.anchor.set(0.5, 0.5);
    this.tint = 0x22CC33;

    const icon = this.game.make.sprite(0, 0, `effect-icons/${iconKey}`);
    icon.anchor.set(0.5, 0.5);
    this.addChild(icon);

    this.effect = effect;
  }

  startMovement() {
    this.body.velocity.y = 75;
  }

  activate() {
    this.effect.activate();

    this.game.time.events.add(3000, this.deactivate.bind(this));
  }

  deactivate() {
    this.effect.deactivate();
  }
}
