import Phaser from 'phaser';

import { EntityConfig } from 'src/config/entity-config';

export class Paddle extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'paddle');

    this.anchor.set(0.5, 0.5);

    game.physics.arcade.enable(this);
    this.body.immovable = true;
  }

  positionInWorld() {
    this.alignIn(this.game.world.bounds, Phaser.BOTTOM_CENTER, 0, -40);
  }

  alignToPointer(pointerX = this.game.world.centerX) {
    this.x = pointerX;
  }

  setLeftInputKey(leftKey) {
    this.leftKey = leftKey;
  }

  setRightInputKey(rightKey) {
    this.rightKey = rightKey;
  }

  update() {
    this.paddleSpeed = EntityConfig.paddle.speed;
    this.tint = EntityConfig.paddle.tint;
    this.width = EntityConfig.paddle.width;

    if (this.leftKey.isDown) {
      this.body.velocity.x = -1 * this.paddleSpeed;
    } else if (this.rightKey.isDown) {
      this.body.velocity.x = this.paddleSpeed;
    } else {
      this.body.velocity.x = 0;
    }
  }
}
