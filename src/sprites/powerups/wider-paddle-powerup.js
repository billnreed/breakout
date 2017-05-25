import { EntityConfig } from 'src/config/entity-config';

import { BasePowerup } from 'src/sprites/powerups/base-powerup';

export class WiderPaddlePowerup extends BasePowerup {
  constructor(game, x, y) {
    super(game, x, y);
  }

  makeIcon() {
    const icon = this.game.make.sprite(0, 0, 'effect-icons/wider-paddle');
    icon.anchor.set(0.5, 0.5);
    icon.tint = 0xFFFFFF;

    return icon;
  }

  activate() {
    EntityConfig.paddle.width = 150;
    EntityConfig.paddle.tint = 0x22CC44;

    this.game.time.events.add(3000, this.deactivate);
  }

  deactivate() {
    EntityConfig.paddle.width = EntityConfig.defaults.paddle.width;
    EntityConfig.paddle.tint = EntityConfig.defaults.paddle.tint;;
  }
}
