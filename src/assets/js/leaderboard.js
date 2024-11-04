const resultsList = document.querySelector('.results-list');
const resetLeaderboardBtn = document.querySelector('.reset-btn');
const playerScores = document.querySelectorAll('.player-scores');
const returnBtn = document.querySelector('.return-btn');
import { leaderboardScreen } from "./homescreen";

export let savedTriviaScores = [];
function getScores(){
    const localScores = JSON.parse(localStorage.getItem('Trivia'));

    if(localScores !== null){
        savedTriviaScores = localScores;
    } else {
        savedTriviaScores = [];
    }
};
getScores();

export function initialiseLeaderboard(){
    savedTriviaScores.forEach(score => {
        resultsList.innerHTML += 
        `<li class="rounded-md border-2 border-black flex gap-4 p-4 even:bg-triviaPaleBlue odd:bg-triviaYellow">
            <p class="font-bold">${savedTriviaScores.indexOf(score) + 1}</p>
            <div class="player-scores grid grid-cols-3 items-center">
                <p class="player-name">${score[0]}</p>
                <p class="player-score font-medium">${score[1]}%</p>
                <p class="player-date text-sm">${score[2]}</p>
            </div>
        </li>`;
    });
}
initialiseLeaderboard();

resetLeaderboardBtn.addEventListener('click', () => {
    playerScores.forEach(score => {
        score.textContent = "";
    });
    localStorage.clear();
    savedTriviaScores = [];
    resultsList.innerHTML = "";
});
 
returnBtn.addEventListener('click', () => {
    leaderboardScreen.classList.toggle('hidden');
});