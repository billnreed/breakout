import { Bricks} from 'src/groups/bricks';

export const BrickGridFactory = {
  createBrickAutoGrid(game, rows, columns) {
    const count = rows * columns;
    const grid = new Bricks(game, count);
    grid.setGrid(rows, columns);

    return grid;
  },

  createBrickExplicitGrid(game, rows, columns, visibilities) {
    const count = rows * columns;
    const grid = new Bricks(game, count);

    grid.setGrid(rows, columns);
    grid.setBrickVisibilities(visibilities);

    return grid;
  }
}
