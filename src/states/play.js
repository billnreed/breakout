import Phaser from 'phaser'

import Ball from '../sprites/ball';
import Paddle from '../sprites/paddle';
import BricksGroup from '../groups/bricks';

export default class extends Phaser.State {
  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.lives = 3;

    this.createEntities();
    this.initEntities();

    this.prepareNextRound();
  }

  createEntities() {
    this.ball = new Ball(this.game);
    this.add.existing(this.ball);

    this.paddle = new Paddle(this.game);
    this.add.existing(this.paddle);

    this.bricks = new BricksGroup(this.game);
    this.add.existing(this.bricks);

    this.livesText = this.addLivesText();
    this.startLifeText = this.addStartLifeText();
  }

  initEntities() {
    this.ball.setWorldBoundsHitHandler(this.handleWorldBoundsHit.bind(this));

    this.paddle.positionInWorld();

    this.bricks.positionInWorld();
    this.bricks.setBrickDestroyHandler(this.checkWin.bind(this));
  }

  addLivesText() {
    const text = this.make.text(10, 10, '', { fill: '#ffffff', font: 'monospace', fontSize: '18px' });
    this.add.existing(text);

    return text;
  }

  addStartLifeText() {
    const text = this.make.text(0, 0, 'Click anywhere to start', { fill: '#fff', font: 'monospace', fontSize: '18px'  });
    text.alignIn(this.world.bounds, Phaser.BOTTOM_CENTER);
    this.add.existing(text);

    return text;
  }

  prepareNextRound() {
    this.startLifeText.exists = true;
    this.updateLivesText();
    this.ball.resetRound();
    this.input.onDown.addOnce(() => this.startRound());
  }

  updateLivesText() {
    this.livesText.setText(`Lives: ${this.lives}`);
  }

  startRound() {
    this.startLifeText.exists = false;
    this.ball.startRound();
  }

  update() {
    this.paddle.alignToPointer(this.input.position.x);

    this.physics.arcade.collide(this.ball, this.paddle, () => this.handlePaddleHit());
    this.physics.arcade.collide(this.ball, this.bricks, (ball, brick) => this.handleBrickHit(brick));
  }

  handleWorldBoundsHit(ball, up, down, left, right) {
    if (down) {
      this.lives -= 1;

      if (this.lives === 0) {
        alert('you lose');
      } else {
        this.prepareNextRound();
      }
    }

    this.ball.playHitAnimation(left || right, up || down);
  }

  handlePaddleHit() {
    this.ball.animations.play('wobbleHorizontal');

    // positive if ball is to the right of paddle center, negative if ball is to the left
    const centerDifference = (this.ball.x - this.paddle.x);

    // between -0.5 and 0.5
    const differenceFactor = centerDifference / this.paddle.width;

    // between -1 and 1
    const normalizedDifferenceFactor = differenceFactor * 2;

    const normalizedDifferenceFactorMagnitude = Math.abs(normalizedDifferenceFactor);

    if ((this.ball.body.velocity.x < 0 && differenceFactor < 0) || (this.ball.body.velocity.x > 0 && differenceFactor > 0)) {
      this.ball.body.velocity.x *= normalizedDifferenceFactorMagnitude * 2;
    } else {
      this.ball.body.velocity.x *= -1;
      this.ball.body.velocity.x *= normalizedDifferenceFactorMagnitude;
    }

    if (this.ball.body.velocity.x < 0) {
      this.ball.body.velocity.x = this.game.math.clamp(this.ball.body.velocity.x, -250, -100);
    } else {
      this.ball.body.velocity.x = this.game.math.clamp(this.ball.body.velocity.x, 100, 250);
    }
  }

  handleBrickHit(brick) {
    const destroyTween = this.add.tween(brick.scale);
    destroyTween.to(new Phaser.Point(0, 0), 200)
      .easing(Phaser.Easing.Back.In)
      .onComplete.addOnce(() => brick.destroy());
    destroyTween.start();
  }

  checkWin() {
    const bricksLeftCount = this.bricks.children.length - 1;

    if (bricksLeftCount === 0) {
      alert('you win');
    }
  }
}
