const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
const canvasSize = canvas.width;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = 'RIGHT';
let score = 0;
let fruits = [];
const numFruits = 3;
let gameOver = false;
let gameStarted = false;
let confetti = [];

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    if (event.keyCode === 32 && !gameStarted) { // Leertaste (Space)
        startGame();
    }
    if (gameStarted) {
        const key = event.keyCode;
        if (key === 37 && direction !== 'RIGHT') direction = 'LEFT';
        if (key === 38 && direction !== 'DOWN') direction = 'UP';
        if (key === 39 && direction !== 'LEFT') direction = 'RIGHT';
        if (key === 40 && direction !== 'UP') direction = 'DOWN';
    }
}

function startGame() {
    gameStarted = true;
    document.getElementById('startScreen').classList.add('hidden');
    gameLoop();
}

function drawSnake() {
    snake.forEach(part => {
        const gradient = ctx.createLinearGradient(part.x, part.y, part.x + box, part.y + box);
        gradient.addColorStop(0, '#99ff33');
        gradient.addColorStop(1, '#66ffff');
        ctx.fillStyle = gradient;
        ctx.fillRect(part.x, part.y, box, box);
    });
}

const fruitsEmojis = ['🩷', '💜', '🩵', '🤍'];

function spawnFruits() {
    while (fruits.length < numFruits) {
        const x = Math.floor(Math.random() * (canvasSize / box)) * box;
        const y = Math.floor(Math.random() * (canvasSize / box)) * box;
        const randomEmoji = fruitsEmojis[Math.floor(Math.random() * fruitsEmojis.length)];

        if (!snake.some(part => part.x === x && part.y === y)) {
            fruits.push({ x, y, emoji: randomEmoji });
        }
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function updateScore() {
    document.getElementById('score').innerText = `Punkte: ${score}`;
}

function gameOverMessage() {
    document.getElementById('finalScore').innerText = score;
    document.getElementById('gameOverMessage').style.display = 'block';
}

function createConfetti() {
    const emojis = ['🌸​', '✨', '🌷​', '🌟', '❤️​', '🌈'];
    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
    for (let i = 0; i < 30; i++) { // 200 Konfetti-Teilchen
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const angle = Math.random() * 2 * Math.PI; // Zufälliger Winkel (0 bis 2π)
        const speed = Math.random() * 25 + 15; // Höhere Geschwindigkeit zu Beginn (zwischen 5 und 15)
        const x = centerX + Math.random() * 50 - 25;
        const y = centerY + Math.random() * 50 - 25;
        const speedX = Math.cos(angle) * speed;
        const speedY = Math.sin(angle) * speed;
        const size = Math.random() * 20 + 15; // Größere Konfetti-Teilchen
        const opacity = Math.random() * 0.5 + 0.5; // Zufällige Transparenz (zwischen 0.5 und 1)
        confetti.push({ emoji, x, y, speedX, speedY, size, opacity });
    }
}

function drawConfetti() {
    confetti.forEach((piece, index) => {
        ctx.font = `${piece.size}px Arial`;
        ctx.fillStyle = `rgba(255, 255, 255, ${piece.opacity})`; // Setze Transparenz nur für Konfetti
        ctx.fillText(piece.emoji, piece.x, piece.y);
        
        piece.x += piece.speedX;
        piece.y += piece.speedY;
        piece.size *= 0.98; // Konfetti wird langsam kleiner
        piece.opacity *= 0.98; // Konfetti wird allmählich durchsichtiger
        if (piece.size < 2 || piece.opacity < 0.1) {
            confetti.splice(index, 1); // Entferne Konfetti, wenn es zu klein oder zu durchsichtig wird
        }
    });
}

function drawFruits() {
    fruits.forEach(fruit => {
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black'; // Keine Transparenz für Früchte
        ctx.fillText(fruit.emoji, fruit.x, fruit.y + box);
    });
}

// Anfangsgeschwindigkeit der Schlange (höherer Wert bedeutet langsamer)
let initialSpeed = 200;

function gameLoop() {
    if (gameOver) {
        gameOverMessage();
        return;
    }

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    const head = { ...snake[0] };
    if (direction === 'LEFT') head.x -= box;
    if (direction === 'UP') head.y -= box;
    if (direction === 'RIGHT') head.x += box;
    if (direction === 'DOWN') head.y += box;

    snake.unshift(head);

    const fruitIndex = fruits.findIndex(fruit => fruit.x === head.x && fruit.y === head.y);
    if (fruitIndex !== -1) {
        fruits.splice(fruitIndex, 1);
        score++;
        updateScore();

        if (score % 10 === 0) { // Add confetti every 10 points
            createConfetti();
        }
    } else {
        snake.pop();
    }

    spawnFruits();
    drawFruits();
    drawSnake();
    drawConfetti(); // Draw confetti

    if (checkCollision()) {
        gameOver = true;
    }

    let speed = Math.max(250, initialSpeed - Math.floor(score / 10) * 10);
    setTimeout(gameLoop, speed);
}

spawnFruits();
