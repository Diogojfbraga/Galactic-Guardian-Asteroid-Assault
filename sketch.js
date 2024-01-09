var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];

var score = 0;          // Variable that will take the score according with asteroids destructed

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

//Testing Code for checking overlaping into the spaceship

// var mouseLoc = createVector(mouseX, mouseY);
// var mouseSize = createVector(50, 50);
// var circleLoc = createVector(width/2, height/2);
// var circleSize = createVector(100, 100);

// fill(255);
// ellipse(mouseLoc.x, mouseLoc.y, mouseSize.x, mouseSize.y);
// ellipse(circleLoc.x, circleLoc.y, circleSize.x, circleSize.y);

// var overlap = isInside(mouseLoc, mouseSize, circleLoc, circleSize);
// console.log("overlap:", overlap);

///////////////////////////////////

  spaceship.run();
  asteroids.run();

  drawEarth();

  checkCollisions(spaceship, asteroids); // function that detects collision between various elements

  //Status bar
  fill(255);                // Colour
  textSize(25);             // Text Font
  text("Score:", 50, 25);   // Text and location
  text(score, 150, 25)      // Pulls the 
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    for (var i=0; i<asteroids.locations.length; i++){       // Loops through the asterioids
      if (isInside(spaceship.location, spaceship.size, asteroids.locations[i], asteroids.diams[i])==true){  // If between the spaceship and the different asteroids
          gameOver();                                       // Calls gameOver function
      }
  }

    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
    for (var i=0; i<asteroids.locations.length; i++){       // Loops through the asterioids
      if (isInside(earthLoc, earthSize.x, asteroids.locations[i], asteroids.diams[i])==true){   // If between the asteroids touch the eart
          gameOver();                                       // Calls gameOver function
      }
  }

    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
  if(isInside(spaceship.location, spaceship.size, earthLoc, earthSize.x) == true){      // If the spaceship touches the earth     
    gameOver();                                             // Calls gameOver function
  }


    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(spaceship.location, spaceship.size, atmosphereLoc, atmosphereSize.x) == true){  // If the spaceship is inside the atmosphere
      spaceship.setNearEarth();                             // Calls function that detects the spaceship is inside the atmosphere
    }

    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    for (var i =0; i < asteroids.locations.length; i++){              // Loops the asteroids
      for(var j = 0; j < spaceship.bulletSys.bullets.length; j++){    // Loops the bullets
        if (isInside(spaceship.bulletSys.bullets[j], spaceship.bulletSys.diam, asteroids.locations[i], asteroids.diams[i]*2)){  // if the bullets touch the asteroids
          asteroids.destroy(i);                                       // The asteroids are destroyed
          score = score + 1;                                          // We add one point to the score
          break;                                                      // We break this this check because the asteroids has been destroyed
        }
      }
    }
}


//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
    var d = dist(locA.x, locA.y, locB.x, locB.y); // Distance between both objects
    var s = sizeA/2 + sizeB/2;                    // Sum of both objects' radius, size is divided by 2 since size is the diameter 
    if(d < s)                                     // If distance between objects is smaller than sum of both objects' radius, overlap occurs
    {
        return true;
    } else { 
        return false;
    }
    
}



//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}




