import Phaser from 'phaser';

import { EntityConfig } from 'src/config/entity-config';

export class EffectManager {
  constructor(game) {
    this.game = game;

    this.effectsTimer = new Phaser.Timer(this.game, false);
    this.game.time.add(this.effectsTimer);
    this.effectsTimer.start();

    /*
     * {
     *   paddle: {
     *     width: {
     *       active: true,
     *       timerEvent: [Phaser.TimerEvent],
     *     },
     *     speed: {
     *       active: false,
     *       timerEvent: null,
     *     },
     *   },
     * }
     */
    this.activeEffects = Object.keys(EntityConfig.defaults).reduce((entityAcc, entityKey) => {
      const properties = Object.keys(EntityConfig.defaults[entityKey]).reduce((propertyAcc, propertyKey) => {
        propertyAcc[propertyKey] = {
          active: false,
          timerEvent: null,
        };

        return propertyAcc;
      }, {});

      entityAcc[entityKey] = properties;
      return entityAcc;
    }, {});
  }

  activateEffect(effect) {
    Object.keys(effect.properties).forEach(property => {
      if (this.activeEffects[effect.entityKey][property].active) {
        this.effectsTimer.remove(this.activeEffects[effect.entityKey][property].timerEvent);
      } else {
        EntityConfig.set(effect.entityKey, { [property]: effect.properties[property] });
      }

      const timerEvent = this.effectsTimer.add(3000, () => this.resetProperty(effect.entityKey, property))
      this.activeEffects[effect.entityKey][property].timerEvent = timerEvent;
      this.activeEffects[effect.entityKey][property].active = true;
    });
  }

  resetProperty(entityKey, property) {
    EntityConfig.reset(entityKey, [property]);
    this.activeEffects[entityKey][property].active = false;
    this.activeEffects[entityKey][property].timerEvent = null;
  }
}
