//game constants & variables

let inputdir = {
  x: 0,
  y: 0,
};

const foodsound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let speed = 8;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 8, y: 9 };
let score = 0;

//game functions
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;

  gameEngine();
}
function isCollide(snakeArr) {
  //if you bump  in yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }

  }
  //if you bump to wall
  if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
    return true;
  }



}



function gameEngine() {
  // musicSound.play();
  //part1 - updating the snake array and food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputdir = {
      x: 0,
      y: 0,
    };
    alert("Game Over ! Press any key to play again.");


    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
  }
  //if you have eaten food ,increment the snake and regenerate the food
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodsound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("HighScore", JSON.stringify(hiscoreval));
      let HighScoreElement = document.querySelector('#highScoreBox');
      HighScoreElement.innerHTML = 'HighScore ' + hiscoreval;

    }
    scoreBox.innerHTML = "Score:" + score;

    snakeArr.unshift({ x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y });
    let a = 2;
    let b = 16;
    food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
  }

  //moving the snake


  for (let i = snakeArr.length - 2; i >= 0; i--) {

    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputdir.x;
  snakeArr[0].y += inputdir.y;






  //part2 -  display snake and food
  //display snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  // display food
  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);

  //
}

//game logic here....
let HighScore = localStorage.getItem('HighScore');
let hiscoreval = 0;
if (HighScore === null) {

  localStorage.setItem("HighScore", JSON.stringify(hiscoreval))
}
else {
  hiscoreval = JSON.parse(HighScore);
  let HighScoreElement = document.querySelector('#highScoreBox');
  HighScoreElement.innerHTML = 'HighScore: ' + HighScore;

}



window.requestAnimationFrame(main);

window.addEventListener('keydown', (e) => {
  inputdir = { x: 0, y: 1 }; //start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputdir.x = 0;
      inputdir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputdir.x = 0;
      inputdir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputdir.x = -1;
      inputdir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputdir.x = 1;
      inputdir.y = 0;
      break;
    default:
      break;
  }
});
