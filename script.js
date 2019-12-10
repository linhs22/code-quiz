var timeEl = document.querySelector(".nav-item");
var starter = document.querySelector(".starter");
var quizContent = document.querySelector(".questions")
var lastq = document.querySelector(".section4");
var score = document.querySelector(".score");
var timerInterval
var intials = document.createElement("input");
intials.setAttribute('type', 'text')
intials.setAttribute('class', 'initialHS')
var submit = document.createElement("input");
submit.setAttribute("type", "submit");
submit.setAttribute("id", "submit")
var high = document.querySelector(".highscore");
var nav = document.querySelector(".navbar")
var returnToQuiz = document.createElement("button");
var hs = document.querySelector("#titlehead")
// var start = document.createElement("button")


var secondsLeft = 0;
var i = 0;
var initialsInput





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
  high.style.display = "none";
  timeEl.textContent = "Time: " + secondsLeft;
  timeEl.style.color = "white"
  var title = document.createElement("h1");
  title.textContent = "Coding Quiz Challenge";
  starter.appendChild(title);
  var description = document.createElement("h6");
  description.textContent = "Try to answer the code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score time by ten seconds!"
  starter.appendChild(description);
  var start = document.createElement("button")
  start.setAttribute("class","startBtn")
  start.textContent = "Start Quiz";
  starter.appendChild(start);
  starter.style.textAlign = ("center");
  start.addEventListener("click", function (event) {
    event.preventDefault();
    setTime();
    quiz();
  });
}

function scoreGame() {
  clearInterval(timerInterval);
  var done = document.createElement("h1");
  done.textContent = "All done.";
  var scoreText = document.createElement("p");
  scoreText.textContent = "Your score is " + secondsLeft + ".";
  var submitinit = document.createElement("p");
  submitinit.textContent = "Enter your initials for highscore";
  score.appendChild(done);
  score.appendChild(scoreText);
  score.appendChild(submitinit);
  score.appendChild(intials);
  score.appendChild(submit);
}
function quiz() {

  if (i === 5) {
    return scoreGame()
  }
  quizContent.style.display = "block";
  starter.style.display = "none";
  var section = document.createElement("div");
  section.setAttribute('class', `section${i}`)
  quizContent.appendChild(section);
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

function saveScoreInput(initialsInput, score) {
  nav.style.display = "none"
  score.style.display = "none"
  if (initialsInput === "") {
    alert("Initials cannot be blank");
    return false;
  }
  var score = secondsLeft
  var initialsInput = document.querySelector(".initialHS").value;
  var existing = localStorage.getItem('users');
  existing = existing ? JSON.parse(existing) : [];
  existing.push({initials: initialsInput.trim(), score: score});
  localStorage.setItem("users", JSON.stringify(existing));
  appendWinners()
};

function winners() {
  var existing = localStorage.getItem('users');
  return existing ? JSON.parse(existing) : [];
};

function appendWinners() {
  high.style.display = "block";
  var highscore = document.createElement("h1");
  highscore.textContent = "Highscore";
  high.appendChild(highscore);
  var existing = winners();
  for (users in existing)
  {
      var elementName = document.createElement("div");
      elementName.setAttribute("id", "scoreList");
      elementName.textContent = existing[users].initials;
      highscore.appendChild(elementName);
      var elementScore = document.createElement("div");
      elementScore.setAttribute("id", "scoreList");
      elementScore.textContent = existing[users].score;
      highscore.appendChild(elementScore);
  } 
  returnToQuiz.textContent="Return to Quiz";
  highscore.appendChild(returnToQuiz);
};



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





submit.addEventListener("click", function (event) {
  event.preventDefault();
  saveScoreInput(initialsInput,score);
})




returnToQuiz.addEventListener("click", function (event) {
  event.preventDefault();
  high.style.display = "none";
  starter.style.display = "block";
  nav.style.display = "block";
  $(starter).empty();
  $(quizContent).empty();
  $(score).empty();
  $(high).empty();
  
  homePage();
});

hs.addEventListener("click", function (event) {
  event.preventDefault()
  clearInterval(timerInterval)
  event.preventDefault();
  appendWinners();
  starter.style.display = "none";
  nav.style.display = "none";
  quizContent.style.display = "none";
});


homePage();