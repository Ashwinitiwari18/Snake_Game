// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const moveSound = new Audio('/music/move.mp3');
const gameoverSound = new Audio('/music/gameover.mp3');
const foodSound = new Audio('/music/food.mp3');
const musicSound = new Audio('/music/music.mp3');
const speed = 12;
let score = 0;
let lastPainTime = 0;
let snakeArr = [
    { x: 20, y: 25 }
];

food = { x: 15, y: 7 };

// Game function
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPainTime) / 1000 < 1 / speed) {
        return;
    }
    lastPainTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 28 || snake[0].x <= 0 || snake[0].y >= 28 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {
    // Updating the snake Array and Food
    if (isCollide(snakeArr)) {
        gameoverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over! Please press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
        // scoreBoxs.innerHTML = "score: " + score;
    }

    // If you have Eaten the food reganret food increment the score
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        // score = 0;
        score += 1;
        if (score > hiScoreval) {
            hiScoreval = score;
            localStorage.setItem("hiScore", JSON.stringify(hiScoreval));
            hiScoreBox.innerHTML = "High score: " + hiScoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 26;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main lodic Start here
musicSound.play();
score = 0;
let hiScore = localStorage.getItem('hiScore');
if (hiScore === null) {
    hiScoreval = 0;
    localStorage.setItem('hiScore', JSON.stringify(hiScoreval));
}
else {
    hiScoreval = JSON.parse(hiScore);
    hiScoreBox.innerHTML = 'High Score: ' + hiScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }  // Start the Game
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log("Arrowup");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case 'ArrowDown':
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case 'ArrowLeft':
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case 'ArrowRight':
            console.log("ArrowRight");
            inputDir.x = 1
            inputDir.y = 0;
            break;
        default:
            break;
    }
});