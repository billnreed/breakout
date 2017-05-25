import { EntityConfig } from 'src/config/entity-config';

import { BasePowerup } from 'src/sprites/powerups/base-powerup';
import { Effect } from 'src/effects/effect';

export class WiderPaddlePowerup extends BasePowerup {
  constructor(game, x, y) {
    super(game, x, y);

    this.effect = new Effect('paddle', {
      width: 150,
      tint: 0x22CC33,
    });
  }

  makeIcon() {
    const icon = this.game.make.sprite(0, 0, 'effect-icons/wider-paddle');
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
