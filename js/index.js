//variables
const question=document.querySelector('#question');
const answersBox=document.querySelector('#answers-box');
const quizzContainer=document.querySelector('#quizz-container');
const scoreContainer=document.querySelector('#score-container');
const letters=['a','b','c','d'];
let points=0;
let actualQuestion=0;

//Questions
const questions=[
  {
    "question": "PHP was developed for what purpose?",
    "answers": [
    {
      "answer": "back-end",
          "correct": true
    },
    {
      "answer": "front-end",
      "correct": false
    },
    {
      "answer": "Operational System",
      "correct": false
    },
    {
      "answer": "Database",
      "correct": false
    },
  ]
  },
  {
    "question": "A way to declare a variable in JavaScript:",
    "answers": [
      {
        "answer": "$var",
        "correct": false
      },
      {
        "answer": "var",
        "correct": true
      },
      {
        "answer": "@var",
        "correct": false
      },
      {
        "answer": "#let",
        "correct": false
      },
    ]
  },
  {
    "question": "What is the id selector in CSS?",
    "answers": [
      {
        "answer": "#",
        "correct": true
      },
      {
        "answer": ".",
        "correct": false
      },
      {
        "answer": "@",
        "correct": false
      },
      {
        "answer": "/",
        "correct": false
      },
    ]
  },
]

//Quizz first question
function init(){
    createQuestion(0);

}

function createQuestion(i){
    const oldButtons=answersBox.querySelectorAll('button');
    oldButtons.forEach(function(btn){
        btn.remove();
    });

    const questionText=question.querySelector('#question-text');
    const questionNumber=question.querySelector('#question-number');

    questionText.textContent=questions[i].question;
    questionNumber.textContent=i+1;

    questions[i].answers.forEach(function(answer,i){
        const answerTemplate=document.querySelector('.answer-template').cloneNode(true);

        const letterBtn=answerTemplate.querySelector('.btn-letter');
        const answerText=answerTemplate.querySelector('.question-answer');
        
        letterBtn.textContent=letters[i];
        answerText.textContent=answer['answer'];

        answerTemplate.setAttribute('correct-answer',answer['correct']);

        answerTemplate.classList.remove('hide');
        answerTemplate.classList.remove('answer-template');

        answersBox.appendChild(answerTemplate);

        answerTemplate.addEventListener('click',function(){
            chackAnswer(this);
        });
    });

    actualQuestion++; //next question    
}

function chackAnswer(btn){
    const buttons=answersBox.querySelectorAll('button');

    buttons.forEach(function(button){
      if(button.getAttribute('correct-answer')==='true'){
          button.classList.add('correct-answer');

          if(btn===button){
            points++;
          }
      }else{
          button.classList.add('wrong-answer');
      }
  });

  nextQuestion();

}

function nextQuestion(){
  setTimeout(function(){
    if(actualQuestion>=questions.length){
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);

  },1500);
}

function showSuccessMessage(){
  hideOrShowQuiz();

  const score=((points/questions.length)*100).toFixed(2);

  const displayScore=document.querySelector('#display-score span');

  displayScore.textContent=score.toString();

  const correctAnswers=document.querySelector('#correct-answers');

  correctAnswers.textContent=points;

  const totalQuestions=document.querySelector('#questions-qty');
  totalQuestions.textContent=questions.length;
}

function hideOrShowQuiz(){
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

const restartBtn=document.querySelector('#restart');
restartBtn.addEventListener('click',function(){

  actualQuestion=0;
  points=0;
  hideOrShowQuiz();
  init();
});

init();

