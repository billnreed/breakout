import { EntityConfig } from 'src/config/entity-config';

export class Effect {
  constructor(entityKey, properties) {
    this.entityKey = entityKey;
    this.properties = properties;
  }
}
