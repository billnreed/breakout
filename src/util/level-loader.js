import { BrickGridFactory } from 'src/factories/brick-grid-factory';

export class LevelLoader {
  constructor(game) {
    this.game = game;

    this.bricks = null;
  }

  load(level) {
    this.level = level;

    this.loadGrid();
    this.powerupSpawnChance = level.powerupSpawnChance;
  }

  loadGrid() {
    if (this.level.type === 'auto-grid') {
      const bricksRows = this.level.rows;
      const bricksColumns = this.level.columns;
      const bricksCount = bricksRows * bricksColumns;

      this.bricks = BrickGridFactory.createBrickAutoGrid(this.game, bricksRows, bricksColumns);
    } else if (this.level.type === 'explicit-grid') {
      const bricksVisibilities = this.level.bricks;
      const bricksRows = bricksVisibilities.length;
      const bricksColumns = bricksVisibilities[0].length;

      this.bricks = BrickGridFactory.createBrickExplicitGrid(this.game, bricksRows, bricksColumns, bricksVisibilities);
    }

  }
}
