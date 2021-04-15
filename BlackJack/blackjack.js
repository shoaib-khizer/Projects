let blackjackgame = {
    'you' : {'scoreSpan' : '#your-result' , 'div' : '#your-box' , 'score' : 0},
    'system' : {'scoreSpan' : '#system-result' , 'div' : '#system-box' , 'score' : 0},
    'cards' : ['2' , '3' , '4' , '5' , '6' , '7' , '8' , '9' , '10' , 'K' , 'J' , 'Q' , 'A'],
    'cardsScore' : {'2' : 2 , '3' : 3 , '4' : 4  , '5' : 5 , '6' : 6 , '7' : 7 , '8' : 8 , '9' : 9 , '10' : 10 , 'K' : 10 , 'J' : 10 , 'Q' : 10 , 'A' : [1,11]},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isStand' : false,
    'turnOver' : false,
}
const You = blackjackgame['you']
const System = blackjackgame['system']

const hitsound = new Audio('sounds/swish.m4a');
const winsound = new Audio('sounds/cash.mp3');
const lostsound = new Audio('sounds/aww.mp3');

document.querySelector('#hit-btn').addEventListener('click' , blackjackHit);
document.querySelector('#stand-btn').addEventListener('click' , systemLogic);
document.querySelector('#deal-btn').addEventListener('click' , blackjackDeal);

function blackjackHit(){
    if(blackjackgame['isStand'] === false){
        let card = randomCard();
        showCard( card , You );
        updateScore(card , You);
        showScore(You);
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackgame['cards'][randomIndex];
}

function showCard( card , activePlayer ){
    if(activePlayer['score'] <=21 ){
        let cardimage = document.createElement('img');
        cardimage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardimage);
        hitsound.play();
    }
}

function blackjackDeal(){
    if(blackjackgame['turnOver'] === true){
    
        blackjackgame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#system-box').querySelectorAll('img');

        for(i=0 ; i < yourImages.length ; i++){
            yourImages[i].remove();
        }
        for(i=0 ; i < dealerImages.length ; i++){
            dealerImages[i].remove();
        }

        You['score'] = 0;
        System['score'] = 0;

        document.querySelector('#your-result').textContent = 0;
        document.querySelector('#system-result').textContent = 0;

        document.querySelector('#your-result').style.color = '#ffffff';
        document.querySelector('#system-result').style.color = '#ffffff';

        document.querySelector('#result-des').textContent = "Let's Play";
        document.querySelector('#result-des').style.color = 'black';

        blackjackgame['turnOver'] = true;
    }
}

function updateScore(card , activePlayer){
    if(card === 'A'){
        if(activePlayer['score'] + blackjackgame['cardsScore'][card][1] <= 21){
            activePlayer['score'] += blackjackgame['cardsScore'][card][1];
        }else{
            activePlayer['score'] += blackjackgame[card][0];
        }
        }else{
            activePlayer['score'] += blackjackgame['cardsScore'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else{
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function systemLogic(){
    blackjackgame['isStand'] = true;

    while(System['score'] < 16 && blackjackgame['isStand'] === true){
        let card = randomCard();
        showCard( card , System );
        updateScore(card , System);
        showScore(System);
        await sleep(1000);
    }

    blackjackgame['turnOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

function computeWinner(){
    let winner;
    if(You['score'] <= 21){

        if(You['score'] > System['score'] || (System['score'] > 21));

        blackjackgame['wins']++;
        winner = You;

    }else if(You['score'] < System['score']){

        blackjackgame['losses']++;
        winner = System;

    }else if(You['score'] === System['score']){

        blackjackgame['draws']++;

    }else if(You['score'] > 21 && System['score'] <= 21){

        blackjackgame['losses']++;
        winner = System;

    }else if(You['score'] > 21 && System['score'] > 21){

        blackjackgame['draws']++;
    }

    console.log(blackjackgame);
    return winner;
}

function showResult(winner){
    let message , messageColor;

    if(blackjackgame['turnOver'] === true){

        if(winner === You){
            document.querySelector('#wins').textContent = blackjackgame['wins'];
            message = 'You Won!';
            messageColor = 'green';
            winsound.play();
        }else if(winner === System){
            document.querySelector('#losses').textContent = blackjackgame['losses'];
            message = 'You Lost!';
            messageColor = 'red';
            lostsound.play();
        }else{
            document.querySelector('#draws').textContent = blackjackgame['draws'];
            message = 'Tied';
            messageColor = 'black';
        }
        document.querySelector('#result-des').textContent = message;
        document.querySelector('#result-des').style.color = messageColor;

    }
}
