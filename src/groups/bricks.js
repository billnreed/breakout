import Phaser from 'phaser';

import { Brick } from 'src/sprites/brick';

export class Bricks extends Phaser.Group {
  constructor(game, bricksCount) {
    super(game, null, 'bricks', false, true, Phaser.Physics.ARCADE);
    this.classType = Brick;

    this.BRICK_WIDTH = 50;
    this.BRICK_HEIGHT = 20;
    this.BRICK_PADDING = 10;

    this.createMultiple(bricksCount);
    this.callAll('init');

    this.onBrickDestroy = new Phaser.Signal();
  }

  setGrid(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.align(columns, rows, this.BRICK_WIDTH + this.BRICK_PADDING, this.BRICK_HEIGHT + this.BRICK_PADDING, Phaser.CENTER);
  }

  setBrickVisibilities(visibilities) {
    visibilities.forEach((row, rowIndex) => {
      row.forEach((visibility, columnIndex) => {
        const brick = this.getBrickAt(rowIndex, columnIndex);
        if (visibility === 0) {
          brick.exists = false;
        }
      });
    });
  }

  getBrickAt(row, column) {
    const index = (row * this.columns) + column;
    return this.children[index];
  }

  positionInWorld() {
    this.alignIn(this.game.world.bounds, Phaser.TOP_CENTER, 0, -50);
  }

  destroyBrick(brick) {
    this.onBrickDestroy.dispatch(brick);

    const destroyTween = this.game.add.tween(brick.scale);
    destroyTween.to(new Phaser.Point(0, 0), 200)
      .easing(Phaser.Easing.Back.In)
      .onComplete.addOnce(() => brick.destroy());
    destroyTween.start();
  }
}
