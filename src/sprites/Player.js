import Phaser from 'phaser';

class Player extends Phaser.Sprite {

  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);

    // We need to enable physics on the player
    game.physics.arcade.enable(this);

    // Player physics properties
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 1000;
    this.body.maxVelocity.y = 500;
    this.body.setSize(20, 32, 5, 16);

    // Player animations
    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('turn', [4], 20, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);
    
    // Player controls
    this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.facing = 'left';
    this.jumpTimer = 0;
    
    // Saving the variable for use in update()
    this.game = game;
  }

  update() {
    // Reset the players velocity (movement)
    this.body.velocity.x = 0;
    
    // Decrement jumpTimer but not lower than 0
    this.jumpTimer--;
    if (this.jumpTimer < 0) {
      this.jumpTimer = 0;
    }

    if (this.leftKey.isDown) {
      this.body.velocity.x = -150;

      if (this.facing != 'left') {
        this.animations.play('left');
        this.facing = 'left';
      }
    } else if (this.rightKey.isDown) {
      this.body.velocity.x = 150;

      if (this.facing != 'right') {
        this.animations.play('right');
        this.facing = 'right';
      }
    } else {
      if (this.facing != 'idle') {
        this.animations.stop();

        if (this.facing == 'left') {
          this.frame = 0;
        } else {
          this.frame = 5;
        }
        this.facing = 'idle';
      }
    }
    
    if ((this.upKey.isDown || this.jumpKey.isDown) && this.body.touching.down && this.jumpTimer === 0) {
      this.body.velocity.y = -500;
      this.jumpTimer = 60;
    }
  }

}

export default Player;
