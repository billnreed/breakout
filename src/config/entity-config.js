class _EntityConfig {
  constructor() {
    this.defaults = {
      paddle: {
        speed: 200,
        tint: 0xFFFFFF,
        width: 75,
      },
    };

    this.paddle = {
      speed: 200,
      tint: 0xFFFFFF,
      width: 75,
    };
  }

  set(entityKey, data) {
    const entityProperties = this[entityKey];
    
    Object.keys(data).forEach(property => {
      entityProperties[property] = data[property];
    });
  }

  reset(entityKey, propertyNames) {
    const entityDefaults = this.defaults[entityKey];
    const entityProperties = this[entityKey];

    Object.keys(entityProperties).forEach(property => {
      entityProperties[property] = entityDefaults[property];
    });
  }
}

export const EntityConfig = new _EntityConfig();
