class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 25;
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
    fill(125); // Colour Yellow
    
    // Spaceship triangle
    triangle(this.location.x - this.size / 2, this.location.y + this.size / 2,
        this.location.x + this.size / 2, this.location.y + this.size / 2,
        this.location.x, this.location.y - this.size / 2);

    // Spaceship body
    rect(this.location.x - this.size / 2, this.location.y + this.size / 2, this.size, this.size);

    fill(200,0,0); // Spaceship colour

    // Left wing
    triangle(this.location.x-this.size / 2, this.location.y + (this.size * 1.5),
            this.location.x-1.5*(this.size / 2), this.location.y + (this.size * 1.5),
            this.location.x- this.size / 2, this.location.y + this.size);

    // Right wing
    triangle(this.location.x + 1.5 * (this.size / 2), this.location.y + (this.size * 1.5),
            this.location.x + this.size / 2, this.location.y + (this.size * 1.5),
            this.location.x + this.size / 2, this.location.y + this.size );

    
    //back thrusters
    rect(this.location.x - this.size / 2.5, this.location.y + 1.5 * (this.size), this.size / 4,this.size / 2);
    
    //back thrusters
    rect(this.location.x + this.size / 5, this.location.y + 1.5 * (this.size), this.size / 4,this.size / 2);

    push();
      fill(255);
      let angle = radians(90);
      translate(
                this.location.x - this.size / 10, 
                this.location.y + this.size / 1.5 );  // Location of the text
      rotate(angle);                               // Rotates the text 
      textSize(5);                                   // Font size
      text("NASA", 0, 0);                            // Draws "Nasa" on the spaceship
    pop();

  }

  move(){
      // YOUR CODE HERE (4 lines)
      this.velocity.add(this.acceleration);         // We add accelaration to the spaceship
      this.location.add(this.velocity);             // We add velocity to the spaceship
      this.acceleration.mult(0.01);                 // Accelaration of the spaceship
      this.velocity.limit(this.maxVelocity);        // Limit's the spaceship velocity
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
    fill(251, 206, 177)
      if (keyIsDown(LEFT_ARROW)) {                      // If pressed left key turn left     
        this.applyForce(createVector(-0.05, 0));        // Applies force making it move to the left
        rect(this.location.x + this.size / 2.3,     
              this.location.y + this.size / 1.2, 5, 5); // Draws a rectangle that simulates engine thruster on the right side of the rocket.
      };
      
      
      if (keyIsDown(RIGHT_ARROW)) {                     // If pressed right key turn right
        this.applyForce(createVector(0.05, 0));         // Applies force making it move to the left
        rect(this.location.x - this.size / 1.7,     
              this.location.y + this.size / 1.2, 5,5);  // Draws a rectangle that simulates engine thruster on the left side of the rocket.
      }
      

      if (keyIsDown(UP_ARROW)) {                        // If pressed up key go foward
        this.applyForce(createVector(0, -0.05));        // Applies force making it move to the forward
        fill(251, 206, 177);
        triangle(this.location.x - this.size / 2.75, this.location.y + 2.2 * (this.size),
                  this.location.x - this.size / 2.5, this.location.y + 2 * (this.size),
                  this.location.x - this.size / 4, this.location.y + 2 * (this.size));  // Draws two triangles that simulates engine thruster on back of the rocket.

        triangle(this.location.x + this.size / 5, this.location.y + 2 * (this.size),
                  this.location.x + this.size / 2.5, this.location.y + 2 * (this.size),
                  this.location.x + this.size / 3, this.location.y + 2.2 * (this.size)); //2nd thruster
      }


      if (keyIsDown(DOWN_ARROW)) {                      // If pressed down key go backwards
        this.applyForce(createVector(0, 0.05))          // Applies force making it move backwars
        rect(this.location.x - this.size / 3,           // Draws two rectangle that simulates engine thruster on the front of the rocket.
              this.location.y, 3, 3)

        rect(this.location.x + this.size / 4, 
              this.location.y, 3, 3)
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    //YOUR CODE HERE (6 lines approx)

    var gravity = createVector(0, 0.05);  // Declaring the variable gravity with the direction of the vector
    this.applyForce(gravity);             // Will pull the oject down
    var friction = this.velocity.copy();  // Copies tge direction of the velocity
    friction.mult(-1);                    // To get the oposite direction. 
    friction.normalize();                 // We need to normalise, otherwise the object just stop's moving. But sets the friction to 1 that is too much.
    friction.mult((this.velocity / 30));  // Creates a force called friction that's 30 times smaller than the velocity of the spaceship
    this.applyForce(friction)             // We apply the friction

    // Testing code //
    // console.log("is inside the athmosphere")

  }
}
