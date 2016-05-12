// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 275) + 50);
    //enemy image sprite
    this.sprite = 'images/Donald_Trump.png';

};

var enemy1 = new Enemy(-100, 304);
var enemy2 = new Enemy(-250, 138);
var enemy3 = new Enemy(-200, 221);
var enemy4 = new Enemy(-220, 138);
var enemy5 = new Enemy(-220, 304);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


    //After enemy moves off canvas, randomize its starting location

    this.x = this.x + this.speed * dt;
    if (this.x > 510) {
        this.x = Math.floor((Math.random() * -200) + -100);

    }

};




// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    //player starting location
    this.x = 220;
    this.y = 470;
    //player image sprite
    this.sprite = 'images/BernieSanders.png';

};

Player.prototype.update = function() {
    //Check for collisions with enemy
    this.checkCollisions();

    //If the player makes it past the enemies,
    //play sounds, console.log message and reset

    if (this.y < 80) {
        console.log('You made it to the pool!  Now, relax and have a beer.');
        sounds['sounds/bounce.mp3'].play();
        sounds['sounds/Trump_Good People.mp3'].play();
        this.reset();
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Defines how the player can move around the screen
Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case "left":
            if (this.x > 18) {
                this.x = this.x - 101;
            }
            break;

        case "right":
            if (this.x < 400) {
                this.x = this.x + 101;
            }
            break;

        case 'up':
            if (this.y > 0) {
                this.y = this.y - 83;
            }
            break;

        case "down":
            if (this.y < 400) {
                this.y = this.y + 83;
            }
            break;


    }

};

//Checks for player collision with enemies and
//plays a random Trump sound

Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        var enemy = allEnemies[i];
        if (this.x >= enemy.x + 0 &&
            this.x <= enemy.x + 50 &&
            this.y >= enemy.y + 0 &&
            this.y <= enemy.y + 40) {
            console.log('Sorry.  It seems America is greater without you.');
            sounds['sounds/slime_death.mp3'].play();
            var trump = trumpSounds[Math.floor(Math.random() * trumpSounds.length)];
            sounds[trump].play();
            this.reset();
        }
    }

//Checks for player collision with gem

    if (this.x >= gem.x + 0 &&
        this.x <= gem.x + 50 &&
        this.y >= gem.y + 0 &&
        this.y <= gem.y + 40) {
        console.log("Oh, you lookin' fancy now!");
        gem.update();
    }

};

Player.prototype.reset = function() {
    this.x = 220;
    this.y = 470;
};



//Creates the Gem

var Gem = function() {
    this.loc();
    this.color();

};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Randomizes gem location within specific coordinates

Gem.prototype.loc = function(){
    this.xArray = [18, 119, 220, 321, 422];
    this.x = this.xArray[Math.floor(Math.random() * this.xArray.length)];
    this.yArray = [138, 221, 304];
    this.y = this.yArray[Math.floor(Math.random() * this.yArray.length)];
};

//Randomizes color of gem

Gem.prototype.color = function(){
    this.gemArray = ['images/gem-blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'];
    this.sprite = this.gemArray[Math.floor(Math.random() * this.gemArray.length)];
};

//Updates gem location and color after collision has been detected

Gem.prototype.update = function() {
    sounds['sounds/gem_sound.mp3'].play();
    this.loc();
    this.color();

};


//Instantiation of game objects


var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

var player = new Player();

var gem = new Gem();

var trumpSounds = ['sounds/Trump_Crime.mp3',
            'sounds/Trump_Drugs.mp3',
            'sounds/Trump_Rapists.mp3'];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});