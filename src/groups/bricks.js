import Phaser from 'phaser';

export default class extends Phaser.Group {
  constructor(game) {
    super(game, null, 'bricks', false, true, Phaser.Physics.ARCADE);

    this.createMultiple(24, 'brick', 0, true);
    this.setAll('body.immovable', true);
    this.forEach(brick => brick.anchor.set(0.5, 0.5));

    this.onBrickDestroy = new Phaser.Signal();
  }

  positionInWorld() {
    this.align(6, 4, 50 + 10, 20 + 10, Phaser.CENTER);
    this.alignIn(this.game.world.bounds, Phaser.TOP_CENTER, 0, -50);
  }

  destroyBrick(brick) {
    const destroyTween = this.game.add.tween(brick.scale);
    destroyTween.to(new Phaser.Point(0, 0), 200)
      .easing(Phaser.Easing.Back.In)
      .onComplete.addOnce(() => brick.destroy());
    destroyTween.start();

    this.onBrickDestroy.dispatch();
  }
}
