class mainScene {
    
    preload() {
        this.load.image('slime', 'assets/Slime.png');
        this.load.image('food', 'assets/Food.png');
    }

    create() {
        this.slime = this.physics.add.sprite(300, 300, 'slime');
        this.food = this.physics.add.sprite(Phaser.Math.Between(350, Phaser.Math.Between(100, 500)), 500, 'food');

        this.slime.setScale(2);
        this.food.setScale(2);

        this.score = 0;
        let style = { font: '20px Arial', fill: '#fff' };

        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);

        this.button = this.input.keyboard.createCursorKeys();

        this.counter = 10;
        this.diff = 1;
    }

    update() {
        this.slime.y += 2;
        this.food.x -= 2;

        if(this.physics.overlap(this.slime, this.food))
            this.hit();
        
        if(this.slime.y <= 0 || this.slime.y >= 600) this.resetslime();
        if(this.food.x <= 0) this.resetfood();

        if(this.button.space.isDown)
            this.counter = 0;
        
        if(this.counter <= 6)
        {
            this.counter += .1 * this.diff;
            if(this.counter < 6)
            {
                this.slime.y -= 2 * this.diff;
                this.diff += .1;
            }
            else 
                this.diff = 1;
        }
    }

    hit() {
        this.food.x = Phaser.Math.Between(350, 900);
        this.food.y = Phaser.Math.Between(100, 500);

        this.score += 1;
        this.scoreText.setText('score: ' + this.score);
    }

    resetslime() {
        this.slime.x = 300;
        this.slime.y = 300;

        this.scoreText.setText('Game Over. Final Score: ' + this.score);
        this.score = 0;
    }

    resetfood() {
        this.food.x = Phaser.Math.Between(100, 900);
        this.food.y = Phaser.Math.Between(100, 700);
    }
}

new Phaser.Game({
    width: 1000, // Width of the game in pixels
    height: 600, // Height of the game in pixels
    backgroundColor: '#3498db', // The background color (blue)
    scene: mainScene, // The name of the scene we created
    physics: { default: 'arcade' }, // The physics engine to use
    parent: 'flappy', // Create the game inside the <div id="game"> 
  });

//   this.tweens.add({
//     targets: this.slime, // on the player 
//     duration: 200, // for 200ms 
//     scaleX: 1.2, // that scale vertically by 20% 
//     scaleY: 1.2, // and scale horizontally by 20% 
//     yoyo: true, // at the end, go back to original scale 
//   });