// Declarations
var playerOne //Player One
var spriteThree //Player One Projectile
var playerTwo //Player Two
var spriteFive //Player Two projectile
var playerThree //Player Three
var playerThreeProjectile //Player Three Projectile

var projectiles
var speed
var size
var powerUpSize
var angle

//Angle the Players face
var cursorAngle 
var cursorAngleTwo
var cursorAngleThree

var playerOneScore
var playerTwoScore
var playerThreeScore

var emojis
var projectileSpawned
var playerTwoProjectileSpawned
var playerThreeProjectileSpawned

var emojiKilled

var powerUpPickedUp
var playerTwoPowerUpPickedUp
var playerThreePowerUpPickedUp

var numOfEmojis
var numOfPowerUps
var emojiRespawn
var powerUpRespawn

//Icons for Win State
var playerIconPlayerOne
var playerIconPlayerTwo
var playerIconPlayerThree
var oneIcon
var twoIcon
var threeIcon
var trophy
var skull
var skull2

// For displaying Player Score
var convertedPlayerOneScore
var convertedPlayerTwoScore
var convertedPlayerThreeScore

var playerWon //Whether a Player has won or not

var drawCounter //For Emoji Respawns
var powerUpCounter //For PowerUp Respawns

//PowerUp Duration Timers
var playerOnePowerUpCounter
var playerTwoPowerUpCounter
var playerThreePowerUpCounter

function preload() { //Preloads asset images
  spriteOneImg = loadImage('assets/thinkingEmoji.png');
  spriteThreeImg = loadImage("assets/projectile.png");
  spriteFourImg = loadImage("assets/powerUp.png");
  
  spriteTwoImg = loadImage("assets/player1.png");
  spriteFiveImg = loadImage("assets/player2.png");
  spriteSixImg = loadImage("assets/player3.png");
  
  playerIconImage = loadImage("assets/playerIcon.png");
  oneIconImage = loadImage("assets/playerOneIcon.png");
  twoIconImage = loadImage("assets/playerTwoIcon.png");
  threeIconImage = loadImage("assets/playerThreeIcon.png");
  
  trophyImage = loadImage("assets/trophy.png");
  skullImage = loadImage("assets/skullAndCrossbones.png")

  loadKeySprites();
}

