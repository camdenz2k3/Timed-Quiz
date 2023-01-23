// variables

var highScores = document.getElementById('highScores');
var timer = document.getElementById('timer');
var timeLeft = document.getElementById('timeLeft');
var startPage = document.getElementById('start');
var startBtn = document.getElementById('start-quiz-button');
var questions = document.querySelectorAll('.question');
var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var four = document.getElementById('four');
var five = document.getElementById('five');
var answer = document.querySelectorAll('answerCheck');
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
