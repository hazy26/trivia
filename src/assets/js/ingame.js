import { annotate } from 'rough-notation'; 
import { currentQuestionHtml } from './settings';
export const results = [];
const congrastMsg = document.querySelector('.congrats-msg');
export const progressBar = document.querySelector('#progress-bar');
const currentScoreHtml = document.querySelector('.score');
let totalScore = 0;
const answersList = document.querySelector('.answers-list');
export let index = 0;
let currentQuestionNumber = document.querySelector('.current-question-number');
currentQuestionNumber.textContent = (index + 1);
const nextBtn = document.querySelector('.next-btn');
const resultsScreen = document.querySelector('.results-screen');
const wrongAnswerModal = document.querySelector('.wrong-answer-modal');
const goodAnswerModal = document.querySelector('.good-answer-modal');
const playerResult = document.querySelector('.player-result');
playerResult.textContent = '0%';
export let scorePercentage = 0;
import { interval } from './settings';
import { progress } from './settings';
let currentProgress = '';

export function displayAnswers(result){
    scorePercentage = (totalScore * 100) / results.length;
    const answers = [];
    answers.push(result.correct_answer);
    currentScoreHtml.textContent = `${Math.round(scorePercentage)}%`;

    for(let i = 0; i < results[index].incorrect_answers.length; i++){
        answers.push(results[index].incorrect_answers[i]);
    }
    answersList.innerHTML = "";
    shuffle(answers);
    answers.forEach(answer => {
        answersList.innerHTML += 
        `<li class="bg-triviaBlue py-2 px-8 flex flex-row-reverse gap-4 rounded-md text-white text-lg font-medium tracking-normal">
            <input class="w-5" type="radio" name="answers" id="${answer}">
            <label class="w-full" for="${answer}">${answer}</label>
        </li>`;
    });
    highligthText();
};

function highligthText(){
    const multilines = document.querySelectorAll('.highlight__multi-line');
    multilines.forEach(highlight => {
        const annotation = annotate(highlight, { 
            type: 'highlight', 
            color: '#FEB836', 
            multiline: true, 
            iterations: 1, 
            animate: true,
            animationDuration: 2500});
        annotation.show();
    });
};

nextBtn.addEventListener('click', () => {
    const checkedAnswer = document.querySelector('input[name=answers]:checked');
    const answerNotCheckedMsg = document.querySelector('.answer-not-checked-msg');
    
    if(checkedAnswer){

        answerNotCheckedMsg.classList.add('hidden');

        if(index < results.length){
            validateAnswer(checkedAnswer.id);
        }
    } else{
        answerNotCheckedMsg.classList.remove('hidden');
    }    
});

function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
  
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
};

function validateAnswer(answer){
    if(answer == results[index].correct_answer){
        totalScore += 1;
        scorePercentage = Math.round((totalScore * 100) / results.length);
        currentScoreHtml.textContent = `${Math.round(scorePercentage)}%`;
        playerResult.textContent = `${Math.round(scorePercentage)}%`;

        goodAnswerModal.classList.toggle('hidden');
        setTimeout(() => {
            goodAnswerModal.classList.toggle('hidden');

            if(index == results.length - 1){
                ifLastQuestion();
            } else{
                changeAnswers();
            }
        }, "1200");

    } else {
        wrongAnswerModal.classList.toggle('hidden');
        setTimeout(() => {
            wrongAnswerModal.classList.toggle('hidden');

            if(index == results.length - 1){
                ifLastQuestion();
            } else{
                changeAnswers();
            }
        }, "1200");
    }
};

function ifLastQuestion(){

    if(scorePercentage <= 39){
        congrastMsg.textContent = "You'll do better next time.";
    } else if(scorePercentage >= 40 && scorePercentage <= 59){
        congrastMsg.textContent = "Reasonable.";
    } else if(scorePercentage >= 60 && scorePercentage <= 89) {
        congrastMsg.textContent = "Congratulations!";
    } else {
        congrastMsg.textContent = "Wow! You know your stuff!.";
    }

    resultsScreen.classList.toggle('hidden');
};

function changeAnswers(){
    currentQuestionHtml.innerHTML = '';
    currentQuestionHtml.innerHTML = `<p><span class="highlight__multi-line text-xl font-medium p-2 leading-8">${results[index += 1].question}</span></p>`;
    currentQuestionNumber.textContent = (index + 1);
    displayAnswers(results[index]);
    
    if(currentProgress > progress){
        currentProgress += interval;
    } else {
        currentProgress = progress;
        currentProgress += interval;
    }

    progressBar.innerHTML = `<div id="current-progress" class="bg-triviaRed w-full h-full rounded-md" style="width:${currentProgress}%"></div>`;
};