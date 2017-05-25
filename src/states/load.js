import Phaser from 'phaser';

export class LoadState extends Phaser.State {
    preload() {
        this.load.spritesheet('ball', 'assets/images/ball.png', 20, 20);
        this.load.image('paddle', 'assets/images/paddle.png');
        this.load.image('brick', 'assets/images/brick.png');
        this.load.image('powerup', 'assets/images/powerup.png');

        this.load.image('effect-icons/speed-up', 'assets/images/effect-icons/speed-up.png');
        this.load.image('effect-icons/wider-paddle', 'assets/images/effect-icons/wider-paddle.png');
    }

    create() {
        this.game.state.start('menu');
    }
}
