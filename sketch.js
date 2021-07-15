var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock; 
var gameState = "play"; 


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1; 

  ghost = createSprite(100,90); 
  ghost.addImage("ghost",ghostImg); 
  ghost.scale = 0.6; 

  doorsGroup = new Group(); 
  climbersGroup = new Group(); 
  
}

function draw() {
  background(200);

  if (gameState === "play") { 
    if(tower.y > 400){
      tower.y = 300
    }


    if (keyDown("space")) { 
      ghost.velocityY = -8;  
    
    }
    ghost.velocityY = ghost.velocityY + 0.5; 

    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 4; 
    }

    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3; 

    
      
    }

    //spookySound.play(); 

if (climbersGroup.isTouching(ghost)) {
  gameState = "end"; 
  ghost.destroy(); 
  ghost.velocityY = 0; 
}

    spawnDoors(); 
    drawSprites(); 
  }
 

    if (gameState == "end"){
      stroke("purple"); 
      fill("yellow")
      textSize(40);
    text("Game Over",230,250); 
    
    } 
}



function spawnDoors(){
  if (frameCount%200 == 0) {
  var door = createSprite(200,-50); 
  door.addImage("door",doorImg); 
  door.x = Math.round(random(120,400)); 
  door.velocityY = 1; 
  door.depth = ghost.depth; 
  ghost.depth = ghost.depth+1; 
  door.lifetime = 800;
  
  var climber = createSprite(210,10); 
  climber.addImage("climber",climberImg); 
  climber.x = door.x; 
  climber.velocityY = 0.8; 
  climber.lifetime = 800;
  
  doorsGroup.add(door);
  climbersGroup.add(climber); 

}
} 
