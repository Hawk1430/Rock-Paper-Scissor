
const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

display();

document.body.addEventListener('keydown',(event) => {
    if(event.key === 'r'){ playerMove('rock');}
    if(event.key === 'p'){ playerMove('paper');}
    if(event.key === 's'){ playerMove('scissor');}
})

document.querySelector('.rock')
    .addEventListener('click',() =>{
        playerMove('rock');
    });

document.querySelector('.paper')
    .addEventListener('click',() =>{
        playerMove('paper');
    });

document.querySelector('.scissor')
    .addEventListener('click',() =>{
        playerMove('scissor');
    });

document.querySelector('.reset')
    .addEventListener('click',() =>{ reset();});

function display(){
    document.querySelector('.displayScore')
        .innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}` ;
}

function pickcomputerMove(){
    const randomNumber = Math.random();
    
    if(randomNumber >=0 && randomNumber<1/3){ computerMove = 'rock';}
    else if(randomNumber >=1/3 && randomNumber<2/3) { computerMove = 'paper';}
    else if(randomNumber >=2/3 && randomNumber<1) { computerMove = 'scissor';}
    
    return computerMove;
}

function playerMove(choice){
    const computerMove = pickcomputerMove();
    let result = '';

    if(choice === 'rock'){
        if (computerMove === 'rock'){ result = 'Tie';}
        else if(computerMove === 'paper'){ result = 'You Lose';}
        else if(computerMove === 'scissor'){ result = 'You Win';}
    }

    else if(choice === 'paper'){
        if (computerMove === 'rock'){ result = 'You Win';}
        else if(computerMove === 'paper'){ result = 'Tie';}
        else if(computerMove === 'scissor'){ result = 'You Lose';}
    }

    else if(choice === 'scissor'){
        if (computerMove === 'rock'){ result = 'You Lose';}
        else if(computerMove === 'paper'){ result = 'You Win';}
        else if(computerMove === 'scissor'){ result = 'Tie';}
    }

    if(result === 'You Win'){
        score.wins += 1;
    }
    else if(result === 'You Lose'){
        score.losses += 1;
    }
    else if(result === 'Tie'){
        score.ties += 1;
    }
    localStorage.setItem('score',JSON.stringify(score));

    document.querySelector('.result')
        .innerHTML = `${result}`;
    document.querySelector('.displayChoices')
        .innerHTML = `You <img src="./assets/${choice}-emoji.png" class="moveIcon"> <img src="./assets/${computerMove}-emoji.png" class="moveIcon">Computer  `;
    display(); 
}



function reset(){
    document.querySelector('.result')
        .innerHTML = '';
    document.querySelector('.displayChoices')
        .innerHTML = '';
    score.wins = 0; 
    score.losses = 0; 
    score.ties = 0; 
    localStorage.removeItem('score');
    display();
}

let autoplaying = false;
let intervalId;
const autoplayButton = document.querySelector('.autoplay')
autoplayButton.addEventListener('click',() => {
    if(!autoplaying){
        intervalId = setInterval(() =>{
            const playerM = pickcomputerMove();
            playerMove(playerM);
        },500); 
        autoplaying = true; 
    }
    else {
        clearInterval(intervalId);
        autoplaying = false;
    }  
})

