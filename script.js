document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const letters = 'AABBCCDDEEFFGGHH'.split('');
    let flippedCards = [];
    let matchedCards = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        shuffle(letters);
        letters.forEach(letter => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.letter = letter;

            const front = document.createElement('div');
            front.classList.add('front');
            front.textContent = letter;

            const back = document.createElement('div');
            back.classList.add('back');

            card.appendChild(front);
            card.appendChild(back);
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.letter === card2.dataset.letter) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards += 2;
            if (matchedCards === letters.length) {
                setTimeout(() => alert('You win!'), 500);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        flippedCards = [];
    }

    createBoard();
});
