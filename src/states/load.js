import Phaser from 'phaser';

export default class extends Phaser.State {
    preload() {
        this.load.spritesheet('ball', 'assets/images/ball.png', 20, 20);
        this.load.image('paddle', 'assets/images/paddle.png');
        this.load.image('brick', 'assets/images/brick.png');
    }

    create() {
        this.game.state.start('play');
    }
}
