var timeEl = document.querySelector(".nav-item");
var starter = document.querySelector(".starter");
var quizContent = document.querySelector(".questions")
var start = document.createElement("button");
var lastq = document.querySelector(".section4");
var score = document.querySelector(".score");
var timerInterval


var secondsLeft = 0;
var i = 0;




function setTime() {
  // event.preventDefault();
  secondsLeft = 75;
  timerInterval = setInterval(function () {
    timeEl.style.color = "white"
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      // alert("You ran out of time. Score is 0.")
    }

  }, 1000);
}

function homePage() {
  timeEl.textContent = "Time: " + secondsLeft;
  timeEl.style.color = "white"
  var title = document.createElement("h1");
  title.textContent = "Coding Quiz Challenge";
  starter.appendChild(title);
  var description = document.createElement("h6");
  description.textContent = "Try to answer the code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score time by ten seconds!"
  starter.appendChild(description);
  start.textContent = "Start Quiz";
  starter.appendChild(start);
  starter.style.textAlign = ("center");
}

function scoreGame() {
  clearInterval(timerInterval);
  var done = document.createElement("h1");
  done.textContent = "All done.";
  var scoreText = document.createElement("p");
  scoreText.textContent = "Your score is " + secondsLeft + ".";
  score.appendChild(done);
  score.appendChild(scoreText);
}
function quiz() {
  if (i === 5) {
    return scoreGame()
  }
  var section = document.createElement("div");
  section.setAttribute('class', `section${i}`)
  quizContent.appendChild(section);
  starter.style.display = "none";
  var quest = document.createElement("h2");
  quest.textContent = questions[i].title;
  section.appendChild(quest);
  for (let j = 0; j < questions[i].choices.length; j++) {
    var row = document.createElement("div");
    row.setAttribute('class', 'row')
    var op = document.createElement("button");
    op.textContent = questions[i].choices[j];
    row.appendChild(op);
    section.appendChild(row);
  }
}


quizContent.addEventListener("click", function (event) {
  var element = event.target;
  var sect = document.querySelector(`.section${i}`)

  // If that element is a button...
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var choice = event.target.textContent;
    if (choice === questions[i].answer) {
      sect.style.display = "none";
      console.log("Correct");
      alert("Correct!");
      i++;
      return quiz();
    }
    else {
      sect.style.display = "none";
      console.log("Incorrect");
      alert("Incorrect!");
      if (secondsLeft < 15) {
        secondsLeft = 0
      } else {
        secondsLeft = secondsLeft - 15;
      }
      i++;
      return quiz();
    }
  }
});




homePage();



start.addEventListener("click", function (event) {
  event.preventDefault();
  setTime();
  quiz();
});