import BricksGroup from 'src/groups/bricks';

export default {
  createBrickAutoGrid(game, rows, columns) {
    const count = rows * columns;
    const grid = new BricksGroup(game, count);
    grid.setGrid(rows, columns);

    return grid;
  },

  createBrickExplicitGrid(game, rows, columns, visibilities) {
    const count = rows * columns;
    const grid = new BricksGroup(game, count);

    grid.setGrid(rows, columns);
    grid.setBrickVisibilities(visibilities);

    return grid;
  }
}
