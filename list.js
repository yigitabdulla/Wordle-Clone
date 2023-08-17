const array = JSON.parse(localStorage.getItem('guesses'));

function init() {
    createList(array);
    localStorage.removeItem('guesses');
}

function createList(array) {
    if(array === null) {
        alert('List is empty. First play the game!');
        return;
    }
    list = document.getElementById('guess-list');
    array.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
      });
    
}

init();

