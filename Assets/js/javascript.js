// variables

var highScores = document.getElementById('highScores');
var timer = document.getElementById('timer');
var timeRemaining = document.getElementById('timeRemaining');
var startPage = document.getElementById('start');
var startBtn = document.getElementById('start-quiz-button');
var questions = document.querySelectorAll('.question');
var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var four = document.getElementById('four');
var five = document.getElementById('five');
var answer = document.querySelectorAll('.answerCheck');
var resultsPage = document.getElementById('results')
var score = document.getElementById('score');
var initials = document.getElementById('initials');
var submitBtn = document.getElementById('submit');
var highScoresPage = document.getElementById('high-scores');
var highScoresList = document.getElementById('all-scores');
var againBtn = document.getElementById('play-again');
var clear = document.getElementById('clear');

var timeLeft = 75;
var index = 0;
var stopTime
var initialsList = [];
var scores = [];

function guessAnswer(event) {
    var element = event.target;

    if (element.matches('button')) {
        var correct = element.getAttribute('data-answer');
        
        questions[index].setAttribute('data-state', 'hidden');
       
        if (correct === 'correct') {
            answer[index].textContent = 'Correct';
            index++;
        } else {
            answer[index].textContent = 'Wrong';
            index++;
            timeLeft = timeLeft - 15;
        }

        if (timeLeft < 0) {
            timeLeft = 0;
        } else if (timeLeft === 0) {
            answer[4].textContent = '';
        }
        
        if (index <= 4) {
            questions[index].setAttribute('data-state', 'visible');
        } else {
            questions[4].setAttribute('data-state', 'hidden');
            answer.setAttribute('data-state', 'visible');
            timeRemaining.textContent = timeLeft;
            score.textContent = timeLeft;
            clearInterval(stopTime);
        } 
    }
}

function setTime() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timeRemaining.textContent = timeLeft;
        stopTime = timerInterval;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            zeroTime()
        }
    }, 1000);
}

function zeroTime() {
    questions[index].setAttribute('data-state', 'hidden');
    answer.setAttribute('data-state', 'visible');
    score.textContent = timeLeft;
}

function renderHighScores() {
    resultsPage.setAttribute('data-state', 'hidden');
    highScoresPage.setAttribute('data-state', 'visible');
    highScoresList.innerHTML = '';
    for (var i = 0; i < initialsList.length; i++) {
        var newInitials = initialsList[i];
        var newScores = scores[i];

        var li = document.createElement('li');
        li.setAttribute('class', 'scoresList')
        li.textContent = newInitials + ' - ' + newScores;

        highScoresList.appendChild(li);
    }
}

// gets stored initials and scores from local storage
function getStoredScores() {
    var storedInitials = JSON.parse(localStorage.getItem('initialsList'));
    var storedScores = JSON.parse(localStorage.getItem('scores'));

    if (storedInitials !== null) {
        initialsList = storedInitials;
        scores = storedScores;
    }
}

// stores initials and score into local storage
function storeScores() {
    localStorage.setItem('initialsList', JSON.stringify(initialsList));

    localStorage.setItem('scores', JSON.stringify(scores));
}

highScores.addEventListener('click', function() {
    startPage.setAttribute('data-state', 'hidden');
    timer.setAttribute('data-state', 'hidden');
    highScoresPage.setAttribute('data-state', 'visible');
    getStoredScores();
    renderHighScores();
})

startBtn.addEventListener('click', function() {
    setTime();
    startPage.setAttribute('data-state', 'hidden');
    questions[0].setAttribute('data-state', 'visible');
}) 

one.addEventListener('click', guessAnswer)
two.addEventListener('click', guessAnswer)
three.addEventListener('click', guessAnswer)
four.addEventListener('click', guessAnswer)
five.addEventListener('click', guessAnswer)

submitBtn.addEventListener('click', function(event) {
    event.preventDefault();

    timer.setAttribute('data-state', 'hidden');

    var initialsText = initials.value.trim().toUpperCase();

    if (initialsText === "") {
        return;
    }

    initialsList.push(initialsText);
    initials.value = "";
    scores.push(score.textContent);
    storeScores();
    getStoredScores();
    renderHighScores();
});

againBtn.addEventListener('click', function() {
    highScoresPage.setAttribute('data-state', 'hidden');
    startPage.setAttribute('data-state', 'visible');
    timer.setAttribute('data-state', 'visible');
    timeLeft = 75;
    timeRemaining.textContent = timeLeft;
    index = 0;
})

clear.addEventListener('click', function() {
    localStorage.clear()
    highScoresList.textContent = "";
    initialsList = [];
    scores = [];
})

getStoredScores()