
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var count = 0;

var snake = {
    x:160,
    y:160,

    dx:grid,
    dy:0,

    cells:[],

    maxCells:4
};
var apple = {
    x:320,
    y:320,
};
function getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}
function loop(){
    requestAnimationFrame(loop);
    if (++count < 4) {
        return;
    }
    count = 0;
    context.clearRect(0,0,canvas.width,canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0){
        snake.x = canvas.width - grid;
    }else if (snake.x >= canvas.width){
        snake.x = 0;
    }
    if (snake.y < 0){
        snake.y = canvas.height - grid;
    }else if (snake.y >= canvas.height){
        snake.y = 0;
    }
    snake.cells.unshift({x: snake.x, y:snake.y});

    if (snake.cells.length > snake.maxCells){
        snake.cells.pop();
    }
    context.fillStyle = 'blue';
    context.fillRect(apple.x,apple.y,grid-1,grid-1);

    context.fillStyle = 'orange';
    snake.cells.forEach(function (cell, index){
        context.fillRect(cell.x,cell.y,grid-1,grid-1);
        if (cell.x === apple.x && cell.y === apple.y){
            snake.maxCells++;

            apple.x = getRandomInt(0,25) * grid;
            apple.y = getRandomInt(0,25) * grid;
        }
        for (var i = index + 1;i < snake.cells.length; i++){
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y){
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
                apple.x = getRandomInt(0,25) * grid;
                apple.y = getRandomInt(0,25) * grid;
            }
        }
    });
}
document.addEventListener('keydown', function(e){
    if (e.which === 37 && snake.dx === 0){
        snake.dx = -grid;
        snake.dy = 0;
    }else if (e.which === 38 && snake.dy === 0){
        snake.dy = -grid;
        snake.dx = 0;
    }else if (e.which === 39 && snake.dx === 0){
        snake.dx = grid;
        snake.dy = 0;
    }else if (e.which === 40 && snake.dy === 0){
        snake.dy = grid;
        snake.dx = 0;
    }
});
requestAnimationFrame(loop);

/*
import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")

let lastTime
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        const hue = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--hue")
        )

        document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

        if (isLose()) handleLose()
    }

    lastTime = time
    window.requestAnimationFrame(update)
}

function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
    const rect = ball.rect()
    if (rect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()
}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)
*/
