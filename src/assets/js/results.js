const saveScoreBtn = document.querySelector('.save-score-btn');
import { savedTriviaScores } from "./leaderboard";
import { scorePercentage } from "./ingame"; 

saveScoreBtn.onclick = () => {
    const saveModal = document.createElement('div');
    saveModal.className = "bg-triviaBlue w-full h-full absolute top-0 right-0 p-8 flex justify-center";
    document.body.appendChild(saveModal);
    saveModal.innerHTML = 
    `<div class="bg-white w-[80%] max-w-[420px] h-fit p-10 rounded-md self-center flex flex-col items-center gap-12">
        <div class="flex flex-col w-full gap-4">
            <p class="font-medium text-2xl tracking-normal">Name:</p>
            <input type="text" id="player-name" class="border-2 border-black rounded-md h-10 p-2">
        </div>
        <button class="save-my-score text-xl bg-triviaYellow border-2 border-black py-1 px-2 w-fit hover:scale-105 transition">Save my score</button>
    </div>`;
    const input = document.querySelector('#player-name');
    const saveMyScoreBtn = document.querySelector('.save-my-score');
    saveMyScoreBtn.addEventListener('click', () => {
        newPlayer(input);
    });
}

function newPlayer(input){
    const playerName = input.value;
    const date = new Date().toDateString();
    const score = scorePercentage;
    const newPlayer = [playerName, score, date];
    if(savedTriviaScores.length >= 10){
        savedTriviaScores.shift();
    }
    savedTriviaScores.push(newPlayer);
    savePlayerScore(input);
}

function savePlayerScore(input){
    localStorage.setItem('Trivia', JSON.stringify(savedTriviaScores));
    
    const confirmMsg = document.createElement('div');
    confirmMsg.className = "bg-triviaBlue w-full h-full absolute top-0 right-0 p-8 flex flex-col justify-center";
    document.body.appendChild(confirmMsg);
    confirmMsg.innerHTML = `<div class="bg-white h-fit self-center w-fit flex flex-col p-4 gap-4 items-center rounded-md">
    <img src="./assets/img/saved.svg" alt="Saved score check image." class="w-[60%]">
        <p class="text-4xl font-medium">Score Saved!</p>
    </div>`;
    input.value = '';
    setTimeout(() => {
        location.reload();
    }, "1500");
};