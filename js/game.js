// btn start
const btn = document.querySelector('.start');
// select img array
const hands = [...document.querySelectorAll('.select img')];
//  elements need to push result
const publishPlayerChoice = document.querySelector('[data-summary="your-choice"]');
const publishAiChoice = document.querySelector('[data-summary="ai-choice"]');
const publishGameResult = document.querySelector('[data-summary="who-win"]');
const publishNumberOfGames = document.querySelector('.numbers span');
const publishNumberOfWins = document.querySelector('.wins span');
const publishNumberOfLooses = document.querySelector('.looses span');
const publishNumberOfDraws = document.querySelector('.draws span');
//  summary
const gameSummary = {
    numbers: 0,
    wins: 0,
    looses: 0,
    draws: 0,
}
// player and AI choice
const game = {
    playerHand: "",
    aiHand: "",
}
//  select hand and style img
hands.forEach(hand => hand.addEventListener('click', function handSelection() {
    game.playerHand = this.dataset.option;
    // console.log(game.playerHand);
    hands.forEach((hand) => hand.style.boxShadow = "");
    this.style.boxShadow = '0 0 0 4px black';
}))
//  computer choice function
function computerChoice() {
    const aiHand = hands[Math.floor(Math.random() * 3)].dataset.option;
    return aiHand;
}
// check result function
function checkResult(player, ai) {
    if (player === ai) {
        return "draw";
    } else if ((player === 'papier' && ai === 'kamień') || (player === 'kamień' && ai === "nożyczki") || (player === "nożyczki" && ai === 'papier')) {
        return "win";
    } else {
        return "loss";
    }
}
// publish result function
function publishResult(player, ai, result) {
    publishPlayerChoice.textContent = player;
    publishAiChoice.textContent = ai;
    publishNumberOfGames.textContent = gameSummary.numbers;
    if (result === "win") {
        gameSummary.wins++;
        publishNumberOfWins.textContent = gameSummary.wins;
        publishGameResult.style.display = 'block';
        publishGameResult.style.color = 'green';
        publishGameResult.textContent = "Użytkownik. Gratulacje!!";
    } else if (result === "draw") {
        gameSummary.draws++;
        publishNumberOfDraws.textContent = gameSummary.draws;

        publishGameResult.style.display = 'block';
        publishGameResult.style.color = 'orange';
        publishGameResult.textContent = "Remis, próbuj dalej!";
    } else {
        gameSummary.looses++;
        publishNumberOfLooses.textContent = gameSummary.looses;

        publishGameResult.style.display = 'block';
        publishGameResult.style.color = 'red';
        publishGameResult.textContent = "Przegrałeś, :(";
    }
}

// function endGame() {
//     document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
//     game.playerHand = "";
//     game.aiHand = "";

// }
// main start function
function startGame() {
    gameSummary.numbers++;

    if (!game.playerHand) {
        alert('Kliknij w obrazek i wybierz: Papier, kamień, lub nożyczki!!!');
        return;
    }
    game.aiHand = computerChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);

    // Console check
    console.log(`Player: ${game.playerHand}      AI: ${game.aiHand}`);
    console.log(gameResult);
    console.log(` liczba gier: ${gameSummary.numbers}, liczba przegranych: ${gameSummary.wins}, liczba przegranych: ${gameSummary.looses}, liczba remisów: ${gameSummary.draws}`);

    publishResult(game.playerHand, game.aiHand, gameResult);
    // endGame();



}
btn.addEventListener('click', startGame);