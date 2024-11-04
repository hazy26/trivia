import { settingsScreen } from "./homescreen";
import { results } from "./ingame";
import { index } from "./ingame";
import { displayAnswers } from "./ingame";
import { progressBar } from "./ingame";
const userSettings = document.querySelector('#settings');
const inGameScreen = document.querySelector('.in-game-screen');
const totalQuestions = document.querySelector('.total-questions-number');
export const currentQuestionHtml = document.querySelector('.current-question');
export let interval = '';
export let progress = '';

function fetchCategories(){
    const categoriesList = document.querySelector('#category');
    fetch('https://opentdb.com/api_category.php').then(response => response.json())
    .then(data => {
        const categories = data.trivia_categories;
        for(let i = 0;i < categories.length;i++){
            categoriesList.innerHTML += `<option class="categories" id="${i+9}">${categories[i].name}</option>`;
        };
    });
};
fetchCategories();

function numberOfQuestions(){
    const nbrOfQuestions = document.querySelector('#amount');
    for(let i = 1;i <= 50;i++){
        nbrOfQuestions.innerHTML += `<option class='bg-transparent'>${i}</option>`;
    };
};
numberOfQuestions();

userSettings.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const userDifficulty = document.querySelector('input[name="difficulty"]:checked').id;
    const userType = document.querySelector('input[name="type"]:checked').id;
    const userQuestionsAmount = document.querySelector('#amount').value;
    const categories = document.querySelector('#category');
    const userCategory = categories.options[categories.selectedIndex].id;

    inGameScreen.classList.toggle('hidden');
    settingsScreen.classList.toggle('hidden');

    const url = `https://opentdb.com/api.php?amount=${userQuestionsAmount}&category=${userCategory}&difficulty=${userDifficulty}&type=${userType}`;
    fetch(url).then(response => response.json()).then(data =>{
        
        totalQuestions.textContent = data.results.length;        
        
        data.results.forEach(result => {
            results.push(result);
        });

        currentQuestionHtml.innerHTML = `<p><span class="highlight__multi-line text-xl font-medium p-2 leading-8">${results[0].question}</span></p>`;
        displayAnswers(results[index]);

        progress = ((1 * 100) / data.results.length);
        interval = ((1 * 100) / data.results.length);
        progressBar.innerHTML = `<div id="current-progress" class="bg-triviaRed w-full h-full rounded-md" style="width:${progress}%"></div>`;
    });    
});