import Phaser from 'phaser';

export class EffectManager {
  constructor(game) {
    this.game = game;

    this.effectsTimer = new Phaser.Timer(this.game, false);
    this.game.time.add(this.effectsTimer);
    this.effectsTimer.start();
  }

  activateEffect(effect) {
    effect.activate();
    this.effectsTimer.add(3000, effect.deactivate.bind(effect));
  }
}
