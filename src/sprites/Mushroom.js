/* Just leaving this in as an example of a custom Sprite.
   We can make custom sprites for all sprites, but I think
   that might not be worth doing. Probably best just to
   use custom sprites for sprites with actual behavior */

import Phaser from 'phaser';

export default class extends Phaser.Sprite {

  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
  }

  update () {
    this.angle += 1;
  }

}
