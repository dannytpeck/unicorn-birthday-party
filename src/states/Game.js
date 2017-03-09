/* globals __DEV__ */
import Phaser from 'phaser';
import Player from '../sprites/Player';

class GameState extends Phaser.State {
  create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    //this.game.add.sprite(0, 0, 'sky');
    
    // fill entire space with a tiled 'sky' sprite
    this.game.add.tileSprite(0, 0, 1600, 600, 'sky');
    
    // set game world bounds larger than screen
    this.game.world.setBounds(0, 0, 1600, 600);

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();
    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;

    // Here we create the ground.
    let ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);
    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    let ledge = this.platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = this.platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    this.player = new Player(this.game, 32, this.game.world.height - 150, 'dude');
    this.game.add.existing(this.player);

    //  Finally some stars to collect
    this.stars = this.game.add.group();
    //  We will enable physics for any star that is created in this group
    this.stars.enableBody = true;
    //  Here we'll create 12 of them evenly spaced apart
    for (let i = 0; i < 12; i++) {
        //  Create a star inside of the 'stars' group
        let star = this.stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    // The score
    this.score = 0;
    this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '40px', fill: '#000' });
    this.scoreText.font = 'Bangers';
    this.scoreText.padding.set(32, 32);
    
    // Camera code
    //  Notice that the sprite doesn't have any momentum at all,
    //  it's all just set by the camera follow type.
    //  0.1 is the amount of linear interpolation to use.
    //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
  }

  update() {
    // Collide the player and the stars with the platforms
    this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.stars, this.platforms);

    // Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, this.game.world.width - 360, 32);
    }
  }

  collectStar(player, star) {
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
  }
}

export default GameState;
