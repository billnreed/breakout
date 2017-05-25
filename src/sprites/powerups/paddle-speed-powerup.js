import { EntityConfig } from 'src/config/entity-config';

import { BasePowerup } from 'src/sprites/powerups/base-powerup';
import { Effect } from 'src/effects/effect';

export class PaddleSpeedPowerup extends BasePowerup {
  constructor(game, x, y) {
    super(game, x, y);

    this.effect = new Effect('paddle', {
      speed: 400,
      tint: 0x22CC44,
    });
  }

  makeIcon() {
    const icon = this.game.make.sprite(0, 0, 'effect-icons/speed-up');
    icon.anchor.set(0.5, 0.5);
    icon.tint = 0xFFFFFF;

    return icon;
  }

  activate() {
    this.effect.activate();

    this.game.time.events.add(3000, this.deactivate.bind(this));
  }

  deactivate() {
    this.effect.deactivate();
  }
}
