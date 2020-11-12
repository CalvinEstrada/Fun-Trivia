const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var end =setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            window.location = "end.html";
            clearInterval(end);

         if (--timer < 0){
            localStorage.setItem('mostRecentScore', score);  
        
        }
        }
    }, 1000);
}



window.onload = function () {
    var setTime = 20,
        display = document.querySelector('#time');
    startTimer(setTime, display);
};



let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [{
        question: 'Which planet is the hottest?',
        choice1: 'Mercury',
        choice2: 'Saturn',
        choice3: 'Venus',
        choice4: 'Mars',
        answer: 3,
    },
    {
        question: "What is the rarest blood type?",
        choice1: "AB-Negative",
        choice2: "B",
        choice3: "A",
        choice4: "O",
        answer: 1,
    },
    {
        question: "Which poet wrote 'The Raven'?",
        choice1: "Robert Frost",
        choice2: "Edgar Allen Poe",
        choice3: "Walt Whitman",
        choice4: "Sylvia Plath",
        answer: 2,
    },
    {
        question: "How many keys are on a piano?",
        choice1: "86",
        choice2: "87",
        choice3: "88",
        choice4: "89",
        answer: 3,
    },
    {
        question: "What is the deadliest snake?",
        choice1: "Garden Snake",
        choice2: "Python",
        choice3: "King Cobra",
        choice4: "Black Mamba",
        answer: 3,
    },
    {
        question: "How many teeth should you have as an adult?",
        choice1: "45",
        choice2: "32",
        choice3: "42",
        choice4: "30",
        answer: 2,
    },
    {
        question: "What is the largest Ocean?",
        choice1: "Indian",
        choice2: "Pacific",
        choice3: "Atlantic",
        choice4: "Arctic",
        answer: 2,
    },
    {
        question: "Which is the largest freshwater lake in the world?",
        choice1: "Lake Superior",
        choice2: "Caspian Sea",
        choice3: "Lake Michigan",
        choice4: "Lake Huron",
        answer: 3,
    },
    {
        question: "The Space Needle is located in which city?",
        choice1: "San Antonio",
        choice2: "Los Angles",
        choice3: "Toronto",
        choice4: "Seattle",
        answer: 4,
    },
    {
        question: "Approximately what percent of U.S. power outages are caused by squirrels?",
        choice1: "10-20%",
        choice2: "5-10%",
        choice3: "15-20%",
        choice4: "30%-40%",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
  
        }
        

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})


incrementScore = num => {
    score += num
    scoreText.innerText = score
}



startGame()