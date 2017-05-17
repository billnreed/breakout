import Phaser from 'phaser';

import { Powerup } from 'src/sprites/powerup';

export class Powerups extends Phaser.Group {
  constructor(game, spawnChance) {
    super(game, null, 'powerups', false, true, Phaser.Physics.ARCADE);
    this.classType = Powerup;

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
