import { EntityConfig } from 'src/config/entity-config';

export class Effect {
  constructor(entityKey, properties) {
    this.entityKey = entityKey;
    this.properties = properties;
  }

  activate() {
    EntityConfig.set(this.entityKey, this.properties)
  }

  deactivate() {
    EntityConfig.reset(this.entityKey, Object.keys(this.properties));
  }
}
