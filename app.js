let wordList = ['APPLE','PLANT','EARTH','WATER','HOUSE','SUNNY','BREAD','CHAIR','CLOCK','CLOUD'];
const keyboard = document.querySelector('.key-container');
const guesses = [];

let gameState = {
    gameGrid: Array(6).fill().map(() => Array(5).fill('')),
    // 2 boyutlu array. ilki 6 elementten oluşuyor ve her bir element 5 boyutlu bir array'i işaret ediyor!
    // oyunun durumunu kontrol etmek için kullanılacak
    currentRow: 0,
    currentColumn: 0,
    word: wordList[Math.floor(Math.random()*wordList.length)].toLowerCase(),
}

//constructor
function init(){
    const gameContainer = document.getElementById('gameContainer');
    createGameGrid(gameContainer);
    //console.log(gameState.word)
    pressedLetter();
}


const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
]

keys.forEach(key => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id',key);
    buttonElement.addEventListener('click', () => clickEvent(key));
    keyboard.append(buttonElement);
})

function clickEvent(key) {
    addByClick(key);
    keyColor();
    updateGame();
}

function addByClick(letter) {
    if(gameState.currentColumn === 5) return;
    gameState.gameGrid[gameState.currentRow][gameState.currentColumn] = letter.toLowerCase();
    gameState.currentColumn ++;
}

function keyColor() {
    for(let i=0; i < 5; i++) {
        let charBox = document.getElementById('charBox.'+gameState.currentRow+''+i);
        let letter = charBox.textContent;
        let key = document.querySelector("#"+letter.toUpperCase())
        //console.log(letter);

        if(letter == gameState.word[i]) {
            key.style.background = "#538d4e"
        }else if(gameState.word.includes(letter)) {
            key.style.background = "#b59f3b"
        }else {
            key.style.background = "#3a3a3c"
        }

    }
    
}

function checkClick() {
    let checkButton = document.getElementById("check-button");
    checkButton.addEventListener('click', () => checkGuess())
}

function checkGuess() {
    const input = document.querySelector('input').value;
    //console.log(enteredWord);
    if(wordList.includes(input.toUpperCase())) {
        checkLetters();
        keyColor();
        score(input);
        gameState.currentRow++;
        gameState.currentColumn = 0;
        addItem(input);
        
    }
    else{
        alert("Invalid word");
    }
    const checkButton = document.getElementById("input-guess");
    checkButton.value = '';
}

function addItem(word) {
    guesses.push(word);
   }


//oyun alanını oluştur ve container'a ekle
function createGameGrid(gameContainer){
    const gameGrid = document.createElement('div');
    gameGrid.className = 'gameGrid';

    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 5; j++) {
            createBox(gameGrid,i,j);
        }
    }
    gameContainer.appendChild(gameGrid);
}


//her bir kutuyu oluştur ve alana ekle
function createBox(gameGrid,row,column,letter = '') {
    const charBox = document.createElement('div');
    charBox.className = 'charBox';
    charBox.id = 'charBox.'+row+''+column;
    charBox.textContent = letter;
    gameGrid.appendChild(charBox);
    return charBox;
}


//anlık olarak oyunu güncelle
function updateGame() {
    for (let i = 0; i < gameState.gameGrid.length ; i++) {
        for(let j = 0; j < gameState.gameGrid[i].length; j++) {
            let charBox = document.getElementById('charBox.'+i+''+j);
            charBox.textContent = gameState.gameGrid[i][j];
        }
        
    }
}


//basılan harfi döndür
function pressedLetter() {
    document.body.onkeydown = (e) => {
        let key = e.key;
        if(key === 'Enter') {
            let enteredWord = getWord();
            //console.log(enteredWord);
            if(wordList.includes(enteredWord.toUpperCase())) {
                checkLetters();
                keyColor();
                score(enteredWord);
                gameState.currentRow++;
                gameState.currentColumn = 0;
                addItem(enteredWord);
            }
            else{
                alert("Invalid word");
            }
        }
        if(key === 'Backspace') {
            deleteLetter();
        }
        if(isLetter(key)) {
            addLetter(key);
        }
        updateGame();
    }
}

//basılan tuşun harf olup olmadığını kontrol et
function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

// array'a harf ekliyor ve o anki indexi 1 arttır
function addLetter(key) {
    //son sütünsa eklemeyecek
    if(gameState.currentColumn === 5) return;
    gameState.gameGrid[gameState.currentRow][gameState.currentColumn] = key;
    gameState.currentColumn ++;

}

// array'den harf siliyor ve o anki indexi 1 azalt
function deleteLetter() {
    if(gameState.currentColumn === 0) return;
    gameState.gameGrid[gameState.currentRow][gameState.currentColumn-1] = '';
    gameState.currentColumn --;
}

//satırdaki harfleri reduce fonksiyonu ile öncesini ve sonrasını birleştirip döndür
function getWord() {
    return gameState.gameGrid[gameState.currentRow].reduce((previous,current)=>previous+current);
}

//harfi kontrol et uygun rengi ver
function checkLetters() {
    for(let i=0; i < 5; i++) {
        let charBox = document.getElementById('charBox.'+gameState.currentRow+''+i);
        let letter = charBox.textContent;
        //console.log(letter);

        if(letter == gameState.word[i]) {
            charBox.classList.add('correct');
        }else if(gameState.word.includes(letter)) {
            charBox.classList.add('contains');
        }else {
            charBox.classList.add('empty');
        }

    }
}

function score(enteredWord) {
    let win = gameState.word == enteredWord;
    let lose = gameState.currentRow == 5;

    if(win) {
        guesses.push(enteredWord);
        alert("You gueesed the word right!");
        localStorage.setItem('guesses', JSON.stringify(guesses));
    }else if(lose) {
        guesses.push(enteredWord);
        alert("You lost the game, the word was " + gameState.word);
        localStorage.setItem('guesses', JSON.stringify(guesses));
    }
}

init()