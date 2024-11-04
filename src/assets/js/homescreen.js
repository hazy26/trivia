const homeScreen = document.querySelector('.home-screen');
export const settingsScreen = document.querySelector('.settings-screen');
export const leaderboardScreen = document.querySelector('.leaderboard-screen');
const leaderboardBtns = document.querySelectorAll('.leaderboard-btn');
const letsGoBtn = document.querySelector('.lets-go-btn');

letsGoBtn.addEventListener('click', () =>{
    homeScreen.classList.toggle('hidden');
    settingsScreen.classList.toggle('hidden');
})

leaderboardBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        leaderboardScreen.classList.toggle('hidden');
    });
}); 