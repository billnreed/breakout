import Phaser from 'phaser';

import { EntityConfig } from 'src/config/entity-config';

export class Powerup extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'powerup');

    this.anchor.set(0.5, 0.5);
  }

  startMovement() {
    this.body.velocity.y = 75;
  }

  activate() {
    EntityConfig.paddle.speed = 400;
    EntityConfig.paddle.tint = 0x22CC44;

    this.game.time.events.add(3000, this.deactivate);
  }

  deactivate() {
    EntityConfig.paddle.speed = EntityConfig.defaults.paddle.speed;
    EntityConfig.paddle.tint = EntityConfig.defaults.paddle.tint;;
  }
}
