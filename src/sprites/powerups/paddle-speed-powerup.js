import { EntityConfig } from 'src/config/entity-config';

import { BasePowerup } from 'src/sprites/powerups/base-powerup';

export class PaddleSpeedPowerup extends BasePowerup {
  constructor(game, x, y) {
    super(game, x, y);
  }

  makeIcon() {
    const icon = this.game.make.sprite(0, 0, 'effect-icons/speed-up');
    icon.anchor.set(0.5, 0.5);
    icon.tint = 0xFFFFFF;

    return icon;
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
