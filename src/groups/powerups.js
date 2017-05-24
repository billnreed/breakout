import Phaser from 'phaser';

import { PaddleSpeedPowerup } from 'src/sprites/powerups/paddle-speed-powerup';

export class Powerups extends Phaser.Group {
  constructor(game, spawnChance) {
    super(game, null, 'powerups', false, true, Phaser.Physics.ARCADE);
    this.classType = PaddleSpeedPowerup;

    this.spawnChance = spawnChance;
  }

  spawnFromBrick(brick) {
    const { worldPosition: position } = brick;
    if (this.game.rnd.frac() < this.spawnChance) {
      const powerup = this.create(position.x, position.y);
      powerup.startMovement();
    }
  }
}
