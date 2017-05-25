import Phaser from 'phaser';

import { Powerup } from 'src/sprites/powerup';
import { PaddleEffect } from 'src/effects/paddle-effect';

export class Powerups extends Phaser.Group {
  constructor(game, spawnChance) {
    super(game, null, 'powerups', false, true, Phaser.Physics.ARCADE);
    this.classType = Powerup;
    this.spawnChance = spawnChance;

    this.types = [
      ['wider-paddle', new PaddleEffect({
        width: 150,
        tint: 0x22CC33,
      })],
      ['speed-up', new PaddleEffect({
        speed: 400,
        tint: 0x22CC33,
      })],
    ]
  }

  spawnFromBrick(brick) {
    const { worldPosition: position } = brick;
    if (this.game.rnd.frac() < this.spawnChance) {
      const powerup = this.create(position.x, position.y, ...this.game.rnd.pick(this.types))
      powerup.startMovement();
    }
  }
}
