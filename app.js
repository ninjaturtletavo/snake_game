// initial state
let gameState = {
  canvas: [
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  ],
};

// global variables
let scores = [];
let startGame, snakeCollision, snakeOutOfBounds, newApple, newSnakeHead;
let scoreCounter = 0;

// Multi-Dimensional Array
let snake = {
  // Gives coordinates of Snake
  body: [
    [10, 5],
    [10, 6],
    [10, 7],
    [10, 8],
  ],
  //1st up is -1, down is 1 - COLUMN -- 2nd left is -1, right is 1 - ROW
  nextDirection: [0, -1],
  // apple starting point
  apple: [10, 9],
};

function buildInitialState() {
  pullDefaultScores();
  renderState();
  buildApple();
  buildSnake();
}

// render the state
function renderState() {
  // element for #canvas(html)
  const canvasElement = $("#canvas");
  // removes the content of all <div></div> elements
  canvasElement.empty();

  // looping through gameState.canvas
  // gameState = object, canvas = property
  // rowIndex to keep track of which row we're at = [], [], etc
  gameState.canvas.forEach(function (row, rowIndex) {
    // looping through row, segmentIndex to keep track of which segment we're at = ""
    row.forEach(function (segment, segmentIndex) {
      //creating div with class segment and data attributes x and y
      // rowIndex = x, segemntIndex = y
      const segmentElement = $(
        `<div class="segment" data-x="${rowIndex}" data-y="${segmentIndex}"></div>`
      );
      // appending segmentElement to canvasElement
      canvasElement.append(segmentElement);
    });
  });
}

//creates snake and calls function to create new snake head with new direction
function buildSnake() {
  // goes through div segment and removes snake class
  $(".segment").removeClass("snake");

  newSnakeHead = buildNewSnakeHead();

  // adds new head to beginning of snake and pops end off
  snake.body.unshift(newSnakeHead);
  snake.body.pop();

  snake.body.forEach(function (coordinates) {
    const coordinateX = coordinates[0]; // at start coordinate x 10
    const coordinateY = coordinates[1]; // at start coordinate y 5

    // targeting data-x and data-y attributes and adding class snake
    const segmentElement = $(
      `[data-x="${coordinateX}"][data-y="${coordinateY}"]`
    );
    segmentElement.addClass("snake"); // with addClass() you can target snake in CSS
  });
}

function buildNewSnakeHead() {
  const snakeHead = snake.body[0]; // [10,5] head of snake
  const snakeHeadX = snakeHead[0];
  const snakeHeadY = snakeHead[1];

  // creating new snake heads using coordinates and direction it goes
  const newSnakeHeadX = snakeHeadX + snake.nextDirection[0];
  const newSnakeHeadY = snakeHeadY + snake.nextDirection[1];

  // element with both coordinates for new snake head
  newSnakeHead = [newSnakeHeadX, newSnakeHeadY];

  return newSnakeHead;
}

// building a new apple and placing it randomly on board
function buildApple() {
  // removing apple from canvas board
  $(".segment").removeClass("apple");

  // getting random number and assigning to variables appleX and appleY
  const appleX = getRandomNum();
  const appleY = getRandomNum();

  // new location apple is going to be placed from appleX and appleY
  snake.apple.splice(0, 1, appleX);
  snake.apple.splice(1, 1, appleY);

  // grabbing coordinates x and y and placing them for newApple location
  const appleCoordinateX = snake.apple[0];
  const appleCoordinateY = snake.apple[1];
  newApple = [appleCoordinateX, appleCoordinateY];

  //
  let segmentAppleElement = $(
    `[data-x="${appleCoordinateX}"][data-y="${appleCoordinateY}"]`
  );
  segmentAppleElement.hasClass("snake")
    ? buildApple()
    : segmentAppleElement.addClass("apple");
}

// checking to see if snake ate apple
function checkingSnakeAteApple() {
  let equals =
    newApple.length === newSnakeHead.length &&
    newApple.every(function (element, index) {
      return element === newSnakeHead[index];
    });
  return equals && snakeAteApple();
}

// because it ate an apple, snake will grow and place a new apple on canvas
function snakeAteApple() {
  snake.body.push(newApple);
  buildApple();
  addToScore();
}

// gives a random number to buidApple
function getRandomNum() {
  // can have min, max variables
  // min = Math.ceil(min);
  // max = Math.floor(max);

  // return Math.floor(Math.random() * (max - min + 1)) + min;

  // simpler way to write?
  return Math.floor(Math.random() * 20); //
}

// score counter and updating UI
function addToScore() {
  scoreCounter += 1;

  $(".points").text(`Your current score is: ${scoreCounter}`);
}

