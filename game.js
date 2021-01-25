var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var counter = 0;

$(document).keypress(function () {
  if (started === false) {
    nextSequence();
    started = true;
    $("#level-title").text("Level 0");
  }
})

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var chosenColor = buttonColors[randomNumber];
  gamePattern.push(chosenColor);
  $("#" + chosenColor).fadeOut(80).fadeIn(80);
  playSound(chosenColor);
  console.log("Level: " + level);
  $("#level-title").text("Level " + level);
  level++;
}

$(".btn").click(function() {
  userClickedPattern.push(this.id);
  animatePress(this.id);
  playSound(this.id);
  checkAnswer(counter);
  console.log("counter: " + counter);
  if (counter < level - 1) {
    counter ++;
  }
  else if (counter === level - 1) {
    counter = 0;
    setTimeout(function () {
      nextSequence();
    }, 1000);
    userClickedPattern = [];
  }
});

function playSound(name) {
  switch(name) {
    case "red":
      var sound = new Audio("sounds/red.mp3");
      sound.play();
      break;
    case "blue":
      var sound = new Audio("sounds/blue.mp3");
      sound.play();
      break;
    case "green":
      var sound = new Audio("sounds/green.mp3");
      sound.play();
      break;
    case "yellow":
      var sound = new Audio("sounds/yellow.mp3");
      sound.play();
      break;
    default:
      break;
  }
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentIndex) {
  if (gamePattern[currentIndex] !== userClickedPattern[currentIndex]) {
    console.log("wrong");
    var gameOverSnd = new Audio("sounds/wrong.mp3");
    gameOverSnd.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart.");
    startOver();
  }
  else {
    console.log("right");
  }
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  counter = 0;
}
