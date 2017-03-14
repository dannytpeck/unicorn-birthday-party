import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

class SplashState extends Phaser.State {
  init() {}

  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    //
    // load your assets
    //
    this.load.image('sky', 'assets/images/sky.png');
    this.load.image('background', 'assets/images/background2.png');
    this.load.image('ground', 'assets/images/platform.png');
    this.load.image('star', 'assets/images/star.png');
    this.load.image('star2', 'assets/images/star2.png');
    this.load.image('tiles-1', 'assets/images/tiles-1.png');
    
    this.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
    this.load.spritesheet('droid', 'assets/images/droid.png', 32, 32);
    
    this.load.tilemap('level1', 'assets/tiled/level1.json', null, Phaser.Tilemap.TILED_JSON);
  }

  create() {
    this.state.start('Game');
  }

}

export default SplashState;
