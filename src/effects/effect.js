import { EntityConfig } from 'src/config/entity-config';

export class Effect {
  constructor(entityKey, properties) {
    this.entityKey = entityKey;
    this.properties = properties;
  }

  activate() {
    Object.keys(this.properties).forEach(property => {
      EntityConfig[this.entityKey][property] = this.properties[property];
    });
  }

  deactivate() {
    Object.keys(this.properties).forEach(property => {
      EntityConfig[this.entityKey][property] = EntityConfig.defaults[this.entityKey][property];
    });
  }
}
