/*jshint esversion: 6 */

//canvas setup
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;
let canvasPosition = canvas.getBoundingClientRect();
let mousex = 0;
let mousey = 0;
let tower = 0;


const speed = 60;
const tileSize = 20;
const tilesX = canvas.width / tileSize;
const tilesY = canvas.height / tileSize;

//game loop
function drawGame() {
  checkMousePos();
  clearScreen();
  if(tower != 0) {
    tower.shoot();
  }

  setTimeout(drawGame, 1000/speed);
}

function clearScreen() {
  ctx.fillStyle = 'grey';
  ctx.fillRect(0,0,canvas.width, canvas.height);
  for(var x=0;x<tilesX;x++) {
    for(var y=0;y<tilesY;y++) {
            //mouse position hover
            if(mousex > x * tileSize && mousex < (x * tileSize) + tileSize && mousey > y * tileSize && mousey < (y * tileSize) + tileSize) {
              ctx.fillStyle = "rgba(0,0,0,0.2)";
              ctx.fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
            } else {
              ctx.strokeStyle = "rgba(0,0,0,0.1)";
              ctx.strokeRect(x*tileSize,y*tileSize,tileSize,tileSize);
            }

            //check tower;
            if(tower != 0) {
              if(tower.x > x * tileSize && tower.x < (x * tileSize) + tileSize && tower.y > y * tileSize && tower.y < (y * tileSize) + tileSize) {
                ctx.fillStyle = "rgba(0,0,0,0.2)";
                ctx.fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
              }
            }

    }
  }
}

function checkMousePos() {
  canvas.addEventListener('mousemove', function(event){
    mousex = event.x - canvasPosition.left;
    mousey = event.y - canvasPosition.top;
  });
}

canvas.addEventListener('mousedown', function(event) {
  tower = new Tower();
  tower.x = event.x - canvasPosition.left;
  tower.y = event.y - canvasPosition.top;
  tower.projectileX = tower.x;
  tower.projectileY = tower.y;
});

//player
class Tower {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.projectileX = 0;
    this.projectileY = 0;
  }

  shoot() {
    const dx = this.projectileX - mousex;
    const dy = this.projectileY - mousey;

    this.projectileX = this.projectileX - dx/30;
    this.projectileY = this.projectileY - dy/30;

    ctx.fillStyle = 'black';
    ctx.fillRect(this.projectileX,this.projectileY,5,5);
  }
}

drawGame();
