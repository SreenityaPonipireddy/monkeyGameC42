
var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOver; 
var score=0;
var attempts=3;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("obstacle.png"); 
  //gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() { 
  background(0);
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 550,50);
  
  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      player.scale += 0.05
      score = score + 2;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();  
 
    if(obstaclesGroup.isTouching(player)){ 
        gameState = END;
    }
  }else if(gameState === END){

    backgr.velocityX = 0;
    player.visible = false;
    
    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();

    textSize(30);
    fill(255);
    text("Game Over!", 300,220);
  }
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX= -4; 
    
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  //write code here to spawn the obstacles
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX=-(4 + 2*score/100); 
    obstacle.addImage(obstacle_img);
    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

/*
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananasGroup, obstacleGroup;
var score;
var ground;
var survivalTime= 0;
var score=0;
var backImage, back;
var gameState="PLAY";
function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  backImage=loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(400, 400);

//Creating background
back = createSprite(400, 400);
back.addImage("background", backImage);
back.velocityX=-4;
back.x=back.width/2

    //creating monkey!
  monkey = createSprite(80, 315,20,20 );
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.1;

    //creating moving ground  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX=-4;
  ground.x=ground.width/2
  

  //New Groups
  bananasGroup = new Group();
  obstacleGroup = new Group();

}

function draw() {
background("white");
if(gameState==="PLAY"){

    //Making the monkey jump!
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }

  //Adding gravity
      monkey.velocityY = monkey.velocityY + 0.8

  //To stop monkey from falling down
  monkey.collide(ground);
  
  
    //To make sure the ground doesn't go away
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
 
     
       if(bananasGroup.isTouching(monkey)){
        bananasGroup.destroyEach();
        monkey.scale=monkey.scale+0.01;
        score=score+1;
      }
      food();
      obstacles();
      
      
      
      if (back.x < 0){
        back.x = back.width/2;
      }
      
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate())
    text("Survival Time: "+ survivalTime, 100, 50);
    
    
    
    if(obstacleGroup.isTouching(monkey)){
      gameState==="END";
      monkey.velocityX=0;
      monkey.velocityY=0;
      }
    } else if(gameState==="END"){
       background.velocityX=0;
       player.visible=false;
 
       bananasGroup.destroyEach();
       obstaclesGroup.destroyEach();
       textSize(30);
       fill("black");
       text("GAME OVER!!!", 100, 220)
     }
  
   
   
  

  
  drawSprites();
    //Creating score
  

    stroke("white");
    textSize(15);
    fill("white");
    text("Score: "+ score, 100, 100);
  
};

function food() {
  if (frameCount%80 ===0){
    var banana = createSprite(200, 300, 200, 200);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.velocityX=-3;
    banana.scale=0.1;
    banana.lifetime=200;
    
    bananasGroup.add(banana);

  }
}

function obstacles() {
   if (frameCount%300 ===0){
    var obstacle = createSprite(200, 327, 200, 200);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-3;
    obstacle.scale=0.1;
    obstacle.lifetime=200;
    
    obstacleGroup.add(obstacle);

  } 
}
*/

