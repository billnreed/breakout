import Phaser from 'phaser';

import { PaddleSpeedPowerup } from 'src/sprites/powerups/paddle-speed-powerup';
import { WiderPaddlePowerup } from 'src/sprites/powerups/wider-paddle-powerup';

export class Powerups extends Phaser.Group {
  constructor(game, spawnChance) {
    super(game, null, 'powerups', false, true, Phaser.Physics.ARCADE);

    this.powerups = [ PaddleSpeedPowerup, WiderPaddlePowerup ];
    this.spawnChance = spawnChance;
  }

  spawnFromBrick(brick) {
    const { worldPosition: position } = brick;
    if (this.game.rnd.frac() < this.spawnChance) {
      const PowerupClass = this.game.rnd.pick(this.powerups);

      const powerup = new PowerupClass(this.game, position.x, position.y);
      this.add(powerup);
      powerup.startMovement();
    }
  }
}
