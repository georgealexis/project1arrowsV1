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
    `fa fa-arrow-circle-${x} arrow animate__animated animate__bounceIn`
  );
  $(".gameBody").append($arrow);
  return (directionOfArrow = "Arrow" + `${x}`);
};

// https://animate.style/
// x will return the direction of the arrow
// create arrow and append it to the gamebody
// return arrow+(direction of arrow) - to be use later

$("#start").on("click", () => {
  //*https://stackoverflow.com/questions/46597321/how-to-add-a-3-seconds-countdown-before-calling-the-function-to-start-a-game-in
  $("#start").hide();
  $("#reset").prop("disabled", true);
  function countdown(time) {
    if (time > 0) {
      $("h1").text(`${time}`);
      setTimeout(function () {
        countdown(time - 1);
      }, 1000);
    } else {
      $("h1").text(`ARROW`);
      createArrow();

      //? when the start button is clicked, it will run the createarrow function and hide the start button
      //? timer to start only after the start button is clicked
      const timerBarFrame = () => {
        if (timerBarWidthNumerator <= 0) {
          $(".arrow").remove();
          $(".gameBody").text("GAMEOVER").css("font-size", "90px");
          $("#reset").prop("disabled", false);
          clearInterval(timerBarInterval);
          $("body").off("keydown");
          //* https://api.jquery.com/unbind/
          //? code to disable any inputs when timer = 0 (done)
        }
        //? compare current score with highscore (done)
        if (currentscore > highscore) {
          highscore = currentscore;
          $("#highscore").text(`${highscore}`);
        }

        //? if current score greater than highscore save current score as highscore (done)

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

      //? Calling the timerBarFrame function every 10ms.
      const timerBarInterval = setInterval(timerBarFrame, 10);

      //? if the arrow key pressed is the same as the arrow on screen. If it is, it will increase the current score by 1, remove the arrow on screen and create a new arrow. If it is not, it will decrease the current score by 1. */

      $("body").on("keydown", (event) => {
        let a = directionOfArrow.toLowerCase();
        let b = event.code.toLowerCase();
        //? changing both string to lowercase for comparison
        if (a === b) {
          currentscore++;
          $("#currentscore").text(`${currentscore}`);
          $(".arrow").remove();
          createArrow();
          //? when clicking the arrow, remove the current one before calling the next arrow
        } else {
          currentscore--;
          $("#currentscore").text(`${currentscore}`);
        }
      }); // replace with any function
    }
  }
  countdown(3);
});

// https://stackoverflow.com/questions/15420558/jquery-click-event-not-working-after-append-method
// $(".gameBody").on("click", ".arrow", () => {
//   currentscore++;
//   $("#currentscore").text(`${currentscore}`);
//   $(".arrow").remove();
//   nextArrow();
// });

$("#reset").on("click", () => {
  $(".gameBody").text("");
  $("h1").text("A-R-R-O-W");
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
