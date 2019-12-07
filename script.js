var timeEl = document.querySelector(".nav-item");
var starter = document.querySelector(".starter");
var quizContent = document.querySelector(".questions")
var start = document.createElement("button");

var secondsLeft = 0;
var i = 0;


function setTime() {
  // event.preventDefault();
  var secondsLeft = 75;
  var timerInterval = setInterval(function () {
    timeEl.style.color = "white"
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft === 0) {
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

function quiz() {
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


quizContent.addEventListener("click", function(event) {
  var element = event.target;
  console.log(element)

  // If that element is a button...
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    console.log(event.target.textContent)
    var choice = event.target.textContent;
    if(choice === questions[i].answer) {
      console.log("Correct")
      i++
      quiz()

    }
    else {
      console.log("incorrect")
    }




  }
});


homePage();



start.addEventListener("click", function (event) {
  event.preventDefault();
  setTime();
  quiz();
});