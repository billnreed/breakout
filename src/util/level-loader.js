import BricksFactory from 'src/factories/bricks-factory';

export default class {
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
