import Phaser from 'phaser';

export class LoadState extends Phaser.State {
    preload() {
        this.load.spritesheet('ball', 'assets/images/ball.png', 20, 20);
        this.load.image('paddle', 'assets/images/paddle.png');
        this.load.image('brick', 'assets/images/brick.png');
        this.load.image('powerup', 'assets/images/powerup.png');
        this.load.image('powerdown', 'assets/images/powerdown.png');
    }

    create() {
        this.game.state.start('menu');
    }
}
