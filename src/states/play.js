import Phaser from 'phaser'

import LevelLoader from 'src/util/level-loader';

import Ball from 'src/sprites/ball';
import Paddle from 'src/sprites/paddle';
import Powerup from 'src/sprites/powerup';
import BricksGroup from 'src/groups/bricks';
import StartRoundText from 'src/gui/start-round';
import LivesText from 'src/gui/lives';

import PaddleBallCollisionHandler from 'src/collision-handlers/paddle-ball-collision-handler';

export default class extends Phaser.State {
  init({ levelData }) {
    this.levelData = levelData;
  }

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.loadLevel();

    this.createEntities();
    this.positionEntities();
    this.initEntityHandlers();
    this.initCollisionHandlers();

    this.initInputHandlers();

    this.prepareInitialRound();
  }

  loadLevel() {
    const levelLoader = new LevelLoader(this.game);
    levelLoader.load(this.levelData);

    this.bricks = levelLoader.bricks;
    this.powerupSpawnChance = levelLoader.powerupSpawnChance;
  }

  createEntities() {
    this.add.existing(this.bricks);

    this.ball = new Ball(this.game);
    this.add.existing(this.ball);

    this.paddle = new Paddle(this.game);
    this.add.existing(this.paddle);

    // this.powerups = [];
    this.powerups = new Phaser.Group(this.game);
    this.add.existing(this.powerups);

    this.startRoundText = new StartRoundText(this.game);
    this.add.existing(this.startRoundText);

    this.livesText = new LivesText(this.game);
    this.add.existing(this.livesText);
  }

  positionEntities() {
    this.bricks.positionInWorld();
    this.paddle.positionInWorld();
    this.startRoundText.positionInWorld();
  }

  initEntityHandlers() {
    this.ball.onWorldBoundsHit.add(this.handleWorldBoundsHit.bind(this));
    this.bricks.onBrickDestroy.add(this.checkWin.bind(this));
  }

  initCollisionHandlers() {
    this.paddleBallCollisionHandler = new PaddleBallCollisionHandler(this.game, this.paddle, this.ball);
  }

  initInputHandlers() {
    const inputKeys = this.input.keyboard.addKeys({
      'left': Phaser.KeyCode.LEFT,
      'right': Phaser.KeyCode.RIGHT,
      'spacebar': Phaser.KeyCode.SPACEBAR,
    });

    this.paddle.setLeftInputKey(inputKeys.left);
    this.paddle.setRightInputKey(inputKeys.right);

    this.spaceKey = inputKeys.spacebar;
  }

  prepareInitialRound() {
    this.lives = 3;
    this.prepareNextRound();
  }

  prepareNextRound() {
    this.startRoundText.show();
    this.livesText.setLives(this.lives);
    this.ball.resetRound();
    this.spaceKey.onUp.addOnce(() => this.startRound());
  }

  startRound() {
    this.startRoundText.hide();
    this.ball.startRound();
  }

  update() {
    this.physics.arcade.collide(this.ball, this.paddle, () => this.handlePaddleHit());
    this.physics.arcade.collide(this.ball, this.bricks, (ball, brick) => this.handleBrickHit(brick));
    this.physics.arcade.collide(this.paddle, this.powerups, (paddle, powerup) => this.handlePowerupHit(powerup));
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

    this.paddleBallCollisionHandler.handle();
  }

  handleBrickHit(brick) {
    if (this.rnd.frac() < this.powerupSpawnChance) {
      const powerup = new Powerup(this.game, brick.worldPosition);
      this.powerups.add(powerup);
    }

    this.bricks.destroyBrick(brick);
  }

  handlePowerupHit(powerup) {
    powerup.activate();
    powerup.destroy();
  }

  checkWin() {
    const bricksLeftCount = this.bricks.getAll('exists', true).length - 1;

    if (bricksLeftCount === 0) {
      this.game.state.start('win');
    }
  }
}
