import level1 from 'data/level1';
import level2 from 'data/level2';
import level3 from 'data/level3';

import Phaser from 'phaser';

class MenuState extends Phaser.State {
  create() {
    const instructionsTextStyle = {
      fill: '#fff',
      font: 'monospace',
      fontSize: '32px',
    };
    const levelTextStyle = {
      fill: '#fff',
      font: 'monospace',
      fontSize: '18px',
    }

    this.instructionsText = this.add.text(0, 0, 'Choose a level', instructionsTextStyle);
    this.instructionsText.alignIn(this.game.world.bounds, Phaser.CENTER, 0, -100);

    this.levelButtonsGroup = new Phaser.Group(this.game);
    this.level1Text = this.make.text(0, 0, 'Level 1', levelTextStyle);
    this.level2Text = this.make.text(0, 0, 'Level 2', levelTextStyle);
    this.level3Text = this.make.text(0, 0, 'Level 3', levelTextStyle);

    this.levelButtonsGroup.inputEnableChildren = true;
    this.levelButtonsGroup.add(this.level1Text);
    this.levelButtonsGroup.add(this.level2Text);
    this.levelButtonsGroup.add(this.level3Text);

    this.add.existing(this.levelButtonsGroup);

    this.levelButtonsGroup.align(3, 1, 150, 40, Phaser.CENTER);
    this.levelButtonsGroup.alignIn(this.game.world.bounds, Phaser.CENTER, 0, 0);

    this.level1Text.events.onInputDown.add(() => this.game.state.start('play', true, false, { levelData: level1 }))
    this.level2Text.events.onInputDown.add(() => this.game.state.start('play', true, false, { levelData: level2 }))
    this.level3Text.events.onInputDown.add(() => this.game.state.start('play', true, false, { levelData: level3 }))
  }
}

export default MenuState;