function setup() {
  createCanvas(1250, 750); //Set size of playable screen 
  
  background(0);
  
  playerWon = false;
  
  //Create Player One
  playerOne = createSprite(width/4, height/2, 120, 120);
  playerOne.addImage(spriteTwoImg);
  playerOne.scale = 0.25
  cursorAngle = 0;
  playerOne.rotation = 45;
  
  //Create Player Two
  playerTwo = createSprite(width/2, height/2, 36, 36);
  playerTwo.addImage(spriteFiveImg);
  playerTwo.scale = 0.25;
  cursorAngleTwo = 0;
  playerTwo.rotation = 45;
  
  //Create Player Three
  playerThree = createSprite((width) - (width/4), height/2, 36, 36);
  playerThree.addImage(spriteSixImg);
  cursorAngleThree = 0;
  playerThree.scale = 0.25;
  playerThree.rotation = 45;

  //Create Sprite Groups
  projectiles = new Group();
  emojis = new Group();
  powerUps = new Group();
  
  for (var i = 0; i < 10; i++) { //Create first set of Emojis
    angle = random(360);
    speed = random(2, 3);
    size = 120; //Default 120, fix emoji size
    
    var newEmoji = createSprite(random(((size/2) + 1), width - ((size/2) - 1)), random(((size/2) + 1), height - ((size/2) - 1)), size, size);
    
    emojis.add(newEmoji);
    emojis[i].setSpeed(speed, angle);
    emojis[i].rotationSpeed = random(-4, 4);
    emojis[i].addImage(spriteOneImg);
    emojis[i].scale = 0.25;
  }
  
  for (var i = 0; i < 3; i++) { //Create PowerUps
    angle = random(360);
    speed = random(2, 3);
    powerUpSize = 120;
    
    var newPowerUp = createSprite(random(((powerUpSize/2) + 1), height - ((powerUpSize/2) - 1)), powerUpSize, powerUpSize);
    
    powerUps.add(newPowerUp);
    powerUps[i].setSpeed(speed, angle);
    powerUps[i].addImage(spriteFourImg);
    powerUps[i].scale = 0.25;
  }
  
  //Set Player Score Values
  playerOneScore = 0;
  playerTwoScore = 0;
  playerThreeScore = 0;
  
  //Set respawn values
  numOfEmojis = emojis.length;
  drawCounter = 0;
  emojiRespawn = false;
  
  numOfPowerUps = powerUps.length;
  powerUpRespawn = false;
  
  powerUpCounter = 0;
  playerOnePowerUpCounter = 0;
  playerTwoPowerUpCounter = 0;
  playerThreePowerUpCounter = 0;
  
  //Set Score Screens
  
  //Player One
  oneIcon = createSprite((width / 4), (height - 24), 120, 120);
  oneIcon.addImage(oneIconImage);
  oneIcon.scale = 0.25;
  playerIconPlayerOne = createSprite((width / 4) - 36, (height - 24), 120, 120);
  playerIconPlayerOne.addImage(playerIconImage);
  playerIconPlayerOne.scale = 0.25;
  
  //Player Two
  twoIcon = createSprite((width / 2), (height - 24), 120, 120);
  twoIcon.addImage(twoIconImage);
  twoIcon.scale = 0.25;
  playerIconPlayerTwo = createSprite((width / 2) - 36, (height - 24), 120, 120);
  playerIconPlayerTwo.addImage(playerIconImage);
  playerIconPlayerTwo.scale = 0.25;
  
  //Player Three
  threeIcon = createSprite((width) - (width / 4), (height - 24), 120, 120);
  threeIcon.addImage(threeIconImage);
  threeIcon.scale = 0.25;
  playerIconPlayerThree = createSprite((width) - (width / 4) - 36, (height - 24), 120, 120);
  playerIconPlayerThree.addImage(playerIconImage);
  playerIconPlayerThree.scale = 0.25;
  
} function draw() {
  background(0);
  
  if (powerUpPickedUp == true) { 
    playerOnePowerUpCounter += 1;
    if (playerOnePowerUpCounter == 1000) {
      powerUpPickedUp = false;
      playerOnePowerUpCounter = 0;
    }
  }
  
  if (playerTwoPowerUpPickedUp == true) {
    playerTwoPowerUpCounter += 1;
    if (playerTwoPowerUpCounter == 1000) {
      playerTwoPowerUpPickedUp = false;
      playerTwoPowerUpCounter = 0;
    }
  }
    
  if (playerThreePowerUpPickedUp == true) {
    playerThreePowerUpCounter += 1;
    if (playerThreePowerUpCounter == 1000) {
      playerThreePowerUpPickedUp = false;
      playerThreePowerUpCounter = 0;
    }
  }
    
  //Display Scores
  
  //Display Player One Score
  convertedPlayerOneScore = playerOneScore.toString();
  printEmojiText(convertedPlayerOneScore, (width / 4) + 24, (height - 36), 24);
  
  //Display Player Two Score
  convertedPlayerTwoScore = playerTwoScore.toString();
  printEmojiText(convertedPlayerTwoScore, (width /2) + 24, (height - 36), 24);
  
  //Display Player Three Score
  convertedPlayerThreeScore = playerThreeScore.toString();
  printEmojiText(convertedPlayerThreeScore, (width) - ((width / 4) - 24), (height - 36), 24);
  
  if (emojis.length < numOfEmojis / 2) { //Respawn 5 Emojis
   emojiRespawn = true;
  }
  
  if (emojiRespawn == true) {
    i = emojis.length
    drawCounter += 1;
    if (drawCounter == 100 || drawCounter == 200 || drawCounter == 300 || drawCounter == 400 || drawCounter == 500 || drawCounter == 600) {
      
      angle = random(360);
      speed = random(2, 3);
      size = 120; //Default 36, fix emoji size

      newEmoji = createSprite(random(((size/2) + 1), width - ((size/2) - 1)), random(((size/2) + 1), height - ((size/2) - 1)), size, size);

      emojis.add(newEmoji);
      emojis[i].setSpeed(speed, angle);
      emojis[i].rotationSpeed = random(-4, 4);
      emojis[i].addImage(spriteOneImg);
      emojis[i].scale = 0.25;
      
      i += 1; //Incrementer
      
    } else if (drawCounter == 840) {
      drawCounter = 0;
      emojiRespawn = false;
    }
  }
  
  if (powerUps.length < 1) { //Respawn 2 PowerUps 
    powerUpRespawn = true;
  }

  if (powerUpRespawn == true) {
    i = powerUps.length
    powerUpCounter += 1;
    if (powerUpCounter == 750 || powerUpCounter == 1500 || powerUpCounter == 2250) {

      angle = random(360);
      speed = random(2, 3);
      powerUpSize = 30;

      newPowerUp = createSprite(random(((powerUpSize/2) + 1), height - ((powerUpSize/2) - 1)), powerUpSize, powerUpSize);

      powerUps.add(newPowerUp);
      powerUps[i].setSpeed(speed, angle);
      powerUps[i].addImage(spriteFourImg);
      powerUps[i].scale = 0.25;

      i += 1; //Incrementer

    } else if (powerUpCounter == 3000) {
      powerUpCounter = 0;
      powerUpRespawn = false;
    }
  }
  
  //Set Cursor speed, angle, and rotation speed
  playerOne.setSpeed(0, cursorAngle);
  playerOne.rotationSpeed = 0;
  
  playerTwo.setSpeed(0, cursorAngleTwo);
  playerTwo.rotationSpeed = 0;
  
  playerThree.setSpeed(0, cursorAngleThree);
  playerThree.rotationSpeed = 0;
  
  //Spawn Projectile for Player One
  if (keyWentDown("e") == true) { //Shoots Projectile
    if (projectileSpawned == true) {
      removeSprite(spriteThree);
    }
    spriteThree = createSprite(playerOne.position.x, playerOne.position.y, 120, 120);
    spriteThree.addImage(spriteThreeImg);
    spriteThree.scale = 0.20;
    if (powerUpPickedUp == true) {
      spriteThree.setSpeed(6, cursorAngle);
    } else {
      spriteThree.setSpeed(3, cursorAngle);
    }
    spriteThree.rotation = (playerOne.rotation - 135);
    projectileSpawned = true;
  }
  
  //Spawn Projectile for Player Two
  if (keyWentDown("y") == true) { //Shoots Projectile
    if (playerTwoProjectileSpawned == true) {
      removeSprite(spriteFive);
    }
    spriteFive = createSprite(playerTwo.position.x, playerTwo.position.y, 120, 120);
    spriteFive.addImage(spriteThreeImg);
    spriteFive.scale = 0.20;
    if (playerTwoPowerUpPickedUp == true) {
      spriteFive.setSpeed(6, cursorAngleTwo);
    } else {
      spriteFive.setSpeed(3, cursorAngleTwo);
    }
    spriteFive.rotation = (playerTwo.rotation - 135);
    playerTwoProjectileSpawned = true;
  }
  
  //Spawn Projectile for Player Three
  if (keyWentDown("o") == true) { //Shoots Projectile
    if (playerThreeProjectileSpawned == true) {
      removeSprite(playerThreeProjectile);
    }
    playerThreeProjectile = createSprite(playerThree.position.x, playerThree.position.y, 120, 120);
    playerThreeProjectile.addImage(spriteThreeImg);
    playerThreeProjectile.scale = 0.20;
    if (playerThreePowerUpPickedUp == true) {
      playerThreeProjectile.setSpeed(6, cursorAngleThree);
    } else {
      playerThreeProjectile.setSpeed(3, cursorAngleThree);
    }
    playerThreeProjectile.rotation = (playerThree.rotation - 135);
    playerThreeProjectileSpawned = true;
  }
  
  // If Emoji is killed by Player One
  if (projectileSpawned == true) {
    for (var i = 0; i < emojis.length; i++) {
      if (spriteThree.overlap(emojis[i])) {
        emojis[i].remove();
        removeSprite(spriteThree);
        if (playerWon == false) {
          playerOneScore += 1;
        }
      }
    }
  }
  
  // If Emoji is killed by Player Two
  if (playerTwoProjectileSpawned == true) {
    for (var i = 0; i < emojis.length; i++) {
      if (spriteFive.overlap(emojis[i])) {
        emojis[i].remove();
        removeSprite(spriteFive);
        if (playerWon == false) {
          playerTwoScore += 1;
        }
      }
    }
  }
  
  // If Emoji is killed by Player Three
  if (playerThreeProjectileSpawned == true) {
    for (var i = 0; i < emojis.length; i++) {
      if (playerThreeProjectile.overlap(emojis[i])) {
        emojis[i].remove();
        removeSprite(playerThreeProjectile);
        if (playerWon == false) {
          playerThreeScore += 1;
        }
      }
    }
  }
  
  // If Power Up is picked up by Player One
  if (projectileSpawned == true) {
    for (var i = 0; i < powerUps.length; i++) {
      if (spriteThree.overlap(powerUps[i])) {
        powerUps[i].remove();
        removeSprite(spriteThree);
        powerUpPickedUp = true;
      }
    }
  }
  
  // If Power Up is picked up by Player Two
  if (playerTwoProjectileSpawned == true) {
    for (var i = 0; i < powerUps.length; i++) {
      if (spriteFive.overlap(powerUps[i])) {
        powerUps[i].remove();
        removeSprite(spriteFive);
        playerTwoPowerUpPickedUp = true;
      }
    }
  }
  
  // If Power Up is picked up by Player Three
  if (playerThreeProjectileSpawned == true) {
    for (var i = 0; i < powerUps.length; i++) {
      if (playerThreeProjectile.overlap(powerUps[i])) {
        powerUps[i].remove();
        removeSprite(playerThreeProjectile);
        playerThreePowerUpPickedUp = true;
      }
    }
  }
  
  for (var i = 0; i < emojis.length; i++) {
  //Screen Edge Colliders
    colliderRight = (width) - ((size / 2) / 4); //Defines Emoji hitbox for Right Screen Edge Collider
    if (emojis[i].position.x > (colliderRight)) { //Right Screen Edge Collider
      emojis[i].position.x = colliderRight - 2.5;
      angle = random(91, 269);
      emojis[i].setSpeed(random(2 ,3), angle);
    } colliderBottom = height - ((size / 2) / 4); //Defines Emoji hitbox for Bottom Screen Edge Collider
    if (emojis[i].position.y > (colliderBottom)) { //Bottom Screen Edge Collider
      emojis[i].position.y = colliderBottom - 2.5;
      angle = random(181, 359);
      emojis[i].setSpeed(random(2 ,3), angle);
    } colliderLeft = ((size / 2) / 4); //Defines Emoji hitbox for Left Screen Edge Collider
    if (emojis[i].position.x < colliderLeft) { //Left Screen Edge Collider
      emojis[i].position.x = colliderLeft + 2.5;
      angle = random(271, 450);
      emojis[i].setSpeed(random(2 ,3), angle);
    } colliderTop = 0 + ((size / 2) / 4); //Defines Emoji hitbox for Top Screen Edge Collider
    if (emojis[i].position.y < colliderTop) { //Top Screen Edge Collider
      emojis[i].position.y = colliderTop + 2.5;
      angle = random(1, 179);
      emojis[i].setSpeed(random(2 ,3), angle);
    }
  }
  
  for (var i = 0; i < powerUps.length; i++) {
    //Screen Edge Colliders
    colliderRight = (width) - ((powerUpSize / 2) / 4); //Defines Emoji hitbox for Right Screen Edge Collider
    if (powerUps[i].position.x > (colliderRight)) { //Right Screen Edge Collider
      powerUps[i].position.x = colliderRight - 2.5;
      angle = random(91, 269);
      powerUps[i].setSpeed(random(2 ,3), angle);
    } colliderBottom = height - ((powerUpSize / 2) / 4); //Defines Emoji hitbox for Bottom Screen Edge Collider
    if (powerUps[i].position.y > (colliderBottom)) { //Bottom Screen Edge Collider
      powerUps[i].position.y = colliderBottom - 2.5;
      angle = random(181, 359);
      powerUps[i].setSpeed(random(2 ,3), angle);
    } colliderLeft = ((powerUpSize / 2) / 4); //Defines Emoji hitbox for Left Screen Edge Collider
    if (powerUps[i].position.x < colliderLeft) { //Left Screen Edge Collider
      powerUps[i].position.x = colliderLeft + 2.5;
      angle = random(271, 450);
      powerUps[i].setSpeed(random(2 ,3), angle);
    } colliderTop = 0 + ((powerUpSize / 2) / 4); //Defines Emoji hitbox for Top Screen Edge Collider
    if (powerUps[i].position.y < colliderTop) { //Top Screen Edge Collider
      powerUps[i].position.y = colliderTop + 2.5;
      angle = random(1, 179);
      powerUps[i].setSpeed(random(2 ,3), angle);
    }
  }
  
  //Controls player one
  if (keyDown("w") == true) { //Moves Cursor Up
    if (powerUpPickedUp == true) {
      playerOne.setSpeed(2, cursorAngle);
    } else {
      playerOne.setSpeed(1, cursorAngle);
    }
  } if (keyDown("d") == true) { //Rotates Cursor Right
    if (keyDown("a") != true) {
      playerOne.rotationSpeed = +1.25; // If rotation speed is changed, change projectile spawns appropriately 
      cursorAngle += 1.25;
    }
  } if (keyDown("s") == true) { //Moves Cursor Down
    if (powerUpPickedUp == true) {
      playerOne.setSpeed(2, cursorAngle - 180);
    } else {
      playerOne.setSpeed(1, cursorAngle - 180);
    }
  } if (keyDown("a") == true) { //Rotates Cursor Left
    if (keyDown("d") != true) {
      playerOne.rotationSpeed = -1.25; // If rotation speed is changed, change projectile spawns appropriately 
      cursorAngle -= 1.25;
    }
  }
  
  //Controls player Two
  if (keyDown("t") == true) { //Moves Cursor Up
    if (playerTwoPowerUpPickedUp == true) {
      playerTwo.setSpeed(2, cursorAngleTwo);
    } else {
      playerTwo.setSpeed(1.25, cursorAngleTwo);
    }
  } if (keyDown("h") == true) { //Rotates Cursor Right
    if (keyDown("f") != true) {
      playerTwo.rotationSpeed = +1.25; // If rotation speed is changed, change projectile spawns appropriately 
      cursorAngleTwo += 1.25;
    }
  } if (keyDown("g") == true) { //Moves Cursor Down
    if (playerTwoPowerUpPickedUp == true) {
      playerTwo.setSpeed(2, cursorAngleTwo - 180);
    } else {
      playerTwo.setSpeed(1.25, cursorAngleTwo - 180);
    }
  } if (keyDown("f") == true) { //Rotates Cursor Left
    if (keyDown("h") != true) {
    playerTwo.rotationSpeed = -1.25; // If rotation speed is changed, change projectile spawns appropriately 
    cursorAngleTwo -= 1.25;
    }
  }
  
  //Controls Player Three
  if (keyDown("i") == true) { //Moves Cursor Up
    if (playerThreePowerUpPickedUp == true) {
      playerThree.setSpeed(2, cursorAngleThree);
    } else {
      playerThree.setSpeed(1.25, cursorAngleThree);
    }
  } if (keyDown("l") == true) { //Rotates Cursor Right
    if (keyDown("j") != true) {
      playerThree.rotationSpeed = +1.25; // If rotation speed is changed, change projectile spawns appropriately 
      cursorAngleThree += 1.25;
    }
  } if (keyDown("k") == true) { //Moves Cursor Down
    if (playerThreePowerUpPickedUp == true) {
      playerThree.setSpeed(2, cursorAngleThree - 180);
    } else {
      playerThree.setSpeed(1.25, cursorAngleThree - 180);
    }
  } if (keyDown("j") == true) { //Rotates Cursor Left
    if (keyDown("l") != true) {
      playerThree.rotationSpeed = -1.25; // If rotation speed is changed, change projectile spawns appropriately 
      cursorAngleThree -= 1.25;
    }
  }
  
  //Victory Condition
  if (playerOneScore == 20) {
    //console.log("Player One Victory");
        
    trophy = createSprite((width / 4) - 12, (height - 75), 120, 120);
    trophy.addImage(trophyImage);
    trophy.scale = 0.5;
    
    skull = createSprite((width / 2) - 12, (height - 75), 120, 120);
    skull.addImage(skullImage);
    skull.scale = 0.5;
    
    skull2 = createSprite((width) - (width / 4) - 12, (height - 75), 120, 120);
    skull2.addImage(skullImage);
    skull2.scale = 0.5;

    
    playerOneScore += 1;
    
    playerWon = true;
  }
    
  if (playerTwoScore == 20) {
    //console.log("Player Two Victory");
      
    skull = createSprite((width / 4) - 12, (height - 75), 120, 120);
    skull.addImage(skullImage);
    skull.scale = 0.5;

    trophy = createSprite((width / 2) - 12, (height - 75), 120, 120);
    trophy.addImage(trophyImage);
    trophy.scale = 0.5;

    skull2 = createSprite((width) - (width / 4) - 12, (height - 75), 120, 120);
    skull2.addImage(skullImage);
    skull2.scale = 0.5;
    
    playerTwoScore += 1;
    
    playerWon = true;
  }
  
  if (playerThreeScore == 20) {
    //console.log("Player Three Victory");
    skull = createSprite((width / 4) - 12, (height - 75), 120, 120);
    skull.addImage(skullImage);
    skull.scale = 0.5;

    skull2 = createSprite((width / 2) - 12, (height - 75), 120, 120);
    skull2.addImage(skullImage);
    skull2.scale = 0.5;

    trophy = createSprite((width) - (width / 4) - 12, (height - 75), 120, 120);
    trophy.addImage(trophyImage);
    trophy.scale = 0.5;
    
    playerThreeScore += 1;
    
    playerWon = true;
  }
  
  drawSprites();  
}