var hotAirBalloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, height;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  console.log(database);

  createCanvas(1500,700);

  hotAirBalloon=createSprite(250,450,150,150);
  hotAirBalloon.addAnimation("hotAirBalloon",balloonImage1);
  hotAirBalloon.scale=0.5;

  var balloonPosition=database.ref('balloon/height');
    balloonPosition.on("value", readHeight, showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    hotAirBalloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    updateHeight(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    hotAirBalloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    updateHeight(10,0);
  }
  else if(keyDown(UP_ARROW)){
    hotAirBalloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    updateHeight(0,-10);
    hotAirBalloon.scale=hotAirBalloon.scale-0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    hotAirBalloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    updateHeight(0,10);
    hotAirBalloon.scale=hotAirBalloon.scale+0.005;
  }


  drawSprites();
}
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);

function readHeight(data){
  height=data.val();
  console.log(height.x);
  hotAirBalloon.x=height.x;
  hotAirBalloon.y=height.y;
}

function updateHeight(x, y){
  database.ref('balloon/height').set(
    {'x':height.x + x,
    'y': height.y + y
})
}

function showError(){
  console.log("error in writing to the database");
}
