import Phaser from 'phaser';

export class Ball extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'ball', 0);

    this.animations.add('wobbleVertical', [1, 0], 20);
    this.animations.add('wobbleHorizontal', [2, 0], 20);

    this.anchor.set(0.5, 0.5);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.bounce = new Phaser.Point(1, 1);

    this.body.onWorldBounds = new Phaser.Signal();
    this.onWorldBoundsHit = this.body.onWorldBounds;
  }

  startRound() {
    const horizontalVelcocity = this.game.rnd.between(-150, 150);
    const verticalVelocity = this.game.rnd.between(100, 150);
    this.body.velocity.set(horizontalVelcocity, verticalVelocity);
  }

  resetRound() {
    this.body.velocity.set(0, 0);
    this.alignIn(this.game.world.bounds, Phaser.CENTER, 0, 40);
  }

  playHitAnimation(horizontal, vertical) {
    if (horizontal) {
      this.animations.play('wobbleHorizontal');
    } else if (vertical) {
      this.animations.play('wobbleVertical');
    }
  }
}
