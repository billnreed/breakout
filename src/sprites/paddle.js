import Phaser from 'phaser';

export default class extends Phaser.Sprite {
    constructor(game) {
        super(game, 0, 0, 'paddle');

        this.anchor.set(0.5, 0.5);

        game.physics.arcade.enable(this);
        this.body.immovable = true;
    }

    positionInWorld() {
        this.alignIn(this.game.world.bounds, Phaser.BOTTOM_CENTER, 0, -40);
    }
}
