
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score,gameState,scoreByFood,velocityCoefficient;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);  
  
  scoreByFood = 0;
  
  gameState = 'play';
  
  ground = createSprite(200,345,800,10);
  ground.shapeColor = 'brown';
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation('running',monkey_running);
  monkey.scale = 0.1;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  }


function draw() {
  background('green');
  stroke('white');
  
  if(gameState === 'play'){

    if(keyDown('space') && monkey.y >= 308){
      monkey.velocityY = -12;
    }
    
  spawnObstacle();
  spawnFood();
    
  }
  
  if(obstacleGroup.isTouching(monkey)){
    gameState = 'end';
  }
  
  velocityCoefficient = scoreByFood/10;
  
  obstacleGroup.setVelocityXEach(-(8 + velocityCoefficient));
  foodGroup.setVelocityXEach(-(4 + velocityCoefficient));
  
  if(gameState === 'end'){
    monkey.velocityY += 4;
  }
  
  text("BANANAS EATEN: " + scoreByFood,40,40);
  
      if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      scoreByFood += 1;
      }
  
    
  if(gameState === 'end'){
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    text('PRESS "R" TO RESTART',130,120);
    
    if(keyDown('r')){
      gameState = 'play';
      scoreByFood = 0;
    }
  }

  
  

  monkey.velocityY += 0.8;
  
  monkey.collide(ground);
    

  drawSprites();
}

function spawnObstacle(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(400,320,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}


function spawnFood(){
  var rand = Math.round(random(180,240));
  if(frameCount % 80 === 0){
    banana = createSprite(400,rand,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 100;
    foodGroup.add(banana);
  }
}
