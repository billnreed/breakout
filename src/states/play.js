import Phaser from 'phaser'

import { LevelLoader } from 'src/util/level-loader';
import { EffectManager } from 'src/effects/effect-manager';

import { Ball } from 'src/sprites/ball';
import { Paddle } from 'src/sprites/paddle';

import { Powerups } from 'src/groups/powerups';

import { GUI } from 'src/gui/gui';

import { PaddleBallCollisionHandler } from 'src/collision-handlers/paddle-ball-collision-handler';

export class PlayState extends Phaser.State {
  init({ levelData }) {
    this.levelData = levelData;
  }

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.loadLevel();

    this.createGUI();
    this.createEntities();
    this.positionEntities();
    this.initEntityHandlers();
    this.initCollisionHandlers();

    this.initInputHandlers();
    this.createManagers();

    this.prepareInitialRound();
  }

  loadLevel() {
    const levelLoader = new LevelLoader(this.game);
    levelLoader.load(this.levelData);

    this.bricks = levelLoader.bricks;
    this.powerupSpawnChance = levelLoader.powerupSpawnChance;
  }

  createGUI() {
    this.startRoundText = new GUI.StartRound(this.game);
    this.add.existing(this.startRoundText);

    this.livesText = new GUI.Lives(this.game);
    this.add.existing(this.livesText);
  }

  createEntities() {
    this.add.existing(this.bricks);

    this.ball = new Ball(this.game);
    this.add.existing(this.ball);

    this.paddle = new Paddle(this.game);
    this.add.existing(this.paddle);

    this.powerups = new Powerups(this.game, this.powerupSpawnChance);
    this.add.existing(this.powerups);
  }

  positionEntities() {
    this.bricks.positionInWorld();
    this.paddle.positionInWorld();
    this.startRoundText.positionInWorld();
  }

  initEntityHandlers() {
    this.ball.onWorldBoundsHit.add(this.handleWorldBoundsHit.bind(this));
    this.bricks.onBrickDestroy.add(this.checkWin.bind(this));
    this.bricks.onBrickDestroy.add(this.powerups.spawnFromBrick.bind(this.powerups));
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

  createManagers() {
    this.game.effectManager = new EffectManager(this.game);
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
