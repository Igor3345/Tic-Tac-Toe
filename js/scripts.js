
/**
 * Элементы DOM дерева
 */
const playGround = document.querySelector('.main_playGround');  // Игровой стол
const player1Name = document.querySelectorAll('.head__players');  // Поля ввода имен игроков
const playCell = document.querySelectorAll('.main_playGround__item');  // Рабочие элементы "клетки" игрового стола
const namesScore = document.querySelectorAll('.player__name');  // Поле отображения имени игрока
const pointsScore = document.querySelectorAll('.player__point'); // Поле отображения баллов игрока

/**
 * Переменные для работы с данными
 */
const names = []; // Массив с введенными именами
const points = []; // Массив с баллами игроков
let start = false;  // Булево значение, отвечающее за возможность проведения игры
let turns = 0;  // Счетчик ходов


/**
 * Функция начинающая / заканчивающая игру.
 */
document.querySelector('.head__button').onclick = (e) => {
    if (e.target.textContent == 'Старт') {
        e.target.textContent = 'Стоп';
        document.querySelector('.players_containers').style.display = 'none';
        document.querySelector('.players__table').style.display = 'flex';
        start = true;
        points.push(0, 0);
        for (let i = 0; i < player1Name.length; i++) {
            if (i == 0) {
                if (player1Name[i].value == ''.trim()) {
                    names.push(`Игрок ${i + 1}    / <b>X</b>`)
                } else {
                    names.push(player1Name[i].value + ' / ' + '<b>X</b>');
                }
            } else {
                if (player1Name[i].value == ''.trim()) {
                    names.push(`Игрок ${i + 1}  / <b>O</b>`)
                } else {
                    names.push(player1Name[i].value + ' / ' + '<b>O</b>');
                }
            }
        }
        for (let i = 0; i < names.length; i++) {
            namesScore[i].innerHTML = names[i];
            pointsScore[i].textContent = points[i]
        }
    } else {
        e.target.textContent = 'Старт';
        document.querySelector('.players_containers').style.display = 'flex';
        document.querySelector('.players__table').style.display = 'none';
        start = false;
        for (let i = 0; i < playCell.length; i++) {
            playCell[i].textContent = '';
        }
        points.splice(0, 2);
        names.splice(0, 2);
    }
}


/**
 * Фунция, ставящая крестики или нолики в клетках.
 */
playGround.onmouseup = (e) => {
    if (e.target.textContent == '' && start == true) {
        if (turns % 2 == 0) {
            e.target.textContent = 'x';
            turns++;
        } else {
            e.target.textContent = 'o';
            turns++;
        }
        check();
    }
}


/**
 * Функция, проверяющая последовательность символов в клетках. Фиксирует победу одного из игроков или ничью.
 */
function check() {
    const win_cell = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    try {
        for (let i = 0; i < playCell.length; i++) {
            if (playCell[win_cell[i][0]].textContent == 'x' && playCell[win_cell[i][1]].textContent == 'x' && playCell[win_cell[i][2]].textContent == 'x') {
                points[0]++;
                playCell[win_cell[i][0]].classList.add('main_playGround__item--win');
                playCell[win_cell[i][1]].classList.add('main_playGround__item--win');
                playCell[win_cell[i][2]].classList.add('main_playGround__item--win');
                start = false;
                setTimeout(clear, 700);
            } else if (playCell[win_cell[i][0]].textContent == 'o' && playCell[win_cell[i][1]].textContent == 'o' && playCell[win_cell[i][2]].textContent == 'o') {
                points[1]++;
                playCell[win_cell[i][0]].classList.add('main_playGround__item--win');
                playCell[win_cell[i][1]].classList.add('main_playGround__item--win');
                playCell[win_cell[i][2]].classList.add('main_playGround__item--win');
                start = false;
                setTimeout(clear, 700);
            } else if (turns % 9 == 0) {
                setTimeout(clear, 700);
            }
        }
    } catch (error) {
        return false;
    }
}

/**
 * Фунция очищающая клетки игрового стола.
 */
function clear() {
    for (let i = 0; i < names.length; i++) {
        pointsScore[i].textContent = points[i]
    }
    for (let i = 0; i < playCell.length; i++) {
        playCell[i].textContent = '';
        playCell[i].classList.remove('main_playGround__item--win');
    }
    start = true;
    turns = 0;
}