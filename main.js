import $ from "jquery";
import "./style.css";

//? global variables
const arrowDirection = ["left", "up", "down", "right"];
let currentscore = 0;
let highscore = 0;
const gameDuration = 5;
let directionOfArrow = "";

const $mainbody = $("<main>").addClass("gameBody");
$("body").append($mainbody);

//? main body of the game

const getRandomInt = (numberofdirectionarrows) => {
  return Math.floor(Math.random() * numberofdirectionarrows);
};

//? create random number between 0 - 3

// const firstArrow = () => {
//   const $arrow = $("<i>").addClass(
//     `fa fa-arrow-circle-${arrowDirection[getRandomInt(4)]} arrow`
//   );
//   $(".gameBody").append($arrow);
// };

//? firstArrow function where it creates the first arrow from the random number generated and append it to the main body of the game

const createArrow = () => {
  let x = arrowDirection[getRandomInt(4)];
  const $arrow = $("<i>").addClass(
    `fa fa-arrow-circle-${x} arrow animated bounceIn`
  );
  $(".gameBody").append($arrow);
  return (directionOfArrow = "Arrow" + `${x}`);
};

// x will return the direction of the arrow
// create arrow and append it to the gamebody
// return arrow+(direction of arrow) - to be use later

$("#start").on("click", () => {
  createArrow();
  $("#start").hide();

  // when start button is clicked
  // createArrow function is called
  // start button is hidden

  const timerBarFrame = () => {
    if (timerBarWidthNumerator <= 0) {
      clearInterval(timerBarInterval);
      $("body").off("keydown");
      //https://api.jquery.com/unbind/
    }

    if (currentscore > highscore) {
      highscore = currentscore;
      $("#highscore").text(`${highscore}`);
    }

    //! to insert code to disable any inputs when timer = 0 (done)
    //! compare current score with highscore (done)
    //! if current score greater than highscore save current score as highscore (done)
    //* https://www.geeksforgeeks.org/how-to-disable-a-button-in-jquery-dialog-from-a-function/
    else {
      timerBarWidthNumerator -= 10;
      const currentTimerBarWidth =
        timerBarWidthNumerator / timerBarWidthDenominator;
      $("#timerBar").css("width", `${currentTimerBarWidth * 100}%`);
    }
  };

  let timerBarWidthNumerator = gameDuration * 1000;
  const timerBarWidthDenominator = gameDuration * 1000;
  const timerBarInterval = setInterval(timerBarFrame, 10);

  /* Checking if the arrow key pressed is the same as the arrow on screen. If it is, it will increase the
current score by 1, remove the arrow on screen and create a new arrow. If it is not, it will decrease the current score by 1. */

  $("body").on("keydown", (event) => {
    let a = directionOfArrow.toLowerCase();
    let b = event.code.toLowerCase();
    console.log(a);
    console.log(b);
    if (a === b) {
      currentscore++;
      $("#currentscore").text(`${currentscore}`);
      $("main").css("color", "green");
      $(".arrow").remove();
      createArrow();
    } else {
      currentscore--;
      $("#currentscore").text(`${currentscore}`);
    }
  });

  //! to insert keydown functions for all 4 directions (???)
  //? when clicking the arrow, remove the current one before calling the next arrow
});

//? when the start button is clicked, it will run the first arrow function and hide the start button
//! to get the timer to start only after the start button is clicked (??)

//*https://stackoverflow.com/questions/15420558/jquery-click-event-not-working-after-append-method
// $(".gameBody").on("click", ".arrow", () => {
//   currentscore++;
//   $("#currentscore").text(`${currentscore}`);
//   $(".arrow").remove();
//   nextArrow();
// });

$("#reset").on("click", () => {
  currentscore = 0;
  $("#currentscore").text("0");
  $(".arrow").remove();
  $("#start").show();
  $("#timerBar").css("width", "100%");
});

// when 'play again' button is clicked, start button appears
//! to reset the score back to 0 (TBC)
//! to reset timer bar back to full (done)
//! to remove arrow on screen (done)
