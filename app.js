const cards=document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

cards.forEach(card =>card.addEventListener('click',flipCard));

function flipCard(){
    if (lockBoard) return;
    if (this ===firstCard) return;
    this.classList.toggle('flip');
    

    if (hasFlippedCard == false){
        //first click
        hasFlippedCard = true;
        firstCard = this;
        return;
        
    } 
        //second click
        hasFlippedCard=false;
        secondCard = this;
        
        //do they match? 
        checkForMatch();
    
}

function checkForMatch(){
    let isMatch = firstCard.dataset.img===secondCard.dataset.img;
    isMatch ? disableCards() : unflipCards();
};

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
};

function unflipCards(){
    lockBoard = true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
    },1500);
};

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
};

(function shuffle(){
    cards.forEach(card=>{
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    });
})();


/* Notes: 
- Lock board when unflip cards
- prevent unflip First card
*/
