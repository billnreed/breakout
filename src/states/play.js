import Phaser from 'phaser'

import level1 from 'data/level1';

import Ball from 'src/sprites/ball';
import Paddle from 'src/sprites/paddle';
import BricksGroup from 'src/groups/bricks';
import StartRoundText from 'src/text/start-round';
import LivesText from 'src/text/lives';

export default class extends Phaser.State {
  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.loadLevel();
    this.createEntities();
    this.positionEntities();
    this.initEntityHandlers();

    this.prepareInitialRound();
  }

  loadLevel() {
    const bricksCount = level1.bricksCount;
    const bricksRows = level1.rows;
    const bricksColumns = level1.columns;

    this.bricks = new BricksGroup(this.game, bricksCount);
    this.add.existing(this.bricks);
    this.bricks.setGrid(bricksRows, bricksColumns);
    this.bricks.positionInWorld();
  }

  createEntities() {
    this.ball = new Ball(this.game);
    this.add.existing(this.ball);

    this.paddle = new Paddle(this.game);
    this.add.existing(this.paddle);

    this.startRoundText = new StartRoundText(this.game);
    this.add.existing(this.startRoundText);

    this.livesText = new LivesText(this.game);
    this.add.existing(this.livesText);
  }

  positionEntities() {
    this.paddle.positionInWorld();
    this.startRoundText.positionInWorld();
  }

  initEntityHandlers() {
    this.ball.onWorldBoundsHit.add(this.handleWorldBoundsHit.bind(this));
    this.bricks.onBrickDestroy.add(this.checkWin.bind(this));
  }

  prepareInitialRound() {
    this.lives = 3;
    this.prepareNextRound();
  }

  prepareNextRound() {
    this.startRoundText.show();
    this.livesText.setLives(this.lives);
    this.ball.resetRound();
    this.input.onDown.addOnce(() => this.startRound());
  }

  startRound() {
    this.startRoundText.hide();
    this.ball.startRound();
  }

  update() {
    if (this.input.position.x) {
      this.paddle.alignToPointer(this.input.position.x);
    } else {
      this.paddle.positionInWorld();
    }

    this.physics.arcade.collide(this.ball, this.paddle, () => this.handlePaddleHit());
    this.physics.arcade.collide(this.ball, this.bricks, (ball, brick) => this.handleBrickHit(brick));
  }

  handleWorldBoundsHit(ball, up, down, left, right) {
    if (down) {
      this.lives -= 1;

      if (this.lives === 0) {
        this.game.state.start('lose');
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
    this.bricks.destroyBrick(brick);
  }

  checkWin() {
    const bricksLeftCount = this.bricks.children.length - 1;

    if (bricksLeftCount === 0) {
      this.game.state.start('win');
    }
  }
}
