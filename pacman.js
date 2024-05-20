const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
 
let pacMan = { x: 0, y: 0, size: 20 };
let points = [];
let score = 0;
let ghosts = [];
let gameInterval;
let superPointActive = false;
 
function initGame() {
    pacMan.x = Math.floor(Math.random() * (canvas.width - pacMan.size));
    pacMan.y = Math.floor(Math.random() * (canvas.height - pacMan.size));
    points = generatePoints(10);
    ghosts = generateGhosts(3);
    score = 0;
    superPointActive = false;
    gameInterval = setInterval(gameLoop, 100);
}
 
function generatePoints(num) {
    let pointsArray = [];
    for (let i = 0; i < num; i++) {
        pointsArray.push({
            x: Math.floor(Math.random() * (canvas.width - 10)),
            y: Math.floor(Math.random() * (canvas.height - 10)),
            size: 10,
            isSuper: Math.random() < 0.1
        });
    }
    return pointsArray;
}
 
function generateGhosts(num) {
    let ghostsArray = [];
    for (let i = 0; i < num; i++) {
        ghostsArray.push({
            x: Math.floor(Math.random() * (canvas.width - 20)),
            y: Math.floor(Math.random() * (canvas.height - 20)),
            size: 20
        });
    }
    return ghostsArray;
}
 
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPacMan();
    drawPoints();
    drawGhosts();
    checkCollisions();
}
 
function drawPacMan() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(pacMan.x, pacMan.y, pacMan.size, pacMan.size);
}
 
function drawPoints() {
    points.forEach(point => {
        ctx.fillStyle = point.isSuper ? 'blue' : 'white';
        ctx.fillRect(point.x, point.y, point.size, point.size);
    });
}
 
function drawGhosts() {
    ghosts.forEach(ghost => {
        ctx.fillStyle = superPointActive ? 'lightblue' : 'red';
        ctx.fillRect(ghost.x, ghost.y, ghost.size, ghost.size);
    });
}
 
function checkCollisions() {
    points = points.filter(point => {
        if (isColliding(pacMan, point)) {
            score += point.isSuper ? 50 : 10;
            if (point.isSuper) {
                superPointActive = true;
                setTimeout(() => superPointActive = false, 5000);
            }
            return false;
        }
        return true;
    });
 
    ghosts.forEach(ghost => {
        if (isColliding(pacMan, ghost)) {
            if (superPointActive) {
                ghosts = ghosts.filter(g => g !== ghost);
            } else {
                clearInterval(gameInterval);
                alert('Game Over! Your score: ' + score);
            }
        }
    });
}
 
function isColliding(a, b) {
    return a.x < b.x + b.size &&
           a.x + a.size > b.x &&
           a.y < b.y + b.size &&
           a.y + a.size > b.y;
}
 
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            pacMan.y -= 10;
            break;
        case 'ArrowDown':
            pacMan.y += 10;
            break;
        case 'ArrowLeft':
            pacMan.x -= 10;
            break;
        case 'ArrowRight':
            pacMan.x += 10;
            break;
    }
});
 
