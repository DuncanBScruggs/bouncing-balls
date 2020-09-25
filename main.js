// This script gets a reference to the <canvas> element, then calls the getContext() method on it to give us a context on which we can start to draw. 
const canvas = document.querySelector('canvas');

// The resulting constant (ctx) is the object that directly represents the drawing area of the canvas and allows us to draw 2D shapes on it.
const ctx = canvas.getContext('2d');

// Width and height of the canvas element (represented by the canvas.width and canvas.height properties) to equal the width and height of the browser viewport.
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// This function takes two numbers as arguments, and returns a random number in the range between the two.
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }

// This handles the properties of the balls
  function Ball(x, y, velX, velY, color, size, count) {
    
    this.x = x; // The horizontal and vertical coordinates where the ball starts on the screen. 
    this.y = y; // This can range between 0 (top left hand corner) to the width and height of the browser viewport (bottom right hand corner).
    this.velX = velX; // each ball is given a horizontal and vertical velocity;
    this.velY = velY; // in real terms these values are regularly added to the x/y coordinate values when we animate the balls, to move them by this much on each frame.
    this.color = color; //each ball gets a color.
    this.size = size; // each ball gets a size — this is its radius, in pixels.
    this.count = count;
  }

// tell the ball to draw itself onto the screen, by calling a series of members of the 2D canvas context we defined earlier (ctx).
  Ball.prototype.draw = function() {
    ctx.beginPath(); // to state that we want to draw a shape on the paper.
    ctx.fillStyle = this.color; // to define what color we want the shape to be — we set it to our ball's color property.
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // method to trace an arc shape on the paper.
    ctx.font = "50px serif";
    ctx.textAlign = "center";
    ctx.fillText(this.count, this.x, this.y - 20);
    ctx.fill(); // which basically states "finish drawing the path we started with beginPath(), and fill the area it takes up with the color we specified earlier in fillStyle."
  }


  Ball.prototype.update = function() {
    // first four parts of the function check whether the ball has reached the edge of the canvas. 
    // If it has, we reverse the polarity of the relevant velocity to make the ball travel in the opposite direction.
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    // The last two lines add the velX value to the x coordinate, and the velY value to the y coordinate — the ball is in effect moved each time this method is called.
    this.x += this.velX;
    this.y += this.velY;
  }

  // Collision detection so we know when they have hit another ball.
  Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        // now changes size of ball when collision is detected
        if (distance < this.size + balls[j].size) {
          balls[j].size = this.size = random(10,20);
          balls[j].count = this.count++;
        }
      }
    }
  }

  let balls = [];
// The while loop creates a new instance of our Ball() using random values generated with our random() function,
// then push()es it onto the end of our balls array, but only while the number of balls in the array is less than 25.
while (balls.length < 25) {
  let size = random(10,20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + 255 + ',' + 130 + ',' + 0 +')', size, 0
  );

  balls.push(ball);
}

function loop() {
    ctx.fillStyle = 'rgba(88, 89, 91)';
    ctx.fillRect(0, 0, width, height);
  
    for (let i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  
    requestAnimationFrame(loop);
  }

  loop();