import level1 from 'data/level1';
import level2 from 'data/level2';
import level3 from 'data/level3';

import BricksFactory from 'src/factories/bricks-factory';

class LevelLoader {
  constructor(game) {
    this.game = game;

    this.bricks = null;
  }

  load(level) {
    if (level.type === 'auto-grid') {
      const bricksRows = level.rows;
      const bricksColumns = level.columns;
      const bricksCount = bricksRows * bricksColumns;

      this.bricks = BricksFactory.createBrickAutoGrid(this.game, bricksRows, bricksColumns);
    } else if (level.type === 'explicit-grid') {
      const bricksVisibilities = level.bricks;
      const bricksRows = bricksVisibilities.length;
      const bricksColumns = bricksVisibilities[0].length;

      this.bricks = BricksFactory.createBrickExplicitGrid(this.game, bricksRows, bricksColumns, bricksVisibilities);
    }
  }
}

LevelLoader.LEVEL_1 = level1;
LevelLoader.LEVEL_2 = level2;
LevelLoader.LEVEL_3 = level3;

export default LevelLoader;