// builds the LeaderBoard
function highestScoresLeaderboard() {
  $(".firstPlaceName").empty();
  $(".firstPlaceScore").empty();

  $(".secondPlaceName").empty();
  $(".secondPlaceScore").empty();

  $(".thirdPlaceName").empty();
  $(".thirdPlaceScore").empty();

  let firstPlayer = scores[0];
  let secondPlayer = scores[1];
  let thirdPlayer = scores[2];

  let firstPlaceName = $('<span class="firstPlaceName">').text(
    `${firstPlayer.name}`
  );
  let firstPlaceScore = $('<span class="firstPlaceScore">').text(
    `${firstPlayer.score}`
  );

  let secondPlaceName = $('<span class="secondPlaceName">').text(
    `${secondPlayer.name}`
  );
  let secondPlaceScore = $('<span class="secondPlaceScore">').text(
    `${secondPlayer.score}`
  );

  let thirdPlaceName = $('<span class="thirdPlaceName">').text(
    `${thirdPlayer.name}`
  );
  let thirdPlaceScore = $('<span class="thirdPlaceScore">').text(
    `${thirdPlayer.score}`
  );

  $(".leaderboard").append(
    firstPlaceName,
    firstPlaceScore,
    secondPlaceName,
    secondPlaceScore,
    thirdPlaceName,
    thirdPlaceScore
  );
}

// resets score when game is over
function resetScore() {
  scoreCounter = 0;
  $(".points").text(`Your current score is: ${scoreCounter}`);
}

// checking to see if snake collides with itself
// or crashes out of bounds
function gameOver() {
  checkSnakeCollision();
  checkSnakeOutOfBounds();

  if (snakeCollision === true || snakeOutOfBounds === true) {
    clearInterval(startGame);
    $(".modal").addClass("open");
  }
}

// checks if snake collides with itself
function checkSnakeCollision() {
  const snakeBody = snake.body.slice(1);

  let result = snakeBody.find(function (node) {
    return node[0] === newSnakeHead[0] && node[1] === newSnakeHead[1];
  });
  result && (snakeCollision = true);
}

// checks if out of bounds from grid
function checkSnakeOutOfBounds() {
  const headX = newSnakeHead[0];
  const headY = newSnakeHead[1];

  if (headX < 0 || headX > 19 || headY < 0 || headY > 19) {
    snakeOutOfBounds = true;
  }
}

// sorts scores in descending order, displays top 3 highest scores and stores in local storage
function storeScores() {
  scores.sort(function (scoreA, scoreB) {
    return scoreB.score - scoreA.score;
  });

  scores.length > 3 && scores.splice(3);

  localStorage.setItem("scores", JSON.stringify(scores));
}

// retrieves the score from local storage and up-dates global variable holding the scores
// if local storage is null then it sets default leaderboard
function pullScores() {
  scores =
    localStorage.getItem("scores") === null
      ? pullDefaultScores()
      : JSON.parse(localStorage.getItem("scores"));
  highestScoresLeaderBoard();
}

// default leaderboard object
function pullDefaultScores() {
  scores = [
    {
      name: "ABC",
      score: 1,
    },
    {
      name: "DEF",
      score: 2,
    },
    {
      name: "GHI",
      score: 3,
    },
  ];
  return scores;
}

// interval - draws the snake in canvas and direction, checks game over and if snake ate appple
function tick() {
  buildSnake();
  gameOver();
  checkingSnakeAteApple();
}

// starts the game looop
function gameOn() {
  startGame = setInterval(tick, 1000 / 10);
  return startGame;
}

// event handlers

// on load start game automatically
$(window).on("load", function (event) {
  if (startGame === undefined || startGame === null) {
    buildInitialState();
    highestScoresLeaderboard();
    gameOn();
  }
});

// save player's name and scores
$(".save-score").click(function (event) {
  event.preventDefault();

  let playerName = $("#player-name").val();
  let finalScore = scoreCounter;

  let scoreObject = {
    name: playerName,
    score: finalScore,
  };

  scores.push(scoreObject);
  storeScores();
  highestScoresLeaderboard();
  $(".gameOver-form").trigger("reset");
});

// starts a new game, resetting everything
$(".start-new-game").click(function (event) {
  event.preventDefault();
  resetScore();

  $(".gameOver-form").trigger("reset");
  snakeCollision = false;
  snakeOutOfBounds = false;

  snake = {
    body: [
      [10, 5],
      [10, 6],
      [10, 7],
      [10, 8],
    ],
    nextDirection: [0, -1],
    apple: [],
  };

  $(".modal").removeClass("open");
  gameOn();
});

$(window).on("keydown", function (event) {
  //left
  if (event.keyCode === 37 && snake.nextDirection[1] !== 1) {
    snake.nextDirection = [0, -1];
  }
  //up
  if (event.keyCode === 38 && snake.nextDirection[0] !== 1) {
    snake.nextDirection = [-1, 0];
  }
  //right
  if (event.keyCode === 39 && snake.nextDirection[1] !== -1) {
    snake.nextDirection = [0, 1];
  }
  //down
  if (event.keyCode === 40 && snake.nextDirection[0] !== -1) {
    snake.nextDirection = [1, 0];
  }
});
